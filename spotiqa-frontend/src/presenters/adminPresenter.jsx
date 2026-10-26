import { AdminView } from "../views/adminView";
import { areas } from "../model/areasConst";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../model/firestoreModel.js";
import { signOut } from "firebase/auth";

const showAddSpaceCard = ref(false);
const showRemoveSpaceCard = ref(false);
const showNotifSpaceCard = ref(false);
const selectedChartFloor = ref("");

export function Admin(props) {
    const router = useRouter();

    function handleBackToStartPageACB(){
        router.push('/start');
    }

    function handleGoToFavoritesACB() {
        router.push('/favorites');
    }

    function handleGoToAuthACB() {
        router.push('/auth');
    }
    
    function handleLogoutACB() {
        signOut(auth).then(() => {
            router.push('/auth');
        });
    }

    if (!props.model.ready) {
        return <div>Loading...</div>;
    }

    if (props.model.role !== "admin") {
        return <div>Access denied</div>;
    }

    function openAddSpaceCardACB() {
        showAddSpaceCard.value = true;
    }

    function closeAddSpaceCardACB() {
        showAddSpaceCard.value = false;
    }

     function openRemoveSpaceCardACB() {
        showRemoveSpaceCard.value = true;
    }

    function closeRemoveSpaceCardACB() {
        showRemoveSpaceCard.value = false;
    }

     function openNotifSpaceCardACB() {
        showNotifSpaceCard.value = true;
    }

    function closeNotifSpaceCardACB() {
        showNotifSpaceCard.value = false;
    }

    function onHandleSelectedBuildingACB(building) {
        props.model.selectedBuilding = building;
    }

    function handleSendNotifACB(floor, message) {
        props.model.adminNotifFloor = floor;
        props.model.adminNotifMessage = message;
        props.model.adminNotifBuilding = props.model.selectedBuilding?.value;
    }

    function handleAddNewSpaceACB(floorNumber, areaDescription, totalSeats) {
        const buildingValue = props.model.selectedBuilding?.value;
        if(!buildingValue) return;
        
        const current = props.model.customFloors[buildingValue] || [];
        props.model.customFloors = {
            ...props.model.customFloors,
            [buildingValue]: [...current, {
                floorName: `Floor ${floorNumber}`,
                areaDescription,
                totalSeats
            }]
        };
    }

    function handleRemoveSpaceACB(floorName) {
        const buildingValue = props.model.selectedBuilding?.value;
        if(!buildingValue) return;

        const current = props.model.hiddenFloors[buildingValue] || [];
        props.model.hiddenFloors = {
            ...props.model.hiddenFloors,
            [buildingValue]: [...current, floorName]
        };
    }

    function handleSelectedChartFloorACB(floor) {
        selectedChartFloor.value = floor;
    }

    const mergedFloors = [
        ...(props.model.selectedBuilding?.floors || []),
        ...(props.model.customFloors?.[props.model.selectedBuilding?.value] || [])
    ].filter(floor => !props.model.hiddenFloors?.[props.model.selectedBuilding?.value]?.includes(floor.floorName));

    const isLiveArea = props.model.selectedBuilding?.value === "building-q" && selectedChartFloor.value === "Floor 1";

    return (
        <AdminView
            buildings={areas}
            mergedFloors={mergedFloors}
            sensorHistory={isLiveArea ? props.model.sensorHistory : []}
            selectedBuilding={props.model.selectedBuilding}
            selectedChartFloor={selectedChartFloor.value}
            handleSelectedBuilding={onHandleSelectedBuildingACB}
            onSendNotif={handleSendNotifACB}
            onAddNewSpace={handleAddNewSpaceACB}
            onRemoveSpace={handleRemoveSpaceACB}
            onSelectedChartFloor={handleSelectedChartFloorACB}

            showAddSpaceCard={showAddSpaceCard.value}
            onOpenAddSpaceCard={openAddSpaceCardACB}
            onCloseAddSpaceCard={closeAddSpaceCardACB}
            
            showRemoveSpaceCard={showRemoveSpaceCard.value}
            onOpenRemoveSpaceCard={openRemoveSpaceCardACB}
            onCloseRemoveSpaceCard={closeRemoveSpaceCardACB}

            showNotifSpaceCard={showNotifSpaceCard.value}
            onOpenNotifSpaceCard={openNotifSpaceCardACB}
            onCloseNotifSpaceCard={closeNotifSpaceCardACB}

            isLoggedIn={!!props.model.user}
            onGoToAuth={handleGoToAuthACB}
            onLogout={handleLogoutACB}
            onBackToStartPage={handleBackToStartPageACB}
            onGoToFavorites={handleGoToFavoritesACB}
        />
    );
}