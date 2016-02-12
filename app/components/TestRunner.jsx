import React, { Component, PropTypes } from 'react'

import { Table } from 'react-bootstrap'

import { addIndex, map } from 'ramda'

import Runner from './Runner.jsx!'

const mapIndexed = addIndex(map)

class TestRunner extends Component {

  render () {
    const runners = mapIndexed((test, idx) => {
      return <Runner key={idx} test={test}/>
    }, this.props.tests)

    return <Table striped bordered hover>
      <thead>
        <tr>
          <th className='controls'></th>
          <th className='description'>Test</th>
          <th className='status'>Status</th>
        </tr>
      </thead>
      <tbody>
        {runners}
      </tbody>
    </Table>
  }
}

TestRunner.propTypes = {
  tests: PropTypes.array.isRequired
}

export default TestRunner
