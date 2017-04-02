# `updateSlice(mapActionToSlice)`

Creates a reducer transformer that updates only one slice of the state based
on the action.

Make sure to put a filtering xform in front of this, so actions that can't
be mapped wil not run. It also expects state to be initialized as an Object.

#### Arguments

1. `mapActionToSlice` *(Function)*: Map action to the key of the updating slice.

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { updateSlice } from 'redux-xforms'

const reduceSlice = updateSlice(action => action.id)(reducer)
// returns {
//   2: reducer({ username: 'xForman' }, action),
// }
reduceSlice(
  { 2: { username: 'xForman' }, 3: { username: 'yUser' } },
  { id: 2 }
)
```
