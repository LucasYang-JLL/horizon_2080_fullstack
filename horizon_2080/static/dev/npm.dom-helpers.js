(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.dom-helpers"],{

/***/ "./node_modules/dom-helpers/query/isWindow.js":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/query/isWindow.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = getWindow;\n\nfunction getWindow(node) {\n  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/query/isWindow.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/style/getComputedStyle.js":
/*!************************************************************!*\
  !*** ./node_modules/dom-helpers/style/getComputedStyle.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = _getComputedStyle;\n\nvar _camelizeStyle = _interopRequireDefault(__webpack_require__(/*! ../util/camelizeStyle */ \"./node_modules/dom-helpers/util/camelizeStyle.js\"));\n\nvar rposition = /^(top|right|bottom|left)$/;\nvar rnumnonpx = /^([+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|))(?!px)[a-z%]+$/i;\n\nfunction _getComputedStyle(node) {\n  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');\n  var doc = node.ownerDocument;\n  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {\n    //ie 8 \"magic\" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72\n    getPropertyValue: function getPropertyValue(prop) {\n      var style = node.style;\n      prop = (0, _camelizeStyle.default)(prop);\n      if (prop == 'float') prop = 'styleFloat';\n      var current = node.currentStyle[prop] || null;\n      if (current == null && style && style[prop]) current = style[prop];\n\n      if (rnumnonpx.test(current) && !rposition.test(prop)) {\n        // Remember the original values\n        var left = style.left;\n        var runStyle = node.runtimeStyle;\n        var rsLeft = runStyle && runStyle.left; // Put in the new values to get a computed value out\n\n        if (rsLeft) runStyle.left = node.currentStyle.left;\n        style.left = prop === 'fontSize' ? '1em' : current;\n        current = style.pixelLeft + 'px'; // Revert the changed values\n\n        style.left = left;\n        if (rsLeft) runStyle.left = rsLeft;\n      }\n\n      return current;\n    }\n  };\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/style/getComputedStyle.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/style/index.js":
/*!*************************************************!*\
  !*** ./node_modules/dom-helpers/style/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = style;\n\nvar _camelizeStyle = _interopRequireDefault(__webpack_require__(/*! ../util/camelizeStyle */ \"./node_modules/dom-helpers/util/camelizeStyle.js\"));\n\nvar _hyphenateStyle = _interopRequireDefault(__webpack_require__(/*! ../util/hyphenateStyle */ \"./node_modules/dom-helpers/util/hyphenateStyle.js\"));\n\nvar _getComputedStyle2 = _interopRequireDefault(__webpack_require__(/*! ./getComputedStyle */ \"./node_modules/dom-helpers/style/getComputedStyle.js\"));\n\nvar _removeStyle = _interopRequireDefault(__webpack_require__(/*! ./removeStyle */ \"./node_modules/dom-helpers/style/removeStyle.js\"));\n\nvar _properties = __webpack_require__(/*! ../transition/properties */ \"./node_modules/dom-helpers/transition/properties.js\");\n\nvar _isTransform = _interopRequireDefault(__webpack_require__(/*! ../transition/isTransform */ \"./node_modules/dom-helpers/transition/isTransform.js\"));\n\nfunction style(node, property, value) {\n  var css = '';\n  var transforms = '';\n  var props = property;\n\n  if (typeof property === 'string') {\n    if (value === undefined) {\n      return node.style[(0, _camelizeStyle.default)(property)] || (0, _getComputedStyle2.default)(node).getPropertyValue((0, _hyphenateStyle.default)(property));\n    } else {\n      (props = {})[property] = value;\n    }\n  }\n\n  Object.keys(props).forEach(function (key) {\n    var value = props[key];\n\n    if (!value && value !== 0) {\n      (0, _removeStyle.default)(node, (0, _hyphenateStyle.default)(key));\n    } else if ((0, _isTransform.default)(key)) {\n      transforms += key + \"(\" + value + \") \";\n    } else {\n      css += (0, _hyphenateStyle.default)(key) + \": \" + value + \";\";\n    }\n  });\n\n  if (transforms) {\n    css += _properties.transform + \": \" + transforms + \";\";\n  }\n\n  node.style.cssText += ';' + css;\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/style/index.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/style/removeStyle.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/style/removeStyle.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = removeStyle;\n\nfunction removeStyle(node, key) {\n  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/style/removeStyle.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/transition/isTransform.js":
/*!************************************************************!*\
  !*** ./node_modules/dom-helpers/transition/isTransform.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = isTransform;\nvar supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;\n\nfunction isTransform(property) {\n  return !!(property && supportedTransforms.test(property));\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/transition/isTransform.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/transition/properties.js":
/*!***********************************************************!*\
  !*** ./node_modules/dom-helpers/transition/properties.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = void 0;\n\nvar _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ \"./node_modules/dom-helpers/util/inDOM.js\"));\n\nvar transform = 'transform';\nexports.transform = transform;\nvar prefix, transitionEnd, animationEnd;\nexports.animationEnd = animationEnd;\nexports.transitionEnd = transitionEnd;\nvar transitionProperty, transitionDuration, transitionTiming, transitionDelay;\nexports.transitionDelay = transitionDelay;\nexports.transitionTiming = transitionTiming;\nexports.transitionDuration = transitionDuration;\nexports.transitionProperty = transitionProperty;\nvar animationName, animationDuration, animationTiming, animationDelay;\nexports.animationDelay = animationDelay;\nexports.animationTiming = animationTiming;\nexports.animationDuration = animationDuration;\nexports.animationName = animationName;\n\nif (_inDOM.default) {\n  var _getTransitionPropert = getTransitionProperties();\n\n  prefix = _getTransitionPropert.prefix;\n  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;\n  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;\n  exports.transform = transform = prefix + \"-\" + transform;\n  exports.transitionProperty = transitionProperty = prefix + \"-transition-property\";\n  exports.transitionDuration = transitionDuration = prefix + \"-transition-duration\";\n  exports.transitionDelay = transitionDelay = prefix + \"-transition-delay\";\n  exports.transitionTiming = transitionTiming = prefix + \"-transition-timing-function\";\n  exports.animationName = animationName = prefix + \"-animation-name\";\n  exports.animationDuration = animationDuration = prefix + \"-animation-duration\";\n  exports.animationTiming = animationTiming = prefix + \"-animation-delay\";\n  exports.animationDelay = animationDelay = prefix + \"-animation-timing-function\";\n}\n\nvar _default = {\n  transform: transform,\n  end: transitionEnd,\n  property: transitionProperty,\n  timing: transitionTiming,\n  delay: transitionDelay,\n  duration: transitionDuration\n};\nexports.default = _default;\n\nfunction getTransitionProperties() {\n  var style = document.createElement('div').style;\n  var vendorMap = {\n    O: function O(e) {\n      return \"o\" + e.toLowerCase();\n    },\n    Moz: function Moz(e) {\n      return e.toLowerCase();\n    },\n    Webkit: function Webkit(e) {\n      return \"webkit\" + e;\n    },\n    ms: function ms(e) {\n      return \"MS\" + e;\n    }\n  };\n  var vendors = Object.keys(vendorMap);\n  var transitionEnd, animationEnd;\n  var prefix = '';\n\n  for (var i = 0; i < vendors.length; i++) {\n    var vendor = vendors[i];\n\n    if (vendor + \"TransitionProperty\" in style) {\n      prefix = \"-\" + vendor.toLowerCase();\n      transitionEnd = vendorMap[vendor]('TransitionEnd');\n      animationEnd = vendorMap[vendor]('AnimationEnd');\n      break;\n    }\n  }\n\n  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';\n  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';\n  style = null;\n  return {\n    animationEnd: animationEnd,\n    transitionEnd: transitionEnd,\n    prefix: prefix\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/transition/properties.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/camelize.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/util/camelize.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = camelize;\nvar rHyphen = /-(.)/g;\n\nfunction camelize(string) {\n  return string.replace(rHyphen, function (_, chr) {\n    return chr.toUpperCase();\n  });\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/camelize.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/camelizeStyle.js":
/*!********************************************************!*\
  !*** ./node_modules/dom-helpers/util/camelizeStyle.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = camelizeStyleName;\n\nvar _camelize = _interopRequireDefault(__webpack_require__(/*! ./camelize */ \"./node_modules/dom-helpers/util/camelize.js\"));\n\n/**\n * Copyright 2014-2015, Facebook, Inc.\n * All rights reserved.\n * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js\n */\nvar msPattern = /^-ms-/;\n\nfunction camelizeStyleName(string) {\n  return (0, _camelize.default)(string.replace(msPattern, 'ms-'));\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/camelizeStyle.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/hyphenate.js":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/util/hyphenate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = hyphenate;\nvar rUpper = /([A-Z])/g;\n\nfunction hyphenate(string) {\n  return string.replace(rUpper, '-$1').toLowerCase();\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/hyphenate.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/hyphenateStyle.js":
/*!*********************************************************!*\
  !*** ./node_modules/dom-helpers/util/hyphenateStyle.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = hyphenateStyleName;\n\nvar _hyphenate = _interopRequireDefault(__webpack_require__(/*! ./hyphenate */ \"./node_modules/dom-helpers/util/hyphenate.js\"));\n\n/**\n * Copyright 2013-2014, Facebook, Inc.\n * All rights reserved.\n * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js\n */\nvar msPattern = /^ms-/;\n\nfunction hyphenateStyleName(string) {\n  return (0, _hyphenate.default)(string).replace(msPattern, '-ms-');\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/hyphenateStyle.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/inDOM.js":
/*!************************************************!*\
  !*** ./node_modules/dom-helpers/util/inDOM.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = void 0;\n\nvar _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);\n\nexports.default = _default;\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/inDOM.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/util/scrollbarSize.js":
/*!********************************************************!*\
  !*** ./node_modules/dom-helpers/util/scrollbarSize.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = scrollbarSize;\n\nvar _inDOM = _interopRequireDefault(__webpack_require__(/*! ./inDOM */ \"./node_modules/dom-helpers/util/inDOM.js\"));\n\nvar size;\n\nfunction scrollbarSize(recalc) {\n  if (!size && size !== 0 || recalc) {\n    if (_inDOM.default) {\n      var scrollDiv = document.createElement('div');\n      scrollDiv.style.position = 'absolute';\n      scrollDiv.style.top = '-9999px';\n      scrollDiv.style.width = '50px';\n      scrollDiv.style.height = '50px';\n      scrollDiv.style.overflow = 'scroll';\n      document.body.appendChild(scrollDiv);\n      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;\n      document.body.removeChild(scrollDiv);\n    }\n  }\n\n  return size;\n}\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/dom-helpers/util/scrollbarSize.js?");

/***/ })

}]);