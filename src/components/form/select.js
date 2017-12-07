import React from 'react'

import Wrapper from './wrapper'

const Select = (props) => (
  <Wrapper
    {...props}
    type={'select'}
  >
    <select
      {...props.input}
      id={`${props.input.name}.select`}
      value={props.input.value}
      className="form-control"
      placeholder={props.placeholder}
    >
      {
        props.options.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))
      }
    </select>
  </Wrapper>
)

export default Select
