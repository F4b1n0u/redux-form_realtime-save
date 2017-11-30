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
    load: () => dispatch(loadAccount()),
    onSubmit: values => new Promise(resolve => {
      setTimeout(() => {
        // simulate server latency
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        resolve()
      }, 500)
    })
  })
)(StepOneForm)
