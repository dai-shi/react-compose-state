// @flow

import React, { type StatelessFunctionalComponent } from 'react';

const isFunction = fn => (typeof fn === 'function');
const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1));

export const composeWithState = (
  initialState : (Object | (props: Object) => Object),
  options: Object = {},
) =>
  (BaseComponent : StatelessFunctionalComponent<any>) => (
    class extends React.PureComponent<any, any> {
      constructor(props: Object) {
        super(props);
        if (isFunction(initialState)) {
          const initializeState = (initialState: (props: Object) => Object);
          this.state = initializeState(props);
        } else {
          this.state = initialState;
        }
        if (!this.state) {
          this.state = {};
        }
        this.stateSetters = {};
        const { setters = {} } = options;
        Object.keys(this.state).forEach((key) => {
          const setter = setters[key] || `set${capitalize(key)}`;
          this.stateSetters[setter] = (val) => {
            this.setState({ [key]: val });
          };
        });
      }

      stateSetters: {
        [string]: string => void,
      };

      render() {
        return (
          <BaseComponent
            {...(this.props)}
            {...this.state}
            {...this.stateSetters}
          />);
      }
    }
  );
