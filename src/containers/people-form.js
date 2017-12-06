import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {
  requestAll as requestAllPeoples,
  getByIndex as getPeopleByIndex,
} from '../modules/peoples'

import {
  getColors,
  getMoods,
} from '../modules/app'

import { getPeoplesFormName } from '../modules/forms'

import PeopleForm from '../components/people-form'

export default compose(
  connect(
    (state, ownProps) => {
      const formName = getPeoplesFormName(ownProps)
      return {
        form: formName,
        initialValues: getPeopleByIndex(state, ownProps.index),
        
        colors: getColors(state),
        moods: getMoods(state),
      }
    },
    (dispatch, ownProps) => ({
      load: () => dispatch(requestAllPeoples()),
    })
  ),
  reduxForm({
    enableReinitialize: true,
  }),
)(PeopleForm)
