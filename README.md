# Static Site Builder with Grunt

This is everything you need to build a static website, using Grunt to compile your HTML, CSS & JS with livereload.

#### Setup %

- Open terminal, `cd` to where you keep your sites.
- Clone this repo.
- In terminal run `npm install` to install the projects dependancies.
- Once complete, in terminal run `grunt` to get started.

#### Build & Dist
- The `build` folder is where you will do all of your work.
- The `dist` folder is where everything in the `build` with compile to.

#### Adding HTML Pages
- Add your new page in `build/html`.
- Use `build/html/modules` for components that a repeated across your site such as a header.
- Anything that is placed outside `build/html/modules` will be compiled into `dist`

#### Adding JS
- Add a new JS file to `build/js/vendors` and it will auto compile.
- Any JS that you want to do can be done in `build/js/functions.js`

#### Adding SVGs
- Add your SVG to `build/img/svgs` with a desired file name.
- Now add the SVG to your HTML by referencing to it `<svg><use xlink:href="#svg-file-name"/></svg>`.
- To ensure that your SVG scales correctly you'll need to add `viewBox` to `<svg>`.
  - To find the `viewBox` first go into your SVG file `build/img/svgs` and you'll see something like this `viewBox="0 0 295.2 277.2"` copy it.
  - Paste this into the `<svg>`, it should look something like this `<svg viewBox="0 0 295.2 277.2"><use xlink:href="#svg-file-name"/></svg>`

#### Useful Links
- Sass Architecture Structure | http://git.io/6SmiOw
- CSS Declaration order | http://git.io/vJ7cU
- CSS Guidelines | http://cssguidelin.es/
- Create Favicons | http://realfavicongenerator.net/
