import { StartPage } from "./presenters/startPagePresenter.jsx";
import { InfoPage } from "./presenters/infoPagePresenter.jsx";
import { Favorites } from "./presenters/favoritesPresenter.jsx";
import { Admin } from "./presenters/adminPresenter.jsx";
import { AuthPresenter } from "./presenters/authPresenter.jsx";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import { reactiveModel } from "./vueReactiveModel.js";
import { watch } from "vue";

export function VueRoot(props) {
    if (!props.model.ready) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <RouterView/>
        </div>
    );
}

//Router setup for navigation between views
export function makeRouter(reactiveModel) {
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [

            {
                path:"/",
                component:<AuthPresenter model={reactiveModel}/>,
            },

             {
                path:"/auth",
                component:<AuthPresenter model={reactiveModel}/>,
            },

            {
                path:"/start",
                component:<StartPage model={reactiveModel}/>,
            },

            {
                path:"/startPage",
                component:<StartPage model={reactiveModel}/>,
            },
            
            {
                path:"/infoPage",
                component: <InfoPage model={reactiveModel}/>,
            },

            {
                path:"/favorites",
                component: <Favorites model={reactiveModel}/>,
            },

            {
                path:"/admin",
                component: <Admin model={reactiveModel}/>,
            }

        ]

    });

    router.beforeEach(async (to, from) => {
        const publicRoutes = ["/", "/auth"];
        const isPublic = publicRoutes.includes(to.path);
       
        //Wait until model is ready
        if(!reactiveModel.ready) {
            await new Promise((resolve) => {
                const stop = watch(() => reactiveModel.ready, (ready) => {
                    if (ready) {
                        stop();
                        resolve();
                    }
                });
            });
        }

        const isLoggedIn = !!reactiveModel.user;
        //Redirect unauthorised users to login
        if (!isPublic && !isLoggedIn) {
            return "/auth";
        }
    });

    return router;
}

  


