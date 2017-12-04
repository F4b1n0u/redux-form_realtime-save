import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, startSubmit } from 'redux-form'

import {
  requestAll as requestAllReleases,
  getAll as getReleases,
} from '../modules/releases'

import {
  RELEASES_FORM_KEY,
} from '../modules/forms'

import ReleaseForms from '../components/release-forms'

let ReleasesReduxForm = compose(
  connect((state, ownProps) => ({ form: 'plop' })),
  reduxForm({ enableReinitialize: true, }),
  // reduxForm({destroyOnUnmount: false, asyncBlurFields: []})
)(ReleaseForms);

export default connect(
  state => ({
    initialValues: getReleases(state),
  }),
  dispatch => ({
    load: () => dispatch(requestAllReleases()),
    onSubmit: () => dispatch(startSubmit(RELEASES_FORM_KEY)),
  })
)(ReleasesReduxForm)
