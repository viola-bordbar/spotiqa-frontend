import { startPageView } from "../views/startPageView";
import { areas, getAreaLabel } from "../model/areasConst";
import { useRouter } from "vue-router";
import { auth } from "../model/firestoreModel.js";
import { signOut } from "firebase/auth";

export function StartPage(props) {
    const router = useRouter();

    function handleGoToInfoPageACB() {
        if(!props.model.selectedBuilding) {
            alert("Please choose a building first to see details.");
            return;
        }
        router.push('/infoPage');
    }
     
    function handleGoToAuthACB() {
        router.push('/auth');
    }

    function handleGoToFavoritesACB() {
        router.push('/favorites');
    }

    function handleGoToAdminACB() {
        router.push('/admin');
    }

    function handleLogoutACB() {
        signOut(auth).then(() => {
            router.push('/auth');
        });
    }

    function hideBuildingCB(building) {
        building.classList.add("hidden");
    }

    function handleShowBuildingOnMapACB(selectedValue) {
        props.model.selectedBuilding = areas.find(a => a.value === selectedValue) || null;
        const allBuildings = document.querySelectorAll(".building");
        allBuildings.forEach(hideBuildingCB);

        if(selectedValue) {
            const selectedBuilding= document.getElementById(selectedValue);
        
            if(selectedBuilding) {
                selectedBuilding.classList.remove("hidden");
            }
        }
    }

    const buildingName = getAreaLabel(props.model.selectedBuilding?.value);

    return (
        <startPageView
            areaOptions={areas}
            selectedBuilding={buildingName}
            onGoToInfoPage={handleGoToInfoPageACB}
            onShowBuildingOnMap={handleShowBuildingOnMapACB}
            onGoToAuth={handleGoToAuthACB}
            onGoToFavorites={handleGoToFavoritesACB}
            onGoToAdmin={handleGoToAdminACB}
            isAdmin={props.model.role === "admin"}
            onLogout={handleLogoutACB}
            isLoggedIn={!!props.model.user}
        />
    );
}
