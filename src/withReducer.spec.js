import { withReducer } from './'

describe('withReducer', () => {
  it('should work as in the example', () => {
    const reducer = jest.fn()
    reducer.mockReturnValueOnce({ username: 'new-username' })

    const toIdSlice = withReducer((state, action) => state[action.id])(reducer)

    // returns reducer({ username: 'xForman' }, { id: 2 })
    expect(toIdSlice({ 2: { username: 'xForman' } }, { id: 2 })).toEqual({
      username: 'new-username',
    })

    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual({ username: 'xForman' }, { id: 2 })
  })

  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = {}, action) => {
      if (action.type === ACTION_TYPE) {
        return { ...state, nested: action.payload }
      }
      return state
    }

    it('should return the slice with nested payload', () => {
      const mapActionToSlice = (state, action) => state[action.sliceName]
      const xform = withReducer(mapActionToSlice)
      const slicedReducer = xform(reducer)

      const initialState = {
        sliced: { otherThing: 'something-else' },
        otherSlice: {},
      }
      const state = [
        { type: ACTION_TYPE, payload: 'thing', sliceName: 'sliced' },
      ].reduce(slicedReducer, initialState)
      expect(state).toEqual({ otherThing: 'something-else', nested: 'thing' })
    })
  })
})
