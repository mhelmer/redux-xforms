# `expandReducerToKeys(reducerKeys)`

Expands a single reducer into an object with many reducers, suitable for
composition with `combineReducers`, `transformReducers` etc.

#### Arguments

1. `reducerKeys` *(Array)*: The keys to populate with the reducer

#### Returns

*(Function)*: The reducer transformer.

#### Example

```javascript
import { expandReducerToKeys } from 'redux-xforms'

const reducer = (state = null, action) => action.type === 'SUCCESS' ? action.payload : state
const reducerKeys = [ 'a', 'b' ]
const reducers = expandReducerToKeys(reducerKeys)(reducer)

// returns 'some-payload'
[ {}, {
  type: 'SUCCESS',
  payload: 'some-payload',
} ].reduce(reducers.a, undefined)

// returns null
reducers.b(undefined, {})
```
