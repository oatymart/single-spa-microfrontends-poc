// Anything exported from this file is importable by other in-browser modules.
import { writable } from 'svelte/store';
import _ from 'lodash';

let _count = 0;

export const countStore = writable(_count);

const debouncedFunction = _.debounce(() => {
    console.log('debouncedFunction called');
}, 100);

export function publicApiFunction() {
    debouncedFunction();
}

export function getCount() {
    return _count;
}

export function incrementCount() {
    _count++;
    countStore.update(n => n + 1);
}
