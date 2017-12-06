import React, { cloneElement } from 'react'
import classnames from 'classnames'

export default ({
  input,
  label,
  type,
  hasPreview,
  children,
  meta: {
    touched,
    error,
    warning,
  }
}) => (
  <div
    className={classnames(
      `form-group`, {
        'has-danger': touched && error
      }
    )}
  >
    <label htmlFor={`${input.name}.${type}`}>
      {hasPreview ? `${label}: ${input.value}` : `${label}`}
    </label>
    {cloneElement(
      children,
      { className: classnames(
        'form-control', {
        'form-control-danger': touched && error
      }) }
    )}
    {touched && ((error && (
      <div
        className="form-control-feedback"
      >
        {error}
      </div>
    )) || (warning && <span>{warning}</span>))}
  </div>
)