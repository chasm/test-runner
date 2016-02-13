import React, { PropTypes } from 'react'

import { forEach } from 'ramda'

import { Button, Col, Grid, Row } from 'react-bootstrap'

import TestRunner from './TestRunner.jsx!'

import { FAILED, PASSED, RUNNING, SET_STATUS } from '../config.js'

const App = ({}, { store }) => {
  const state = store.getState()

  const testComplete = (id) => {
    return (status) => {
      store.dispatch({
        type: SET_STATUS,
        id: id,
        status: status ? PASSED : FAILED
      })
    }
  }

  const runTests = () => {
    forEach((test) => {
      store.dispatch({
        type: SET_STATUS,
        id: test.id,
        status: RUNNING
      })

      test.run(testComplete(test.id))
    }, state.tests)
  }

  return <Grid>
    <Row>
      <Col xs={10} xsOffset={1}>
        <Button
          onClick={runTests}
          bsStyle='warning'
          bsSize='small'
          style={{float: 'right'}}
        >Run All Tests</Button>
      </Col>
    </Row>
    <Row>
      <Col xs={10} xsOffset={1}>
        <h1>NRI Test Runner</h1>
      </Col>
    </Row>
    <Row>
      <Col xs={10} xsOffset={1}>
        <TestRunner tests={state.tests}/>
      </Col>
    </Row>
  </Grid>
}

App.contextTypes = {
  store: PropTypes.object,
}

export default App
