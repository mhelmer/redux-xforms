# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
## [1.3.0] - 2017-04-10
### Added
- Rollup build
- ES6 module to dist files
- Coverage reporters
- New lint rules

## [1.2.1] - 2017-04-10
### Fixed
- Missing exports for `expandReducerToKeys` and `createGetByKey`

## [1.2.0] - 2017-04-05
### Added
- [`expandReducerToKeys`](/docs/api/expandReducerToKeys.md): Expands a single reducer into an object with many reducers, suitable for
composition with `combineReducers`, `transformReducers` etc.

## [1.1.1] - 2017-04-03
### Fixed
- A bug in `createReducersByKey`

## [1.1.0] - 2017-04-03
### Added
- Markdown docs in the repo
- [`createReducersByKey`](/docs/api/createReducersByKey.md): Transforms an object with reducers to a combined reducer with byKey-filtering.
- [`transformReducers`](/docs/api/transformReducers.md): Transforms an object with reducers into an object with the original reducers merged with transformed reducers for matching keys.

## [1.0.1] - 2017-03-10
### Fixed
- Lib directory was not uploaded to npm

## 1.0.0 - 2017-03-31
### Added
- README
- Build/setup: babel, jest, eslint, esdoc
- [`withInitialState`](/docs/api/withInitialState.md): Creates a reducer transformer that will inject initial state before calling the reducing function.
- [`withFilter`](/docs/api/withFilter.md): Creates a reducer transformer that will filter based on the action.
- [`updateSlice`](/docs/api/updateSlice.md): Creates a reducer transformer that updates only one slice of the state based on the action.
- [`isolateSlice`](/docs/api/isolateSlice.md): Creates a reducer transformer that calls the reducer with only a slice of the state, based on the action.
- [`withOldStateIfEqual`](/docs/api/withOldStateIfEqual.md): Creates a reducer transformer that will compare the old and new state with a custom function, and re-use the old state if it returns true.
- [`createByKey`](/docs/api/createByKey.md): Creates a reducer transformer that adds byKey-filtering.
- [`createGetByKey`](/docs/api/createByKey.md): Creates a selector transformer with byKey-filtering.
- [`withReducer`](/docs/api/withReducer.md): Creates a reducer transformer that applies an injected reducer before applying the next reducer.
- Examples

[Unreleased]: https://github.com/mhelmer/redux-xforms/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/mhelmer/redux-xforms/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/mhelmer/redux-xforms/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/mhelmer/redux-xforms/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/mhelmer/redux-xforms/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/mhelmer/redux-xforms/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/mhelmer/redux-xforms/compare/v1.0.0...v1.0.1
