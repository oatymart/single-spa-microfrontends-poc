# single-spa-microfrontends-poc

## Framework

https://single-spa.js.org/

## Structure

```
- host-app/
  - common/
    - apis/
  - root-config/: defines the host app which is served on localhost:9000
- packages/
  - mfe1/: serves on localhost:9001
  - mfe2/: serves on localhost:9002
```

## Usage

Bring up all apps (a script can be made later):

```sh
cd host-app/root-config
npm run start
cd ../../packages/mfe1
npm run start
cd ../../packages/mfe2
npm run start
```

## Routes

/
/mfe3

## Tech notes

- All local packages are under `@oat-sa` org - this is not final, just the way single-spa sets itself up
- Modules are resolved by importmap defined in root-config. Seems fragile...
- Easy to replace importmap module paths by pre-deployed URLs
- Need to choose between ESM and SystemJS modules?
  - HMR seems to be broken with Webpack + ESM
  - works well with SystemJS everywhere

## To do

- [x] a route that loads multiple MFEs together
- [ ] a route that loads a single MFE to take over the whole document
- [ ] initialise MFEs with props from host config?
- [ ] load a shared JS module (e.g. a large lib -> lodash)
- [ ] host app is bundled by Webpack -> want to change to Vite or Rollup
- [ ] could remove EJS processor
- [ ] test loading libs or MFEs bundled as ESM, System, CommonJS
- [ ] try loading 2 versions of Svelte simultaneously
- [ ] install LDS here
- [ ] MFEs to read & write common data to sessionStorage?
- [ ] communication between MFEs and host app via event bus
- [ ] host app to expose some API, store or state
- [ ] host app service to fetch BE data (auth server?)
- [ ] host app to expose a reactive store?
- [ ] add config (.env) to define which MFEs will register and their URLs/ports (System.addImportMap)
- [ ] stop inlining the importmap; point to a file, depending on config
- [ ] remove single-spa-layout engine?

## Extend

Add a new MFE:

```sh
npm create-single-spa
```

Choose application type, packages/mfe* folder, npm, org name `oat-sa`.
Delete husky stuff as it is broken.
