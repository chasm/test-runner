import React, { PropTypes } from 'react'

import { Button } from 'react-bootstrap'

import { toLower } from 'ramda'

import { FAILED, PASSED, RUNNING, SET_STATUS } from '../config.js'

const Runner = ({ test }, { store }) => {
  const updateStatus = (status) => {
    store.dispatch({
      type: SET_STATUS,
      id: test.id,
      status: status ? PASSED : FAILED
    })
  }

  const runTest = () => {
    store.dispatch({
      type: SET_STATUS,
      id: test.id,
      status: RUNNING
    })

    test.run(updateStatus)
  }

  const getButton = (status) => {
    return <Button
      bsSize='small'
      bsStyle='warning'
      onClick={runTest}
      disabled={status === RUNNING}
    >Run</Button>
  }

  return <tr>
    <td>{getButton(test.status)}</td>
    <td>{test.description}</td>
    <td className={toLower(test.status)}>{test.status}</td>
  </tr>
}

Runner.propTypes = {
  test: PropTypes.object.isRequired
}

Runner.contextTypes = {
  store: PropTypes.object
}

export default Runner
