import React, { PropTypes  } from 'react';
import classNames from 'classnames';

import { MenuItem as BootstrapMenuItem } from 'react-bootstrap';
import { utils } from 'react-bootstrap';

const bootstrapUtils = utils.bootstrapUtils;

class MenuItem extends BootstrapMenuItem {

  render() {
    const {
      active,
      disabled,
      divider,
      header,
      onClick,
      className,
      style,
      ...props,
    } = this.props;
    
    const [bsProps, elementProps] = bootstrapUtils.splitBsPropsAndOmit(props, [
      'eventKey', 'onSelect',
    ]);

    if (divider) {
      // Forcibly blank out the children; separators shouldn't render any.
      elementProps.children = undefined;

      return (
        <li
          {...elementProps}
          role="separator"
          className={classNames(className, 'divider')}
          style={style}
        />
      );
    }

    if (header) {
      return (
        <li
          {...elementProps}
          role="heading"
          className={classNames(className, bootstrapUtils.prefix(bsProps, 'header'))}
          style={style}
        />
      );
    }

    return (
      <li
        role="presentation"
        className={classNames(className, { active, disabled })}
        style={style}
      >
        { this.props.children }
      </li>
    );
  }
}

MenuItem.propTypes = {
    ...BootstrapMenuItem.propTypes,
    children: PropTypes.node,
};

export default bootstrapUtils.bsClass('dropdown', MenuItem);