(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.jss-nested"],{

/***/ "./node_modules/jss-nested/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jss-nested/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.default = jssNested;\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/jss-nested/node_modules/warning/browser.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar separatorRegExp = /\\s*,\\s*/g;\nvar parentRegExp = /&/g;\nvar refRegExp = /\\$([\\w-]+)/g;\n\n/**\n * Convert nested rules to separate, remove them from original styles.\n *\n * @param {Rule} rule\n * @api public\n */\nfunction jssNested() {\n  // Get a function to be used for $ref replacement.\n  function getReplaceRef(container) {\n    return function (match, key) {\n      var rule = container.getRule(key);\n      if (rule) return rule.selector;\n      (0, _warning2.default)(false, '[JSS] Could not find the referenced rule %s in %s.', key, container.options.meta || container);\n      return key;\n    };\n  }\n\n  var hasAnd = function hasAnd(str) {\n    return str.indexOf('&') !== -1;\n  };\n\n  function replaceParentRefs(nestedProp, parentProp) {\n    var parentSelectors = parentProp.split(separatorRegExp);\n    var nestedSelectors = nestedProp.split(separatorRegExp);\n\n    var result = '';\n\n    for (var i = 0; i < parentSelectors.length; i++) {\n      var parent = parentSelectors[i];\n\n      for (var j = 0; j < nestedSelectors.length; j++) {\n        var nested = nestedSelectors[j];\n        if (result) result += ', ';\n        // Replace all & by the parent or prefix & with the parent.\n        result += hasAnd(nested) ? nested.replace(parentRegExp, parent) : parent + ' ' + nested;\n      }\n    }\n\n    return result;\n  }\n\n  function getOptions(rule, container, options) {\n    // Options has been already created, now we only increase index.\n    if (options) return _extends({}, options, { index: options.index + 1 });\n\n    var nestingLevel = rule.options.nestingLevel;\n\n    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;\n\n    return _extends({}, rule.options, {\n      nestingLevel: nestingLevel,\n      index: container.indexOf(rule) + 1\n    });\n  }\n\n  function onProcessStyle(style, rule) {\n    if (rule.type !== 'style') return style;\n    var container = rule.options.parent;\n    var options = void 0;\n    var replaceRef = void 0;\n    for (var prop in style) {\n      var isNested = hasAnd(prop);\n      var isNestedConditional = prop[0] === '@';\n\n      if (!isNested && !isNestedConditional) continue;\n\n      options = getOptions(rule, container, options);\n\n      if (isNested) {\n        var selector = replaceParentRefs(prop, rule.selector\n        // Lazily create the ref replacer function just once for\n        // all nested rules within the sheet.\n        );if (!replaceRef) replaceRef = getReplaceRef(container\n        // Replace all $refs.\n        );selector = selector.replace(refRegExp, replaceRef);\n\n        container.addRule(selector, style[prop], _extends({}, options, { selector: selector }));\n      } else if (isNestedConditional) {\n        container\n        // Place conditional right after the parent rule to ensure right ordering.\n        .addRule(prop, null, options).addRule(rule.key, style[prop], { selector: rule.selector });\n      }\n\n      delete style[prop];\n    }\n\n    return style;\n  }\n\n  return { onProcessStyle: onProcessStyle };\n}\n\n//# sourceURL=webpack:///./node_modules/jss-nested/lib/index.js?");

/***/ }),

/***/ "./node_modules/jss-nested/node_modules/warning/browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/jss-nested/node_modules/warning/browser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright 2014-2015, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n\n\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = function() {};\n\nif (true) {\n  warning = function(condition, format, args) {\n    var len = arguments.length;\n    args = new Array(len > 2 ? len - 2 : 0);\n    for (var key = 2; key < len; key++) {\n      args[key - 2] = arguments[key];\n    }\n    if (format === undefined) {\n      throw new Error(\n        '`warning(condition, format, ...args)` requires a warning ' +\n        'message argument'\n      );\n    }\n\n    if (format.length < 10 || (/^[s\\W]*$/).test(format)) {\n      throw new Error(\n        'The warning format should be able to uniquely identify this ' +\n        'warning. Please, use a more descriptive format than: ' + format\n      );\n    }\n\n    if (!condition) {\n      var argIndex = 0;\n      var message = 'Warning: ' +\n        format.replace(/%s/g, function() {\n          return args[argIndex++];\n        });\n      if (typeof console !== 'undefined') {\n        console.error(message);\n      }\n      try {\n        // This error was thrown as a convenience so that you can use this stack\n        // to find the callsite that caused this warning to fire.\n        throw new Error(message);\n      } catch(x) {}\n    }\n  };\n}\n\nmodule.exports = warning;\n\n\n//# sourceURL=webpack:///./node_modules/jss-nested/node_modules/warning/browser.js?");

/***/ })

}]);