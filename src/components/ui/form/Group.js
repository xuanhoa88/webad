import React from 'react';
import classNames from 'classnames';

function FormGroup({ children, hasError, ...props}) {
  const formErrorClasses = classNames('form-group', {'has-error': hasError});
  return (
    <div className={ formErrorClasses } {...props}>
      {children}
    </div>
  );
}

FormGroup.propTypes = {
  children: React.PropTypes.node,
  hasError: React.PropTypes.bool,
};

export default FormGroup;
