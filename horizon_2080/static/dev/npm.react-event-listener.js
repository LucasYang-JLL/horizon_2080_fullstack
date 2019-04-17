(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.react-event-listener"],{

/***/ "./node_modules/react-event-listener/dist/react-event-listener.cjs.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-event-listener/dist/react-event-listener.cjs.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar _classCallCheck = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/classCallCheck.js\"));\nvar _createClass = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/createClass.js\"));\nvar _possibleConstructorReturn = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\nvar _getPrototypeOf = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\nvar _inherits = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/inherits.js\"));\nvar _typeof = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/typeof.js\"));\nvar _objectWithoutProperties = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutProperties.js\"));\nvar _extends = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/extends.js\"));\nvar React = _interopDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar PropTypes = _interopDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\nvar warning = _interopDefault(__webpack_require__(/*! warning */ \"./node_modules/warning/warning.js\"));\n\nfunction defineProperty(object, property, attr) {\n  return Object.defineProperty(object, property, attr);\n} // Passive options\n// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js\n\n\nvar passiveOption = function () {\n  var cache = null;\n  return function () {\n    if (cache !== null) {\n      return cache;\n    }\n\n    var supportsPassiveOption = false;\n\n    try {\n      window.addEventListener('test', null, defineProperty({}, 'passive', {\n        get: function get() {\n          supportsPassiveOption = true;\n        }\n      }));\n    } catch (err) {//\n    }\n\n    cache = supportsPassiveOption;\n    return supportsPassiveOption;\n  }();\n}();\n\nvar defaultEventOptions = {\n  capture: false,\n  passive: false\n};\n\nfunction mergeDefaultEventOptions(options) {\n  return _extends({}, defaultEventOptions, options);\n}\n\nfunction getEventListenerArgs(eventName, callback, options) {\n  var args = [eventName, callback];\n  args.push(passiveOption ? options : options.capture);\n  return args;\n}\n\nfunction on(target, eventName, callback, options) {\n  // eslint-disable-next-line prefer-spread\n  target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));\n}\n\nfunction off(target, eventName, callback, options) {\n  // eslint-disable-next-line prefer-spread\n  target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));\n}\n\nfunction forEachListener(props, iteratee) {\n  var children = props.children,\n      target = props.target,\n      eventProps = _objectWithoutProperties(props, [\"children\", \"target\"]);\n\n  Object.keys(eventProps).forEach(function (name) {\n    if (name.substring(0, 2) !== 'on') {\n      return;\n    }\n\n    var prop = eventProps[name];\n\n    var type = _typeof(prop);\n\n    var isObject = type === 'object';\n    var isFunction = type === 'function';\n\n    if (!isObject && !isFunction) {\n      return;\n    }\n\n    var capture = name.substr(-7).toLowerCase() === 'capture';\n    var eventName = name.substring(2).toLowerCase();\n    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;\n\n    if (isObject) {\n      iteratee(eventName, prop.handler, prop.options);\n    } else {\n      iteratee(eventName, prop, mergeDefaultEventOptions({\n        capture: capture\n      }));\n    }\n  });\n}\n\nfunction withOptions(handler, options) {\n   true ? warning(options, 'react-event-listener: should be specified options in withOptions.') : undefined;\n  return {\n    handler: handler,\n    options: mergeDefaultEventOptions(options)\n  };\n}\n\nvar EventListener =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(EventListener, _React$PureComponent);\n\n  function EventListener() {\n    _classCallCheck(this, EventListener);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(EventListener).apply(this, arguments));\n  }\n\n  _createClass(EventListener, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.applyListeners(on);\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      this.applyListeners(off, prevProps);\n      this.applyListeners(on);\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.applyListeners(off);\n    }\n  }, {\n    key: \"applyListeners\",\n    value: function applyListeners(onOrOff) {\n      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;\n      var target = props.target;\n\n      if (target) {\n        var element = target;\n\n        if (typeof target === 'string') {\n          element = window[target];\n        }\n\n        forEachListener(props, onOrOff.bind(null, element));\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return this.props.children || null;\n    }\n  }]);\n\n  return EventListener;\n}(React.PureComponent);\n\nEventListener.propTypes =  true ? {\n  /**\n   * You can provide a single child too.\n   */\n  children: PropTypes.node,\n\n  /**\n   * The DOM target to listen to.\n   */\n  target: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired\n} : undefined;\n\nexports.withOptions = withOptions;\nexports.default = EventListener;\n\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/dist/react-event-listener.cjs.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/createClass.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/createClass.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/extends.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/extends.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _extends() {\n  module.exports = _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nmodule.exports = _extends;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/extends.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/inherits.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/inherits.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\");\n\nfunction _objectWithoutProperties(source, excluded) {\n  if (source == null) return {};\n  var target = objectWithoutPropertiesLoose(source, excluded);\n  var key, i;\n\n  if (Object.getOwnPropertySymbols) {\n    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n\n    for (i = 0; i < sourceSymbolKeys.length; i++) {\n      key = sourceSymbolKeys[i];\n      if (excluded.indexOf(key) >= 0) continue;\n      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n      target[key] = source[key];\n    }\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutProperties;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutProperties.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutPropertiesLoose;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/typeof.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/node_modules/@babel/runtime/helpers/typeof.js?");

/***/ })

}]);