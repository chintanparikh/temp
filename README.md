# React + Electron Starter
_an example app for using React with Electron_

### UP & RUNNING
* Run `npm install`

**FOR DEVELOPMENT**
* Run `npm run dev` to fire up Webpack
* In another terminal window run `npm start` to start electron

**FOR PRODUCTION**
* Run `npm run postinstall` to compile all your assets into `dist/bundle.js`
* Change the script tag in `dist/index.html` to use `bundle.js` as its source
* Run `npm start` to start electron

**TODO**

* Get album art writing working
* Create some process to monitor folders for metadata changes
* Figure out how to connect users together so edits to metadata can be shared
  * AcoustID?
