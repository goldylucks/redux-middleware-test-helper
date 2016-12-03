import chai, { expect } from 'chai'
import { spy, stub } from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

export default ({ actionTypes, cut }) => {
  describe('toMiddleware', () => {
    let methods = []
    const middleware = cut.toMiddleware()
    const store = { getState: stub.returns({}) }
    let next
    let action

    beforeEach('setup spies', () => {
      for (let type in actionTypes) {
        methods = methods.concat(actionTypes[type])
      }
      methods = union(methods)
      methods.forEach(method => cut[method] = spy())
      next = spy()
    })

    it('should call only next(action)', () => {
      // given
      action = { type: '' }

      // when
      middleware(store)(next)(action)

      // then
      expect(next).to.have.been.calledWith(action)
      expect(next).to.have.been.calledOnce

      methods.forEach(method => {
        expect(cut[method]).to.not.have.been.called
      })
    })

    for (let type in actionTypes) {
      const methodsThatShouldBeCalled = actionTypes[type]
      it(`should only call next(action), ${methodsThatShouldBeCalled}`, () => {
        // given
        action = { type }

        // when
        middleware(store)(next)(action)

        // then
        expect(next).to.have.been.calledWith(action)
        expect(next).to.have.been.calledOnce
        if (typeof methodsThatShouldBeCalled === 'string') {
          expect(cut[methodsThatShouldBeCalled]).to.have.been.calledOnce
        } else {
          methodsThatShouldBeCalled.forEach(method => {
            expect(cut[method]).to.have.been.calledOnce
          })
        }
      })
    }
  })
}

function union (methods) {
  const res = []
  methods.forEach(method => {
    if (res.indexOf(method) === -1) {
      res.push(method)
    }
  })
  return res
}
