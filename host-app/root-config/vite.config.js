import { defineConfig, loadEnv } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

const externalDependencies = [
    "single-spa",
    "@oat-sa/root-config",
    "@oat-sa/common-menu"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            MODULES: env.MODULES
        },
        build: {
            target: 'esnext',
            rollupOptions: {
                external: externalDependencies
            },
            assetsInclude: "src/*.html",
            assetsDir: '.'
        },
        plugins: [
            vitePluginSingleSpa({
                type: 'root',
                importMaps: {
                    dev: ['src/importMap.shared.json', 'src/importMap.dev.json'], // for vite dev
                    build: ['src/importMap.shared.json', 'src/importMap.prod.json'], // for vite build (via docker)
                },
                imo: '5.1.1', // from jsdelivr
                imoUi: 'full',
                localStorageKey: 'imo-ui', // run localStorage.setItem('imo-ui', true); in browser console to enable the overlay
            })
        ]
    };
});
