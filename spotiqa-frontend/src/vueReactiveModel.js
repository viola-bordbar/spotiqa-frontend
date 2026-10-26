import { reactive } from "vue";
import { model } from "./model/spotiqa.js";
import { connectToPersistence } from "./model/firestoreModel.js";
import { watch } from "vue";
 
const FAVORITES_STORAGE_KEY = "spotiqa.favorites";
 
function loadFavoritesFromLocalStorage() {
    try {
        const saved = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Unable to load favorites from localStorage", error);
        return [];
    }
}
 
function saveFavoritesToLocalStorage(favorites) {
    try {
        window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.warn("Unable to save favorites to localStorage", error);
    }
}
 
model.favorites = loadFavoritesFromLocalStorage();
 
export const reactiveModel = reactive(model);
 
window.myModel = reactiveModel;
 
watch(
    () => reactiveModel.favorites,
    (newFavorites) => {
        if (!reactiveModel.user) {
            saveFavoritesToLocalStorage(newFavorites);
        }
    },
    { deep: true }
);
 
// ─── Firestore real-time listeners (replaces fetch + setInterval polling) ────
//
// subscribeSensorData  → listens to sensorLatest/… (written by backend every ~5 s)
// subscribeSensorHistory → listens to sensorHistory/… (written by backend every 60 s)
//
// Both return their own unsubscribe function; we keep references so HMR can
// clean them up cleanly.
 
const unsubLatest  = reactiveModel.subscribeSensorData();
const unsubHistory = reactiveModel.subscribeSensorHistory();
 
if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        unsubLatest?.();
        unsubHistory?.();
    });
}
// ─────────────────────────────────────────────────────────────────────────────
 
connectToPersistence(reactiveModel, watch);