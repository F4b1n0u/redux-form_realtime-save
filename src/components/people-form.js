import React, { Component } from 'react'
import { Field } from 'redux-form'

export default class PeopleForm extends Component {
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
      // submitting
    } = this.props

    return (
      <form>
        {/* {submitting && (
          <div>
            {'saving ...'}
          </div>
        )} */}
          <div>
            <label>Name</label>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
          <div>
            <label>Age</label>
            <div>
              <Field
                name="age"
                component="input"
                type="number"
                placeholder="Age"
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
          <div>
            <label>isNice</label>
            <div>
              <Field
                name="isNice"
                component="input"
                type="checkbox"
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
      </form>
    )
  }
}
