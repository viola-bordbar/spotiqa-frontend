import { db } from "../model/firestoreModel.js";
import {
    collection, doc,
    onSnapshot,
    query, orderBy
} from "firebase/firestore";

export const model = {
    selectedBuilding: null,
    areaSeats: null,
    temperature: null,
    humidity: null,
    time: null,
    favorites: [],
    favoritesByFloor: {},     
    notificationSubscriptions: {}, 
    user: null,
    ready: false,
    adminNotifFloor: null,
    adminNotifMessage: null,
    adminNotifBuilding: null,
    customFloors: {},
    hiddenFloors: {},
    sensorHistory: [],

    // Holds the Firestore unsubscribe functions so we can clean up if needed
    _unsubscribeLatest: null,
    _unsubscribeHistory: null,

    /**
     * Subscribes to live sensor readings from Firestore.
     * Updates temperature, humidity, time, and areaSeats whenever
     * the backend writes a new latest-reading document.
     *
     * Path: sensorLatest/{uni}/buildings/{building}/rooms/{room}/sensors/{sensor_id}
     *
     * Call once on app startup (done in vueReactiveModel.js).
     * Returns the unsubscribe function.
     */
    subscribeSensorData(uni = "KTH", building = "BuildingA", room = "Room1", sensor_id = "1") {
        if (this._unsubscribeLatest) this._unsubscribeLatest();

        const docRef = doc(
            db,
            "sensorLatest", uni,
            building, room,
            sensor_id, "latest"
        );

        this._unsubscribeLatest = onSnapshot(docRef, (snapshot) => {
            if (!snapshot.exists()) return;
            const data = snapshot.data();
            this.temperature = data.temperature ?? this.temperature;
            this.humidity    = data.humidity    ?? this.humidity;
            this.time        = data.last_updated ?? this.time;
            this.areaSeats   = data.areaSeats   ?? this.areaSeats;
        }, (err) => {
            console.error("Firestore latest-sensor listener error:", err);
        });

        return this._unsubscribeLatest;
    },

    /**
     * Subscribes to sensor history from Firestore (real-time).
     * History documents are ordered oldest → newest for graphing.
     *
     * Path: sensorHistory/{uni}/{building}/{room}/{sensor_id}  (subcollection)
     *
     * Returns the unsubscribe function.
     */
    subscribeSensorHistory(uni = "KTH", building = "BuildingA", room = "Room1", sensor_id = "1") {
        if (this._unsubscribeHistory) this._unsubscribeHistory();

        const colRef = collection(
            db,
            "sensorHistory", uni,
            building, room,
            sensor_id
        );
        const q = query(colRef, orderBy("recordedAt", "asc"));

        this._unsubscribeHistory = onSnapshot(q, (snapshot) => {
            this.sensorHistory = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        }, (err) => {
            console.error("Firestore history listener error:", err);
        });

        return this._unsubscribeHistory;
    },
};