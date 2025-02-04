import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";
import { getIsLoggedIn } from '@oat-sa/common-auth';

const name = 'oat-sa-mfe3';
const route = '/mfe3';
const elementId = `single-spa-application:@oat-sa/mfe3`;

function getOrInjectElement() {
    let el = document.getElementById(elementId);
    if (!el) {
        el = document.createElement('div');
        el.id = elementId;
        const hostAppEl = document.getElementById("host-app");
        hostAppEl.appendChild(el);
    }
    return el;
}

const svelteLifecycles = singleSpaSvelte({
    component: App,
    domElementGetter: getOrInjectElement,
    props: {
        name
    }
});

export function mount(...args) {
    // If we are not logged in, hard-redirect to /login, adding the query param
    if (!getIsLoggedIn()) {
        window.location.href = `/login?redirect=${window.location.pathname}`;
        return;
    }
    return svelteLifecycles.mount(...args);
}

export function unmount(...args) {
    return svelteLifecycles.unmount(...args);
}

export function bootstrap(...args) {
    return svelteLifecycles.bootstrap(...args);
}
