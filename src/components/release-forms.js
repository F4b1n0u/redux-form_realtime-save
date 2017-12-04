import React, { Component } from 'react'

import ReleaseForm from '../containers/release-form'

export default class ReleaseForms extends Component {
  componentWillMount() {
    const {
      load = () => {},
    } = this.props

    load()
  }

  render() {
    const {
      releaseIds,
    } = this.props

    return (
      <div>
        {
          releaseIds.map((id, index) => (
            <ReleaseForm
              key={id}
              index={index}
            />
          ))
        }
      </div>
    )
  }
}
