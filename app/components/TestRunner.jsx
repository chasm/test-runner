import React, { PropTypes } from 'react'

import { Table } from 'react-bootstrap'

import { addIndex, isEmpty, map, reduce } from 'ramda'

import Runner from './Runner.jsx!'

import { FAILED, PASSED } from '../config.js'

const mapIndexed = addIndex(map)

const TestRunner = ({ tests }, { store }) => {
  const runners = mapIndexed((test, idx) => {
    return <Runner key={idx} test={test}/>
  }, tests)

  const stats = reduce((acc, test) => {
    switch (test.status) {
      case PASSED:
        acc.passed += 1
        break
      case FAILED:
        acc.failed += 1
        break
      default:
        acc.pending += 1
    }

    return acc
  }, { pending: 0, passed: 0, failed: 0 }, tests)

  return (isEmpty(tests))
    ? <p>Tests not loaded</p>
    : <Table striped bordered hover>
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
        <tfoot>
          <tr>
            <td className='stats' colSpan={3}>
              <span className='passed'>Passed: {stats.passed}</span>
              <span className='failed'>Failed: {stats.failed}</span>
              <span className='pending'>Pending: {stats.pending}</span>
            </td>
          </tr>
        </tfoot>
      </Table>
}

TestRunner.propTypes = {
  tests: PropTypes.array.isRequired
}

export default TestRunner
