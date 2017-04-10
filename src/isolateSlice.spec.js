import { isolateSlice } from './'

describe('isolateSlice', () => {
  it('should work as in the example', () => {
    const reducer = jest.fn();
    const toIdSlice = isolateSlice(action => action.id)(reducer)
    toIdSlice(
      { 2: { username: 'xForman' } },
      { id: 2 }
    )
    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual({ username: 'xForman' })
    expect(reducer.mock.calls[0][1]).toEqual({ id: 2 })
  })

  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'
    const reducer = (state = {}, action) => {
      if (action.type === ACTION_TYPE) {
        return { ...state, nested: action.payload }
      }
      return state
    }

    it('should skip actions where predicate returns false', () => {

      const mapActionToSlice = action => action.sliceName
      const xform = isolateSlice(mapActionToSlice)
      const isolatedReducer = xform(reducer)

      const initialState = {
        sliced: { otherThing: 'something-else' },
        otherSlice: {},
      }
      const state = [
        { type: ACTION_TYPE, payload: 'thing', sliceName: 'sliced' },
      ].reduce(isolatedReducer, initialState)
      expect(state).toEqual({ otherThing: 'something-else', nested: 'thing' })
    })

  })
})
