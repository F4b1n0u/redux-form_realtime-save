import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class ReleaseForm extends Component {
  componentWillMount() {
    const {
      load
    } = this.props

    load && load()
  }

  render() {
    const {
      // redux-form props
      handleSubmit,
      onSubmit,
      submitting
    } = this.props

    return (
      <form>
        {/* {submitting && (
          <div>
            {'saving ...'}
          </div>
        )} */}
          <div>
            <label>Description</label>
            <div>
              <Field
                name={`description`}
                component="input"
                type="text"
                placeholder="Description"
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
          <div>
            <label>Price</label>
            <div>
              <Field
                name={`price`}
                component="input"
                type="number"
                placeholder="Price"
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
      </form>
    )
  }
}
