import React from 'react';

const isFunction = fn => (typeof fn === 'function');
const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1));

export const composeWithState = (initialState, options = {}) => BaseComponent => (
  class extends React.PureComponent {
    constructor(props) {
      super(props);
      if (isFunction(initialState)) {
        this.state = initialState(props);
      } else {
        this.state = initialState;
      }
      const { setters = {} } = options;
      this.state = this.state || {};
      this.stateSetters = {};
      Object.keys(this.state).forEach((key) => {
        const setter = setters[key] || `set${capitalize(key)}`;
        this.stateSetters[setter] = (val) => {
          this.setState({ [key]: val });
        };
      });
    }
    render() {
      return (<BaseComponent {...this.props} {...this.state} {...this.stateSetters} />);
    }
  }
);
