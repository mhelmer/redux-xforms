# redux-xforms

`redux-xforms` is a collection of reducer transformers (higher-order reducers). They can be used to define reducers by direct composition of simpler transformers.

Reducer transformers are similar to `transducers`, but lacks the completion step. It's a special case of higher-order reducers, functions that transform a reducer to another reducer:

```
xform: reducer -> reducer
reducer: state, input -> state
```

See [full documentation](/docs/README.md)

## Installation

```bash
npm install --save redux-xforms
```

## Example usage

Setting up a `byFilterName` transformer:

```js
import { createByKey, createGetByKey } from 'redux-xforms'

const hasFilterName = action => action.hasOwnProperty('filterName')
const mapActionToFilterName = action => action.filterName

// we can call this later with a reducer to get the transform
const createByFilter = createByKey(hasFilterName, mapActionToFilterName)

const createGetByFilter = createGetByKey(mapActionToFilterName)
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
const getNestedState = createGetByFilter(state => state.nested)

// reducing actions:
const state = [ {}, {
  type: ACTION_TYPE,
  payload: 'some-payload',
  filterName: 'myFilterName',
} ].reduce(transformedReducer, undefined)

console.log(state)
// { myFilterName: { nested: 'some-payload' } }

console.log(getNestedState(state, { filterName: 'myFilterName' }))
// 'some-payload'
```

`createByKey` is simply a composition of other reducer transformers.

```
import { withInitialState, withFilter, updateSlice, isolateSlice } from 'redux-xforms'
import { compose } from 'redux'

const createByFilter = (predicate, mapActionToKey) => compose(
  withInitialState({}), // inject initial state as {}
  withFilter(predicate), // let through if action has filterName
  updateSlice(mapActionToKey), // update a single key in the state
  isolateSlice(mapActionToKey) // run the reducer on a single state slice
)

// we can transform (state, input -> state) selectors as well
const createGetByFilter = mapActionToFilterName => isolateSlice(mapActionToFilterName)
```
