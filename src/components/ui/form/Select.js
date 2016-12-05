import React from 'react';
import classNames from 'classnames';

function Select({
  children,
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
    <select
	    className={ classNames(inputClass, className) }
      value={ value }
      onBlur={ onBlur }
      onChange={ onChange }
      onFocus={ onFocus } {...props}>
      { children }
    </select>
  );
}

Select.propTypes = {
  placeholder: React.PropTypes.string,
  fieldDefinition: React.PropTypes.object,
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

Select.defaultProps = {
  defaultClass: true,
};

export default Select;
