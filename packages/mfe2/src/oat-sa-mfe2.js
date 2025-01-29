import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";

const svelteLifecycles = singleSpaSvelte({
    component: App,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/mfe2"), // id is created by single-spa-layout from layout template
    props: {
        name: "oat-sa-mfe2",
    }
});

export const { unmount } = svelteLifecycles;

export function mount(...args) {
    console.log("MFE2 mount", ...args);
    // do additional setup?
    return svelteLifecycles.mount(...args);
}

export function bootstrap(...args) {
    console.log("MFE2 bootstrap", ...args);
    // do additional setup?
    return svelteLifecycles.bootstrap(...args);
}
