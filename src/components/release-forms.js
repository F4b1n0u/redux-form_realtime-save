import React, { Component } from 'react'

import ReleaseForm from '../components/release-form'

export default class ReleaseForms extends Component {
  componentWillMount() {
    const {
      load
    } = this.props

    load()
  }

  render() {
    const {
      initialValues,
      onReleaseSubmit,
      // redux-form props
      handleSubmit,
      onSubmit,
      submitting
    } = this.props

    return (
      <div>
        {
          initialValues.map((release, index) => (
            <ReleaseForm
              {...release}
              key={index}
              index={index}
              handleSubmit={handleSubmit}
              onSubmit={onReleaseSubmit.bind(null, index)}
              submitting
            />
          ))
        }
      </div>
    )
  }
}
