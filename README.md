# Redux Middleware Test Helper

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Code Climate][code-climate-image]][code-climate-url] [![npm downloads][npm-downloads-image]][npm-downloads-url] [![dependencies][dependencies-image]][dependencies-url] [![peerDependencies][peer-dependencies-image]][peer-dependencies-url] [![devDependencies][dev-dependencies-image]][dev-dependencies-url] [![GPLv3][license-image]][license-url]

## Why?
In every middleware we want to test the following:
- All action types trigger `next(action)`
- If an action type is relevant to this middleware, it should only call ONE RELEVANT middleware method, i.e. `init app` will only call `this.onInitApp`  

I found myself writing the same tests over and over again so I made this package to DRY my [UT][UT-link]s a bit.

Here r [some][example-url] [working][example-url-2] [examples][example-url-3] of one of my production apps that uses this

## Use
```bash
$ npm install --save-dev redux-middleware-test-helper
```
```javascript
# ExampleMiddleware.js
import toMiddlewareTest from 'redux-middleware-test-helper'
class ExampleMiddleware {

  toMiddleware () {
    return store => next => action => {
      if (action.type === 'init app') {
        this.onInitApp()
        next(action)
        return
      }

      if (action.type === 'end game') {
        this.onEndGame()
        next(action)
        return
      }

      next(action)
    }
  }

  onInitApp () {

  }

  onEndGame () {

  }

}

# ExampleMiddleware.spec.js
describe('exampleMiddleware', () => {
  toMiddlewareTest({
    cut: new ExampleMiddleware(),
    methods: [
      { methodName: 'onInitApp', actionType: 'init app' },
      { methodName: 'onEndGame', actionType: 'end game' },
    ],
  })
})
```
```bash
$ mocha path/to/ExampleMiddleware.spec.js
exampleMiddleware
  toMiddleware
    ✓ should call only next(action)
    ✓ should call only next(action), onInitApp
    ✓ should call only next(action), onEndGame

3 passing (175ms)

```

## Develop
```bash
$ git clone git@github.com:goldylucks/redux-middleware-test-helper.git
$ cd redux-middleware-test-helper
$ ./scripts/gitHooks.sh # recommended, runs lint and unit tests on pre-commit 
$ npm install
$ npm run test -- -w # recommended, runs unit tests in watch mode
```

## Test
```bash
$ npm test # runs mocha unit tests
```

## Contact
Issues, features (and Prs!) are always [welcomed][issues-url] :)

## License
The code is available under the [GPL v3 license][license-url].

[travis-image]: https://travis-ci.org/goldylucks/redux-middleware-test-helper.svg?branch=master
[travis-url]: https://travis-ci.org/goldylucks/redux-middleware-test-helper
[code-climate-image]: https://codeclimate.com/github/goldylucks/redux-middleware-test-helper/badges/gpa.svg
[code-climate-url]: https://codeclimate.com/github/goldylucks/redux-middleware-test-helper
[coveralls-image]: https://coveralls.io/repos/github/goldylucks/redux-middleware-test-helper/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/goldylucks/redux-middleware-test-helper?branch=master
[npm-downloads-image]: https://img.shields.io/npm/dt/redux-middleware-test-helper.svg
[npm-downloads-url]: https://www.npmjs.com/package/redux-middleware-test-helper
[peer-dependencies-image]: https://img.shields.io/david/peer/goldylucks/redux-middleware-test-helper.svg
[peer-dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper?type=peer
[dev-dependencies-image]: https://img.shields.io/david/dev/goldylucks/redux-middleware-test-helper.svg
[dev-dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper?type=dev
[dependencies-image]: https://img.shields.io/david/goldylucks/redux-middleware-test-helper.svg
[dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper
[npm-image]: https://www.npmjs.com/package/redux-middleware-test-helper
[npm-url]: https://img.shields.io/npm/v/redux-middleware-test-helper.svg
[license-image]: https://img.shields.io/badge/license-GPL%20v3-brightgreen.svg
[license-url]: http://www.gnu.org/licenses/gpl-3.0.en.html
[UT-link]: https://www.google.co.za/search?q=unit+tests&oq=unit+tests&aqs=chrome..69i57j69i60l5.783j0j7&sourceid=chrome&ie=UTF-8
[example-url]: https://github.com/goldylucks/dual-n-back/blob/master/shared/middlewares/storage.native.nspec.js
[issues-url]: https://github.com/goldylucks/redux-middleware-test-helper/issues
[example-url-2]: https://github.com/goldylucks/dual-n-back/blob/master/shared/middlewares/storage.native.js
[example-url-3]: https://github.com/goldylucks/dual-n-back/blob/master/shared/middlewares/play.spec.js