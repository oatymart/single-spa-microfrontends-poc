import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import { visualizer } from 'rollup-plugin-visualizer';

const production = !process.env.ROLLUP_WATCH;

export default [{
    // This is the bundler for several re-usable components in the "common" namespace
    input: [
        "src/oat-sa-common.js",
        "src/auth/oat-sa-common-auth.js",
        "src/login/oat-sa-common-login.js",
        "src/menu/oat-sa-common-menu.js"
    ],
    output: {
        sourcemap: true,
        format: "esm",
        // name: null, // ensure anonymous System.register
        dir: "dist",
    },
    // externals must be resolvable through the root-config's importmap
    external: ["single-spa", "lodash"],
    plugins: [
        svelte({
            compilerOptions: {
                dev: !production,
            },
            emitCss: false,
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve({
            contentBase: ['dist'],
            port: 9003,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }),

        // Watch the `dist` directory and refresh the
        // browser on changes when not in production
        !production && livereload("dist"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        // production && terser(),

        // visualizer({
        //     open: true,
        //     gzipSize: true,
        //     filename: 'stats.html'
        // })
    ],
    watch: {
        clearScreen: false,
    },
}];
