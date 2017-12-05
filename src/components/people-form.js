import React, { Component } from 'react'
import { Field } from 'redux-form'
import Select from 'react-select';

export default class PeopleForm extends Component {
  render() {
    const {
      colors,
      moods,
      currentName,
      currentMood,
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
            <label>{`Name: ${currentName}`}</label>
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
            <label>{'Age'}</label>
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
            <label>{`Mood: ${currentMood.label}`}</label>
            <div>
              <Field
                name="mood"
                component={props => (
                  <Select
                    {...props}
                    {...props.input}
                    options={moods}
                  />
                )}
                // onCHange is VERY important because it never trigger blur
                onChange={handleSubmit(onSubmit)}
              />
            </div>
          </div>
          <div>
            <label>Favorite Colors</label>
            <div>
              <Field
                name="favoriteColors"
                component={props => (
                  <Select
                    {...props}
                    {...props.input}
                    multi
                    options={colors}
                  />
                )}
                onBlur={handleSubmit(onSubmit)}
              />
            </div>
          </div>
      </form>
    )
  }
}
