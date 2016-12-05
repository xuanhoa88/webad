import React from 'react';
import classNames from 'classnames';

function FormLabel({ children, className, defaultClass, ...props }) {
  let inputClass = [];
  if (defaultClass) {
    inputClass = ['control-label'];
  }

  return (
    <label className={ classNames(inputClass, className) } {...props}>
      { children }
    </label>
  );
}

FormLabel.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

FormLabel.defaultProps = {
  defaultClass: true,
};

export default FormLabel;
