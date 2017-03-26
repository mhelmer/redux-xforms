# redux-xforms

`redux-xforms` is a collection of reducer transformers (higher-order reducers). They can be used to define reducers by direct composition of simpler transformers.

Reducer transformers are similar to `transducers`, but lacks the completion step. It's a special case of higher-order reducers, functions that transform a reducer to another reducer:

```
xform: reducer -> reducer
reducer: state, input -> state
```

## Installation

```bash
npm install --save redux-xforms
```

## Example usage

Setting up a `byFilterName` transformer:

```js
import { withInitialState, filtering, comparingStateObjects, updateSlice, isolateSlice } from 'redux-xforms'
import { compose } from 'redux'


const hasFilterName = action => action.hasOwnProperty('filterName')
const mapActionToFilterName = action => action.filterName

const createByFilter = compose(
  withInitialState({}), // inject initial state as {}
  filtering(hasFilterName), // let through if action has filterName
  comparingStateObjects, // return previous state if new state is shallow equal
  updateSlice(mapActionToFilterName), // update a single key in the state with the result of the next reducer
  isolateSlice(mapActionToFilterName) // run the reducer on a single state slice
) // we can call this with a reducer to get the transform

 // we can transform (state, input -> state) selectors as well
const withGetByFilter = isolateSlice(mapActionToFilterName)
```
When `createByFilter` is called with a reducer, the transformers will be applied one by one, from right to left.
When calling the transformed reducer with an action, it will come in from the left.

```js
const ACTION_TYPE = 'ACTION_TYPE'
const reducer = (state = { nested: null }, action) => {
  if (action.type === ACTION_TYPE) {
    return { nested: action.payload }
  }
  return state
}

const transformedReducer = createByFilter(reducer)

const getNestedState = withGetByKey(state => state.nested)

// reducing actions:
const state = [ {}, {
  type: ACTION_TYPE,
  payload: 'some-payload',
  filterName: 'myFilterName',
} ].reduce(transformedReducer)

console.log(state)
// { myFilterName: { nested: 'some-payload' } }

console.log(getNestedState(state, { filterName: 'myFilterName' }))
// 'some-payload'
```
