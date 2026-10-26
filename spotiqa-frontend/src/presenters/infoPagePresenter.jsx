import { infoPageView } from "../views/infoPageView";
import { areas, getAreaLabel, getAreaFloors } from "../model/areasConst";
import { useRouter } from "vue-router";
import { auth } from "../model/firestoreModel.js";
import { signOut } from "firebase/auth";

export function InfoPage(props) {

    const router = useRouter();

    function handleBackToStartPageACB() {
        router.push('/start');
    }

    function handleGoToFavoritesACB() {
        router.push('/favorites');
    }

    function handleGoToAdminACB() {
        router.push('/admin');
    }

    function handleGoToAuthACB() {
        router.push('/auth');
    }

    function handleLogoutACB() {
        signOut(auth).then(() => {
            router.push('/auth');
        });
    }

    //On refresh see loading
    if (!props.model.ready) {
        return <div>Loading...</div>;
    }

    function handleToggleFavoritesACB(favoriteArea){
        if (!props.model.favoritesByFloor) {
            props.model.favoritesByFloor = {};
        }

        const updatedFavorites = { ...props.model.favoritesByFloor };

        if(updatedFavorites[favoriteArea.id]) {
            delete updatedFavorites[favoriteArea.id];
        } else {
            updatedFavorites[favoriteArea.id] = favoriteArea;
        }

        props.model.favoritesByFloor = updatedFavorites;

        console.log("Favorites now:", props.model.favoritesByFloor);
    }

    function handleToggleSubscriptionACB(floor, threshold) {
        if (!props.model.user) {
            alert("Please sign in to enable email notifications.");
            return;
        }

        const userEmail = auth.currentUser?.email;
        if (!userEmail) {
            alert("Could not read your email from your account. Try signing out and back in.");
            return;
        }

        const buildingValue = props.model.selectedBuilding?.value;
        const buildingLabel = getAreaLabel(buildingValue);
        const key = `${buildingValue}::${floor.floorName}`;
        const current = props.model.notificationSubscriptions || {};
        const updated = { ...current };

        if (updated[key]) {
            delete updated[key];
        } else {
            const safeThreshold = Number.isFinite(threshold) && threshold >= 1 ? Math.floor(threshold) : 1;
            updated[key] = {
                buildingValue,
                buildingLabel,
                floorName: floor.floorName,
                areaDescription: floor.areaDescription || "",
                threshold: safeThreshold,
                enabled: true,
                email: userEmail,
                createdAt: Date.now(),
                lastNotifiedAt: null
            };
        }

        props.model.notificationSubscriptions = updated;
    }

    const selectedValue = props.model.selectedBuilding?.value;
    const building = getAreaLabel(selectedValue);
    const staticFloors = getAreaFloors(selectedValue);
    const customFloors = props.model.customFloors?.[selectedValue] || [];

    const buildingFloors = [...staticFloors, ...customFloors]
    .filter(floor => !props.model.hiddenFloors?.[selectedValue]?.includes(floor.floorName))
    .map(floor => {
        const isLiveArea = selectedValue === "building-q" && floor.floorName === "Floor 1";
        return {
            ...floor,
            areaSeats: isLiveArea ? props.model.areaSeats : null,
            areaTemp: isLiveArea ? props.model.temperature : null,
            areaHumidity: isLiveArea ? props.model.humidity : null,
        }
    });

    return (
        <infoPageView
            floors={buildingFloors}
            buildingName={building}
            buildingValue={selectedValue}
            adminFloor={props.model.adminNotifFloor}
            adminMessage={props.model.adminNotifMessage}
            adminBuilding={props.model.adminNotifBuilding}
            onBackToStartPage={handleBackToStartPageACB}
            onGoToFavorites={handleGoToFavoritesACB}
            onGoToAdmin={handleGoToAdminACB}
            isAdmin={props.model.role === "admin"}
            onGoToAuth={handleGoToAuthACB}
            onLogout={handleLogoutACB}
            isLoggedIn={!!props.model.user}
            onToggleFavorites={handleToggleFavoritesACB}
            onToggleSubscription={handleToggleSubscriptionACB}
            favoritesByFloor={props.model.favoritesByFloor}
            subscriptions={props.model.notificationSubscriptions}
        />
    );
}
