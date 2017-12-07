import React from 'react'
import Select from 'react-select';

import Wrapper from './wrapper'

const MultiSelect = (props) => (
  <Wrapper
    {...props}
    type={'multi-select'}
    notGrouped={true}
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

export default MultiSelect
