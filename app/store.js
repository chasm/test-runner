import { createStore } from 'redux'

import { addIndex, map, merge } from 'ramda'

import tests from './tests.js'

import { PENDING, RELOAD_TESTS, RUN_TEST, SET_STATUS } from './config.js'

const mapIndexed = addIndex(map)

const runners = mapIndexed(
  (test, idx) => merge(test, { status: PENDING, id: idx }),
  tests
)

const updateStatus = (tests, id, status) => {
  return map((test) => {
    return (id === test.id)
      ? merge(test, { status: status })
      : test
  }, tests)
}

const reducer = (state = { tests: runners }, action) => {
  switch (action.type) {
    case RELOAD_TESTS:
      return merge(state, {
        tests: runners
      })
    case SET_STATUS:
      return merge(state, {
        tests: updateStatus(state.tests, action.id, action.status)
      })
    case RUN_TEST:
      return state
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
