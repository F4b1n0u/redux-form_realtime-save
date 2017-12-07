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
      {...props.input}
      id={`${props.input.name}.'multi-select'`}
      multi
      options={props.options}
      placeholder={props.placeholder}
      onBlur={function() {
        props.input.onBlur(this.value)
      }}
    />
  </Wrapper>
)

export default MultiSelect
