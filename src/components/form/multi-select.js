import React from 'react'
import Select from 'react-select';

import Wrapper from './wrapper'

export default (props) => (
  <Wrapper
    {...props}
  >
    <Select
      id={`${props.input.name}.'multi-select'`}
      {...props.input}
      onBlur={function() {
        props.input.onBlur(this.value)
      }}
      options={props.options}
      multi
    />
  </Wrapper>
)
