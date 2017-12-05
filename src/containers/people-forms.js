import { connect } from 'react-redux'

import {
  requestAll as requestAllPeoples,
  getAllIds as getPeopleIds,
} from '../modules/peoples'

import PeopleForms from '../components/people-forms'

export default connect(
  (state, ownProps) => ({
    peopleIds: getPeopleIds(state),
  }),
  (dispatch, ownProps) => ({
    load: () => dispatch(requestAllPeoples()),
  })
)(PeopleForms)
