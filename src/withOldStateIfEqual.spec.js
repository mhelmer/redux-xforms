import withOldStateIfEqual from './withOldStateIfEqual'

describe('withOldStateIfEqual', () => {
  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = { payload: null }, action) => action.type === ACTION_TYPE ? { ...state, payload: action.payload }
      : state

    describe('compare payloads', () => {
      const xform = withOldStateIfEqual((state, nextState) => nextState.payload === nextState.payload)
      const optimizedReducer = xform(reducer)

      it('should return initial state', () => {
        const state = optimizedReducer(undefined, {})
        expect(state).toEqual({ payload: null })
      })
      it('should use the old state when comparison returns true', () => {
        const prevState = [
          {},
          { type: ACTION_TYPE, payload: 'shiny thing' },
        ].reduce(optimizedReducer, undefined)
        const state = optimizedReducer(prevState, { type: ACTION_TYPE, payload: 'shiny thing' })

        expect(state).toBe(prevState)
      })

    })
  })
})
