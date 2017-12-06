import React from 'react'

import Wrapper from './wrapper'

export default (props) => (
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