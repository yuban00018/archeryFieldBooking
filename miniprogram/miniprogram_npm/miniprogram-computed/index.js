module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ComponentWithComputed = ComponentWithComputed;
exports.BehaviorWithComputed = BehaviorWithComputed;

var _behavior = __webpack_require__(2);

exports.behavior = _behavior.behavior;

function ComponentWithComputed(options) {
  if (!Array.isArray(options.behaviors)) {
    options.behaviors = [];
  }

  options.behaviors.unshift(_behavior.behavior);
  return Component(options);
}

function BehaviorWithComputed(options) {
  if (!Array.isArray(options.behaviors)) {
    options.behaviors = [];
  }

  options.behaviors.unshift(_behavior.behavior);
  return Behavior(options);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.behavior = void 0;

var _rfdc = _interopRequireDefault(__webpack_require__(3));

var _fastDeepEqual = _interopRequireDefault(__webpack_require__(4));

var dataPath = _interopRequireWildcard(__webpack_require__(5));

var dataTracer = _interopRequireWildcard(__webpack_require__(6));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/ban-types */
const deepClone = (0, _rfdc.default)({
  proto: true
});
const behavior = Behavior({
  lifetimes: {
    attached() {
      this.setData({
        _computedWatchInit: "attached"
      });
    },

    created() {
      this.setData({
        _computedWatchInit: "created"
      });
    }

  },

  definitionFilter(defFields) {
    const computedDef = defFields.computed;
    const watchDef = defFields.watch;
    const observersItems = [];
    let computedWatchInfo = null;
    observersItems.push({
      fields: "_computedWatchInit",

      observer() {
        const status = this.data._computedWatchInit;

        if (status === "created") {
          // init data fields
          computedWatchInfo = {
            computedUpdaters: [],
            computedRelatedPathValues: {},
            watchCurVal: {}
          }; // handling watch
          // 1. push to initFuncs

          if (watchDef) {
            Object.keys(watchDef).forEach(watchPath => {
              const paths = dataPath.parseMultiDataPaths(watchPath); // record the original value of watch targets

              const curVal = paths.map(({
                path,
                options
              }) => {
                const val = dataPath.getDataOnPath(this.data, path);
                return options.deepCmp ? deepClone(val) : val;
              });
              computedWatchInfo.watchCurVal[watchPath] = curVal;
            });
          }
        } else if (status === "attached") {
          // handling computed
          // 1. push to initFuncs
          // 2. push to computedUpdaters
          if (computedDef) {
            Object.keys(computedDef).forEach(targetField => {
              const updateMethod = computedDef[targetField];
              const relatedPathValuesOnDef = [];
              const val = updateMethod(dataTracer.create(this.data, relatedPathValuesOnDef));
              const pathValues = relatedPathValuesOnDef.map(({
                path
              }) => ({
                path,
                value: dataPath.getDataOnPath(this.data, path)
              })); // here we can do small setDatas
              // because observer handlers will force grouping small setDatas together

              this.setData({
                [targetField]: dataTracer.unwrap(val)
              });
              computedWatchInfo.computedRelatedPathValues[targetField] = pathValues; // will be invoked when setData is called

              const updateValueAndRelatedPaths = () => {
                const oldPathValues = computedWatchInfo.computedRelatedPathValues[targetField];
                let needUpdate = false; // check whether its dependency updated

                for (let i = 0; i < oldPathValues.length; i++) {
                  const {
                    path,
                    value: oldVal
                  } = oldPathValues[i];
                  const curVal = dataPath.getDataOnPath(this.data, path);

                  if (oldVal !== curVal) {
                    needUpdate = true;
                    break;
                  }
                }

                if (!needUpdate) return false;
                const relatedPathValues = [];
                const val = updateMethod(dataTracer.create(this.data, relatedPathValues));
                this.setData({
                  [targetField]: dataTracer.unwrap(val)
                });
                computedWatchInfo.computedRelatedPathValues[targetField] = relatedPathValues;
                return true;
              };

              computedWatchInfo.computedUpdaters.push(updateValueAndRelatedPaths);
            });
          }
        }
      }

    });

    if (computedDef) {
      observersItems.push({
        fields: "**",

        observer() {
          if (!computedWatchInfo) return;
          let changed;

          do {
            changed = computedWatchInfo.computedUpdaters.some(func => func.call(this));
          } while (changed);
        }

      });
    }

    if (watchDef) {
      Object.keys(watchDef).forEach(watchPath => {
        const paths = dataPath.parseMultiDataPaths(watchPath);
        observersItems.push({
          fields: watchPath,

          observer() {
            if (!computedWatchInfo) return;
            const oldVal = computedWatchInfo.watchCurVal[watchPath]; // get new watching field value

            const originalCurValWithOptions = paths.map(({
              path,
              options
            }) => {
              const val = dataPath.getDataOnPath(this.data, path);
              return {
                val,
                options
              };
            });
            const curVal = originalCurValWithOptions.map(({
              val,
              options
            }) => options.deepCmp ? deepClone(val) : val);
            computedWatchInfo.watchCurVal[watchPath] = curVal; // compare

            let changed = false;

            for (let i = 0; i < curVal.length; i++) {
              const options = paths[i].options;
              const deepCmp = options.deepCmp;

              if (deepCmp ? !(0, _fastDeepEqual.default)(oldVal[i], curVal[i]) : oldVal[i] !== curVal[i]) {
                changed = true;
                break;
              }
            } // if changed, update


            if (changed) {
              watchDef[watchPath].apply(this, originalCurValWithOptions.map(({
                val
              }) => val));
            }
          }

        });
      });
    }

    if (typeof defFields.observers !== "object") {
      defFields.observers = {};
    }

    if (Array.isArray(defFields.observers)) {
      defFields.observers.push(...observersItems);
    } else {
      observersItems.forEach(item => {
        // defFields.observers[item.fields] = item.observer
        const f = defFields.observers[item.fields];

        if (!f) {
          defFields.observers[item.fields] = item.observer;
        } else {
          defFields.observers[item.fields] = function () {
            item.observer.call(this);
            f.call(this);
          };
        }
      });
    }
  }

});
exports.behavior = behavior;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("rfdc");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fast-deep-equal");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseMultiDataPaths = parseMultiDataPaths;
exports.getDataOnPath = void 0;
const WHITE_SPACE_CHAR_REGEXP = /^\s/;

const throwParsingError = function (path, index) {
  throw new Error('Parsing data path "' + path + '" failed at char "' + path[index] + '" (index ' + index + ")");
};

const parseArrIndex = function (path, state) {
  const startIndex = state.index;

  while (state.index < state.length) {
    const ch = path[state.index];

    if (/^[0-9]/.test(ch)) {
      state.index++;
      continue;
    }

    break;
  }

  if (startIndex === state.index) {
    throwParsingError(path, state.index);
  }

  return parseInt(path.slice(startIndex, state.index), 10);
};

const parseIdent = function (path, state) {
  const startIndex = state.index;
  const ch = path[startIndex];

  if (/^[_a-zA-Z$]/.test(ch)) {
    state.index++;

    while (state.index < state.length) {
      const ch = path[state.index];

      if (/^[_a-zA-Z0-9$]/.test(ch)) {
        state.index++;
        continue;
      }

      break;
    }
  } else {
    throwParsingError(path, state.index);
  }

  return path.slice(startIndex, state.index);
};

const parseSinglePath = function (path, state) {
  const paths = [parseIdent(path, state)];
  const options = {
    deepCmp: false
  };

  while (state.index < state.length) {
    const ch = path[state.index];

    if (ch === "[") {
      state.index++;
      paths.push(parseArrIndex(path, state));
      const nextCh = path[state.index];
      if (nextCh !== "]") throwParsingError(path, state.index);
      state.index++;
    } else if (ch === ".") {
      state.index++;
      const ch = path[state.index];

      if (ch === "*") {
        state.index++;
        const ch = path[state.index];

        if (ch === "*") {
          state.index++;
          options.deepCmp = true;
          break;
        }

        throwParsingError(path, state.index);
      }

      paths.push(parseIdent(path, state));
    } else {
      break;
    }
  }

  return {
    path: paths,
    options
  };
};

const parseMultiPaths = function (path, state) {
  while (WHITE_SPACE_CHAR_REGEXP.test(path[state.index])) {
    state.index++;
  }

  const ret = [parseSinglePath(path, state)];
  let splitted = false;

  while (state.index < state.length) {
    const ch = path[state.index];

    if (WHITE_SPACE_CHAR_REGEXP.test(ch)) {
      state.index++;
    } else if (ch === ",") {
      splitted = true;
      state.index++;
    } else if (splitted) {
      splitted = false;
      ret.push(parseSinglePath(path, state));
    } else {
      throwParsingError(path, state.index);
    }
  }

  return ret;
};

const parseEOF = function (path, state) {
  if (state.index < state.length) throwParsingError(path, state.index);
};

function parseMultiDataPaths(path) {
  const state = {
    length: path.length,
    index: 0
  };
  const ret = parseMultiPaths(path, state);
  parseEOF(path, state);
  return ret;
}

const getDataOnPath = function (data, path) {
  let ret = data;
  path.forEach(s => {
    if (typeof ret !== "object" || ret === null) ret = undefined;else ret = ret[s];
  });
  return ret;
};

exports.getDataOnPath = getDataOnPath;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.create = create;
exports.unwrap = unwrap;

const wrapData = (data, relatedPathValues, basePath) => {
  if (typeof data !== "object" || data === null) return data;
  const handler = {
    get(obj, key) {
      if (key === "__rawObject__") return data;
      let keyWrapper = null;
      const keyPath = basePath.concat(key);
      const value = data[key];
      relatedPathValues.push({
        path: keyPath,
        value
      });
      keyWrapper = wrapData(value, relatedPathValues, keyPath);
      return keyWrapper;
    }

  };
  const propDef = new Proxy(data, handler);
  return propDef;
};

function create(data, relatedPathValues) {
  return wrapData(data, relatedPathValues, []);
}

function unwrap(wrapped) {
  if (typeof wrapped !== "object" || wrapped === null || typeof wrapped.__rawObject__ !== "object") {
    return wrapped;
  }

  return wrapped.__rawObject__;
}

/***/ })
/******/ ]);