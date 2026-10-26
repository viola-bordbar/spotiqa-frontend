import "/src/styles/shared.css";
import "/src/styles/infoPage.css";
import { reactive } from "vue";

const thresholdInputs = reactive({});

export function infoPageView(props) {

    function FloorCard({floor, isFavorite, subscription, isLoggedIn, buildingName, buildingValue, adminFloor, adminMessage, onToggleSubscription, onToggleFavorites}) {
        const {floorName, areaDescription, totalSeats, areaSeats, areaTemp, areaHumidity} = floor;

        const favoriteArea = {
            id: `${buildingName}-${floorName}-${areaDescription}`,
            buildingName,
            floorName,
            areaDescription,
            totalSeats,
            areaSeats,
            areaTemp,
            areaHumidity
        };

        const subscribed = !!(subscription && subscription.enabled);

        const inputKey = `${buildingValue}::${floorName}`;
        const currentThreshold = thresholdInputs[inputKey] ?? subscription?.threshold ?? 1;

        function onThresholdInput(event) {
            const parsed = parseInt(event.target.value, 10);
            thresholdInputs[inputKey] = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
        }

        function handleToggleClick() {
            const threshold = thresholdInputs[inputKey] ?? subscription?.threshold ?? 1;
            onToggleSubscription(floor, threshold);
        }

        const toggleTitle = !isLoggedIn ? 
        "Sign in to enable email notifications" : 
        subscribed ? 
        `You will be notified by email at ${subscription.email} when ${subscription.threshold}+ seats are free.` : 
        "Get an email when seats become free here";
        

        return (
            <div className="floor-card">
                <div>
                    <div className="top-row-info">
                        <div className="floor-header">
                            <div className="floor-icon-circle">
                                <img src="https://i.imgur.com/P1iRZIu.png"/>
                            </div>

                            <div>
                                <div className="floor-title">{floorName}</div>
                                <div className="area-descr">{areaDescription}</div>
                            </div>

                        </div>
                    </div>

                    <div className="divider-horizontal"></div>

                    <div className="floor-info">

                        {/*Number of available seats*/}
                        <div className="building-info-col">
                            <div className="info-row">
                                <img src={areaSeats ? "https://i.imgur.com/muhALAf.png" : "https://i.imgur.com/uVtIUXJ.png"}/>
                                <div>{areaSeats !== null ? `${(totalSeats - Math.round(areaSeats))}/${totalSeats}` : `-/${totalSeats}`}</div>
                            </div>
                            <span>Seats free</span>
                        </div>

                        <div className="divider"></div>

                        {/*Temperature*/}
                        <div className="building-info-col">
                            <div className="info-row">
                                <img src={areaTemp ? "https://i.imgur.com/0f6eVaH.png" : "https://i.imgur.com/2C7YvgK.png"}/>
                                <div>{areaTemp ? `${areaTemp}°C` : "N/A"}</div>
                            </div>
                            <span>Temperature</span>
                        </div>


                       <div className="divider"></div>

                        {/*Humidity*/}
                        <div className="building-info-col">
                            <div className="info-row">
                                <img src={areaHumidity ? "https://i.imgur.com/H7DUycX.png" : "https://i.imgur.com/sDputcd.png"}/>
                                <div>{areaHumidity ? `${areaHumidity}%` : "N/A"}</div>
                            </div>
                            <span>Humidity</span>
                        </div>
                    </div>
                </div>


                <div className="user-btns">
                    {/*Notifications*/}
                    <div className="notif">
                        <div id="bell">
                            <button onClick={handleToggleClick} className="info-btn" title={toggleTitle} disabled={!isLoggedIn}>
                                <img src={subscribed ? "https://i.imgur.com/6FhiSdx.png" : "https://i.imgur.com/2d8S67w.png" }/>
                            </button>
                        </div>
                        Notify me when
                        <input
                            type="number"
                            min="1"
                            className="input-num"
                            value={currentThreshold}
                            onInput={onThresholdInput}
                            disabled={subscribed}
                        />
                        seats are free
                    </div>

                    {/*Favorites*/}
                    <div className="fav-row">
                        <div id="heart">
                            <button onClick={() => onToggleFavorites(favoriteArea)} className="info-btn">
                                <img src={isFavorite ? "https://i.imgur.com/myMXCLW.png" : "https://i.imgur.com/LTWAGeE.png"}/>
                            </button>
                        </div>
                        <span className="favorites-txt">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
                    </div>
                </div>

                {adminMessage && adminMessage.trim() !== "" && 
                adminFloor === floor.floorName && 
                props.adminBuilding === props.buildingValue && (
                    <div className="admin-notice">
                        <span className="admin-notice-title">Notice from admin:</span>
                        <span className="admin-notice-msg">{adminMessage}</span>
                    </div>
                )}

            </div>
        );
    }

    return (
        <div className="page-background">

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

                {props.isAdmin && (
                    <div className="nav-items" onClick={props.onGoToAdmin}>
                        <img src="https://i.imgur.com/MLffLBP.png" className="temp-icon"/>
                        <span>Admin</span>
                    </div>
                )}

                <div className="nav-items" onClick={props.onBackToStartPage}>
                    <img src="https://i.imgur.com/tDzduSC.png" className="temp-icon"/>
                    <span>Home</span>
                </div>

                <img src="https://i.imgur.com/bofSvbt.png" className="logo" onClick={props.onBackToStartPage}/>
            </div>

            <div className="info-top">
                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                    <div className="info-icon-circle">
                        <img src="https://i.imgur.com/n2T6Vr1.png" className="info-icon"/>
                    </div>
                    <h1>{props.buildingName}</h1>
                </div>

                <button type="button" onClick={props.onBackToStartPage} className="back-btn">
                    ⟵ Back to start
                </button>
            </div>

            <div className="building-floors">
                {props.floors.map((floor) => {
                    const favoriteId = `${props.buildingName}-${floor.floorName}-${floor.areaDescription}`;
                    const subscriptionKey = `${props.buildingValue}::${floor.floorName}`;

                    return (
                        <FloorCard
                            key={favoriteId}
                            floor={floor}
                            buildingName={props.buildingName}
                            buildingValue={props.buildingValue}
                            adminFloor={props.adminFloor}
                            adminMessage={props.adminMessage}
                            isFavorite={!!props.favoritesByFloor?.[favoriteId]}
                            subscription={props.subscriptions?.[subscriptionKey]}
                            isLoggedIn={props.isLoggedIn}
                            onToggleSubscription={props.onToggleSubscription}
                            onToggleFavorites={props.onToggleFavorites}
                        />
                    );
                })}
            </div>

        </div>
    );
}
