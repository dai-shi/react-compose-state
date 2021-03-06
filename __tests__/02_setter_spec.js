/* eslint-env jest */

import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

import { composeWithState } from '../src/index';

configure({ adapter: new Adapter() });

describe('setter spec', () => {
  it('should update state with default setter', () => {
    const BaseComponent = ({ text, setText }) => (
      <div>
        <h1>{text}</h1>
        <button type="button" onClick={() => setText('replaced')}>button</button>
      </div>
    );
    BaseComponent.propTypes = {
      text: PropTypes.string.isRequired,
      setText: PropTypes.func.isRequired,
    };
    const initialState = { text: 'hello' };
    const ComposedComponent = composeWithState(initialState)(BaseComponent);

    const wrapper = mount(<ComposedComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update state with custom setter', () => {
    const BaseComponent = ({ text, updateText }) => (
      <div>
        <h1>{text}</h1>
        <button type="button" onClick={() => updateText('replaced')}>button</button>
      </div>
    );
    BaseComponent.propTypes = {
      text: PropTypes.string.isRequired,
      updateText: PropTypes.func.isRequired,
    };
    const initialState = { text: 'hello' };
    const options = { setters: { text: 'updateText' } };
    const ComposedComponent = composeWithState(initialState, options)(BaseComponent);

    const wrapper = mount(<ComposedComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
