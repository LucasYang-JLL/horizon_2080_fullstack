(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.jss-vendor-prefixer"],{

/***/ "./node_modules/jss-vendor-prefixer/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/jss-vendor-prefixer/lib/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports['default'] = jssVendorPrefixer;\n\nvar _cssVendor = __webpack_require__(/*! css-vendor */ \"./node_modules/css-vendor/lib/index.js\");\n\nvar vendor = _interopRequireWildcard(_cssVendor);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }\n\n/**\n * Add vendor prefix to a property name when needed.\n *\n * @param {Rule} rule\n * @api public\n */\nfunction jssVendorPrefixer() {\n  function onProcessRule(rule) {\n    if (rule.type === 'keyframes') {\n      rule.key = '@' + vendor.prefix.css + rule.key.substr(1);\n    }\n  }\n\n  function onProcessStyle(style, rule) {\n    if (rule.type !== 'style') return style;\n\n    for (var prop in style) {\n      var value = style[prop];\n\n      var changeProp = false;\n      var supportedProp = vendor.supportedProperty(prop);\n      if (supportedProp && supportedProp !== prop) changeProp = true;\n\n      var changeValue = false;\n      var supportedValue = vendor.supportedValue(supportedProp, value);\n      if (supportedValue && supportedValue !== value) changeValue = true;\n\n      if (changeProp || changeValue) {\n        if (changeProp) delete style[prop];\n        style[supportedProp || prop] = supportedValue || value;\n      }\n    }\n\n    return style;\n  }\n\n  function onChangeValue(value, prop) {\n    return vendor.supportedValue(prop, value);\n  }\n\n  return { onProcessRule: onProcessRule, onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };\n}\n\n//# sourceURL=webpack:///./node_modules/jss-vendor-prefixer/lib/index.js?");

/***/ })

}]);