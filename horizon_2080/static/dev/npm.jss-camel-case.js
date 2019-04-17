(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.jss-camel-case"],{

/***/ "./node_modules/jss-camel-case/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/jss-camel-case/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports['default'] = camelCase;\n\nvar _hyphenateStyleName = __webpack_require__(/*! hyphenate-style-name */ \"./node_modules/hyphenate-style-name/index.js\");\n\nvar _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n/**\n * Convert camel cased property names to dash separated.\n *\n * @param {Object} style\n * @return {Object}\n */\nfunction convertCase(style) {\n  var converted = {};\n\n  for (var prop in style) {\n    converted[(0, _hyphenateStyleName2['default'])(prop)] = style[prop];\n  }\n\n  if (style.fallbacks) {\n    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);\n  }\n\n  return converted;\n}\n\n/**\n * Allow camel cased property names by converting them back to dasherized.\n *\n * @param {Rule} rule\n */\nfunction camelCase() {\n  function onProcessStyle(style) {\n    if (Array.isArray(style)) {\n      // Handle rules like @font-face, which can have multiple styles in an array\n      for (var index = 0; index < style.length; index++) {\n        style[index] = convertCase(style[index]);\n      }\n      return style;\n    }\n\n    return convertCase(style);\n  }\n\n  function onChangeValue(value, prop, rule) {\n    var hyphenatedProp = (0, _hyphenateStyleName2['default'])(prop);\n\n    // There was no camel case in place\n    if (prop === hyphenatedProp) return value;\n\n    rule.prop(hyphenatedProp, value);\n\n    // Core will ignore that property value we set the proper one above.\n    return null;\n  }\n\n  return { onProcessStyle: onProcessStyle, onChangeValue: onChangeValue };\n}\n\n//# sourceURL=webpack:///./node_modules/jss-camel-case/lib/index.js?");

/***/ })

}]);