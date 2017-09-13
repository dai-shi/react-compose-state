'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeWithState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var composeWithState = exports.composeWithState = function composeWithState(initialState) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (BaseComponent) {
    return function (_React$PureComponent) {
      _inherits(_class, _React$PureComponent);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        if (isFunction(initialState)) {
          _this.state = initialState(props);
        } else {
          _this.state = initialState;
        }
        var _options$setters = options.setters,
            setters = _options$setters === undefined ? {} : _options$setters;

        _this.state = _this.state || {};
        _this.stateSetters = {};
        Object.keys(_this.state).forEach(function (key) {
          var setter = setters[key] || 'set' + capitalize(key);
          _this.stateSetters[setter] = function (val) {
            _this.setState(_defineProperty({}, key, val));
          };
        });
        return _this;
      }

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(BaseComponent, _extends({}, this.props, this.state, this.stateSetters));
        }
      }]);

      return _class;
    }(_react2.default.PureComponent);
  };
};