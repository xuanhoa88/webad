import React from 'react';
import classNames from 'classnames';

function ButtonGroup({ children, className, ...props}) {
  const formErrorClasses = classNames('btn-group', className);
  return (
    <div className={ formErrorClasses } {...props}>
      {children}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default ButtonGroup;
