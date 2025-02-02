import { registerApplication, start } from "single-spa";
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { buildAppRouting } from './dynamicLayout.js';
import extraRoutes from '../extraRoutes.json';

// const modules = process.env.MODULES.split(","); // [mfe1, mfe2]

const routes = constructRoutes(microfrontendLayout.replace('<extra-routes />', buildAppRouting(extraRoutes)));

const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return System.import(/* webpackIgnore: true */ name);
    },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication); // move this to each of the mfes?
layoutEngine.activate();
start();
