(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.intl-relativeformat"],{

/***/ "./node_modules/intl-relativeformat/index.js":
/*!***************************************************!*\
  !*** ./node_modules/intl-relativeformat/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* jshint node:true */\n\n\n\nvar IntlRelativeFormat = __webpack_require__(/*! ./lib/main */ \"./node_modules/intl-relativeformat/lib/main.js\")['default'];\n\n// Add all locale data to `IntlRelativeFormat`. This module will be ignored when\n// bundling for the browser with Browserify/Webpack.\n__webpack_require__(/*! ./lib/locales */ 2);\n\n// Re-export `IntlRelativeFormat` as the CommonJS default exports with all the\n// locale data registered, and with English set as the default locale. Define\n// the `default` prop for use with other compiled ES6 Modules.\nexports = module.exports = IntlRelativeFormat;\nexports['default'] = exports;\n\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/index.js?");

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/core.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-relativeformat/lib/core.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nCopyright (c) 2014, Yahoo! Inc. All rights reserved.\nCopyrights licensed under the New BSD License.\nSee the accompanying LICENSE file for terms.\n*/\n\n/* jslint esnext: true */\n\n\nvar intl$messageformat$$ = __webpack_require__(/*! intl-messageformat */ \"./node_modules/intl-messageformat/index.js\"), src$diff$$ = __webpack_require__(/*! ./diff */ \"./node_modules/intl-relativeformat/lib/diff.js\"), src$es5$$ = __webpack_require__(/*! ./es5 */ \"./node_modules/intl-relativeformat/lib/es5.js\");\nexports[\"default\"] = RelativeFormat;\n\n// -----------------------------------------------------------------------------\n\nvar FIELDS = [\n    'second', 'second-short',\n    'minute', 'minute-short',\n    'hour', 'hour-short',\n    'day', 'day-short',\n    'month', 'month-short',\n    'year', 'year-short'\n];\nvar STYLES = ['best fit', 'numeric'];\n\n// -- RelativeFormat -----------------------------------------------------------\n\nfunction RelativeFormat(locales, options) {\n    options = options || {};\n\n    // Make a copy of `locales` if it's an array, so that it doesn't change\n    // since it's used lazily.\n    if (src$es5$$.isArray(locales)) {\n        locales = locales.concat();\n    }\n\n    src$es5$$.defineProperty(this, '_locale', {value: this._resolveLocale(locales)});\n    src$es5$$.defineProperty(this, '_options', {value: {\n        style: this._resolveStyle(options.style),\n        units: this._isValidUnits(options.units) && options.units\n    }});\n\n    src$es5$$.defineProperty(this, '_locales', {value: locales});\n    src$es5$$.defineProperty(this, '_fields', {value: this._findFields(this._locale)});\n    src$es5$$.defineProperty(this, '_messages', {value: src$es5$$.objCreate(null)});\n\n    // \"Bind\" `format()` method to `this` so it can be passed by reference like\n    // the other `Intl` APIs.\n    var relativeFormat = this;\n    this.format = function format(date, options) {\n        return relativeFormat._format(date, options);\n    };\n}\n\n// Define internal private properties for dealing with locale data.\nsrc$es5$$.defineProperty(RelativeFormat, '__localeData__', {value: src$es5$$.objCreate(null)});\nsrc$es5$$.defineProperty(RelativeFormat, '__addLocaleData', {value: function (data) {\n    if (!(data && data.locale)) {\n        throw new Error(\n            'Locale data provided to IntlRelativeFormat is missing a ' +\n            '`locale` property value'\n        );\n    }\n\n    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;\n\n    // Add data to IntlMessageFormat.\n    intl$messageformat$$[\"default\"].__addLocaleData(data);\n}});\n\n// Define public `defaultLocale` property which can be set by the developer, or\n// it will be set when the first RelativeFormat instance is created by\n// leveraging the resolved locale from `Intl`.\nsrc$es5$$.defineProperty(RelativeFormat, 'defaultLocale', {\n    enumerable: true,\n    writable  : true,\n    value     : undefined\n});\n\n// Define public `thresholds` property which can be set by the developer, and\n// defaults to relative time thresholds from moment.js.\nsrc$es5$$.defineProperty(RelativeFormat, 'thresholds', {\n    enumerable: true,\n\n    value: {\n        second: 45, 'second-short': 45,  // seconds to minute\n        minute: 45, 'minute-short': 45, // minutes to hour\n        hour  : 22, 'hour-short': 22, // hours to day\n        day   : 26, 'day-short': 26, // days to month\n        month : 11, 'month-short': 11 // months to year\n    }\n});\n\nRelativeFormat.prototype.resolvedOptions = function () {\n    return {\n        locale: this._locale,\n        style : this._options.style,\n        units : this._options.units\n    };\n};\n\nRelativeFormat.prototype._compileMessage = function (units) {\n    // `this._locales` is the original set of locales the user specified to the\n    // constructor, while `this._locale` is the resolved root locale.\n    var locales        = this._locales;\n    var resolvedLocale = this._locale;\n\n    var field        = this._fields[units];\n    var relativeTime = field.relativeTime;\n    var future       = '';\n    var past         = '';\n    var i;\n\n    for (i in relativeTime.future) {\n        if (relativeTime.future.hasOwnProperty(i)) {\n            future += ' ' + i + ' {' +\n                relativeTime.future[i].replace('{0}', '#') + '}';\n        }\n    }\n\n    for (i in relativeTime.past) {\n        if (relativeTime.past.hasOwnProperty(i)) {\n            past += ' ' + i + ' {' +\n                relativeTime.past[i].replace('{0}', '#') + '}';\n        }\n    }\n\n    var message = '{when, select, future {{0, plural, ' + future + '}}' +\n                                 'past {{0, plural, ' + past + '}}}';\n\n    // Create the synthetic IntlMessageFormat instance using the original\n    // locales value specified by the user when constructing the the parent\n    // IntlRelativeFormat instance.\n    return new intl$messageformat$$[\"default\"](message, locales);\n};\n\nRelativeFormat.prototype._getMessage = function (units) {\n    var messages = this._messages;\n\n    // Create a new synthetic message based on the locale data from CLDR.\n    if (!messages[units]) {\n        messages[units] = this._compileMessage(units);\n    }\n\n    return messages[units];\n};\n\nRelativeFormat.prototype._getRelativeUnits = function (diff, units) {\n    var field = this._fields[units];\n\n    if (field.relative) {\n        return field.relative[diff];\n    }\n};\n\nRelativeFormat.prototype._findFields = function (locale) {\n    var localeData = RelativeFormat.__localeData__;\n    var data       = localeData[locale.toLowerCase()];\n\n    // The locale data is de-duplicated, so we have to traverse the locale's\n    // hierarchy until we find `fields` to return.\n    while (data) {\n        if (data.fields) {\n            return data.fields;\n        }\n\n        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];\n    }\n\n    throw new Error(\n        'Locale data added to IntlRelativeFormat is missing `fields` for :' +\n        locale\n    );\n};\n\nRelativeFormat.prototype._format = function (date, options) {\n    var now = options && options.now !== undefined ? options.now : src$es5$$.dateNow();\n\n    if (date === undefined) {\n        date = now;\n    }\n\n    // Determine if the `date` and optional `now` values are valid, and throw a\n    // similar error to what `Intl.DateTimeFormat#format()` would throw.\n    if (!isFinite(now)) {\n        throw new RangeError(\n            'The `now` option provided to IntlRelativeFormat#format() is not ' +\n            'in valid range.'\n        );\n    }\n\n    if (!isFinite(date)) {\n        throw new RangeError(\n            'The date value provided to IntlRelativeFormat#format() is not ' +\n            'in valid range.'\n        );\n    }\n\n    var diffReport  = src$diff$$[\"default\"](now, date);\n    var units       = this._options.units || this._selectUnits(diffReport);\n    var diffInUnits = diffReport[units];\n\n    if (this._options.style !== 'numeric') {\n        var relativeUnits = this._getRelativeUnits(diffInUnits, units);\n        if (relativeUnits) {\n            return relativeUnits;\n        }\n    }\n\n    return this._getMessage(units).format({\n        '0' : Math.abs(diffInUnits),\n        when: diffInUnits < 0 ? 'past' : 'future'\n    });\n};\n\nRelativeFormat.prototype._isValidUnits = function (units) {\n    if (!units || src$es5$$.arrIndexOf.call(FIELDS, units) >= 0) {\n        return true;\n    }\n\n    if (typeof units === 'string') {\n        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);\n        if (suggestion && src$es5$$.arrIndexOf.call(FIELDS, suggestion) >= 0) {\n            throw new Error(\n                '\"' + units + '\" is not a valid IntlRelativeFormat `units` ' +\n                'value, did you mean: ' + suggestion\n            );\n        }\n    }\n\n    throw new Error(\n        '\"' + units + '\" is not a valid IntlRelativeFormat `units` value, it ' +\n        'must be one of: \"' + FIELDS.join('\", \"') + '\"'\n    );\n};\n\nRelativeFormat.prototype._resolveLocale = function (locales) {\n    if (typeof locales === 'string') {\n        locales = [locales];\n    }\n\n    // Create a copy of the array so we can push on the default locale.\n    locales = (locales || []).concat(RelativeFormat.defaultLocale);\n\n    var localeData = RelativeFormat.__localeData__;\n    var i, len, localeParts, data;\n\n    // Using the set of locales + the default locale, we look for the first one\n    // which that has been registered. When data does not exist for a locale, we\n    // traverse its ancestors to find something that's been registered within\n    // its hierarchy of locales. Since we lack the proper `parentLocale` data\n    // here, we must take a naive approach to traversal.\n    for (i = 0, len = locales.length; i < len; i += 1) {\n        localeParts = locales[i].toLowerCase().split('-');\n\n        while (localeParts.length) {\n            data = localeData[localeParts.join('-')];\n            if (data) {\n                // Return the normalized locale string; e.g., we return \"en-US\",\n                // instead of \"en-us\".\n                return data.locale;\n            }\n\n            localeParts.pop();\n        }\n    }\n\n    var defaultLocale = locales.pop();\n    throw new Error(\n        'No locale data has been added to IntlRelativeFormat for: ' +\n        locales.join(', ') + ', or the default locale: ' + defaultLocale\n    );\n};\n\nRelativeFormat.prototype._resolveStyle = function (style) {\n    // Default to \"best fit\" style.\n    if (!style) {\n        return STYLES[0];\n    }\n\n    if (src$es5$$.arrIndexOf.call(STYLES, style) >= 0) {\n        return style;\n    }\n\n    throw new Error(\n        '\"' + style + '\" is not a valid IntlRelativeFormat `style` value, it ' +\n        'must be one of: \"' + STYLES.join('\", \"') + '\"'\n    );\n};\n\nRelativeFormat.prototype._selectUnits = function (diffReport) {\n    var i, l, units;\n    var fields = FIELDS.filter(function(field) {\n        return field.indexOf('-short') < 1;\n    });\n\n    for (i = 0, l = fields.length; i < l; i += 1) {\n        units = fields[i];\n\n        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {\n            break;\n        }\n    }\n\n    return units;\n};\n\n//# sourceMappingURL=core.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/lib/core.js?");

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/diff.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-relativeformat/lib/diff.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nCopyright (c) 2014, Yahoo! Inc. All rights reserved.\nCopyrights licensed under the New BSD License.\nSee the accompanying LICENSE file for terms.\n*/\n\n/* jslint esnext: true */\n\n\n\nvar round = Math.round;\n\nfunction daysToYears(days) {\n    // 400 years have 146097 days (taking into account leap year rules)\n    return days * 400 / 146097;\n}\n\nexports[\"default\"] = function (from, to) {\n    // Convert to ms timestamps.\n    from = +from;\n    to   = +to;\n\n    var millisecond = round(to - from),\n        second      = round(millisecond / 1000),\n        minute      = round(second / 60),\n        hour        = round(minute / 60),\n        day         = round(hour / 24),\n        week        = round(day / 7);\n\n    var rawYears = daysToYears(day),\n        month    = round(rawYears * 12),\n        year     = round(rawYears);\n\n    return {\n        millisecond    : millisecond,\n        second         : second,\n        'second-short' : second,\n        minute         : minute,\n        'minute-short' : minute,\n        hour           : hour,\n        'hour-short'   : hour,\n        day            : day,\n        'day-short'    : day,\n        week           : week,\n        'week-short'   : week,\n        month          : month,\n        'month-short'  : month,\n        year           : year,\n        'year-short'   : year\n    };\n};\n\n//# sourceMappingURL=diff.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/lib/diff.js?");

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/en.js":
/*!****************************************************!*\
  !*** ./node_modules/intl-relativeformat/lib/en.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// GENERATED FILE\n\nexports[\"default\"] = {\"locale\":\"en\",\"pluralRuleFunction\":function (n,ord){var s=String(n).split(\".\"),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?\"one\":n10==2&&n100!=12?\"two\":n10==3&&n100!=13?\"few\":\"other\";return n==1&&v0?\"one\":\"other\"},\"fields\":{\"year\":{\"displayName\":\"year\",\"relative\":{\"0\":\"this year\",\"1\":\"next year\",\"-1\":\"last year\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} year\",\"other\":\"in {0} years\"},\"past\":{\"one\":\"{0} year ago\",\"other\":\"{0} years ago\"}}},\"year-short\":{\"displayName\":\"yr.\",\"relative\":{\"0\":\"this yr.\",\"1\":\"next yr.\",\"-1\":\"last yr.\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} yr.\",\"other\":\"in {0} yr.\"},\"past\":{\"one\":\"{0} yr. ago\",\"other\":\"{0} yr. ago\"}}},\"month\":{\"displayName\":\"month\",\"relative\":{\"0\":\"this month\",\"1\":\"next month\",\"-1\":\"last month\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} month\",\"other\":\"in {0} months\"},\"past\":{\"one\":\"{0} month ago\",\"other\":\"{0} months ago\"}}},\"month-short\":{\"displayName\":\"mo.\",\"relative\":{\"0\":\"this mo.\",\"1\":\"next mo.\",\"-1\":\"last mo.\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} mo.\",\"other\":\"in {0} mo.\"},\"past\":{\"one\":\"{0} mo. ago\",\"other\":\"{0} mo. ago\"}}},\"day\":{\"displayName\":\"day\",\"relative\":{\"0\":\"today\",\"1\":\"tomorrow\",\"-1\":\"yesterday\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} day\",\"other\":\"in {0} days\"},\"past\":{\"one\":\"{0} day ago\",\"other\":\"{0} days ago\"}}},\"day-short\":{\"displayName\":\"day\",\"relative\":{\"0\":\"today\",\"1\":\"tomorrow\",\"-1\":\"yesterday\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} day\",\"other\":\"in {0} days\"},\"past\":{\"one\":\"{0} day ago\",\"other\":\"{0} days ago\"}}},\"hour\":{\"displayName\":\"hour\",\"relative\":{\"0\":\"this hour\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} hour\",\"other\":\"in {0} hours\"},\"past\":{\"one\":\"{0} hour ago\",\"other\":\"{0} hours ago\"}}},\"hour-short\":{\"displayName\":\"hr.\",\"relative\":{\"0\":\"this hour\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} hr.\",\"other\":\"in {0} hr.\"},\"past\":{\"one\":\"{0} hr. ago\",\"other\":\"{0} hr. ago\"}}},\"minute\":{\"displayName\":\"minute\",\"relative\":{\"0\":\"this minute\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} minute\",\"other\":\"in {0} minutes\"},\"past\":{\"one\":\"{0} minute ago\",\"other\":\"{0} minutes ago\"}}},\"minute-short\":{\"displayName\":\"min.\",\"relative\":{\"0\":\"this minute\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} min.\",\"other\":\"in {0} min.\"},\"past\":{\"one\":\"{0} min. ago\",\"other\":\"{0} min. ago\"}}},\"second\":{\"displayName\":\"second\",\"relative\":{\"0\":\"now\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} second\",\"other\":\"in {0} seconds\"},\"past\":{\"one\":\"{0} second ago\",\"other\":\"{0} seconds ago\"}}},\"second-short\":{\"displayName\":\"sec.\",\"relative\":{\"0\":\"now\"},\"relativeTime\":{\"future\":{\"one\":\"in {0} sec.\",\"other\":\"in {0} sec.\"},\"past\":{\"one\":\"{0} sec. ago\",\"other\":\"{0} sec. ago\"}}}}};\n\n//# sourceMappingURL=en.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/lib/en.js?");

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/es5.js":
/*!*****************************************************!*\
  !*** ./node_modules/intl-relativeformat/lib/es5.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nCopyright (c) 2014, Yahoo! Inc. All rights reserved.\nCopyrights licensed under the New BSD License.\nSee the accompanying LICENSE file for terms.\n*/\n\n/* jslint esnext: true */\n\n// Purposely using the same implementation as the Intl.js `Intl` polyfill.\n// Copyright 2013 Andy Earnshaw, MIT License\n\n\n\nvar hop = Object.prototype.hasOwnProperty;\nvar toString = Object.prototype.toString;\n\nvar realDefineProp = (function () {\n    try { return !!Object.defineProperty({}, 'a', {}); }\n    catch (e) { return false; }\n})();\n\nvar es3 = !realDefineProp && !Object.prototype.__defineGetter__;\n\nvar defineProperty = realDefineProp ? Object.defineProperty :\n        function (obj, name, desc) {\n\n    if ('get' in desc && obj.__defineGetter__) {\n        obj.__defineGetter__(name, desc.get);\n    } else if (!hop.call(obj, name) || 'value' in desc) {\n        obj[name] = desc.value;\n    }\n};\n\nvar objCreate = Object.create || function (proto, props) {\n    var obj, k;\n\n    function F() {}\n    F.prototype = proto;\n    obj = new F();\n\n    for (k in props) {\n        if (hop.call(props, k)) {\n            defineProperty(obj, k, props[k]);\n        }\n    }\n\n    return obj;\n};\n\nvar arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {\n    /*jshint validthis:true */\n    var arr = this;\n    if (!arr.length) {\n        return -1;\n    }\n\n    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {\n        if (arr[i] === search) {\n            return i;\n        }\n    }\n\n    return -1;\n};\n\nvar isArray = Array.isArray || function (obj) {\n    return toString.call(obj) === '[object Array]';\n};\n\nvar dateNow = Date.now || function () {\n    return new Date().getTime();\n};\n\nexports.defineProperty = defineProperty, exports.objCreate = objCreate, exports.arrIndexOf = arrIndexOf, exports.isArray = isArray, exports.dateNow = dateNow;\n\n//# sourceMappingURL=es5.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/lib/es5.js?");

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/main.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-relativeformat/lib/main.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* jslint esnext: true */\n\n\nvar src$core$$ = __webpack_require__(/*! ./core */ \"./node_modules/intl-relativeformat/lib/core.js\"), src$en$$ = __webpack_require__(/*! ./en */ \"./node_modules/intl-relativeformat/lib/en.js\");\n\nsrc$core$$[\"default\"].__addLocaleData(src$en$$[\"default\"]);\nsrc$core$$[\"default\"].defaultLocale = 'en';\n\nexports[\"default\"] = src$core$$[\"default\"];\n\n//# sourceMappingURL=main.js.map\n\n//# sourceURL=webpack:///./node_modules/intl-relativeformat/lib/main.js?");

/***/ })

}]);