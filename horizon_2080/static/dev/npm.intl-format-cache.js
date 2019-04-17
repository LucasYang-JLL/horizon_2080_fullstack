(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.intl-format-cache"],{

/***/ "./node_modules/intl-format-cache/index.js":
/*!*************************************************!*\
  !*** ./node_modules/intl-format-cache/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports = module.exports = __webpack_require__(/*! ./lib/memoizer */ \"./node_modules/intl-format-cache/lib/memoizer.js\")['default'];\nexports['default'] = exports;\n\n\n//# sourceURL=webpack:///./node_modules/intl-format-cache/index.js?");

/***/ }),

/***/ "./node_modules/intl-format-cache/lib/es5.js":
/*!***************************************************!*\
  !*** ./node_modules/intl-format-cache/lib/es5.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nCopyright (c) 2014, Yahoo! Inc. All rights reserved.\nCopyrights licensed under the New BSD License.\nSee the accompanying LICENSE file for terms.\n*/\n\n/* jslint esnext: true */\n\n// Function.prototype.bind implementation from Mozilla Developer Network:\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill\n\n\n\nvar bind = Function.prototype.bind || function (oThis) {\n    if (typeof this !== 'function') {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');\n    }\n\n    var aArgs   = Array.prototype.slice.call(arguments, 1),\n        fToBind = this,\n        fNOP    = function() {},\n        fBound  = function() {\n          return fToBind.apply(this instanceof fNOP\n                 ? this\n                 : oThis,\n                 aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    if (this.prototype) {\n      // native functions don't have a prototype\n      fNOP.prototype = this.prototype;\n    }\n    fBound.prototype = new fNOP();\n\n    return fBound;\n};\n\n// Purposely using the same implementation as the Intl.js `Intl` polyfill.\n// Copyright 2013 Andy Earnshaw, MIT License\n\nvar hop = Object.prototype.hasOwnProperty;\n\nvar realDefineProp = (function () {\n    try { return !!Object.defineProperty({}, 'a', {}); }\n    catch (e) { return false; }\n})();\n\nvar es3 = !realDefineProp && !Object.prototype.__defineGetter__;\n\nvar defineProperty = realDefineProp ? Object.defineProperty :\n        function (obj, name, desc) {\n\n    if ('get' in desc && obj.__defineGetter__) {\n        obj.__defineGetter__(name, desc.get);\n    } else if (!hop.call(obj, name) || 'value' in desc) {\n        obj[name] = desc.value;\n    }\n};\n\nvar objCreate = Object.create || function (proto, props) {\n    var obj, k;\n\n    function F() {}\n    F.prototype = proto;\n    obj = new F();\n\n    for (k in props) {\n        if (hop.call(props, k)) {\n            defineProperty(obj, k, props[k]);\n        }\n    }\n\n    return obj;\n};\n\nexports.bind = bind, exports.defineProperty = defineProperty, exports.objCreate = objCreate;\n\n//# sourceMappingURL=es5.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-format-cache/lib/es5.js?");

/***/ }),

/***/ "./node_modules/intl-format-cache/lib/memoizer.js":
/*!********************************************************!*\
  !*** ./node_modules/intl-format-cache/lib/memoizer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nCopyright (c) 2014, Yahoo! Inc. All rights reserved.\nCopyrights licensed under the New BSD License.\nSee the accompanying LICENSE file for terms.\n*/\n\n/* jshint esnext: true */\n\n\nvar src$es5$$ = __webpack_require__(/*! ./es5 */ \"./node_modules/intl-format-cache/lib/es5.js\");\nexports[\"default\"] = createFormatCache;\n\n// -----------------------------------------------------------------------------\n\nfunction createFormatCache(FormatConstructor) {\n    var cache = src$es5$$.objCreate(null);\n\n    return function () {\n        var args    = Array.prototype.slice.call(arguments);\n        var cacheId = getCacheId(args);\n        var format  = cacheId && cache[cacheId];\n\n        if (!format) {\n            format = new (src$es5$$.bind.apply(FormatConstructor, [null].concat(args)))();\n\n            if (cacheId) {\n                cache[cacheId] = format;\n            }\n        }\n\n        return format;\n    };\n}\n\n// -- Utilities ----------------------------------------------------------------\n\nfunction getCacheId(inputs) {\n    // When JSON is not available in the runtime, we will not create a cache id.\n    if (typeof JSON === 'undefined') { return; }\n\n    var cacheId = [];\n\n    var i, len, input;\n\n    for (i = 0, len = inputs.length; i < len; i += 1) {\n        input = inputs[i];\n\n        if (input && typeof input === 'object') {\n            cacheId.push(orderedProps(input));\n        } else {\n            cacheId.push(input);\n        }\n    }\n\n    return JSON.stringify(cacheId);\n}\n\nfunction orderedProps(obj) {\n    var props = [],\n        keys  = [];\n\n    var key, i, len, prop;\n\n    for (key in obj) {\n        if (obj.hasOwnProperty(key)) {\n            keys.push(key);\n        }\n    }\n\n    var orderedKeys = keys.sort();\n\n    for (i = 0, len = orderedKeys.length; i < len; i += 1) {\n        key  = orderedKeys[i];\n        prop = {};\n\n        prop[key] = obj[key];\n        props[i]  = prop;\n    }\n\n    return props;\n}\n\n//# sourceMappingURL=memoizer.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-format-cache/lib/memoizer.js?");

/***/ })

}]);