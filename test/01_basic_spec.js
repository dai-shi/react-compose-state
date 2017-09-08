/* eslint-env mocha */

import chai, { expect } from 'chai';
import jsxChai from 'jsx-chai';
import React, { PropTypes } from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { composeWithState } from '../src/index';

chai.use(jsxChai);

describe('basic spec', () => {
  it('should have a compose function', () => {
    expect(composeWithState).to.not.be.undefined; // eslint-disable-line no-unused-expressions
  });

  it('should compose a component without state', () => {
    const BaseComponent = () => (<div><h1>Base</h1></div>);
    const ComposedComponent = composeWithState()(BaseComponent);

    const renderer = createRenderer();
    renderer.render(<ComposedComponent />);
    const renderer2 = createRenderer();
    renderer2.render(renderer.getRenderOutput());
    const actualElement = renderer2.getRenderOutput();
    const expectedElement = (<div><h1>Base</h1></div>);

    expect(actualElement).to.deep.equal(expectedElement);
  });

  it('should compose a component with state', () => {
    const BaseComponent = ({ counter }) => (<div>Count: {counter}</div>);
    BaseComponent.propTypes = {
      counter: PropTypes.number.isRequired,
    };
    const initialState = { counter: 1 };
    const ComposedComponent = composeWithState(initialState)(BaseComponent);

    const renderer = createRenderer();
    renderer.render(<ComposedComponent />);
    const renderer2 = createRenderer();
    renderer2.render(renderer.getRenderOutput());
    const actualElement = renderer2.getRenderOutput();
    const expectedElement = (<div>Count: 1</div>);

    expect(actualElement).to.deep.equal(expectedElement);
  });
});
