# `createReducersByKey(predicate, mapActionToKey)`

Transforms an object with reducers to a combined reducer with byKey-filtering.

#### Arguments

1. `predicate` *(Function)*: A predicate that gets called with the action
2. `mapActionToKey` *(Function)*:  Map action to the key of the selected slice.

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { createReducersByKey } from 'redux-xforms'

const enhanceReducers = createReducersByKey(
  action => action.hasOwnProperty('filterName'),
  action => action.filterName
)
const byFilterNameReducer = enhanceReducers({
  FILTER_ONE: reducer,
  FILTER_TWO: reducer,
})

// returns {
//   reducer({ username: 'mrXform' }, action),
//   FILTER_TWO: { username: 'otherUser' },
// }
byFilterNameReducer({
  FILTER_ONE: { username: 'mrXform' },
  FILTER_TWO: { username: 'otherUser' },
}, {
  type: 'SUCCESS',
  filterName: 'FILTER_ONE',
  payload: { username: 'nextUserName' },
})
 ```
