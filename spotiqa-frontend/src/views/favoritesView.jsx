import "/src/styles/shared.css";
import "/src/styles/favorites.css";

import { ref } from "vue";

export function favoritesView(props){

    const openBuilding = ref(null);

    function toggleBuilding(value) {
        openBuilding.value = openBuilding.value === value ? null : value;
    }

   function renderFavoriteCB(favorite) {
        const {
            id,
            buildingName,
            floorName,
            areaDescription,
            totalSeats,
            areaSeats,
            areaTemp,
            areaHumidity
        } = favorite;

        return (
            <div key={id}>
                <div className="fav-card">
                    <div className="fav-card-title">
                        <div className="fav-icon-circle">
                            <img src="https://i.imgur.com/n2T6Vr1.png" className="info-icon"/> 
                        </div>

                        <h1 className="building-title">{buildingName}</h1>
                    </div>
                        
                    <div className="sub-text-fav">
                        <div className="floor-name">{floorName}</div>
                        <div className="area-descr-fav">{areaDescription}</div>
                    </div>

                    <div className="divider-horizontal-fav-page"></div>

                    <div className="fav-info">
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

                    <div className="divider-horizontal-fav-page"></div>

                    <div className="remove-btn-txt">
                        <button onClick={() => props.onRemoveFavoriteFloor(id)} className="remove-btn">x</button>
                        <div>Remove from favorites</div>
                    </div>

                </div>
            </div>
        );
    } 


   return (
        <div className="page-background">
            <div className="fav-navbar">
                {props.isLoggedIn ? (
                    <div className="nav-items-log">
                        <span onClick={props.onLogout}>Logout</span>
                    </div>
                ) : (
                    <div className="nav-items-log">
                        <span onClick={props.onGoToAuth}>Login</span>
                    </div>
                )}

                <div className="nav-items">
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

            <div className="favs-layout">
                <div className="main-content">
                    <div className="info-top-fav">
                        <div className="info-icon-circle">
                            <img src="https://i.imgur.com/myMXCLW.png" className="info-icon"/>
                        </div> 

                        <div className="fav-header">
                            <div className="fav-page-title">Favorite areas</div>
                            <div className="fav-page-subtitle">Your saved study spots at KTH, all in one place</div>
                        </div>

                        <button onClick={props.onBackToStartPage} className="back-btn-fav">
                            ⟵ Back to start
                        </button>

                    </div>
                    
                    <div className="fav-card-grid-wrapper">
                        {props.favoriteFloors.length === 0? (<p>You have no favorite areas right now. Add some to access them quickly!</p>):
                        (<div className="fav-card-grid"> 
                            {props.favoriteFloors.map(function(favorite) {
                                return renderFavoriteCB(favorite);
                            })}
                        </div>)}
                    </div>
                    
                </div>

            </div>

        </div>

    );
}