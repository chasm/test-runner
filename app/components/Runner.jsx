import React, { Component, PropTypes } from 'react'

import { Button } from 'react-bootstrap'

import { addIndex, map, toLower } from 'ramda'

import tests from '../tests.js'

const mapIndexed = addIndex(map)

class Runner extends Component {

  constructor (props) {
    super(props)

    this.state = {
      status: 'Not Started Yet'
    }
  }

  runTest () {
    console.log('run test', this.state)

    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout)
    }

    this.setState({
      status: 'Running',
      timeout: this.props.test.run(this.updateStatus.bind(this))
    })
  }

  updateStatus (status) {
    console.log('setting status', status)

    this.setState({
      status: (status) ? 'Passed' : 'Failed',
      timeout: false
    }, this.props.cb(status))
  }

  componentDidMount () {
    this.setState({ status: 'Running' }, this.runTest())
  }

  render () {
    let { test } = this.props
    let button = (this.state.status === 'Passed' || this.state.status === 'Failed')
      ? <Button
          onClick={this.runTest.bind(this)}
          bsSize='small'
          bsStyle='warning'
        >Re-run</Button>
      : ''

    return <tr>
      <td>{button}</td>
      <td>{test.description}</td>
      <td className={toLower(this.state.status)}>{this.state.status}</td>
    </tr>
  }
}

Runner.propTypes = {
  test: PropTypes.object.isRequired,
  cb: PropTypes.func.isRequired
}

export default Runner
