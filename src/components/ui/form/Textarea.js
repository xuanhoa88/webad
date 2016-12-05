import React from 'react';
import classNames from 'classnames';

function Textarea({
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
    <textarea
	    className={ classNames(inputClass, className) }
      value={ value }
      onBlur={ onBlur }
      onChange={ onChange }
      onFocus={ onFocus } 
      {...props}
    />
  );
}

Textarea.propTypes = {
  fieldDefinition: React.PropTypes.object,
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

Textarea.defaultProps = {
  defaultClass: true,
};

export default Textarea;
