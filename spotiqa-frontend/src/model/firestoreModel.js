import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig.js";
import { areas } from "./areasConst.js";


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//Debug
window.db = db
window.doc = doc;
window.setDoc = setDoc;

const COLLECTION = "spotiqa";

export function connectToPersistence(model, watch) {
    model.ready = false;
    model.user = undefined;


    function followModelChangesACB() {
        return [
            model.favoritesByFloor, 
            model.selectedBuilding,
            model.notificationSubscriptions,
            model.adminNotifFloor,
            model.adminNotifMessage,
            model.adminNotifBuilding,
            model.customFloors,
            model.hiddenFloors
        ];
    }

    // Save to firestore 
    function saveModelToFirestoreACB() {
        if (!model.ready || !model.user) {
            return;
        }

        const docRef = doc(db, COLLECTION, model.user.uid);

        const savedData = {
            favoritesByFloor: model.favoritesByFloor,
            selectedBuilding: model.selectedBuilding?.value || null,
            notificationSubscriptions: model.notificationSubscriptions || {},
            adminNotifFloor: model.adminNotifFloor || null,
            adminNotifMessage: model.adminNotifMessage || null,
            adminNotifBuilding: model.adminNotifBuilding || null,
            customFloors: model.customFloors || {},
            hiddenFloors: model.hiddenFloors || {},
        };

        setDoc(docRef, savedData,{ merge: true });
    }

    // Load from firestore
    function loadUserDataACB(firebaseUser) {
        model.user = firebaseUser;

        // Case 1: user logged out
        if (!firebaseUser) {
            model.selectedBuilding = null;
            model.favoritesByFloor = {};
            model.adminNotifFloor = null;
            model.adminNotifMessage = null;
            model.adminNotifBuilding = null;
            model.notificationSubscriptions = {};
            model.customFloors = {};
            model.hiddenFloors = {};
            model.ready = true;
            return;
        }

        // Case 2: user logged in then load their document
        const docRef = doc(db, COLLECTION, firebaseUser.uid);

        getDoc(docRef)
        .then(snapshot => {
            const data = snapshot.data() || {};
            model.favoritesByFloor = data.favoritesByFloor || {};
            const saved = data.selectedBuilding;
            model.selectedBuilding = (typeof saved === "string")
                ? areas.find(a => a.value === saved) || null
                : saved || null;
            model.adminNotifFloor = data.adminNotifFloor || null;
            model.adminNotifMessage = data.adminNotifMessage || null;
            model.adminNotifBuilding = data.adminNotifBuilding || null;
            model.customFloors = data.customFloors || {};
            model.hiddenFloors = data.hiddenFloors || {};
            model.notificationSubscriptions = data.notificationSubscriptions || {};
            model.role = data.role || "user"; //for admin user
            model.ready = true;
        })
        .catch(error => {
            console.error("Error loading user data:", error);
            model.favoritesByFloor = {};
            model.selectedBuilding = null;
            model.adminNotifFloor = null;
            model.adminNotifMessage = null;
            model.adminNotifBuilding = null;
            model.customFloors = {};
            model.hiddenFloors = {};
            model.notificationSubscriptions = {};
            model.ready = true;
        });
    }

    // Check for login/logout
    onAuthStateChanged(auth, loadUserDataACB);
    watch(followModelChangesACB, saveModelToFirestoreACB, {deep: true});
}
    