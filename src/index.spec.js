import toMiddlewareTest from './'

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
        this.onEndGameToo()
        next(action)
        return
      }

      if (action.type.match(/one type|or another/)) {
        this.onOneTypeOrAnother()
        next(action)
        return
      }

      if (action.type.match(/third type|or fourth/)) {
        this.onThirdTypeOrFourth()
        this.onThirdTypeOrFourth2()
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

  onEndGameToo () {

  }

  onOneTypeOrAnother () {

  }

  onThirdTypeOrFourth () {

  }

  onThirdTypeOrFourth2 () {

  }

}

describe('exampleMiddleware', () => {
  toMiddlewareTest({
    cut: new ExampleMiddleware(),
    actionTypes: {
      'init app': 'onInitApp',
      'end game': ['onEndGame', 'onEndGameToo'],
      'one type': 'onOneTypeOrAnother',
      'or another': 'onOneTypeOrAnother',
      'third type': ['onThirdTypeOrFourth', 'onThirdTypeOrFourth2'],
      'or fourth': ['onThirdTypeOrFourth', 'onThirdTypeOrFourth2'],
    },
  })
})
