# Redux Middleware Test Helper

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![devDependencies][dev-dependencies-image]][dev-dependencies-url] [![peerDependencies][peer-dependencies-image]][peer-dependencies-url] [![dependencies][dependencies-image]][dependencies-url] [![GPLv3][license-image]][license-url]

## Use
```bash
$ npm install --save-dev redux-middleware-test-helper
```
```javascript
# ExampleMiddleware.spec.js
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
[coveralls-image]: https://coveralls.io/repos/github/goldylucks/redux-middleware-test-helper/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/goldylucks/redux-middleware-test-helper?branch=master
[issues-url]: https://github.com/goldylucks/redux-middleware-test-helper/issues
[peer-dependencies-image]: https://img.shields.io/david/peer/goldylucks/redux-middleware-test-helper.svg
[peer-dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper?type=peer
[dev-dependencies-image]: https://img.shields.io/david/dev/goldylucks/redux-middleware-test-helper.svg
[dev-dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper?type=dev
[dependencies-image]: https://img.shields.io/david/goldylucks/redux-middleware-test-helper.svg
[dependencies-url]: https://david-dm.org/goldylucks/redux-middleware-test-helper
[license-image]: https://img.shields.io/badge/license-GPL%20v3-brightgreen.svg
[license-url]: http://www.gnu.org/licenses/gpl-3.0.en.html
