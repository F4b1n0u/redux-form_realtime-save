import { connect } from 'react-redux'

import {
  requestAll as requestAllReleases,
  getAllIds as getReleaseIds,
} from '../modules/releases'

import ReleaseForms from '../components/release-forms'

export default connect(
  (state, ownProps) => ({
    releaseIds: getReleaseIds(state),
  }),
  (dispatch, ownProps) => ({
    load: () => dispatch(requestAllReleases()),
  })
)(ReleaseForms)
