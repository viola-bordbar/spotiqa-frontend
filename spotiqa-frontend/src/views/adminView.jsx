import "/src/styles/shared.css";
import "/src/styles/adminPage.css";
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

function LineChart({data, label, color, unit, noData}) {
    function canvasRefCB(canvas) {
        if(!canvas) return;

        if (canvas.chartInstance) {
            canvas.chartInstance.destroy();
        }

        canvas.chartInstance = new Chart(canvas, {
            type: "line",
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: label,
                    data: data.map(d => d.value),
                    borderColor: color || "#7F77DD",
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return "transparent";
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, "rgba(127, 119, 221, 0.4)");
                        gradient.addColorStop(1, "rgba(127, 119, 221, 0)");
                        return gradient;
                    },
                    fill: true,
                    pointBackgroundColor: "white",
                    pointBorderColor: color || "#7F77DD", 
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4,
                }]

            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: label,
                        align: "start",
                        font: {
                            size: 16,
                            weigth: "600",
                        },
                        color: "#333",
                        padding: { bottom: 20 }

                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.parsed.y} ${unit || ""}`
                        }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { display: false },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });
    }

    return (
        <div style={{position: "relative", width: "100%", height: "210px"}}>
            <canvas ref={canvasRefCB} width={430} height={210}/>
            {noData && (
                <div className="no-data-txt">No data history available for this area</div>
            )}
        </div>
    );   
}

function formatChartData(history, fieldName) {
    if (!history) return [];

    return history.map(entry => ({
        value: fieldName === "areaSeats" ?
        Math.round(entry[fieldName] ?? 0) :
        entry[fieldName] ?? 0,
        label: entry.recordedAt
            ? (entry.recordedAt.toDate?.() ?? new Date(entry.recordedAt))
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : ""
    }));
}

const newFloorNumber = ref("");
const newAreaDescription = ref("");
const newAreaCapacity = ref("");

function addNewSpaceFormComplete() {
    return (
        newFloorNumber.value !== "" &&
        newAreaDescription.value.trim() !== "" &&
        newAreaCapacity.value !== ""
    );
}

function resetAddNewSpaceForm() {
    newFloorNumber.value = "";
    newAreaDescription.value = "";
    newAreaCapacity.value = "";
}

const removeFloor = ref("");

function resetRemoveSpaceForm() {
    removeFloor.value = "";
}

const notifMessage = ref("");
const notifFloor = ref("");

function resetNotifForm() {
    notifFloor.value = "";
}

const selectedChartFloor = ref("");

export function AdminView(props) {

    function onSelectedBuildingACB(building) {
        props.handleSelectedBuilding(building);
    }

    function renderBuildingFloorsACB(floor) {
        return (
            <option key={floor.floorName} value={floor.floorName}>
                {floor.floorName}
            </option>
        );
    }

    return (
        <div className="page-background">

            {/*POPUP FOR ADD SPACE*/}
            <div
                onClick={props.onCloseAddSpaceCard}
                className={props.showAddSpaceCard ? "popup popup-visible" : "popup"}
            ></div>

            <div className={`add-space ${props.showAddSpaceCard ? "visible" : ""} ${addNewSpaceFormComplete() ? "add-space-small" : "add-space-big"}`}>
                <div>
                    <span className="action-card-labels">Enter floor number:</span>
                    <input 
                        type="number" 
                        className="input-num" 
                        value={newFloorNumber.value}
                        onInput={(e) => newFloorNumber.value = e.target.value}
                    />
                </div>

                <div>
                    <label className="action-card-labels">Enter area description:</label>
                    <input 
                        type="text"
                        placeholder="e.g. In the corridors outside the computer labs"
                        className="small-input-txt"
                        value={newAreaDescription.value}
                        onInput={(e) => newAreaDescription.value = e.target.value}
                    ></input>
                </div>

                <div>
                    <span className="action-card-labels">Enter area capacity (seats):</span>
                    <input 
                        type="number" 
                        min="0" 
                        className="input-num"
                        value={newAreaCapacity.value}
                        onInput={(e) => newAreaCapacity.value = e.target.value}
                    />
                </div>

                {!addNewSpaceFormComplete() && (
                    <p className="admin-notice-msg">Please fill in all fields before adding a new space.</p>
                )}

                <div className="act-btn">
                    <button 
                        onClick={() => {
                            resetAddNewSpaceForm();
                            props.onCloseAddSpaceCard();
                        }}
                        className="action-btns-cancel"
                    >
                        Cancel
                    </button>

                    <button 
                        className="action-btns-ok"
                        disabled={!addNewSpaceFormComplete()}
                        onClick={() => { 
                            props.onAddNewSpace(newFloorNumber.value, newAreaDescription.value, newAreaCapacity.value);
                            resetAddNewSpaceForm();
                            props.onCloseAddSpaceCard(); 
                        }}
                    >
                        Add space
                    </button>
                </div>
            </div>

            {/*POPUP FOR REMOVE SPACE*/}
            <div
                onClick={props.onCloseRemoveSpaceCard}
                className={props.showRemoveSpaceCard ? "popup popup-visible" : "popup"}
            ></div>

            <div className={props.showRemoveSpaceCard ? "remove-space visible" : "remove-space"}>
                <div className="notif-row">
                    <label className="action-card-labels">Select space to remove:</label>
                    <select 
                        className="notif-select"
                        value={removeFloor.value} 
                        onChange={(e) => {
                            removeFloor.value = e.target.value; 
                        }}
                    >
                        <option value="">Choose a space...</option>
                        {props.mergedFloors?.map(renderBuildingFloorsACB)}
                    </select>
                </div>

                {!removeFloor.value && (
                    <p className="admin-notice-msg">Please select a space before removing.</p>
                )}
                
                <div className="act-btn">
                    <button 
                        onClick={() => {
                            resetRemoveSpaceForm();
                            props.onCloseRemoveSpaceCard();
                        }} 
                        className="action-btns-cancel"
                    >
                        Cancel
                    </button>

                    <button 
                        className="action-btns-remove"
                        disabled={!removeFloor.value} 
                        onClick={() => { 
                            props.onRemoveSpace(removeFloor.value);
                            resetRemoveSpaceForm();
                            props.onCloseRemoveSpaceCard();
                        }}
                    >
                        Remove space
                    </button>
                </div>
            </div>

            {/*POPUP FOR NOTIFS*/}
            <div
                onClick={props.onCloseNotifSpaceCard}
                className={props.showNotifSpaceCard ? "popup popup-visible" : "popup"}
            ></div>

            <div className={props.showNotifSpaceCard ? "notif-space visible" : "notif-space"}>
                <div className="notif-row">
                    <label className="action-card-labels">Select area:</label>
                    <select 
                        className="notif-select" 
                        value={notifFloor.value}
                        onChange={(e) => notifFloor.value = e.target.value}
                    >   
                        <option value="">Choose an area...</option>
                        {props.mergedFloors?.map(renderBuildingFloorsACB)}
                    </select>
                </div>

                {!notifFloor.value && (
                    <p className="admin-notice-msg">Please select an area before sending a message.</p>
                )}
                
                <label className="action-card-labels">Message:</label>

                <textarea 
                    placeholder="Enter your message..." 
                    className="big-input-txt"
                    onInput={(e) => notifMessage.value = e.target.value}
                ></textarea>

                <div>To remove a message, select the same floor and send a message with only a space</div>

                <div className="act-btn">
                    <button 
                        onClick={() => {
                            resetNotifForm();
                            props.onCloseNotifSpaceCard();
                        }} 
                        className="action-btns-cancel"
                    >
                        Cancel
                    </button>

                    <button 
                        className="action-btns-ok" 
                        disabled={!notifFloor.value}
                        onClick={() => { 
                            props.onSendNotif(notifFloor.value, notifMessage.value);
                            resetNotifForm();
                            props.onCloseNotifSpaceCard(); 
                        }}
                    >
                        Send notice
                    </button>
                </div>
            </div>

            {/*NAVBAR*/}
            <div className="navbar">
                {props.isLoggedIn ? (
                    <div className="nav-items-log">
                        <span onClick={props.onLogout}>Logout</span>
                    </div>
                ) : (
                    <div className="nav-items-log">
                        <span onClick={props.onGoToAuth}>Login</span>
                    </div>
                )}

                <div className="nav-items" onClick={props.onGoToFavorites}>
                    <img src="https://i.imgur.com/ZrwlHXI.png" className="temp-icon"/>
                    <span>Favorite areas</span>
                </div>
                
                <div className="nav-items">
                    <img src="https://i.imgur.com/MLffLBP.png" className="temp-icon"/>
                    <span>Admin</span>
                </div>

                <div className="nav-items" onClick={props.onBackToStartPage}>
                    <img src="https://i.imgur.com/tDzduSC.png" className="temp-icon"/>
                    <span>Home</span>
                </div>

                <img src="https://i.imgur.com/bofSvbt.png" className="logo" onClick={props.onBackToStartPage}/>
            </div>

            {/*ADMIN PAGE TITLE & CONTENT*/}
            <div className="admin-header">
                <div className="admin-title">Welcome Admin👋</div>
                <div className="admin-subtitle">Here's what's happening accross all study spaces today</div>
            </div>

            <div className="building-selector">
                <div className="selector-title">Select building</div>

                <div className="building-tabs">
                    {props.buildings.map(function(building) {
                        return (
                            <button 
                                key={building.value} 
                                className={"building-tab" + (props.selectedBuilding?.value === building.value ? " active" : "")}                                onClick={function() { onSelectedBuildingACB(building); }}
                            >
                                <div className="dropdown-option-content">
                                    <img src="https://i.imgur.com/hzq1pSx.png"/>
                                    {building.label}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <div style={{marginLeft: "25px"}}>Select area for charts</div>
                <select 
                    className="page-select"
                    value={selectedChartFloor.value} 
                    onChange={(e) => {
                        selectedChartFloor.value = e.target.value; 
                        props.onSelectedChartFloor(e.target.value);
                    }}
                >
                    <option value="">Choose an area...</option>
                    {props.mergedFloors?.map(renderBuildingFloorsACB)}
                </select>
            </div>

            <div className="chart-cards-layout">
                <div className="chart-card">
                    <LineChart
                        label="Occupancy"
                        color="#7F77DD"
                        unit="people in area"
                        data={formatChartData(props.sensorHistory, "areaSeats")}
                        noData={!props.sensorHistory?.length}
                    />
                </div>

                <div className="chart-card">
                    <LineChart
                        label="Temperature"
                        color="#7F77DD"
                        unit="°C"
                        data={formatChartData(props.sensorHistory, "temperature")}
                        noData={!props.sensorHistory?.length}
                    />
                </div>

                <div className="chart-card">
                    <LineChart
                        label="Humidity"
                        color="#7F77DD"
                        unit="%"
                        data={formatChartData(props.sensorHistory, "humidity")}
                        noData={!props.sensorHistory?.length}
                    />
                </div>
                
                <button className="admin-action-header" onClick={function() {props.onOpenAddSpaceCard()}}>
                    <div className="floor-icon-circle">
                        <img src="https://i.imgur.com/GgqySiQ.png"/>
                    </div>
                    
                    <div>
                        <div className="admin-action-title">Add a new space</div>
                        <div className="area-descr">Create a new study space in this building</div>
                    </div>
                </button>
               
                <button className="admin-action-header" onClick={function() {props.onOpenRemoveSpaceCard()}}>
                    <div className="floor-icon-circle">
                        <img src="https://i.imgur.com/ojVekWn.png"/>
                    </div>

                    <div>
                        <div className="admin-action-title">Remove a space</div>
                        <div className="area-descr">Remove a study space from this building</div>
                    </div>
                </button>
                
                <button className="admin-action-header" onClick={function() {props.onOpenNotifSpaceCard()}}>
                    <div className="floor-icon-circle">
                        <img src="https://i.imgur.com/2d8S67w.png"/>
                    </div>
                    
                    <div>
                        <div className="admin-action-title">Send out area notice</div>
                        <div className="area-descr">Notify users of building area availability</div>
                    </div>
                </button>
            
            </div>

        </div>
    );
}
