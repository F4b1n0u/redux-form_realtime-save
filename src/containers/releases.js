import { connect } from 'react-redux'

import {
  requestAll as requestAllReleases,
  // getAll as getReleases,
  get as getRelease,
} from '../modules/Releases'

import Releases from '../components/releases'

export default connect(
  state => ({
    releases: getRelease(state, 112300),
  }),
  dispatch => ({
    onLoad: () => dispatch(requestAllReleases()),
    onReleaseSubmit: (releaseId, data) => { console.log(data) }
  })
)(Releases)
