import React, { cloneElement } from 'react'
import classnames from 'classnames'

const Wrapper = ({
  input,
  label,
  type,
  hasPreview,
  notGrouped,
  children,
  meta: {
    touched,
    error,
    warning,
  }
}) => (
  <div
    className={classnames(
      'field',
      'form-group',
      {
        'has-danger': touched && error
      }
    )}
  >
    <label htmlFor={`${input.name}.${type}`}>
      {hasPreview ? `${label}: ${input.value}` : `${label}`}
    </label>
    {cloneElement(
      children,
      {
        className: classnames({
          'form-control': !notGrouped,
          'form-control-danger': touched && error,
        })
      }
    )}
    {touched && ((error && (
      <div
        className="form-control-feedback message"
      >
        {error}
      </div>
    )) || (warning && <span>{warning}</span>))}
  </div>
)

export default Wrapper
