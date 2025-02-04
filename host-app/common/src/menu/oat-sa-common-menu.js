import singleSpaSvelte from "single-spa-svelte";
import Menu from "./Menu.svelte";
import { registerMenuItem } from './menu.js';

const svelteLifecycles = singleSpaSvelte({
    component: Menu,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/common-menu"), // id is created by single-spa-layout from layout template
    props: {
        name: "oat-sa-common-menu",
    }
});

export const { unmount } = svelteLifecycles;

export function mount(...args) {
    return svelteLifecycles.mount(...args);
}

export function bootstrap(...args) {
    console.log('boostrap oat-sa-common-menu', [...args]);
    // menu config has been passed through from host-app, and can be used to dynamically populate the menu
    const { config } = args[0];
    if (config?.menu?.items) {
        for (const item of config.menu.items) {
            registerMenuItem(item);
        }
    }
    return svelteLifecycles.bootstrap(...args);
}

export * from './menu.js';

