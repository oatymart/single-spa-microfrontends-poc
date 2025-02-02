import singleSpaSvelte from "single-spa-svelte";
import Menu from "./Menu.svelte";

const svelteLifecycles = singleSpaSvelte({
    component: Menu,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/common-menu"), // id is created by single-spa-layout from layout template
    props: {
        name: "oat-sa-common-menu",
    }
});

export const { bootstrap, mount, unmount } = svelteLifecycles;

export * from './menu.js';
