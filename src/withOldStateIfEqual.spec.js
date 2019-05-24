import { withOldStateIfEqual } from './'

describe('withOldStateIfEqual', () => {
  it('should work as in the example', () => {
    const reducer = jest.fn()
    reducer.mockReturnValueOnce('SomeState')

    const caseInsensitiveReducer = withOldStateIfEqual(
      (state, nextState) => state.toLowerCase() === nextState.toLowerCase()
    )(reducer)

    // returns 'someState' if reducer returns 'SomeState'
    expect(caseInsensitiveReducer('someState', { payload: 'SomeState' })).toBe(
      'someState'
    )

    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual('someState', {
      payload: 'SomeState',
    })
  })

  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = { payload: null }, action) =>
      action.type === ACTION_TYPE
        ? { ...state, payload: action.payload }
        : state

    describe('compare payloads', () => {
      const xform = withOldStateIfEqual(
        (state, nextState) => state.payload === nextState.payload
      )
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
        const state = optimizedReducer(prevState, {
          type: ACTION_TYPE,
          payload: 'shiny thing',
        })

        expect(state).toBe(prevState)
      })
    })
  })
})
