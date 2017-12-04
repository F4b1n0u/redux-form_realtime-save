import { connect } from 'react-redux'

import {
  requestAll as requestAllReleases,
  getAll as getReleases,
} from '../modules/releases'

import ReleaseForms from '../components/release-forms'

export default connect(
  (state, ownProps) => ({
    releases: getReleases(state),
  }),
  (dispatch, ownProps) => ({
    load: () => dispatch(requestAllReleases()),
  })
)(ReleaseForms)
