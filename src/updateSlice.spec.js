import { updateSlice } from './'

describe('updateSlice', () => {
  it('should work as in the example', () => {
    const reducer = jest.fn();
    reducer.mockReturnValueOnce({ username: 'new-username' })
    const reduceSlice = updateSlice(action => action.id)(reducer)
    // returns {
    //   2: reducer({ username: 'xForman' }, action),
    // }
    const state = reduceSlice(
      { 2: { username: 'xForman' }, 3: { username: 'yUser' } },
      { id: 2 }
    )
    expect(state).toEqual({
      2: { username: 'new-username' },
      3: { username: 'yUser' },
    })
    expect(reducer.mock.calls.length).toBe(1)
    expect(reducer.mock.calls[0].length).toBe(2)
    expect(reducer.mock.calls[0][0]).toEqual({
      2: { username: 'xForman' },
      3: { username: 'yUser' },
    })
    expect(reducer.mock.calls[0][1]).toEqual({ id: 2 })
  })


  describe('simple reducer', () => {
    const ACTION_TYPE = 'ACTION_TYPE'

    it('should update the slice with key from action', () => {
      const mapActionToSlice = action => action.sliceName

      const reducer = (state = {}, action) => {
        if(action.type === ACTION_TYPE) {
          return action.payload
        }
        return state[mapActionToSlice(action)]
      }

      const xform = updateSlice(mapActionToSlice)
      const sliceReducer = xform(reducer)

      const state = [
        { type: ACTION_TYPE, payload: 'shiny thing', sliceName: 'sliced' },
      ].reduce(sliceReducer, {})
      expect(state).toEqual({ sliced: 'shiny thing' })
    })

    it('should return the same state when updated slice is unchanged', () => {
      const mapActionToSlice = action => action.sliceName

      const reducer = (state = {}, action) => {
        if(action.type === ACTION_TYPE) {
          return action.payload
        }
        return state[mapActionToSlice(action)]
      }

      const xform = updateSlice(mapActionToSlice)
      const sliceReducer = xform(reducer)

      const initialState = { sliced: 'shiny thing' }
      const state = [
        { type: ACTION_TYPE, payload: 'shiny thing', sliceName: 'sliced' },
      ].reduce(sliceReducer, initialState)
      expect(state).toBe(initialState)
    })

  })
})
