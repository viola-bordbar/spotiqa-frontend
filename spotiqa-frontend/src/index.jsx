import { VueRoot } from "./VueRoot.jsx";
import { reactiveModel } from "./vueReactiveModel.js"; 
import { connectToPersistence } from "./model/firestoreModel.js";
import { makeRouter } from "./VueRoot.jsx";
import { createApp } from "vue";
import { watch } from "vue";

connectToPersistence(reactiveModel, watch);

const app= createApp(function render(){ 
    return <VueRoot model={reactiveModel}/>
});

app.use(makeRouter(reactiveModel));
app.mount("#root");





