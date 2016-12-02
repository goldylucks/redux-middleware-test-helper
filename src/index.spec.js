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
        next(action)
        return
      }

      if (action.type.match(/one type|or another/)) {
        this.onEneTypeOrAnother()
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

  onEneTypeOrAnother () {

  }

}

describe('exampleMiddleware', () => {
  toMiddlewareTest({
    cut: new ExampleMiddleware(),
    methods: [
      { methodName: 'onInitApp', actionType: 'init app' },
      { methodName: 'onEndGame', actionType: 'end game' },
      { methodName: 'onEneTypeOrAnother', actionType: 'one type' },
      { methodName: 'onEneTypeOrAnother', actionType: 'or another' },
    ],
  })
})
