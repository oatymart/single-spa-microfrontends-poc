import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";

const svelteLifecycles = singleSpaSvelte({
    component: App,
    props: {
        name: "oat-sa-mfe1",
    }
});

export const { bootstrap, mount, unmount } = svelteLifecycles;
