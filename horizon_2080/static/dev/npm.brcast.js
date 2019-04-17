(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.brcast"],{

/***/ "./node_modules/brcast/dist/brcast.es.js":
/*!***********************************************!*\
  !*** ./node_modules/brcast/dist/brcast.es.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createBroadcast (initialState) {\n  var listeners = {};\n  var id = 1;\n  var _state = initialState;\n\n  function getState () {\n    return _state\n  }\n\n  function setState (state) {\n    _state = state;\n    var keys = Object.keys(listeners);\n    var i = 0;\n    var len = keys.length;\n    for (; i < len; i++) {\n      // if a listener gets unsubscribed during setState we just skip it\n      if (listeners[keys[i]]) { listeners[keys[i]](state); }\n    }\n  }\n\n  // subscribe to changes and return the subscriptionId\n  function subscribe (listener) {\n    if (typeof listener !== 'function') {\n      throw new Error('listener must be a function.')\n    }\n    var currentId = id;\n    listeners[currentId] = listener;\n    id += 1;\n    return currentId\n  }\n\n  // remove subscription by removing the listener function\n  function unsubscribe (id) {\n    listeners[id] = undefined;\n  }\n\n  return { getState: getState, setState: setState, subscribe: subscribe, unsubscribe: unsubscribe }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createBroadcast);\n\n\n//# sourceURL=webpack:///./node_modules/brcast/dist/brcast.es.js?");

/***/ })

}]);