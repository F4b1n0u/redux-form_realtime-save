import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, startSubmit } from 'redux-form'

import {
  requestAll as requestAllReleases,
  getByIndex as getReleaseByIndex,
} from '../modules/releases'

import {
  RELEASES_FORM_KEY,
} from '../modules/forms'

import ReleaseForm from '../components/release-form'

const getFormName = props => `${RELEASES_FORM_KEY}[${props.index}]`

export default compose(
  connect(
    (state, ownProps) => ({
      form: getFormName(ownProps),
      enableReinitialize: true,
      destroyOnUnmount: false,
      initialValues: getReleaseByIndex(state, ownProps.index),
    }),
    (dispatch, ownProps) => ({
      load: () => dispatch(requestAllReleases()),
      onSubmit: () => dispatch(startSubmit(getFormName(ownProps))),
    })
  ),
  reduxForm({ enableReinitialize: true, }),
)(ReleaseForm)