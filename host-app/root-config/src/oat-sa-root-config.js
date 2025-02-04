import { registerApplication, start } from "single-spa";
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw"; // suffix for Vite import
import { buildAppRouting } from './dynamicLayout.js';
import config from '../app-config.json';
console.log('config', config);

const layoutData = {
    props: {
        config: config || {}
    },
    // loaders: {}
};

const routes = constructRoutes(
    microfrontendLayout.replace('<extra-routes />', buildAppRouting(config.extraRoutes)),
    layoutData
);

const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return import(/* @vite-ignore */ name);
    },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
