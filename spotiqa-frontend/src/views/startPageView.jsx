import "/src/styles/shared.css";
import "/src/styles/startPage.css";

export function startPageView(props) {

    function buildingSelectedACB() {
        props.onGoToInfoPage();
    }

    function showBuildingOnMapACB(area) {
        const dropDownLabel = document.getElementById("dropdown-label");
        const dropdownMenu = document.getElementById("dropdown-menu");

       
        dropDownLabel.innerHTML = 
        `<div class="dropdown-option-content">
            <img src="https://i.imgur.com/n2T6Vr1.png" class="dropdown-icon"/> 
            ${area.label}
        </div>`;

        props.onShowBuildingOnMap(area.value);
        dropdownMenu.classList.add("hidden");
    }

    function toggleDropdownACB() {
        const dropdownMenu = document.getElementById("dropdown-menu");
        dropdownMenu.classList.toggle("hidden");
    }



    //function for rendering area options in dropdown menu
    function renderAreaOptionsCB(area) {
        return (
            <button 
                key={area.value} 
                type="button"
                className="dropdown-option"
                onClick={function () { showBuildingOnMapACB(area); }}
            >
                <div className="dropdown-option-content">
                    <img src="https://i.imgur.com/hzq1pSx.png"/>
                    {area.label}
                </div>
            </button>
        );
    }

    return (
        <div>
            <div className="page-background">
                
                {/* Navbar */}
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

                    <div className="nav-items">
                        <img src="https://i.imgur.com/tDzduSC.png" className="temp-icon"/>
                        <span>Home</span>
                    </div>

                    <img src="https://i.imgur.com/bofSvbt.png" className="logo"/>
                </div>

                <div className="top-sect">
                    <div className="top-card">
                        <div>
                            <h2 className="main-text">
                                Find your perfect study spot
                                <img src="https://i.imgur.com/xVkLPDJ.png" className="main-text-icon"/>
                            </h2>
                            <h2 className="sub-text">Select a building to see available study spaces</h2>
                        </div>

                        <div className="building-dropdown">
                            <span className="top-card-labels">Select building</span>
                            <button type="button" className="dropdown-btn" onClick={toggleDropdownACB}>
                                <span id="dropdown-label">
                                    <img src="https://i.imgur.com/hzq1pSx.png" className="dropdown-icon" id="dropdown-label"/>
                                </span>
                                <span> ⌄ </span>
                            </button>

                            <div id="dropdown-menu" className="dropdown-content hidden">
                                {props.areaOptions.map(renderAreaOptionsCB)}
                            </div>
                        </div>

                        <div>
                            <div className="filter-options">

                                <div className="filter-card">
                                    <div className="filter-text">
                                        <img src="https://i.imgur.com/nt39Ubq.png" className="users-icon"/>
                                        <span>Plan in advance</span>
                                    </div>
                                </div>

                                <div className="filter-card">
                                    <div className="filter-text">
                                        <img src="https://i.imgur.com/r52V7t6.png" className="sofa-icon"/>
                                        <span>Find free spots</span>
                                    </div>
                                </div>

                                <div className="filter-card">
                                    <div className="filter-text">
                                        <img src="https://i.imgur.com/Wh7Cm3Q.png" className="temp-icon"/>
                                        <span>View area temperature</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tip-card">
                            <div className="tip-header">
                                <img src="https://i.imgur.com/sBWuDhj.png"/>
                            </div>
                            <strong>Tip:</strong>Save your favorite areas to access them quickly!
                            <a onClick={props.onGoToFavorites}>Learn more ⟶</a>
                        </div>
                    </div>

                    {/* KTH map & empty divs for hightlighting map areas with CSS*/}
                    <div className="map-card">
                        <div className="map-container">
                            <div className="map-title">Campus map</div>
                            <img src="https://i.imgur.com/M3KqYWH.png" className="map"/>

                            <button id="building-b" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-d" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-e" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-k" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-m" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-q" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-u" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-v" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="building-w" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="kth-biblioteket" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="nymble" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="kth-innovation" className="building hidden" onClick={buildingSelectedACB}></button>
                            <button id="teknikringen-14" className="building hidden" onClick={buildingSelectedACB}></button>
                        </div>

                        <div className="building-info">
                            <div className="building-info-col">
                                <div className="building-info-row">
                                    <img src="https://i.imgur.com/ZDgTbuE.png" className="users-icon"/>
                                    <div>{props.selectedBuilding || "None selected"}</div>
                                </div>
                                <span>Selected building</span>
                            </div>

                            <div className="divider"></div>

                            <button onClick={buildingSelectedACB} className="start-btn">View area details</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}