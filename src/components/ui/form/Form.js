import React from 'react';
import classNames from 'classnames';

function Form({ children, className, defaultClass, handleSubmit, ...props }) {
  let inputClass = [];
  if (defaultClass) {
    inputClass = ['form'];
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (document.activeElement) {
      document.activeElement.blur();
    }
    handleSubmit();
  };
  return (
    <form
      className={ classNames(inputClass, className) }
      {...props}
      onSubmit={onSubmit}>
      { children }
    </form>
  );
}

Form.propTypes = {
  children: React.PropTypes.node,
  handleSubmit: React.PropTypes.func,
  defaultClass: React.PropTypes.bool,
};

Form.defaultProps = {
  defaultClass: true,
};

export default Form;
