import { navigateToUrl } from "single-spa";
import singleSpaSvelte from "single-spa-svelte";
import { getIsLoggedIn } from '../auth/auth.js';
import LoginPage from "./LoginPage.svelte";

const svelteLifecycles = singleSpaSvelte({
    component: LoginPage,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/common-login"), // id is created by single-spa-layout from layout template
    props: {
        name: "oat-sa-common-login",
    }
});

export function mount(...args) {
    // If we are logged in, redirect using the query param
    if (getIsLoggedIn()) {
        const url = new URL(window.location.href);
        const redirect = url.searchParams.get('redirect') || '/';
        navigateToUrl(redirect);
        return;
    }
    // If not, mount LoginPage app
    return svelteLifecycles.mount(...args);
}

export function unmount(...args) {
    return svelteLifecycles.unmount(...args);
}

export function bootstrap(...args) {
    return svelteLifecycles.bootstrap(...args);
}
