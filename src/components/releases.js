import React, { Component } from 'react'

import Release from '../components/release'

export default class Activity extends Component {
  componentWillMount() {
    const {
      onLoad
    } = this.props

    onLoad()
  }

  render() {
    const {
      releases,
      onReleaseSubmit,
    } = this.props

    return (
      <div>
        {
          releases.map((release, index) => (
            <Release
              {...release}
              key={index}
              onSubmit={onReleaseSubmit.bind(null, release.id)}
            />
          ))
        }
      </div>
    )
  }
}
