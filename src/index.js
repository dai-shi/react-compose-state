import React from 'react';
import shallowequal from 'shallowequal';

const isFunction = fn => (typeof fn === 'function');
const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1));

export const composeWithState = initialState => BaseComponent => (
  class extends React.Component {
    constructor(props) {
      super(props);
      if (isFunction(initialState)) {
        this.state = initialState(props);
      } else {
        this.state = initialState;
      }
      this.state = this.state || {};
      this.stateSetters = {};
      Object.keys(this.state).forEach((key) => {
        this.stateSetters[`set${capitalize(key)}`] = (val) => {
          this.setState({ [key]: val });
        };
      });
    }
    shouldComponentUpdate(nextProps, nextState) {
      return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }
    render() {
      return (<BaseComponent {...this.props} {...this.state} {...this.stateSetters} />);
    }
  }
);
