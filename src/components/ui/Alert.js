import React from 'react';
import classNames from 'classnames';

const statusClasses = {
  info: 'alert-info',
  warning: 'alert-warning',
  success: 'alert-success',
  error: 'alert-danger',
};

function Alert({
  children,
  isVisible,
  status,
  className,
  defaultClass,
  ...props,
}) {
  const alertClasses = classNames({
    alert: defaultClass,
    block: isVisible,
    hide: !isVisible,
    [statusClasses[status]]: true,
  }, className);

  return (
    <div className={ alertClasses } { ...props }>
      { children }
    </div>
  );
}

Alert.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  status: React.PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  className: React.PropTypes.any,
  defaultClass: React.PropTypes.bool,
};

Alert.defaultProps = {
  status: 'info',
  defaultClass: true,
}

export default Alert;
