react-compose-state
===================

[![Build Status](https://travis-ci.org/dai-shi/react-compose-state.svg?branch=master)](https://travis-ci.org/dai-shi/react-compose-state)
[![npm version](https://badge.fury.io/js/react-compose-state.svg)](https://badge.fury.io/js/react-compose-state)

A helper function to attach state to
stateless function components.

Background
----------

Since React v0.14, stateless function components are supported,
which allows you to write a component as a pure function.
This is very handy with ES2015 and JSX. Here is an example.

```javascript
const Hello = ({ name }) => (<div>Hello, {name}!</div>);
```

It is recommended to use stateless components as much as possible,
and once you are used to it, you might want to avoid writing class-based components.
Class-based components are powerful and you can mange lifecycles of components,
but the state is one of what is required often, especially if using an external store (like Flux) is not an option.

This package provides an easy way to add state to statelss components.
This avoids the use of `this` which is also known as thisless javascript.

Install
-------

```bash
npm install react-compose-state --save
```

Usage
-----

One liner:

```javascript
import React from 'react';
import { composeWithState } from 'react-compose-state';

const Counter = composeWithState({ counter: 1 })(({ counter, setCounter }) => (
  <div>
    <span>Count: {counter}</span>
    <button onClick={() => setCounter(counter + 1)}>Click</button>
  </div>
));
```

With PropTypes:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { composeWithState } from 'react-compose-state';

const Counter = ({ counter, setCounter }) => (
  <div>
    <span>Count: {counter}</span>
    <button onClick={() => setCounter(counter + 1)}>Click</button>
  </div>
));

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  setCounter: PropTypes.func.isRequired,
}

const initialState = { counter: 1 };

export default composeWithState(initialState)(Counter);
```

With options:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { composeWithState } from 'react-compose-state';

const Counter = ({ counter, updateCounter }) => (
  <div>
    <span>Count: {counter}</span>
    <button onClick={() => updateCounter(counter + 1)}>Click</button>
  </div>
));

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  updateCounter: PropTypes.func.isRequired,
}

const initialState = { counter: 1 };
const options = {
  setters: {
    counter: 'updateCounter',
  },
};

export default composeWithState(initialState, options)(Counter);
```

Example
-------

The [example](example) folder contains a working example.
You can run it with

```bash
PORT=8080 npm run example
```

and open <http://localhost:8080> in your web browser.
