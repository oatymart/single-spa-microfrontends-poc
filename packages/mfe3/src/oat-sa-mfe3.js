import { registerApplication } from "single-spa";
import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";
import { registerMenuItem } from '@oat-sa/common-menu';

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
    return svelteLifecycles.mount(...args);
}

export function unmount(...args) {
    return svelteLifecycles.unmount(...args);
}

export function bootstrap(...args) {
    return svelteLifecycles.bootstrap(...args);
}

registerMenuItem({
    key: name,
    label: 'MFE3',
    href: route,
    order: 3
});

// Here is where MFE3 registers itself with single-spa
// registerApplication({
//     name,
//     app: { bootstrap, mount, unmount },
//     activeWhen: location => location.pathname.startsWith(route), // can do more complex routing here
//     customProps: {},
// });
