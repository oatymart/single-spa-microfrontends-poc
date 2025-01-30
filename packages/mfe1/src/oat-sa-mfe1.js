import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";

const svelteLifecycles = singleSpaSvelte({
    component: App,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/mfe1"), // id is created by single-spa-layout from layout template
    props: {
        name: "oat-sa-mfe1",
    }
});

export const { bootstrap, mount, unmount } = svelteLifecycles;
