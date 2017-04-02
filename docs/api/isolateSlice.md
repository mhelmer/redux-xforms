# `isolateSlice(mapActionToSlice)`

Creates a reducer transformer that calls the reducer with only a slice of
the state, based on the action.

Make sure to put a filtering xform in front of this, so actions that can't
be mapped wil not run. It also expects state to be initialized as an Object.

#### Arguments

1. `mapActionToSlice` *(Function)*: Map action to the key of the updating slice.

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { isolateSlice } from 'redux-xforms'

const toIdSlice = isolateSlice(action => action.id)(reducer)

// returns reducer({ username: 'xForman' }, { id: 2 })
toIdSlice(
  { 2: { username: 'xForman' } },
  { id: 2 }
)
```
