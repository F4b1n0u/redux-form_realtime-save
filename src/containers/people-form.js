import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, startSubmit } from 'redux-form'

import {
  requestAll as requestAllPeoples,
  getByIndex as getPeopleByIndex,
} from '../modules/peoples'

import { PEOPLES_FORM_KEY } from '../modules/forms'

import PeopleForm from '../components/people-form'

const getFormName = props => `${PEOPLES_FORM_KEY}[${props.index}]`

export default compose(
  connect(
    (state, ownProps) => ({
      form: getFormName(ownProps),
      enableReinitialize: true,
      destroyOnUnmount: false,
      initialValues: getPeopleByIndex(state, ownProps.index),
    }),
    (dispatch, ownProps) => ({
      load: () => dispatch(requestAllPeoples()),
      onSubmit: () => dispatch(startSubmit(getFormName(ownProps))),
    })
  ),
  reduxForm({ enableReinitialize: true, }),
)(PeopleForm)
