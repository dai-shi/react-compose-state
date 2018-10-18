"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeWithState = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*::
import type { StatelessFunctionalComponent } from 'react';
*/
var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};

var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var composeWithState = function composeWithState(initialState
/*: (Object | (props: Object) => Object)*/
) {
  var options
  /*: Object */
  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (BaseComponent
  /*: StatelessFunctionalComponent<any> */
  ) {
    return (
      /*#__PURE__*/
      function (_React$PureComponent) {
        _inherits(_class, _React$PureComponent);

        function _class(props
        /*: Object */
        ) {
          var _this;

          _classCallCheck(this, _class);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));

          if (isFunction(initialState)) {
            var initializeState = initialState
            /*: (props: Object) => Object */
            ;
            _this.state = initializeState(props);
          } else {
            _this.state = initialState;
          }

          if (!_this.state) {
            _this.state = {};
          }

          _this.stateSetters = {};
          var _options$setters = options.setters,
              setters = _options$setters === void 0 ? {} : _options$setters;
          Object.keys(_this.state).forEach(function (key) {
            var setter = setters[key] || "set".concat(capitalize(key));

            _this.stateSetters[setter] = function (val) {
              _this.setState(_defineProperty({}, key, val));
            };
          });
          return _this;
        }
        /*::
        stateSetters: {
          [string]: string => void,
        };
        */


        _createClass(_class, [{
          key: "render",
          value: function render() {
            return _react.default.createElement(BaseComponent, _extends({}, this.props, this.state, this.stateSetters));
          }
        }]);

        return _class;
      }(_react.default.PureComponent
      /*:: <any, any>*/
      )
    );
  };
};

exports.composeWithState = composeWithState;