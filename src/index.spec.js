import toMiddlewareTest from '../build'

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
