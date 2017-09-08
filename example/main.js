/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithState } from '../src/index';

const Counter = composeWithState({ counter: 1 })(({ counter, setCounter }) => (
  <div>
    <span>Count: {counter}</span>
    <button onClick={() => setCounter(counter + 1)}>+1</button>
    <button onClick={() => setCounter(counter - 1)}>-1</button>
  </div>
));

const TextBox = composeWithState({ text: '' })(({ text, setText }) => (
  <div>
    <span>Text: {text}</span>
    <input value={text} onChange={event => setText(event.target.value)} />
  </div>
));

const App = () => (
  <div>
    <h1>Counter</h1>
    <Counter />
    <Counter />
    <h1>TextBox</h1>
    <TextBox />
    <TextBox />
  </div>
);

ReactDOM.render(<App />, document.getElementById('content'));
