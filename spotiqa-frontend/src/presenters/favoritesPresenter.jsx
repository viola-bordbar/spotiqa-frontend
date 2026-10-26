import { favoritesView } from "../views/favoritesView";
import { areas } from "../model/areasConst";
import { useRouter } from "vue-router";
import { computed } from  "vue";
import { auth } from "../model/firestoreModel.js";
import { signOut } from "firebase/auth";

export function Favorites(props){
    const router = useRouter();

    function handleBackToStartPageACB() {
        router.push('/start');
    }

    function handleGoToAuthACB() {
        router.push('/auth');
    }

    function handleGoToAdminACB() {
        router.push('/admin');
    }

    function handleLogoutACB() {
        signOut(auth).then(() => {
            router.push('/auth');
        });
    }

    // on refresh see loading
    if (!props.model.ready) {
        return <div>Loading...</div>;
    }

    function handleRemoveFavoriteFloorACB(favoriteId){
        if(props.model.favoritesByFloor) {
            const newFavorites = {...props.model.favoritesByFloor};
            delete newFavorites[favoriteId];
            props.model.favoritesByFloor = newFavorites;
        }
    }

    const favoriteFloors = computed (() =>
        Object.values(props.model.favoritesByFloor || {})
    );

    const mergedAreas = areas.map(building => ({
        ...building, 
        floors: [
            ...building.floors,
            ...(props.model.customFloors?.[building.value] || [])
        ].filter(floor => !props.model.hiddenFloors?.[building.value]?.includes(floor.floorName))
    }));

    return (
        <favoritesView
            areas={mergedAreas}
            favoriteFloors={favoriteFloors.value}
            isLoggedIn={!!props.model.user}
            onBackToStartPage={handleBackToStartPageACB}
            onGoToAdmin={handleGoToAdminACB}
            isAdmin={props.model.role === "admin"}
            onGoToAuth={handleGoToAuthACB}
            onLogout={handleLogoutACB}
            onRemoveFavoriteFloor={handleRemoveFavoriteFloorACB}
        />
    );
}
