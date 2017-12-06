import React from 'react'

import Wrapper from './wrapper'

export default (props) => (
  <Wrapper
    {...props}
  >
    <select
      {...props.input}
      value={props.input.value.value}
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
