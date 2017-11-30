import { connect } from 'react-redux'

import {
  load as loadAccount,
  getData as getAccountData,
} from '../modules/account'

import StepOneForm from '../components/step-one-form'

export default connect(
  state => ({
    initialValues: getAccountData(state),
    colors: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
  }),
  dispatch => ({
    load: () => dispatch(loadAccount())
  })
)(StepOneForm)
