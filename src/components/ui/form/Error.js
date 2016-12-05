import React from 'react';
import classNames from 'classnames';

function FormError({ children, className, defaultClass, isVisible, ...props}) {
  let inputClass = [];
  if (defaultClass) {
    inputClass = ['help-block'];
  }
  
  if (!isVisible) {
    inputClass.push('hide');
  }
  return (
    <div className={ classNames(inputClass, className) } {...props}>
      { children }
    </div>
  );
}

FormError.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

FormError.defaultProps = {
  isVisible: false,
  defaultClass: true,
};

export default FormError;
