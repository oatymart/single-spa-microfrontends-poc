import { writable } from 'svelte/store';

const defaultItem = {
    key: 'home',
    label: 'Home',
    href: '/',
    order: 0
};

export const menuStore = writable([defaultItem]);

export function registerMenuItem(item) {
    menuStore.update(menu => {
        return [...menu, item].sort((a, b) => a.order - b.order);
    });
}

export function unregisterMenuItem(key) {
    menuStore.update(menu => menu.filter(item => item.key !== key));
}
