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
      releases,
    } = this.props

    return (
      <div>
        {
          releases.map((release, index) => (
            <ReleaseForm
              key={release.id}
              index={index}
            />
          ))
        }
      </div>
    )
  }
}
