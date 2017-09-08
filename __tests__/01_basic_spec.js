/* eslint-env jest */

import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import { composeWithState } from '../src/index';

describe('basic spec', () => {
  it('should have a compose function', () => {
    expect(composeWithState).toBeDefined();
  });

  it('should compose a component without state', () => {
    const BaseComponent = () => (<div><h1>Base</h1></div>);
    const ComposedComponent = composeWithState()(BaseComponent);

    const actual = renderer.create(<ComposedComponent />).toJSON();
    const expected = renderer.create(<div><h1>Base</h1></div>).toJSON();

    expect(actual).toEqual(expected);
  });

  it('should compose a component with state', () => {
    const BaseComponent = ({ text }) => (<div><h1>{text}</h1></div>);
    BaseComponent.propTypes = {
      text: PropTypes.string.isRequired,
    };
    const initialState = { text: 'hello' };
    const ComposedComponent = composeWithState(initialState)(BaseComponent);

    const actual = renderer.create(<ComposedComponent />).toJSON();
    const expected = renderer.create(<div><h1>hello</h1></div>).toJSON();

    expect(actual).toEqual(expected);
  });
});
