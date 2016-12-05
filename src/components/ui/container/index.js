import React from 'react';
import classNames from 'classnames';

function Container({ children, containerClass, ...props }) {
  return (
    <div className={ classNames('container', containerClass) } {...props}>
      { children }
    </div>
  );
}

Container.propTypes = {
  children: React.PropTypes.node,
  containerClass: React.PropTypes.string,
};

export default Container;
