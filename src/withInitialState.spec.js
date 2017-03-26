import withInitialState from './withInitialState'

describe('withInitialState', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state, action) => action.type === ACTION_TYPE ? action.payload
      : state
    const xform = withInitialState({ something: 'some-thing' })
    const reducerWithInitialState = xform(reducer)

    it('should inject initial state', () => {
      const state = [ {} ].reduce(reducerWithInitialState, undefined)
      expect(state).toEqual({ something: 'some-thing' })
    })
    it('should update state when reducer returns new state', () => {
      const state = [ {}, {
        type: ACTION_TYPE,
        payload: 'some-payload',
      }].reduce(reducerWithInitialState, undefined)
      expect(state).toBe('some-payload')
    })
  })
})
