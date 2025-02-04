import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
// import externalize from 'vite-plugin-externalize-dependencies';

const externalDependencies = [
    "single-spa",
    "@oat-sa/root-config",
    "@oat-sa/common-menu"
];

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: "src/oat-sa-root-config.js",
            output: {
                format: "esm",
            },
            external: externalDependencies
        },
        assetsInclude: "src/*.html"
    },
    plugins: [
        vitePluginSingleSpa({
            type: 'root',
            importMaps: {
                dev: ['src/importMap.dev.json', 'src/importMap.shared.json'], // for vite dev
                build: ['src/importMap.prod.json', 'src/importMap.shared.json'], // for vite build
            },
            imo: '4.2.0', // from jsdelivr
            imoUi: 'full'
        })
        // externalize({ externals: externalDependencies })
    ]
});
