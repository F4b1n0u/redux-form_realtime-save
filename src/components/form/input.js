import React from 'react'

import Wrapper from './wrapper'

const Input = (props) => (
  <Wrapper
    {...props}
  >
    <input
      {...props.input}
      id={`${props.input.name}.${props.type}`}
      className="form-control"
      placeholder={props.placeholder}
      type={props.type}
    />
  </Wrapper>
)

export default Input
