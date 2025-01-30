# single-spa-microfrontends-poc

## Framework

- https://single-spa.js.org/
- https://github.com/systemjs/systemjs
- https://generator.jspm.io/ - for composing CDN importmaps

## Structure

```
host-app/
  ∟ common/
    ∟ apis/: support services, served on localhost:9003
  ∟ root-config/: defines the host app which is served on localhost:9000
packages/
  ∟ mfe1/: serves dist on localhost:9001
  ∟ mfe2/: serves dist on localhost:9002
```

## Usage

Install by `npm install` in each of the above locations.

Bring up all apps & services (a script can be made later):

```sh
cd host-app/root-config
npm run start
cd ../common/apis
npm run dev
cd ../../../packages/mfe1
npm run dev
cd ../../packages/mfe2
npm run dev
```

## Routes

- http://localhost:9000/
- http://localhost:9000/mfe1
- http://localhost:9000/mfe2

## Tech notes

- All local packages are under `@oat-sa` org - this is not final, just the way single-spa sets itself up
- Modules are resolved by importmap defined in root-config. Seems fragile...
- Easy to replace importmap module paths by pre-deployed URLs
- Need to choose between ESM and SystemJS modules?
  - HMR seems to be broken with Webpack + ESM
  - works well with SystemJS everywhere

## To do

- [x] a route that loads multiple MFEs together
- [x] a route that loads a single MFE to take over the whole document
- [x] load a shared JS module (e.g. a large lib -> lodash) (only done from CDN, not local files)
- [x] host app is bundled by Webpack -> want to change to Vite or Rollup
- [x] try loading 2 versions of Svelte simultaneously -> 3 & 4 ok; 5 has issues
- [ ] test loading libs or MFEs bundled as ESM, System, CommonJS
- [ ] could replace EJS processor?
- [ ] add config (.env) to define which MFEs will register and their URLs/ports (System.addImportMap?)
- [ ] initialise MFEs with props from host config or own configs (install dotenv?)
- [ ] stop inlining the importmap; point to a file, depending on config
- [ ] install LDS here (does its JS format matter?)
- [x] host app to expose a reactive store?
- [ ] host app to expose some API, store or state
- [ ] host app service to fetch BE data (auth server? httpbin?)
- [ ] communication between MFEs and host app via event bus
- [ ] MFEs to read & write common data to sessionStorage?
- [ ] remove single-spa-layout engine?
- [ ] try [self-hosted-shared-dependencies](https://github.com/single-spa/self-hosted-shared-dependencies)
- [ ] avoid having sets of dependencies in both root-config and common parts
- [ ] bundle/watch/serve all parts from a single process - for development and production

## Extend

Add a new MFE:

```sh
npx create-single-spa
```

Choose application type, packages/mfe* folder, npm, org name `oat-sa`.
Delete husky stuff as it is broken.
