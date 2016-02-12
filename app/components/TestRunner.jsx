import React, { Component, PropTypes } from 'react'

import { Table } from 'react-bootstrap'

import { addIndex, map } from 'ramda'

import Runner from './Runner.jsx!'

const mapIndexed = addIndex(map)

class TestRunner extends Component {

  constructor (props) {
    super(props)

    this.state({
      tests: map((t) => false, this.props.tests)
    })
  }

  updateStatus (idx, status) {
    console.log('updateing status', idx, status)
  }

  render () {
    const runners = mapIndexed((test, idx) => {
      return <Runner key={idx} test={test} cb={this.updateStatus.bind(this, idx)}/>
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
