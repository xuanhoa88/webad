import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { NavItem as BootstrapNavItem } from 'react-bootstrap';

class NavItem extends BootstrapNavItem {
  render() {
    const { active, disabled, onClick, className, style, ...props } =
      this.props;

    delete props.onSelect;
    delete props.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete props.activeKey;
    delete props.activeHref;

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

NavItem.propTypes = {
    ...BootstrapNavItem.propTypes,
    children: PropTypes.node,
};

export default NavItem;
