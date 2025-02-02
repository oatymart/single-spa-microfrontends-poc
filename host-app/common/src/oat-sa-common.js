// This file could just export everything from "common",
// but in some cases a module may want to register its own app
// (e.g. common-menu because it's a layout component,
// or something else because it has too many exports).
export * from './apis/index.js';
