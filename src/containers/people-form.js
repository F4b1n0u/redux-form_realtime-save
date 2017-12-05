import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, startSubmit } from 'redux-form'

import {
  requestAll as requestAllPeoples,
  getByIndex as getPeopleByIndex,
} from '../modules/peoples'

import {
  getColors,
  getMoods,
} from '../modules/app'

import {
  getFormValues,
} from 'redux-form'

import { PEOPLES_FORM_KEY } from '../modules/forms'

import PeopleForm from '../components/people-form'

const getFormName = props => `${PEOPLES_FORM_KEY}[${props.index}]`

export default compose(
  connect(
    (state, ownProps) => {
      const formName = getFormName(ownProps)
      return {
        form: formName,
        enableReinitialize: true,
        destroyOnUnmount: false,
        initialValues: getPeopleByIndex(state, ownProps.index),
        
        colors: getColors(state),
        moods: getMoods(state),

        currentName: (getFormValues(formName)(state) || {}).name,
        currentMood: (getFormValues(formName)(state) || {}).mood || { label: '' },
      }
    },
    (dispatch, ownProps) => ({
      load: () => dispatch(requestAllPeoples()),
      onSubmit: () => dispatch(startSubmit(getFormName(ownProps))),
    })
  ),
  reduxForm({ enableReinitialize: true, }),
)(PeopleForm)
