import React, { Component } from 'react'
import { Field } from 'redux-form'

import Input from './form/input'
import Select from './form/select'
import MultiSelect from './form/multi-select'

export default class PeopleForm extends Component {
  render() {
    const {
      colors,
      moods,
      // redux-form props
      submitting
    } = this.props

    return (
      <form className="jumbotron">
        {submitting && <div className="loader small">Loading...</div>}
        <Field
          hasPreview
          label={'Name'}
          name="name"
          type="text"
          component={Input}
          placeholder="Enter Name"
        />
        <Field
          label={'Age'}
          name="age"
          type="text"
          component={Input}
          placeholder="Enter Age"
        />
        {/* <Field
          label={'Is Nice'}
          name="isNice"
          type="checkbox"
          component={Input}
        /> */}
        <Field
          label={'Mood'}
          name="mood"
          hasPreview
          component={Select}
          options={moods}
        />
        <Field
          label={'Favorite Colors'}
          name="favoriteColors"
          component={MultiSelect}
          options={colors}
        />
      </form>
    )
  }
}