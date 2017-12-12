import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {
  requestAll as requestAllPeoples,
  getById as getPeopleById,
  getIndexById as getPeopleIndexById,
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
      const index = getPeopleIndexById(state, ownProps.id)
      const formName = getPeoplesFormName({ index })
      return {
        form: formName,
        initialValues: getPeopleById(state, ownProps.id),
        
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
