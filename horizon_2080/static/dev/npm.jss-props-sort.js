(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.jss-props-sort"],{

/***/ "./node_modules/jss-props-sort/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/jss-props-sort/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports['default'] = jssPropsSort;\n/**\n * Sort props by length.\n */\nfunction jssPropsSort() {\n  function sort(prop0, prop1) {\n    return prop0.length - prop1.length;\n  }\n\n  function onProcessStyle(style, rule) {\n    if (rule.type !== 'style') return style;\n\n    var newStyle = {};\n    var props = Object.keys(style).sort(sort);\n    for (var prop in props) {\n      newStyle[props[prop]] = style[props[prop]];\n    }\n    return newStyle;\n  }\n\n  return { onProcessStyle: onProcessStyle };\n}\n\n//# sourceURL=webpack:///./node_modules/jss-props-sort/lib/index.js?");

/***/ })

}]);