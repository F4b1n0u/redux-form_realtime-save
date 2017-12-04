import { connect } from 'react-redux'
import { startSubmit } from 'redux-form'

import {
  requestAll as requestAllReleases,
  // getAll as getReleases,
  get as getRelease,
} from '../modules/Releases'

import Release from '../components/release'

export default connect(
  state => ({
    initialValues: getRelease(state, 112300),
  }),
  dispatch => ({
    load: () => dispatch(requestAllReleases()),
    onSubmit: () => dispatch(startSubmit('release')),
  })
)(Release)
