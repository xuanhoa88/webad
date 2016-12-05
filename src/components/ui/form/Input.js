import React from 'react';
import classNames from 'classnames';

function Input({
  type,
  className,
  defaultClass,
  fieldDefinition = {},
  ...props,
}) {
  const {
    value,
    onBlur,
    onChange,
    onFocus,
  } = fieldDefinition;

  let inputClass = [];
  if (defaultClass) {
    inputClass = ['form-control'];
  }

  return (
    <input
      type={ type }
	    className={ classNames(inputClass, className) }
      value={ value }
      onBlur={ onBlur }
      onChange={ onChange }
      onFocus={ onFocus } 
      {...props} 
    />
  );
}

Input.propTypes = {
  type: React.PropTypes.string,
  fieldDefinition: React.PropTypes.object,
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  defaultClass: true,
};

export default Input;
