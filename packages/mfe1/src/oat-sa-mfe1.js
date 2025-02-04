import singleSpaSvelte from "single-spa-svelte";
import App from "./App.svelte";
import { registerMenuItem } from '@oat-sa/common-menu';

const name = 'oat-sa-mfe1';

const svelteLifecycles = singleSpaSvelte({
    component: App,
    domElementGetter: () => document.getElementById("single-spa-application:@oat-sa/mfe1"), // id is created by single-spa-layout from layout template
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

// bad place for this:
// registerMenuItem({
//     key: name,
//     label: 'MFE1',
//     href: '/mfe1',
//     order: 1
// });
