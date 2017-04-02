# `createByKey(predicate, mapActionToKey)`

Creates a reducer transformer that adds byKey-filtering.

#### Arguments

1. `predicate` *(Function)*: A predicate that gets called with the action
2. `mapActionToKey` *(Function)*:  Map action to the key of the selected slice.

#### Returns

*(Function)*: A reducer transformer

#### Example

```javascript
import { createByKey } from 'redux-xforms'

const byKeyReducer = createByKey(
  action => action.hasOwnProperty('userId'),
  action => action.userId
)(reducer)

// returns {
//   2: { username: 'mrXform' },
//   3: reducer({ username: 'otherUser' }, action),
// }
byKeyReducer({
  { 2: { username: 'mrXform' } },
  { 3: { username: 'otherUser' } },
}, { userId: 3 })
```

# `createGetByKey(mapFilterToKey)`

Creates a selector transformer with byKey-filtering.

#### Arguments

1. `mapFilterToKey` *(Function)*: Map filter to the key of the selected slice.

#### Returns

*(Function)*: A selctor transformer

#### Example
```javascript
import { createGetByKey } from 'redux-xforms'


const getContainsId = (state, { id }) => state.ids.indexOf(id) !== -1
const getContainsIdByKind = createGetByKey(({ kind }) => kind)(getContainsId)
// returns true
getContainsIdByKind(
  { 'approved': { ids: [1, 2, 3] } },
  { kind: 'approved', id: 2 }
)
```
