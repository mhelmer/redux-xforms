import { withInitialState } from './'

describe('withInitialState', () => {
  it('should work as in the example', () => {
    const reducer = jest.fn()
    reducer.mockReturnValueOnce('some-next-state')
    const initializedReducer = withInitialState('some-state')(reducer)

    // returns reducer('some-state', { id: 2 })
    expect(initializedReducer(undefined, { id: 2 })).toBe('some-next-state')

    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual('some-state', { id: 2 })
  })

  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state, action) =>
      action.type === ACTION_TYPE ? action.payload : state
    const xform = withInitialState({ something: 'some-thing' })
    const reducerWithInitialState = xform(reducer)

    it('should inject initial state', () => {
      const state = reducerWithInitialState(undefined, {})
      expect(state).toEqual({ something: 'some-thing' })
    })
    it('should update state when reducer returns new state', () => {
      const state = [
        {},
        {
          type: ACTION_TYPE,
          payload: 'some-payload',
        },
      ].reduce(reducerWithInitialState, undefined)
      expect(state).toBe('some-payload')
    })
  })
})
