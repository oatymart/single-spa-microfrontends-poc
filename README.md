# single-spa-microfrontends-poc

## Framework

- https://single-spa.js.org/
- https://github.com/systemjs/systemjs
- https://generator.jspm.io/ - for composing CDN importmaps

## Structure

The concept is to break a monolith into many smaller apps, each of which can build and serve itself.

There is a root app which orchestrates the apps, common apps which are a way of sharing common code, and packages which are real apps which render themselves, either taking the whole page, or a part of it.

```
host-app/
  ∟ common/: support services, served on localhost:9003
    ∟ auth/: common-auth service, served on localhost:9003
    ∟ menu/: common-menu service, served on localhost:9003
  ∟ root-config/: defines the host app, which builds an index.html served on localhost:9000
packages/
  ∟ mfe1/: dummy app, serving its dist on localhost:9001
  ∟ mfe2/: dummy app, serving its dist on localhost:9002
  ∟ mfe3/: dummy app, serving its dist on localhost:9004
```

## Usage

Install by `npm install` in each of the above locations.

Bring up all apps & services (a script can be made later):

```sh
cd host-app/root-config
npm run dev
cd ../common
npm run dev
cd ../../../packages/mfe1
npm run dev
cd ../../packages/mfe2
npm run dev
cd ../../packages/mfe3
npm run dev
```

## Routes

- http://localhost:9000/ - multi-MFE layout
- http://localhost:9000/mfe1 - single MFE takes over page
- http://localhost:9000/mfe2 - single MFE takes over page
- http://localhost:9000/mfe3 - single external MFE takes over page

## Tech notes

- All local packages are under `@oat-sa` org - this is not final, just the way single-spa sets itself up.
- Modules are resolved by importmap defined in root-config. Work to be done on how we'll build importmap for production.
- Easy to replace importmap module paths by pre-deployed URLs
- Need to choose between ESM and SystemJS modules?
  - HMR seems to be broken with Webpack + ESM
  - works well with SystemJS everywhere
- Root app can now work with `vite dev` (still to be tested: `vite build`)

## To do

- [x] a route that loads multiple MFEs together
- [x] a route that loads a single MFE to take over the whole document
- [x] load a shared JS module (e.g. a large lib -> lodash) (only done from CDN, not local files)
- [x] host app is bundled by Webpack -> want to change to Vite or Rollup
- [x] try loading 2 versions of Svelte simultaneously -> 3 & 4 ok; 5 has issues
- [x] work more on having MFEs register themselves based on a root config
- [ ] add config (.env) to define which MFEs will register and their URLs/ports (System.addImportMap?)
- [ ] install LDS here (does its JS format matter or will we compile it here?)
- [ ] avoid having sets of dependencies in both root-config and common parts (merge them?)
- [x] host app to expose a reactive store?
- [x] host app to expose some API, store or state
- [x] host app service to fetch BE data (auth server? httpbin?)
- [x] stop inlining the importmap; point to a file, depending on config
- [x] initialise MFEs with props from host config or own configs
- [ ] MFEs to read & write common data to sessionStorage?
- [ ] communication between MFEs and host app via event bus
- [ ] test loading libs or MFEs bundled as ESM, System, CommonJS
- [ ] remove single-spa-layout engine?
- [ ] try [self-hosted-shared-dependencies](https://github.com/single-spa/self-hosted-shared-dependencies)?
- [ ] bundle/watch/serve all parts from a single process - for development and production (lerna or npm workspaces?)

## Extend

Add a new MFE:

```sh
npx create-single-spa
```

Choose application type, packages/mfe* folder, npm, org name `oat-sa`.
Delete husky stuff as it is broken.
