/*
Copyright (c) 2019 Daybrush
name: @scena/guides
license: MIT
author: Protopie
repository: git+https://github.com/ProtoPie/guides.git
version: 0.18.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
    (global = global || self, global.Guides = factory(global.React, global.reactDom));
}(this, (function (React, reactDom) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.10.0
    */
    /**
    * get string "function"
    * @memberof Consts
    * @example
    import {FUNCTION} from "@daybrush/utils";

    console.log(FUNCTION); // "function"
    */

    var FUNCTION = "function";
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    var OPEN_CLOSED_CHARACTERS = [{
      open: "(",
      close: ")"
    }, {
      open: "\"",
      close: "\""
    }, {
      open: "'",
      close: "'"
    }, {
      open: "\\\"",
      close: "\\\""
    }, {
      open: "\\'",
      close: "\\'"
    }];
    var TINY_NUM = 0.0000001;
    var DEFAULT_UNIT_PRESETS = {
      "cm": function (pos) {
        return pos * 96 / 2.54;
      },
      "mm": function (pos) {
        return pos * 96 / 254;
      },
      "in": function (pos) {
        return pos * 96;
      },
      "pt": function (pos) {
        return pos * 96 / 72;
      },
      "pc": function (pos) {
        return pos * 96 / 6;
      },
      "%": function (pos, size) {
        return pos * size / 100;
      },
      "vw": function (pos, size) {
        if (size === void 0) {
          size = window.innerWidth;
        }

        return pos / 100 * size;
      },
      "vh": function (pos, size) {
        if (size === void 0) {
          size = window.innerHeight;
        }

        return pos / 100 * size;
      },
      "vmax": function (pos, size) {
        if (size === void 0) {
          size = Math.max(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      },
      "vmin": function (pos, size) {
        if (size === void 0) {
          size = Math.min(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      }
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __spreadArrays$1() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject(value) {
      return value && typeof value === OBJECT;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString(value) {
      return typeof value === STRING;
    }
    /**
    * Check the type that the value is function.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isFunction} from "@daybrush/utils";

    console.log(isFunction(function a() {})); // true
    console.log(isFunction(() => {})); // true
    console.log(isFunction("1234")); // false
    console.log(isFunction(1)); // false
    console.log(isFunction(null)); // false
    */

    function isFunction(value) {
      return typeof value === FUNCTION;
    }

    function isEqualSeparator(character, separator) {
      var isCharacterSpace = character === "" || character == " ";
      var isSeparatorSpace = separator === "" || separator == " ";
      return isSeparatorSpace && isCharacterSpace || character === separator;
    }

    function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
      var isIgnore = findIgnore(openCharacter, texts, index);

      if (!isIgnore) {
        return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
      }

      return index;
    }

    function findIgnore(character, texts, index) {
      if (!character.ignore) {
        return null;
      }

      var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
      return new RegExp(character.ignore).exec(otherText);
    }

    function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
      var _loop_1 = function (i) {
        var character = texts[i].trim();

        if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) {
          return {
            value: i
          };
        }

        var nextIndex = i; // re open

        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });

        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
        }

        if (nextIndex === -1) {
          return out_i_1 = i, "break";
        }

        i = nextIndex;
        out_i_1 = i;
      };

      var out_i_1;

      for (var i = index; i < length; ++i) {
        var state_1 = _loop_1(i);

        i = out_i_1;
        if (typeof state_1 === "object") return state_1.value;
        if (state_1 === "break") break;
      }

      return -1;
    }

    function splitText(text, splitOptions) {
      var _a = isString(splitOptions) ? {
        separator: splitOptions
      } : splitOptions,
          _b = _a.separator,
          separator = _b === void 0 ? "," : _b,
          isSeparateFirst = _a.isSeparateFirst,
          isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose,
          _c = _a.isSeparateOpenClose,
          isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c,
          _d = _a.openCloseCharacters,
          openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;

      var openClosedText = openCloseCharacters.map(function (_a) {
        var open = _a.open,
            close = _a.close;

        if (open === close) {
          return open;
        }

        return open + "|" + close;
      }).join("|");
      var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      function resetTemp() {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
          return true;
        }

        return false;
      }

      var _loop_2 = function (i) {
        var character = texts[i].trim();
        var nextIndex = i;
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        var closeCharacter = find(openCloseCharacters, function (_a) {
          var close = _a.close;
          return close === character;
        });

        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);

          if (nextIndex !== -1 && isSeparateOpenClose) {
            if (resetTemp() && isSeparateFirst) {
              return out_i_2 = i, "break";
            }

            values.push(texts.slice(i, nextIndex + 1).join(""));
            i = nextIndex;

            if (isSeparateFirst) {
              return out_i_2 = i, "break";
            }

            return out_i_2 = i, "continue";
          }
        } else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
          var nextOpenCloseCharacters = __spreadArrays$1(openCloseCharacters);

          nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
          return {
            value: splitText(text, {
              separator: separator,
              isSeparateFirst: isSeparateFirst,
              isSeparateOnlyOpenClose: isSeparateOnlyOpenClose,
              isSeparateOpenClose: isSeparateOpenClose,
              openCloseCharacters: nextOpenCloseCharacters
            })
          };
        } else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
          resetTemp();

          if (isSeparateFirst) {
            return out_i_2 = i, "break";
          }

          return out_i_2 = i, "continue";
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
        out_i_2 = i;
      };

      var out_i_2;

      for (var i = 0; i < length; ++i) {
        var state_2 = _loop_2(i);

        i = out_i_2;
        if (typeof state_2 === "object") return state_2.value;
        if (state_2 === "break") break;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitSpace(text) {
      // divide comma(space)
      return splitText(text, "");
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */

    function splitBracket(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */

    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */

    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */

    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }

      return defaultIndex;
    }
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */

    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
    }
    /**
    * convert unit size to px size
    * @function
    * @memberof Utils
    */

    function convertUnitSize(pos, size) {
      var _a = splitUnit(pos),
          value = _a.value,
          unit = _a.unit;

      if (isObject(size)) {
        var sizeFunction = size[unit];

        if (sizeFunction) {
          if (isFunction(sizeFunction)) {
            return sizeFunction(value);
          } else if (DEFAULT_UNIT_PRESETS[unit]) {
            return DEFAULT_UNIT_PRESETS[unit](value, sizeFunction);
          }
        }
      } else if (unit === "%") {
        return value * size / 100;
      }

      if (DEFAULT_UNIT_PRESETS[unit]) {
        return DEFAULT_UNIT_PRESETS[unit](value);
      }

      return value;
    }
    /**
    * throttle number depending on the unit.
    * @function
    * @memberof Utils
    */

    function throttle(num, unit) {
      if (!unit) {
        return num;
      }

      var reverseUnit = 1 / unit;
      return Math.round(num / unit) / reverseUnit;
    }
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */

    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Removes the specified class value.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to remove
    * @example
    import {removeClass} from "@daybrush/utils";

    removeClass(element, "start");
    */

    function removeClass(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
      }
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener.
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @param - An options object that specifies characteristics about the event listener.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener, options) {
      el.removeEventListener(type, listener, options);
    }
<<<<<<< HEAD
=======
    //# sourceMappingURL=utils.esm.js.map
>>>>>>> 9918c9e0e0a5851978cd2e06cfb34e08ded303af

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/event-emitter
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.5
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };
    function __spreadArrays$2() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * Implement EventEmitter on object or component.
     */

    var EventEmitter =
    /*#__PURE__*/
    function () {
      function EventEmitter() {
        this._events = {};
      }
      /**
       * Add a listener to the registered event.
       * @param - Name of the event to be added
       * @param - listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add listener in "a" event
       * emitter.on("a", () => {
       * });
       * // Add listeners
       * emitter.on({
       *  a: () => {},
       *  b: () => {},
       * });
       */


      var __proto = EventEmitter.prototype;

      __proto.on = function (eventName, listener) {
        if (isObject(eventName)) {
          for (var name in eventName) {
            this.on(name, eventName[name]);
          }
        } else {
          this._addEvent(eventName, listener, {});
        }

        return this;
      };
      /**
       * Remove listeners registered in the event target.
       * @param - Name of the event to be removed
       * @param - listener function of the event to be removed
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Remove all listeners.
       * emitter.off();
       *
       * // Remove all listeners in "A" event.
       * emitter.off("a");
       *
       *
       * // Remove "listener" listener in "a" event.
       * emitter.off("a", listener);
       */


      __proto.off = function (eventName, listener) {
        if (!eventName) {
          this._events = {};
        } else if (isObject(eventName)) {
          for (var name in eventName) {
            this.off(name);
          }
        } else if (!listener) {
          this._events[eventName] = [];
        } else {
          var events = this._events[eventName];

          if (events) {
            var index = findIndex(events, function (e) {
              return e.listener === listener;
            });

            if (index > -1) {
              events.splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Add a disposable listener and Use promise to the registered event.
       * @param - Name of the event to be added
       * @param - disposable listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add a disposable listener in "a" event
       * emitter.once("a", () => {
       * });
       *
       * // Use Promise
       * emitter.once("a").then(e => {
       * });
       */


      __proto.once = function (eventName, listener) {
        var _this = this;

        if (listener) {
          this._addEvent(eventName, listener, {
            once: true
          });
        }

        return new Promise(function (resolve) {
          _this._addEvent(eventName, resolve, {
            once: true
          });
        });
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */


      __proto.emit = function (eventName, param) {
        var _this = this;

        if (param === void 0) {
          param = {};
        }

        var events = this._events[eventName];

        if (!eventName || !events) {
          return true;
        }

        var isStop = false;
        param.eventType = eventName;

        param.stop = function () {
          isStop = true;
        };

        param.currentTarget = this;

        __spreadArrays$2(events).forEach(function (info) {
          info.listener(param);

          if (info.once) {
            _this.off(eventName, info.listener);
          }
        });

        return !isStop;
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */

      /**
      * Fires an event to call listeners.
      * @param - Event name
      * @param - Event parameter
      * @return If false, stop the event.
      * @example
      *
      * import EventEmitter from "@scena/event-emitter";
      *
      *
      * const emitter = new EventEmitter();
      *
      * emitter.on("a", e => {
      * });
      *
      * // emit
      * emitter.trigger("a", {
      *   a: 1,
      * });
      */


      __proto.trigger = function (eventName, param) {
        if (param === void 0) {
          param = {};
        }

        return this.emit(eventName, param);
      };

      __proto._addEvent = function (eventName, listener, options) {
        var events = this._events;
        events[eventName] = events[eventName] || [];
        var listeners = events[eventName];
        listeners.push(__assign$1({
          listener: listener
        }, options));
      };

      return EventEmitter;
    }();
    //# sourceMappingURL=event-emitter.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 1.1.0
    */
    function prefixNames(prefix) {
      var classNames = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        classNames[_i - 1] = arguments[_i];
      }

      return classNames.map(function (className) {
        return className.split(" ").map(function (name) {
          return name ? "" + prefix + name : "";
        }).join(" ");
      }).join(" ");
    }
    function prefixCSS(prefix, css) {
      return css.replace(/([^}{]*){/gm, function (_, selector) {
        return selector.replace(/\.([^{,\s\d.]+)/g, "." + prefix + "$1") + "{";
      });
    }
    /* react */

    function ref(target, name) {
      return function (e) {
        e && (target[name] = e);
      };
    }
    function refs(target, name, i) {
      return function (e) {
        e && (target[name][i] = e);
      };
    }
    /* Class Decorator */

    function Properties(properties, action) {
      return function (component) {
        var prototype = component.prototype;
        properties.forEach(function (property) {
          action(prototype, property);
        });
      };
    }
    //# sourceMappingURL=utils.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/react-ruler
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/ruler/blob/master/packages/react-ruler
    version: 0.11.0
    */

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function () {
      __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$2.apply(this, arguments);
    };

    var Ruler =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Ruler, _super);

      function Ruler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.state = {
          scrollPos: 0
        };
        _this.width = 0;
        _this.height = 0;
        _this._zoom = 0;
        return _this;
      }

      var __proto = Ruler.prototype;

      __proto.render = function () {
        var props = this.props;
        var portalContainer = props.portalContainer;
        var portalAttributes = {};

        if ((React.version || "").indexOf("simple") > -1 && portalContainer) {
          portalAttributes = {
            portalContainer: portalContainer
          };
        }

        this._zoom = props.zoom;
        return React.createElement("canvas", __assign$2({
          ref: ref(this, "canvasElement")
        }, portalAttributes, {
          style: this.props.style
        }));
      };

      __proto.componentDidMount = function () {
        var canvas = this.canvasElement;
        var context = canvas.getContext("2d");
        this.canvasContext = context;
        this.resize();
      };

      __proto.componentDidUpdate = function () {
        this.resize();
      };
      /**
       * @method Ruler#scroll
       * @param scrollPos
       */


      __proto.scroll = function (scrollPos, nextZoom) {
        this.draw(scrollPos, nextZoom);
      };
      /**
       * @method Ruler#resize
       */


      __proto.resize = function (nextZoom) {
        var canvas = this.canvasElement;
        var _a = this.props,
            width = _a.width,
            height = _a.height,
            scrollPos = _a.scrollPos;
        this.width = width || canvas.offsetWidth;
        this.height = height || canvas.offsetHeight;
        canvas.width = this.width * 2;
        canvas.height = this.height * 2;
        this.draw(scrollPos, nextZoom);
      };

      __proto.draw = function (scrollPos, nextZoom) {
        if (scrollPos === void 0) {
          scrollPos = this.state.scrollPos;
        }

        if (nextZoom === void 0) {
          nextZoom = this._zoom;
        }

        this._zoom = nextZoom;
        var props = this.props;
        var _a = props,
            unit = _a.unit,
            type = _a.type,
            backgroundColor = _a.backgroundColor,
            lineColor = _a.lineColor,
            textColor = _a.textColor,
            textBackgroundColor = _a.textBackgroundColor,
            direction = _a.direction,
            _b = _a.negativeRuler,
            negativeRuler = _b === void 0 ? true : _b,
            _c = _a.segment,
            segment = _c === void 0 ? 10 : _c,
            textFormat = _a.textFormat,
            _d = _a.range,
            range = _d === void 0 ? [-Infinity, Infinity] : _d,
            rangeBackgroundColor = _a.rangeBackgroundColor;
        var width = this.width;
        var height = this.height;
        var state = this.state;
        state.scrollPos = scrollPos;
        var context = this.canvasContext;
        var isHorizontal = type === "horizontal";
        var isNegative = negativeRuler !== false;
        var font = props.font || "10px sans-serif";
        var textAlign = props.textAlign || "left";
        var textOffset = props.textOffset || [0, 0];
        var containerSize = isHorizontal ? height : width;
        var mainLineSize = convertUnitSize("".concat(props.mainLineSize || "100%"), containerSize);
        var longLineSize = convertUnitSize("".concat(props.longLineSize || 10), containerSize);
        var shortLineSize = convertUnitSize("".concat(props.shortLineSize || 7), containerSize);
        var lineOffset = props.lineOffset || [0, 0];

        if (backgroundColor === "transparent") {
          // Clear existing paths & text
          context.clearRect(0, 0, width * 2, height * 2);
        } else {
          // Draw the background
          context.rect(0, 0, width * 2, height * 2);
          context.fillStyle = backgroundColor;
          context.fill();
        }

        context.save();
        context.scale(2, 2);
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.font = font;
        context.fillStyle = textColor;

        switch (direction) {
          case "start":
            context.textBaseline = "top";
            break;

          case "center":
            context.textBaseline = "middle";
            break;

          case "end":
            context.textBaseline = "bottom";
            break;
        }

        context.translate(0.5, 0);
        context.beginPath();
        var size = isHorizontal ? width : height;
        var zoomUnit = nextZoom * unit;
        var minRange = Math.floor(scrollPos * nextZoom / zoomUnit);
        var maxRange = Math.ceil((scrollPos * nextZoom + size) / zoomUnit);
        var length = maxRange - minRange;
        var alignOffset = Math.max(["left", "center", "right"].indexOf(textAlign) - 1, -1);
        var barSize = isHorizontal ? height : width; // Draw Range Background

        if (rangeBackgroundColor !== "transparent" && range[0] !== -Infinity && range[1] !== Infinity) {
          var rangeStart = (range[0] - scrollPos) * nextZoom;
          var rangeEnd = (range[1] - range[0]) * nextZoom;
          context.save();
          context.fillStyle = rangeBackgroundColor;

          if (isHorizontal) {
            context.fillRect(rangeStart, 0, rangeEnd, barSize);
          } else {
            context.fillRect(0, rangeStart, barSize, rangeEnd);
          }

          context.restore();
        } // Render Segments First


        for (var i = 0; i <= length; ++i) {
          var value = i + minRange;

          if (!isNegative && value < 0) {
            continue;
          }

          var startValue = value * unit;
          var startPos = (startValue - scrollPos) * nextZoom;

          for (var j = 0; j < segment; ++j) {
            var pos = startPos + j / segment * zoomUnit;
            var value_1 = startValue + j / segment * unit;

            if (pos < 0 || pos >= size || value_1 < range[0] || value_1 > range[1]) {
              continue;
            }

            var lineSize = j === 0 ? mainLineSize : j % 2 === 0 ? longLineSize : shortLineSize;
            var origin = 0;

            switch (direction) {
              case "start":
                origin = 0;
                break;

              case "center":
                origin = barSize / 2 - lineSize / 2;
                break;

              case "end":
                origin = barSize - lineSize;
                break;
            }

            var _e = isHorizontal ? [pos + lineOffset[0], origin + lineOffset[1]] : [origin + lineOffset[0], pos + lineOffset[1]],
                x1 = _e[0],
                y1 = _e[1];

            var _f = isHorizontal ? [x1, y1 + lineSize] : [x1 + lineSize, y1],
                x2 = _f[0],
                y2 = _f[1];

            context.moveTo(x1 + lineOffset[0], y1 + lineOffset[1]);
            context.lineTo(x2 + lineOffset[0], y2 + lineOffset[1]);
          }
        }

        context.stroke(); // Render Labels

        for (var i = 0; i <= length; ++i) {
          var value = i + minRange;

          if (!isNegative && value < 0) {
            continue;
          }

          var startValue = value * unit;
          var startPos = (startValue - scrollPos) * nextZoom;

          if (startPos < -zoomUnit || startPos >= size + unit * nextZoom || startValue < range[0] || startValue > range[1]) {
            continue;
          }

          var origin = 0;

          switch (direction) {
            case "start":
              origin = 17;
              break;

            case "center":
              origin = barSize / 2;
              break;

            case "end":
              origin = barSize - 17;
              break;
          }

          var _g = isHorizontal ? [startPos + alignOffset * -3, origin] : [origin, startPos + alignOffset * 3],
              startX = _g[0],
              startY = _g[1];

          var text = "".concat(startValue);

          if (textFormat) {
            text = textFormat(startValue);
          }

          context.textAlign = textAlign;
          var backgroundOffset = 0;
          var textSize = context.measureText(text).width;

          switch (textAlign) {
            case "left":
              backgroundOffset = 0;
              break;

            case "center":
              backgroundOffset = -textSize / 2;
              break;

            case "right":
              backgroundOffset = -textSize;
              break;
          }

          if (isHorizontal) {
            context.save();
            context.fillStyle = textBackgroundColor;
            context.fillRect(startX + textOffset[0] + backgroundOffset, 0, textSize, mainLineSize);
            context.restore();
          } else {
            context.save();
            context.translate(0, startY + textOffset[1]);
            context.rotate(-Math.PI / 2);
            context.fillStyle = textBackgroundColor;
            context.fillRect(backgroundOffset, 0, textSize, mainLineSize);
            context.restore();
          }

          if (isHorizontal) {
            context.fillText(text, startX + textOffset[0], startY + textOffset[1]);
          } else {
            context.save();
            context.translate(startX + textOffset[0], startY + textOffset[1]);
            context.rotate(-Math.PI / 2);
            context.fillText(text, 0, 0);
            context.restore();
          }
        }

        context.restore();
      };

      Ruler.defaultProps = {
        type: "horizontal",
        zoom: 1,
        width: 0,
        height: 0,
        unit: 50,
        negativeRuler: true,
        mainLineSize: "100%",
        longLineSize: 10,
        shortLineSize: 7,
        segment: 10,
        direction: "end",
        style: {
          width: "100%",
          height: "100%"
        },
        backgroundColor: "#333333",
        font: "10px sans-serif",
        textColor: "#ffffff",
        textBackgroundColor: 'transparent',
        lineColor: "#777777",
        range: [-Infinity, Infinity],
        rangeBackgroundColor: 'transparent'
      };
      return Ruler;
    }(React.PureComponent);

    var PROPERTIES = ["type", "width", "height", "unit", "zoom", "direction", "textAlign", "font", "segment", "mainLineSize", "longLineSize", "shortLineSize", "lineOffset", "textOffset", "negativeRuler", "range", "scrollPos", "style", "backgroundColor", "rangeBackgroundColor", "lineColor", "textColor", "textBackgroundColor", "textFormat", "portalContainer"];
    //# sourceMappingURL=ruler.esm.js.map

    /*
    Copyright (c) 2020 Daybrush
    name: @scena/matrix
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/matrix
    version: 1.1.1
    */

    function add(matrix, inverseMatrix, startIndex, fromIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        matrix[x] += matrix[fromX] * k;
        inverseMatrix[x] += inverseMatrix[fromX] * k;
      }
    }

    function swap(matrix, inverseMatrix, startIndex, fromIndex, n) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        var v = matrix[x];
        var iv = inverseMatrix[x];
        matrix[x] = matrix[fromX];
        matrix[fromX] = v;
        inverseMatrix[x] = inverseMatrix[fromX];
        inverseMatrix[fromX] = iv;
      }
    }

    function divide(matrix, inverseMatrix, startIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        matrix[x] /= k;
        inverseMatrix[x] /= k;
      }
    }
    /**
     * @memberof Matrix
     */

    function invert(matrix, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = matrix.slice();
      var inverseMatrix = createIdentityMatrix(n);

      for (var i = 0; i < n; ++i) {
        // diagonal
        var identityIndex = n * i + i;

        if (!throttle(newMatrix[identityIndex], TINY_NUM)) {
          // newMatrix[identityIndex] = 0;
          for (var j = i + 1; j < n; ++j) {
            if (newMatrix[n * i + j]) {
              swap(newMatrix, inverseMatrix, i, j, n);
              break;
            }
          }
        }

        if (!throttle(newMatrix[identityIndex], TINY_NUM)) {
          // no inverse matrix
          return [];
        }

        divide(newMatrix, inverseMatrix, i, n, newMatrix[identityIndex]);

        for (var j = 0; j < n; ++j) {
          var targetStartIndex = j;
          var targetIndex = j + i * n;
          var target = newMatrix[targetIndex];

          if (!throttle(target, TINY_NUM) || i === j) {
            continue;
          }

          add(newMatrix, inverseMatrix, targetStartIndex, i, n, -target);
        }
      }

      return inverseMatrix;
    }
    /**
     * @memberof Matrix
     */

    function multiply(matrix, matrix2, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = []; // 1 y: n
      // 1 x: m
      // 2 x: m
      // 2 y: k
      // n * m X m * k

      var m = matrix.length / n;
      var k = matrix2.length / m;

      if (!m) {
        return matrix2;
      } else if (!k) {
        return matrix;
      }

      for (var i = 0; i < n; ++i) {
        for (var j = 0; j < k; ++j) {
          newMatrix[j * n + i] = 0;

          for (var l = 0; l < m; ++l) {
            // m1 x: m(l), y: n(i)
            // m2 x: k(j):  y: m(l)
            // nw x: n(i), y: k(j)
            newMatrix[j * n + i] += matrix[l * n + i] * matrix2[j * m + l];
          }
        }
      } // n * k


      return newMatrix;
    }
    /**
     * @memberof Matrix
     */

    function calculate(matrix, matrix2, n) {
      if (n === void 0) {
        n = matrix2.length;
      }

      var result = multiply(matrix, matrix2, n);
      var k = result[n - 1];
      return result.map(function (v) {
        return v / k;
      });
    }
    /**
     * @memberof Matrix
     */

    function rotateX3d(matrix, rad) {
      return multiply(matrix, [1, 0, 0, 0, 0, Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function rotateY3d(matrix, rad) {
      return multiply(matrix, [Math.cos(rad), 0, -Math.sin(rad), 0, 0, 1, 0, 0, Math.sin(rad), 0, Math.cos(rad), 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function rotateZ3d(matrix, rad) {
      return multiply(matrix, createRotateMatrix(rad, 4));
    }
    /**
     * @memberof Matrix
     */

    function scale3d(matrix, _a) {
      var _b = _a[0],
          sx = _b === void 0 ? 1 : _b,
          _c = _a[1],
          sy = _c === void 0 ? 1 : _c,
          _d = _a[2],
          sz = _d === void 0 ? 1 : _d;
      return multiply(matrix, [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function translate3d(matrix, _a) {
      var _b = _a[0],
          tx = _b === void 0 ? 0 : _b,
          _c = _a[1],
          ty = _c === void 0 ? 0 : _c,
          _d = _a[2],
          tz = _d === void 0 ? 0 : _d;
      return multiply(matrix, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function matrix3d(matrix1, matrix2) {
      return multiply(matrix1, matrix2, 4);
    }
    /**
     * @memberof Matrix
     */

    function createRotateMatrix(rad, n) {
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var m = createIdentityMatrix(n); // cos -sin
      // sin cos

      m[0] = cos;
      m[1] = sin;
      m[n] = -sin;
      m[n + 1] = cos;
      return m;
    }
    /**
     * @memberof Matrix
     */

    function createIdentityMatrix(n) {
      var length = n * n;
      var matrix = [];

      for (var i = 0; i < length; ++i) {
        matrix[i] = i % (n + 1) ? 0 : 1;
      }

      return matrix;
    }
    //# sourceMappingURL=matrix.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: css-to-mat
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-to-mat.git
    version: 1.0.3
    */

    function createMatrix() {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function parseMat(transform) {
      return toMat(parse(transform));
    }
    function calculateMatrixDist(matrix, pos) {
      var res = calculate(matrix, [pos[0], pos[1] || 0, pos[2] || 0, 1], 4);
      var w = res[3] || 1;
      return [res[0] / w, res[1] / w, res[2] / w];
    }
    function getDistElementMatrix(el, container) {
      if (container === void 0) {
        container = document.body;
      }

      var target = el;
      var matrix = createMatrix();

      while (target) {
        var transform = getComputedStyle(target).transform;
        matrix = matrix3d(parseMat(transform), matrix);

        if (target === container) {
          break;
        }

        target = target.parentElement;
      }

      matrix = invert(matrix, 4);
      matrix[12] = 0;
      matrix[13] = 0;
      matrix[14] = 0;
      return matrix;
    }
    function toMat(matrixInfos) {
      var target = createMatrix();
      matrixInfos.forEach(function (info) {
        var matrixFunction = info.matrixFunction,
            functionValue = info.functionValue;

        if (!matrixFunction) {
          return;
        }

        target = matrixFunction(target, functionValue);
      });
      return target;
    }
    function parse(transform) {
      var transforms = isArray(transform) ? transform : splitSpace(transform);
      return transforms.map(function (t) {
        var _a = splitBracket(t),
            name = _a.prefix,
            value = _a.value;

        var matrixFunction = null;
        var functionName = name;
        var functionValue = "";

        if (name === "translate" || name === "translateX" || name === "translate3d") {
          var _b = splitComma(value).map(function (v) {
            return parseFloat(v);
          }),
              posX = _b[0],
              _c = _b[1],
              posY = _c === void 0 ? 0 : _c,
              _d = _b[2],
              posZ = _d === void 0 ? 0 : _d;

          matrixFunction = translate3d;
          functionValue = [posX, posY, posZ];
        } else if (name === "translateY") {
          var posY = parseFloat(value);
          matrixFunction = translate3d;
          functionValue = [0, posY, 0];
        } else if (name === "translateZ") {
          var posZ = parseFloat(value);
          matrixFunction = translate3d;
          functionValue = [0, 0, posZ];
        } else if (name === "scale" || name === "scale3d") {
          var _e = splitComma(value).map(function (v) {
            return parseFloat(v);
          }),
              sx = _e[0],
              _f = _e[1],
              sy = _f === void 0 ? sx : _f,
              _g = _e[2],
              sz = _g === void 0 ? 1 : _g;

          matrixFunction = scale3d;
          functionValue = [sx, sy, sz];
        } else if (name === "scaleX") {
          var sx = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [sx, 1, 1];
        } else if (name === "scaleY") {
          var sy = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [1, sy, 1];
        } else if (name === "scaleZ") {
          var sz = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [1, 1, sz];
        } else if (name === "rotate" || name === "rotateZ" || name === "rotateX" || name === "rotateY") {
          var _h = splitUnit(value),
              unit = _h.unit,
              unitValue = _h.value;

          var rad = unit === "rad" ? unitValue : unitValue * Math.PI / 180;

          if (name === "rotate" || name === "rotateZ") {
            functionName = "rotateZ";
            matrixFunction = rotateZ3d;
          } else if (name === "rotateX") {
            matrixFunction = rotateX3d;
          } else if (name === "rotateY") {
            matrixFunction = rotateY3d;
          }

          functionValue = rad;
        } else if (name === "matrix3d") {
          matrixFunction = matrix3d;
          functionValue = splitComma(value).map(function (v) {
            return parseFloat(v);
          });
        } else if (name === "matrix") {
          var m = splitComma(value).map(function (v) {
            return parseFloat(v);
          });
          matrixFunction = matrix3d;
          functionValue = [m[0], m[1], 0, 0, m[2], m[3], 0, 0, 0, 0, 1, 0, m[4], m[5], 0, 1];
        } else {
          functionName = "";
        }

        return {
          name: name,
          functionName: functionName,
          value: value,
          matrixFunction: matrixFunction,
          functionValue: functionValue
        };
      });
    }
    //# sourceMappingURL=css-to-mat.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: gesto
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesto.git
    version: 1.13.3
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$2 = function (d, b) {
      extendStatics$2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
      extendStatics$2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$3 = function () {
      __assign$3 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$3.apply(this, arguments);
    };

    function getRad(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getRotatiion(touches) {
      return getRad([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
    }
    function isMultiTouch(e) {
      return e.touches && e.touches.length >= 2;
    }
    function getEventClients(e) {
      if (!e) {
        return [];
      }

      if (e.touches) {
        return getClients(e.touches);
      } else {
        return [getClient(e)];
      }
    }
    function isMouseEvent(e) {
      return e && (e.type.indexOf("mouse") > -1 || "button" in e);
    }
    function getPosition(clients, prevClients, startClients) {
      var length = startClients.length;

      var _a = getAverageClient(clients, length),
          clientX = _a.clientX,
          clientY = _a.clientY,
          originalClientX = _a.originalClientX,
          originalClientY = _a.originalClientY;

      var _b = getAverageClient(prevClients, length),
          prevX = _b.clientX,
          prevY = _b.clientY;

      var _c = getAverageClient(startClients, length),
          startX = _c.clientX,
          startY = _c.clientY;

      var deltaX = clientX - prevX;
      var deltaY = clientY - prevY;
      var distX = clientX - startX;
      var distY = clientY - startY;
      return {
        clientX: originalClientX,
        clientY: originalClientY,
        deltaX: deltaX,
        deltaY: deltaY,
        distX: distX,
        distY: distY
      };
    }
    function getDist(clients) {
      return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
    }
    function getClients(touches) {
      var length = Math.min(touches.length, 2);
      var clients = [];

      for (var i = 0; i < length; ++i) {
        clients.push(getClient(touches[i]));
      }

      return clients;
    }
    function getClient(e) {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
    function getAverageClient(clients, length) {
      if (length === void 0) {
        length = clients.length;
      }

      var sumClient = {
        clientX: 0,
        clientY: 0,
        originalClientX: 0,
        originalClientY: 0
      };

      for (var i = 0; i < length; ++i) {
        var client = clients[i];
        sumClient.originalClientX += "originalClientX" in client ? client.originalClientX : client.clientX;
        sumClient.originalClientY += "originalClientY" in client ? client.originalClientY : client.clientY;
        sumClient.clientX += client.clientX;
        sumClient.clientY += client.clientY;
      }

      if (!length) {
        return sumClient;
      }

      return {
        clientX: sumClient.clientX / length,
        clientY: sumClient.clientY / length,
        originalClientX: sumClient.originalClientX / length,
        originalClientY: sumClient.originalClientY / length
      };
    }

    var ClientStore =
    /*#__PURE__*/
    function () {
      function ClientStore(clients) {
        this.prevClients = [];
        this.startClients = [];
        this.movement = 0;
        this.length = 0;
        this.startClients = clients;
        this.prevClients = clients;
        this.length = clients.length;
      }

      var __proto = ClientStore.prototype;

      __proto.getAngle = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients);
      };

      __proto.getRotation = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients) - getRotatiion(this.startClients);
      };

      __proto.getPosition = function (clients, isAdd) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var position = getPosition(clients || this.prevClients, this.prevClients, this.startClients);
        var deltaX = position.deltaX,
            deltaY = position.deltaY;
        this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.prevClients = clients;
        return position;
      };

      __proto.getPositions = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var prevClients = this.prevClients;
        return this.startClients.map(function (startClient, i) {
          return getPosition([clients[i]], [prevClients[i]], [startClient]);
        });
      };

      __proto.getMovement = function (clients) {
        var movement = this.movement;

        if (!clients) {
          return movement;
        }

        var currentClient = getAverageClient(clients, this.length);
        var prevClient = getAverageClient(this.prevClients, this.length);
        var deltaX = currentClient.clientX - prevClient.clientX;
        var deltaY = currentClient.clientY - prevClient.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + movement;
      };

      __proto.getDistance = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients);
      };

      __proto.getScale = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients) / getDist(this.startClients);
      };

      __proto.move = function (deltaX, deltaY) {
        this.startClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
      };

      return ClientStore;
    }();

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag, pinch events in any browser.
     */

    var Gesto =
    /*#__PURE__*/
    function (_super) {
      __extends$2(Gesto, _super);
      /**
       *
       */


      function Gesto(targets, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.options = {};
        _this.flag = false;
        _this.pinchFlag = false;
        _this.data = {};
        _this.isDrag = false;
        _this.isPinch = false;
        _this.isMouse = false;
        _this.isTouch = false;
        _this.clientStores = [];
        _this.targets = [];
        _this.prevTime = 0;
        _this.doubleFlag = false;
        _this._dragFlag = false;
        _this._isMouseEvent = false;
        _this._isSecondaryButton = false;
        _this._preventMouseEvent = false;

        _this.onDragStart = function (e, isTrusted) {
          if (isTrusted === void 0) {
            isTrusted = true;
          }

          if (!_this.flag && e.cancelable === false) {
            return;
          }

          var _a = _this.options,
              container = _a.container,
              pinchOutside = _a.pinchOutside,
              preventWheelClick = _a.preventWheelClick,
              preventRightClick = _a.preventRightClick,
              preventDefault = _a.preventDefault,
              checkInput = _a.checkInput,
              preventClickEventOnDragStart = _a.preventClickEventOnDragStart,
              preventClickEventOnDrag = _a.preventClickEventOnDrag,
              preventClickEventByCondition = _a.preventClickEventByCondition;
          var isTouch = _this.isTouch;
          var isDragStart = !_this.flag;
          _this._isSecondaryButton = e.which === 3 || e.button === 2;

          if (preventWheelClick && (e.which === 2 || e.button === 1) || preventRightClick && (e.which === 3 || e.button === 2)) {
            _this.stop();

            return false;
          }

          if (isDragStart) {
            var activeElement = document.activeElement;
            var target = e.target;

            if (target) {
              var tagName = target.tagName.toLowerCase();
              var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
              var hasContentEditable = target.isContentEditable;

              if (hasInput || hasContentEditable) {
                if (checkInput || activeElement === target) {
                  // force false or already focused.
                  return false;
                } // no focus


                if (activeElement && hasContentEditable && activeElement.isContentEditable && activeElement.contains(target)) {
                  return false;
                }
              } else if ((preventDefault || e.type === "touchstart") && activeElement) {
                var activeTagName = activeElement.tagName.toLowerCase();

                if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                  activeElement.blur();
                }
              }

              if (preventClickEventOnDragStart || preventClickEventOnDrag || preventClickEventByCondition) {
                addEvent(window, "click", _this._onClick, true);
              }
            }

            _this.clientStores = [new ClientStore(getEventClients(e))];
            _this.flag = true;
            _this.isDrag = false;
            _this._dragFlag = true;
            _this.data = {};
            _this.doubleFlag = now() - _this.prevTime < 200;
            _this._isMouseEvent = isMouseEvent(e);

            if (!_this._isMouseEvent && _this._preventMouseEvent) {
              _this._preventMouseEvent = false;
            }

            var result = _this._preventMouseEvent || _this.emit("dragStart", __assign$3(__assign$3({
              data: _this.data,
              datas: _this.data,
              inputEvent: e,
              isMouseEvent: _this._isMouseEvent,
              isSecondaryButton: _this._isSecondaryButton,
              isTrusted: isTrusted,
              isDouble: _this.doubleFlag
            }, _this.getCurrentStore().getPosition()), {
              preventDefault: function () {
                e.preventDefault();
              },
              preventDrag: function () {
                _this._dragFlag = false;
              }
            }));

            if (result === false) {
              _this.stop();
            }

            if (_this._isMouseEvent && _this.flag && preventDefault) {
              e.preventDefault();
            }
          }

          if (!_this.flag) {
            return false;
          }

          var timer = 0;

          if (isDragStart) {
            _this._attchDragEvent(); // wait pinch


            if (isTouch && pinchOutside) {
              timer = setTimeout(function () {
                addEvent(container, "touchstart", _this.onDragStart, {
                  passive: false
                });
              });
            }
          } else if (isTouch && pinchOutside) {
            // pinch is occured
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.flag && isMultiTouch(e)) {
            clearTimeout(timer);

            if (isDragStart && e.touches.length !== e.changedTouches.length) {
              return;
            }

            if (!_this.pinchFlag) {
              _this.onPinchStart(e);
            }
          }
        };

        _this.onDrag = function (e, isScroll) {
          if (!_this.flag) {
            return;
          }

          var preventDefault = _this.options.preventDefault;

          if (!_this._isMouseEvent && preventDefault) {
            e.preventDefault();
          }

          var clients = getEventClients(e);

          var result = _this.moveClients(clients, e, false);

          if (_this._dragFlag) {
            if (_this.pinchFlag || result.deltaX || result.deltaY) {
              var dragResult = _this._preventMouseEvent || _this.emit("drag", __assign$3(__assign$3({}, result), {
                isScroll: !!isScroll,
                inputEvent: e
              }));

              if (dragResult === false) {
                _this.stop();

                return;
              }
            }

            if (_this.pinchFlag) {
              _this.onPinch(e, clients);
            }
          }

          _this.getCurrentStore().getPosition(clients, true);
        };

        _this.onDragEnd = function (e) {
          if (!_this.flag) {
            return;
          }

          var _a = _this.options,
              pinchOutside = _a.pinchOutside,
              container = _a.container,
              preventClickEventOnDrag = _a.preventClickEventOnDrag,
              preventClickEventOnDragStart = _a.preventClickEventOnDragStart,
              preventClickEventByCondition = _a.preventClickEventByCondition;
          var isDrag = _this.isDrag;

          if (preventClickEventOnDrag || preventClickEventOnDragStart || preventClickEventByCondition) {
            requestAnimationFrame(function () {
              _this._allowClickEvent();
            });
          }

          if (!preventClickEventByCondition && !preventClickEventOnDragStart && preventClickEventOnDrag && !isDrag) {
            _this._allowClickEvent();
          }

          if (_this.isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.pinchFlag) {
            _this.onPinchEnd(e);
          }

          var clients = (e === null || e === void 0 ? void 0 : e.touches) ? getEventClients(e) : [];
          var clientsLength = clients.length;

          if (clientsLength === 0 || !_this.options.keepDragging) {
            _this.flag = false;
          } else {
            _this._addStore(new ClientStore(clients));
          }

          var position = _this._getPosition();

          var currentTime = now();
          var isDouble = !isDrag && _this.doubleFlag;
          _this.prevTime = isDrag || isDouble ? 0 : currentTime;

          if (!_this.flag) {
            _this._dettachDragEvent();

            _this._preventMouseEvent || _this.emit("dragEnd", __assign$3({
              data: _this.data,
              datas: _this.data,
              isDouble: isDouble,
              isDrag: isDrag,
              isClick: !isDrag,
              isMouseEvent: _this._isMouseEvent,
              isSecondaryButton: _this._isSecondaryButton,
              inputEvent: e
            }, position));
            _this.clientStores = [];

            if (!_this._isMouseEvent) {
              _this._preventMouseEvent = true;
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  _this._preventMouseEvent = false;
                });
              });
            }
          }
        };

        _this.onBlur = function () {
          _this.onDragEnd();
        };

        _this._allowClickEvent = function () {
          removeEvent(window, "click", _this._onClick, true);
        };

        _this._onClick = function (e) {
          _this._allowClickEvent();

          _this._preventMouseEvent = false;
          var preventClickEventByCondition = _this.options.preventClickEventByCondition;

          if (preventClickEventByCondition === null || preventClickEventByCondition === void 0 ? void 0 : preventClickEventByCondition(e)) {
            return;
          }

          e.stopPropagation();
          e.preventDefault();
        };

        _this._onContextMenu = function (e) {
          var options = _this.options;

          if (!options.preventRightClick) {
            e.preventDefault();
          } else {
            _this.onDragEnd(e);
          }
        };

        _this._passCallback = function () {};

        var elements = [].concat(targets);
        _this.options = __assign$3({
          checkInput: false,
          container: elements.length > 1 ? window : elements[0],
          preventRightClick: true,
          preventWheelClick: true,
          preventClickEventOnDragStart: false,
          preventClickEventOnDrag: false,
          preventClickEventByCondition: null,
          preventDefault: true,
          checkWindowBlur: false,
          keepDragging: false,
          pinchThreshold: 0,
          events: ["touch", "mouse"]
        }, options);
        var _a = _this.options,
            container = _a.container,
            events = _a.events,
            checkWindowBlur = _a.checkWindowBlur;
        _this.isTouch = events.indexOf("touch") > -1;
        _this.isMouse = events.indexOf("mouse") > -1;
        _this.targets = elements;

        if (_this.isMouse) {
          elements.forEach(function (el) {
            addEvent(el, "mousedown", _this.onDragStart);
            addEvent(el, "mousemove", _this._passCallback);
          });
          addEvent(container, "contextmenu", _this._onContextMenu);
        }

        if (checkWindowBlur) {
          addEvent(window, "blur", _this.onBlur);
        }

        if (_this.isTouch) {
          var passive_1 = {
            passive: false
          };
          elements.forEach(function (el) {
            addEvent(el, "touchstart", _this.onDragStart, passive_1);
            addEvent(el, "touchmove", _this._passCallback, passive_1);
          });
        }

        return _this;
      }
      /**
       * Stop Gesto's drag events.
       */


      var __proto = Gesto.prototype;

      __proto.stop = function () {
        this.isDrag = false;
        this.data = {};
        this.clientStores = [];
        this.pinchFlag = false;
        this.doubleFlag = false;
        this.prevTime = 0;
        this.flag = false;

        this._allowClickEvent();

        this._dettachDragEvent();
      };
      /**
       * The total moved distance
       */


      __proto.getMovement = function (clients) {
        return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function (prev, cur) {
          return prev + cur.movement;
        }, 0);
      };
      /**
       * Whether to drag
       */


      __proto.isDragging = function () {
        return this.isDrag;
      };
      /**
       * Whether to start drag
       */


      __proto.isFlag = function () {
        return this.flag;
      };
      /**
       * Whether to start pinch
       */


      __proto.isPinchFlag = function () {
        return this.pinchFlag;
      };
      /**
       * Whether to start double click
       */


      __proto.isDoubleFlag = function () {
        return this.doubleFlag;
      };
      /**
       * Whether to pinch
       */


      __proto.isPinching = function () {
        return this.isPinch;
      };
      /**
       * If a scroll event occurs, it is corrected by the scroll distance.
       */


      __proto.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
        if (isCallDrag === void 0) {
          isCallDrag = true;
        }

        if (!this.flag) {
          return;
        }

        this.clientStores[0].move(deltaX, deltaY);
        isCallDrag && this.onDrag(e, true);
      };
      /**
       * Create a virtual drag event.
       */


      __proto.move = function (_a, inputEvent) {
        var deltaX = _a[0],
            deltaY = _a[1];
        var store = this.getCurrentStore();
        var nextClients = store.prevClients;
        return this.moveClients(nextClients.map(function (_a) {
          var clientX = _a.clientX,
              clientY = _a.clientY;
          return {
            clientX: clientX + deltaX,
            clientY: clientY + deltaY,
            originalClientX: clientX,
            originalClientY: clientY
          };
        }), inputEvent, true);
      };
      /**
       * The dragStart event is triggered by an external event.
       */


      __proto.triggerDragStart = function (e) {
        this.onDragStart(e, false);
      };
      /**
       * Set the event data while dragging.
       */


      __proto.setEventData = function (data) {
        var currentData = this.data;

        for (var name in data) {
          currentData[name] = data[name];
        }

        return this;
      };
      /**
       * Set the event data while dragging.
       * Use `setEventData`
       * @deprecated
       */


      __proto.setEventDatas = function (data) {
        return this.setEventData(data);
      };
      /**
       * Get the current event state while dragging.
       */


      __proto.getCurrentEvent = function (inputEvent) {
        return __assign$3(__assign$3({
          data: this.data,
          datas: this.data
        }, this._getPosition()), {
          movement: this.getMovement(),
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          inputEvent: inputEvent
        });
      };
      /**
       * Get & Set the event data while dragging.
       */


      __proto.getEventData = function () {
        return this.data;
      };
      /**
       * Get & Set the event data while dragging.
       * Use getEventData method
       * @depreacated
       */


      __proto.getEventDatas = function () {
        return this.data;
      };
      /**
       * Unset Gesto
       */


      __proto.unset = function () {
        var _this = this;

        var targets = this.targets;
        var container = this.options.container;
        this.off();
        removeEvent(window, "blur", this.onBlur);

        if (this.isMouse) {
          targets.forEach(function (target) {
            removeEvent(target, "mousedown", _this.onDragStart);
          });
          removeEvent(container, "contextmenu", this._onContextMenu);
        }

        if (this.isTouch) {
          targets.forEach(function (target) {
            removeEvent(target, "touchstart", _this.onDragStart);
          });
          removeEvent(container, "touchstart", this.onDragStart);
        }

        this._allowClickEvent();

        this._dettachDragEvent();
      };

      __proto.onPinchStart = function (e) {
        var pinchThreshold = this.options.pinchThreshold;

        if (this.isDrag && this.getMovement() > pinchThreshold) {
          return;
        }

        var store = new ClientStore(getEventClients(e));
        this.pinchFlag = true;

        this._addStore(store);

        var result = this.emit("pinchStart", __assign$3(__assign$3({
          data: this.data,
          datas: this.data,
          angle: store.getAngle(),
          touches: this.getCurrentStore().getPositions()
        }, store.getPosition()), {
          inputEvent: e
        }));

        if (result === false) {
          this.pinchFlag = false;
        }
      };

      __proto.onPinch = function (e, clients) {
        if (!this.flag || !this.pinchFlag || clients.length < 2) {
          return;
        }

        var store = this.getCurrentStore();
        this.isPinch = true;
        this.emit("pinch", __assign$3(__assign$3({
          data: this.data,
          datas: this.data,
          movement: this.getMovement(clients),
          angle: store.getAngle(clients),
          rotation: store.getRotation(clients),
          touches: store.getPositions(clients),
          scale: store.getScale(clients),
          distance: store.getDistance(clients)
        }, store.getPosition(clients)), {
          inputEvent: e
        }));
      };

      __proto.onPinchEnd = function (e) {
        if (!this.pinchFlag) {
          return;
        }

        var isPinch = this.isPinch;
        this.isPinch = false;
        this.pinchFlag = false;
        var store = this.getCurrentStore();
        this.emit("pinchEnd", __assign$3(__assign$3({
          data: this.data,
          datas: this.data,
          isPinch: isPinch,
          touches: store.getPositions()
        }, store.getPosition()), {
          inputEvent: e
        }));
      };

      __proto.getCurrentStore = function () {
        return this.clientStores[0];
      };

      __proto.moveClients = function (clients, inputEvent, isAdd) {
        var position = this._getPosition(clients, isAdd);

        if (position.deltaX || position.deltaY) {
          this.isDrag = true;
        }

        return __assign$3(__assign$3({
          data: this.data,
          datas: this.data
        }, position), {
          movement: this.getMovement(clients),
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          isMouseEvent: this._isMouseEvent,
          isSecondaryButton: this._isSecondaryButton,
          inputEvent: inputEvent
        });
      };

      __proto._addStore = function (store) {
        this.clientStores.splice(0, 0, store);
      };

      __proto._getPosition = function (clients, isAdd) {
        var store = this.getCurrentStore();
        var position = store.getPosition(clients, isAdd);

        var _a = this.clientStores.slice(1).reduce(function (prev, cur) {
          var storePosition = cur.getPosition();
          prev.distX += storePosition.distX;
          prev.distY += storePosition.distY;
          return prev;
        }, position),
            distX = _a.distX,
            distY = _a.distY;

        return __assign$3(__assign$3({}, position), {
          distX: distX,
          distY: distY
        });
      };

      __proto._attchDragEvent = function () {
        var container = this.options.container;
        var passive = {
          passive: false
        };

        if (this.isMouse) {
          addEvent(container, "mousemove", this.onDrag);
          addEvent(container, "mouseup", this.onDragEnd);
        }

        if (this.isTouch) {
          addEvent(container, "touchmove", this.onDrag, passive);
          addEvent(container, "touchend", this.onDragEnd, passive);
          addEvent(container, "touchcancel", this.onDragEnd, passive);
        }
      };

      __proto._dettachDragEvent = function () {
        var container = this.options.container;

        if (this.isMouse) {
          removeEvent(container, "mousemove", this.onDrag);
          removeEvent(container, "mouseup", this.onDragEnd);
        }

        if (this.isTouch) {
          removeEvent(container, "touchstart", this.onDragStart);
          removeEvent(container, "touchmove", this.onDrag);
          removeEvent(container, "touchend", this.onDragEnd);
          removeEvent(container, "touchcancel", this.onDragEnd);
        }
      };
      return Gesto;
    }(EventEmitter);
    //# sourceMappingURL=gesto.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: css-styled
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-styled.git
    version: 1.0.1
    */

    function hash(str) {
      var hash = 5381,
          i    = str.length;

      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }

      /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
       * integers. Since we want the results to be always positive, convert the
       * signed int to an unsigned by doing an unsigned bitshift. */
      return hash >>> 0;
    }

    var stringHash = hash;

    function getHash(str) {
      return stringHash(str).toString(36);
    }
    function getShadowRoot(parentElement) {
      if (parentElement && parentElement.getRootNode) {
        var rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
          return rootNode;
        }
      }

      return;
    }
    function replaceStyle(className, css, options) {
      if (options.original) {
        return css;
      }

      return css.replace(/([^};{\s}][^};{]*|^\s*){/mg, function (_, selector) {
        var trimmedSelector = selector.trim();
        return (trimmedSelector ? splitComma(trimmedSelector) : [""]).map(function (subSelector) {
          var trimmedSubSelector = subSelector.trim();

          if (trimmedSubSelector.indexOf("@") === 0) {
            return trimmedSubSelector;
          } else if (trimmedSubSelector.indexOf(":global") > -1) {
            return trimmedSubSelector.replace(/\:global/g, "");
          } else if (trimmedSubSelector.indexOf(":host") > -1) {
            return "" + trimmedSubSelector.replace(/\:host/g, "." + className);
          } else if (trimmedSubSelector) {
            return "." + className + " " + trimmedSubSelector;
          } else {
            return "." + className;
          }
        }).join(", ") + " {";
      });
    }
    function injectStyle(className, css, options, shadowRoot) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-styled-id", className);

      if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
      }

      style.innerHTML = replaceStyle(className, css, options);
      (shadowRoot || document.head || document.body).appendChild(style);
      return style;
    }

    /**
     * Create an styled object that can be defined and inserted into the css.
     * @param - css styles
     */

    function styled(css) {
      var injectClassName = "rCS" + getHash(css);
      var injectCount = 0;
      var injectElement;
      return {
        className: injectClassName,
        inject: function (el, options) {
          if (options === void 0) {
            options = {};
          }

          var shadowRoot = getShadowRoot(el);
          var firstMount = injectCount === 0;
          var styleElement;

          if (shadowRoot || firstMount) {
            styleElement = injectStyle(injectClassName, css, options, shadowRoot);
          }

          if (firstMount) {
            injectElement = styleElement;
          }

          if (!shadowRoot) {
            ++injectCount;
          }

          return {
            destroy: function () {
              if (shadowRoot) {
                shadowRoot.removeChild(styleElement);
                styleElement = null;
              } else {
                if (injectCount > 0) {
                  --injectCount;
                }

                if (injectCount === 0 && injectElement) {
                  injectElement.parentNode.removeChild(injectElement);
                  injectElement = null;
                }
              }
            }
          };
        }
      };
    }
    //# sourceMappingURL=styled.esm.js.map

    /*
    Copyright (c) 2019 Daybrush
    name: react-css-styled
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/css-styled/tree/master/packages/react-css-styled
    version: 1.0.4
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$3 = function (d, b) {
      extendStatics$3 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$3(d, b);
    };

    function __extends$3(d, b) {
      extendStatics$3(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$4 = function () {
      __assign$4 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$4.apply(this, arguments);
    };
    function __rest$1(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    var StyledElement =
    /*#__PURE__*/
    function (_super) {
      __extends$3(StyledElement, _super);

      function StyledElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.injectResult = null;
        _this.tag = "div";
        return _this;
      }

      var __proto = StyledElement.prototype;

      __proto.render = function () {
        var _a = this.props,
            _b = _a.className,
            className = _b === void 0 ? "" : _b,
            cspNonce = _a.cspNonce,
            portalContainer = _a.portalContainer,
            attributes = __rest$1(_a, ["className", "cspNonce", "portalContainer"]);

        var cssId = this.injector.className;
        var Tag = this.tag;
        var portalAttributes = {};

        if ((React.version || "").indexOf("simple") > -1 && portalContainer) {
          portalAttributes = {
            portalContainer: portalContainer
          };
        }

        return React.createElement(Tag, __assign$4({
          "ref": ref(this, "element"),
          "data-styled-id": cssId,
          "className": className + " " + cssId
        }, portalAttributes, attributes));
      };

      __proto.componentDidMount = function () {
        this.injectResult = this.injector.inject(this.element, {
          nonce: this.props.cspNonce
        });
      };

      __proto.componentWillUnmount = function () {
        this.injectResult.destroy();
        this.injectResult = null;
      };

      __proto.getElement = function () {
        return this.element;
      };

      return StyledElement;
    }(React.Component);

    function styled$1(tag, css) {
      var injector = styled(css);
      return (
        /*#__PURE__*/
        function (_super) {
          __extends$3(Styled, _super);

          function Styled() {
            var _this = _super !== null && _super.apply(this, arguments) || this;

            _this.injector = injector;
            _this.tag = tag;
            return _this;
          }

          return Styled;
        }(StyledElement)
      );
    }
    //# sourceMappingURL=styled.esm.js.map

    function prefix() {
      var classNames = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        classNames[_i] = arguments[_i];
      }
      return prefixNames.apply(void 0, __spreadArrays(['scena-'], classNames));
    }
    //# sourceMappingURL=utils.js.map

    var RULER = prefix('ruler');
    var ADDER = prefix('guide', 'adder');
    var GUIDES = prefix('guides');
    var GUIDE = prefix('guide');
    var DRAGGING = prefix('dragging');
    var DISPLAY_DRAG = prefix('display-drag');
    var GUIDES_CSS = prefixCSS('scena-', "\n{\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\ncanvas {\n    position: relative;\n}\n.guide-origin {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    top: 0;\n    left: 0;\n    opacity: 0;\n}\n.guides {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    will-change: transform;\n    z-index: 2000;\n}\n.guide-pos {\n    position: absolute;\n    font-weight: bold;\n    font-size: 12px;\n    color: #f33;\n}\n.horizontal .guide-pos {\n    bottom: 100%;\n    left: 50%;\n    transform: translate(-50%);\n}\n.vertical .guide-pos {\n    left: calc(100% + 2px);\n    top: 50%;\n    transform: translateY(-50%);\n}\n.display-drag {\n    position: absolute;\n    will-change: transform;\n    z-index: 2000;\n    font-weight: bold;\n    font-size: 12px;\n    display: none;\n    left: 20px;\n    top: -20px;\n    color: #f33;\n}\n:host.horizontal .guides {\n    width: 100%;\n    height: 0;\n}\n:host.vertical .guides {\n    height: 100%;\n    width: 0;\n}\n.guide {\n    position: absolute;\n    background: #f33;\n    z-index: 2;\n}\n.selected {\n    background: #8169FF;\n}\n.guide.dragging:before {\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n:host.horizontal .guide {\n    width: 100%;\n    height: 1px;\n    cursor: row-resize;\n}\n:host.vertical .guide {\n    width: 1px;\n    height: 100%;\n    cursor: col-resize;\n}\n:host.horizontal .dragging,\n:host.horizontal .selected {\n    height: 2px\n}\n:host.vertical .dragging,\n:host.vertical .selected {\n    width: 2px\n}\n.mobile :host.horizontal .guide {\n    transform: scale(1, 2);\n}\n.mobile :host.vertical .guide {\n    transform: scale(2, 1);\n}\n:host.horizontal .guide:before {\n    height: 10px;\n    margin-top: -5px;\n    display: block;\n    content: '';\n}\n:host.vertical .guide:before {\n    width: 10px;\n    height: 100%;\n    margin-left: -5px;\n    display: block;\n    content: '';\n}\n.adder {\n    display: none;\n}\n.adder.dragging {\n    display: block;\n}\n");
    var PROPERTIES$1 = __spreadArrays(['className', 'rulerStyle', 'snapThreshold', 'snaps', 'displayDragPos', 'cspNonce', 'dragPosFormat', 'defaultGuides', 'showGuides'], PROPERTIES);
    var METHODS = ['getGuides', 'loadGuides', 'scroll', 'scrollGuides', 'resize', 'deleteSelectedGuide', 'resetSelected', 'clearAllGuides'];
    var EVENTS = ['changeGuides', 'dragStart', 'drag', 'dragEnd', 'clickRuler', 'deleteGuide', 'addGuide', 'resetGuides'];
    //# sourceMappingURL=consts.js.map

    var GuidesElement = styled$1('div', GUIDES_CSS);
    var Guides = /*#__PURE__*/function (_super) {
      __extends(Guides, _super);
      function Guides(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
          guides: [],
          selectedGuides: []
        };
        _this.scrollPos = 0;
        _this.guideElements = [];
        _this._isFirstMove = false;
        _this.onDragStart = function (e) {
          _this.resetSelected();
          _this.props.onDragStart(e);
          _this._isFirstMove = true;
        };
        _this.onDrag = function (e) {
          if (_this._isFirstMove) {
            _this._isFirstMove = false;
            addClass(e.datas.target, DRAGGING);
          }
          var nextPos = _this.movePos(e);
          /**
           * When dragging, the drag event is called.
           * @memberof Guides
           * @event drag
           * @param {OnDrag} - Parameters for the drag event
           */
          _this.props.onDrag(__assign(__assign({}, e), {
            dragElement: e.datas.target
          }));
          return nextPos;
        };
        _this.onDragEnd = function (e) {
          var datas = e.datas,
            isDrag = e.isDrag,
            distX = e.distX,
            distY = e.distY;
          if (!isDrag) {
            return;
          }
          var pos = _this.movePos(e);
          var guides = _this.state.guides;
          var _a = _this.props,
            onChangeGuides = _a.onChangeGuides,
            onAddGuide = _a.onAddGuide,
            zoom = _a.zoom,
            displayDragPos = _a.displayDragPos,
            digit = _a.digit,
            lockGuides = _a.lockGuides;
          var guidePos = parseFloat((pos / zoom).toFixed(digit || 0));
          if (displayDragPos) {
            _this.displayElement.style.cssText += 'display: none;';
          }
          removeClass(datas.target, DRAGGING);
          if (datas.fromRuler) {
            if (_this._isFirstMove) {
              /**
               * When click the ruler, the click ruler is called.
               * @memberof Guides
               * @event clickRuler
               * @param {OnClickRuler} - Parameters for the clickRuler event
               */
              _this.props.onClickRuler(__assign(__assign({}, e), {
                pos: 0
              }));
            }
            if (guidePos >= _this.scrollPos && guides.indexOf(guidePos) < 0) {
              _this.setState({
                guides: __spreadArrays(guides, [guidePos])
              }, function () {
                /**
                 * The `changeGuides` event occurs when the guideline is added / removed / changed.
                 * @memberof Guides
                 * @event changeGuides
                 * @param {OnChangeGuides} - Parameters for the changeGuides event
                 */
                onChangeGuides({
                  guides: _this.state.guides,
                  distX: distX,
                  distY: distY,
                  isAdd: true,
                  isRemove: false,
                  isChange: false
                });
                onAddGuide({
                  posNewGuide: guidePos
                });
              });
            }
          } else {
            var index = datas.target.getAttribute('data-index');
            var isRemove_1 = false;
            var isChange_1 = false;
            guides = __spreadArrays(guides);
            if (guidePos < _this.scrollPos) {
              if (lockGuides && (lockGuides === true || lockGuides.indexOf('remove') > -1)) {
                return;
              }
              var deletedPosGuide = guides[index];
              guides.splice(index, 1);
              _this.props.onDeleteGuide({
                deletedIndexGuide: index,
                deletedPosGuide: deletedPosGuide
              });
              isRemove_1 = true;
            } else if (guides.indexOf(guidePos) > -1) {
              return;
            } else {
              if (lockGuides && (lockGuides === true || lockGuides.indexOf('change') > -1)) {
                return;
              }
              guides[index] = guidePos;
              isChange_1 = true;
            }
            _this.setState({
              guides: guides
            }, function () {
              var nextGuides = _this.state.guides;
              onChangeGuides({
                distX: distX,
                distY: distY,
                guides: nextGuides,
                isAdd: false,
                isChange: isChange_1,
                isRemove: isRemove_1
              });
            });
          }
          /**
           * When the drag finishes, the dragEnd event is called.
           * @memberof Guides
           * @event dragEnd
           * @param {OnDragEnd} - Parameters for the dragEnd event
           */
          _this.props.onDragEnd(__assign(__assign({}, e), {
            dragElement: datas.target
          }));
        };
        window.addEventListener('keydown', function (e) {
          if (e.code === 'Backspace' && _this.state.selectedGuides.length) {
            _this.deleteSelectedGuide();
          }
        });
        window.addEventListener('click', function (e) {
          _this.resetSelected();
          e.stopPropagation();
        });
        return _this;
      }
      var __proto = Guides.prototype;
      __proto.disablePointerEventsOnScroll = function () {
        var _this = this;
        var _a;
        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.showGuides)) {
          return;
        }
        this._pointerEventsTimer && clearTimeout(this._pointerEventsTimer);
        this.guidesElement.style.pointerEvents = 'none';
        this._pointerEventsTimer = setTimeout(function () {
          _this.guidesElement.style.pointerEvents = 'auto';
        }, 300);
      };
      __proto.render = function () {
        var _a = this.props,
          className = _a.className,
          type = _a.type,
          zoom = _a.zoom,
          style = _a.style,
          rulerStyle = _a.rulerStyle,
          displayDragPos = _a.displayDragPos,
          cspNonce = _a.cspNonce,
          dragGuideStyle = _a.dragGuideStyle,
          portalContainer = _a.portalContainer;
        var props = this.props;
        var translateName = this.getTranslateName();
        var rulerProps = {};
        PROPERTIES.forEach(function (name) {
          if (name === 'style') {
            return;
          }
          rulerProps[name] = props[name];
        });
        return React.createElement(GuidesElement, {
          ref: ref(this, 'manager'),
          cspNonce: cspNonce,
          className: prefix('manager', type) + " " + className,
          portalContainer: portalContainer,
          style: style
        }, React.createElement("div", {
          className: prefix('guide-origin'),
          ref: ref(this, 'originElement')
        }), React.createElement(Ruler, __assign({
          ref: ref(this, 'ruler'),
          style: rulerStyle
        }, rulerProps)), React.createElement("div", {
          className: GUIDES,
          ref: ref(this, 'guidesElement'),
          style: {
            transform: translateName + "(" + -this.scrollPos * zoom + "px)"
          }
        }, displayDragPos && React.createElement("div", {
          className: DISPLAY_DRAG,
          ref: ref(this, 'displayElement'),
          style: dragGuideStyle
        }), React.createElement("div", {
          className: ADDER,
          ref: ref(this, 'adderElement')
        }), this.renderGuides()));
      };
      __proto.selectGuide = function (pos, e) {
        this.setState({
          selectedGuides: [pos]
        });
        e.stopPropagation();
        e.preventDefault();
      };
      __proto.renderGuides = function () {
        var _this = this;
        var props = this.props;
        var _a = props,
          type = _a.type,
          zoom = _a.zoom,
          showGuides = _a.showGuides,
          guideStyle = _a.guideStyle,
          displayGuidePos = _a.displayGuidePos,
          _b = _a.guidePosStyle,
          guidePosStyle = _b === void 0 ? {} : _b;
        var translateName = this.getTranslateName();
        var guides = this.state.guides;
        var guidePosFormat = props.guidePosFormat || props.dragPosFormat || function (v) {
          return v;
        };
        var selectedGuides = this.state.selectedGuides;
        this.guideElements = [];
        if (showGuides) {
          return guides.map(function (pos, i) {
            return React.createElement("div", {
              className: prefix('guide', type) + " " + (selectedGuides.includes(pos) ? prefix('selected') : ''),
              ref: refs(_this, 'guideElements', i),
              key: i,
              "data-index": i,
              "data-pos": pos,
              onClick: function (e) {
                return _this.selectGuide(pos, e);
              },
              style: __assign(__assign({}, guideStyle), {
                transform: translateName + "(" + pos * zoom + "px) translateZ(0px)"
              })
            }, displayGuidePos && React.createElement("div", {
              className: prefix('guide-pos'),
              style: guidePosStyle || {}
            }, guidePosFormat(pos)));
          });
        }
        return;
      };
      __proto.componentDidMount = function () {
        var _this = this;
        this.gesto = new Gesto(this.manager.getElement(), {
          container: document.body
        }).on('dragStart', function (e) {
          var _a = _this.props,
            type = _a.type,
            zoom = _a.zoom,
            lockGuides = _a.lockGuides;
          if (lockGuides === true) {
            e.stop();
            return;
          }
          var inputEvent = e.inputEvent;
          var target = inputEvent.target;
          var datas = e.datas;
          var canvasElement = _this.ruler.canvasElement;
          var guidesElement = _this.guidesElement;
          var isHorizontal = type === 'horizontal';
          var originRect = _this.originElement.getBoundingClientRect();
          var matrix = getDistElementMatrix(_this.manager.getElement());
          var offsetPos = calculateMatrixDist(matrix, [e.clientX - originRect.left, e.clientY - originRect.top]);
          offsetPos[0] -= guidesElement.offsetLeft;
          offsetPos[1] -= guidesElement.offsetTop;
          offsetPos[isHorizontal ? 1 : 0] += _this.scrollPos * zoom;
          datas.offsetPos = offsetPos;
          datas.matrix = matrix;
          var isLockAdd = lockGuides && lockGuides.indexOf('add') > -1;
          var isLockRemove = lockGuides && lockGuides.indexOf('remove') > -1;
          var isLockChange = lockGuides && lockGuides.indexOf('change') > -1;
          if (target === canvasElement) {
            if (isLockAdd) {
              e.stop();
              return;
            }
            datas.fromRuler = true;
            datas.target = _this.adderElement;
            // add
          } else if (hasClass(target, GUIDE)) {
            if (isLockRemove && isLockChange) {
              e.stop();
              return;
            }
            datas.target = target;
            // change
          } else {
            e.stop();
            return false;
          }
          _this.onDragStart(e);
        }).on('drag', this.onDrag).on('dragEnd', this.onDragEnd);
        // pass array of guides on mount data to create gridlines or something like that in ui
        this.setState({
          guides: this.props.defaultGuides || []
        });
      };
      __proto.componentWillUnmount = function () {
        this.gesto.unset();
      };
      __proto.componentDidUpdate = function (prevProps) {
        if (prevProps.defaultGuides !== this.props.defaultGuides) {
          // to dynamically update guides from code rather than dragging guidelines
          this.setState({
            guides: this.props.defaultGuides || []
          });
        }
      };
      /**
       * Load the current guidelines.
       * @memberof Guides
       * @instance
       */
      __proto.loadGuides = function (guides) {
        this.setState({
          guides: guides
        });
      };
      /**
       * Delete the selected guideline.
       * @memberof Guides
       * @instance
       */
      __proto.deleteSelectedGuide = function () {
        var _this = this;
        var guides = this.getGuides();
        var guidesClone = this.getGuides();
        var index = guides.findIndex(function (guide) {
          if (_this.state.selectedGuides.includes(guide)) {
            return guide;
          }
        });
        guides.splice(index, 1);
        this.setState({
          guides: guides,
          selectedGuides: []
        });
        this.props.onDeleteGuide({
          deletedPosGuide: guidesClone[index],
          deletedIndexGuide: index
        });
      };
      /**
       * Clear all guidelines
       * @memberof Guides
       * @instance
       */
      __proto.clearAllGuides = function () {
        this.setState({
          guides: []
        });
      };
      /**
       * Get current guidelines.
       * @memberof Guides
       * @instance
       */
      __proto.getGuides = function () {
        return this.state.guides;
      };
      /**
       * Scroll the positions of the guidelines opposite the ruler.
       * @memberof Guides
       * @instance
       */
      __proto.scrollGuides = function (pos, zoom) {
        if (zoom === void 0) {
          zoom = 1;
        }
        var guidesElement = this.guidesElement;
        this.disablePointerEventsOnScroll();
        this.scrollPos = pos;
        guidesElement.style.transform = this.getTranslateName() + "(" + -pos * zoom + "px)";
        var guides = this.state.guides;
        this.guideElements.forEach(function (el, i) {
          if (!el) {
            return;
          }
          el.style.display = -pos + guides[i] < 0 ? 'none' : 'block';
        });
      };
      /**
       * Recalculate the size of the ruler.
       * @memberof Guides
       * @instance
       */
      __proto.resize = function () {
        this.ruler.resize();
      };
      /**
       * Scroll the position of the ruler.
       * @memberof Guides
       * @instance
       */
      __proto.scroll = function (pos) {
        this.ruler.scroll(pos);
      };
      __proto.movePos = function (e) {
        var datas = e.datas,
          distX = e.distX,
          distY = e.distY;
        var props = this.props;
        var type = props.type,
          zoom = props.zoom,
          snaps = props.snaps,
          snapThreshold = props.snapThreshold,
          displayDragPos = props.displayDragPos,
          digit = props.digit;
        var dragPosFormat = props.dragPosFormat || function (v) {
          return v;
        };
        var isHorizontal = type === 'horizontal';
        var matrixPos = calculateMatrixDist(datas.matrix, [distX, distY]);
        var offsetPos = datas.offsetPos;
        var offsetX = matrixPos[0] + offsetPos[0];
        var offsetY = matrixPos[1] + offsetPos[1];
        var nextPos = Math.round(isHorizontal ? offsetY : offsetX);
        var guidePos = parseFloat((nextPos / zoom).toFixed(digit || 0));
        var guideSnaps = snaps.slice().sort(function (a, b) {
          return Math.abs(guidePos - a) - Math.abs(guidePos - b);
        });
        if (guideSnaps.length && Math.abs(guideSnaps[0] * zoom - nextPos) < snapThreshold) {
          guidePos = guideSnaps[0];
          nextPos = guidePos * zoom;
        }
        if (!datas.fromRuler || !this._isFirstMove) {
          if (displayDragPos) {
            var displayPos = type === 'horizontal' ? [offsetX, nextPos] : [nextPos, offsetY];
            this.displayElement.style.cssText += 'display: block;' + 'transform: translate(-50%, -50%) ' + ("translate(" + displayPos.map(function (v) {
              return v + "px";
            }).join(', ') + ")");
            this.displayElement.innerHTML = "" + dragPosFormat(guidePos);
          }
          var target = datas.target;
          target.setAttribute('data-pos', guidePos);
          target.style.transform = this.getTranslateName() + "(" + nextPos + "px)";
        }
        return nextPos;
      };
      __proto.getTranslateName = function () {
        return this.props.type === 'horizontal' ? 'translateY' : 'translateX';
      };
      __proto.resetSelected = function () {
        this.setState({
          selectedGuides: []
        });
      };
      Guides.defaultProps = {
        className: '',
        type: 'horizontal',
        zoom: 1,
        style: {},
        snapThreshold: 5,
        snaps: [],
        digit: 0,
        onClickRuler: function () {},
        onAddGuide: function () {},
        onDeleteGuide: function () {},
        onChangeGuides: function () {},
        onDragStart: function () {},
        onDrag: function () {},
        onDragEnd: function () {},
        displayDragPos: false,
        dragPosFormat: function (v) {
          return v;
        },
        defaultGuides: [],
        lockGuides: false,
        showGuides: true,
        guideStyle: {},
        dragGuideStyle: {},
        guidePosStyle: {},
        portalContainer: null
      };
      return Guides;
    }(React.PureComponent);

    //# sourceMappingURL=index.js.map

    var InnerGuides = /*#__PURE__*/function (_super) {
      __extends(InnerGuides, _super);
      function InnerGuides(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.state = __assign({}, props);
        return _this;
      }
      var __proto = InnerGuides.prototype;
      __proto.render = function () {
        var _a = this.state,
          container = _a.container,
          state = __rest(_a, ["container"]);
        return reactDom.createPortal(React.createElement(Guides, __assign({
          ref: ref(this, 'guides')
        }, state)), container);
      };
      return InnerGuides;
    }(React.Component);
    //# sourceMappingURL=InnerGuides.js.map

    var Guides$1 = /*#__PURE__*/function (_super) {
      __extends(Guides, _super);
      /**
       * @sort 1
       * @param - guides' container
       * @param {$ts:Partial<Guides.GuidesOptions>} - guides' options
       */
      function Guides(container, options) {
        if (options === void 0) {
          options = {};
        }
        var _this = _super.call(this) || this;
        _this.tempElement = document.createElement('div');
        var events = {};
        EVENTS.forEach(function (name) {
          events[camelize("on " + name)] = function (e) {
            return _this.trigger(name, e);
          };
        });
        reactDom.render(React.createElement(InnerGuides, __assign({}, options, events, {
          container: container,
          ref: ref(_this, 'innerGuides')
        })), _this.tempElement);
        return _this;
      }
      /**
       * @param state
       * @param callback
       */
      var __proto = Guides.prototype;
      __proto.setState = function (state, callback) {
        this.innerGuides.setState(state, callback);
      };
      /**
       * destroy guides
       */
      __proto.destroy = function () {
        reactDom.render(null, this.tempElement);
        this.tempElement = null;
        this.innerGuides = null;
      };
      __proto.getInnerGuides = function () {
        return this.innerGuides.guides;
      };
      Guides = __decorate([Properties(METHODS, function (prototype, property) {
        if (prototype[property]) {
          return;
        }
        prototype[property] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var self = this.getInnerGuides();
          if (!self || !self[property]) {
            return;
          }
          return self[property].apply(self, args);
        };
      }), Properties(PROPERTIES$1, function (prototype, property) {
        Object.defineProperty(prototype, property, {
          get: function () {
            return this.getInnerGuides().props[property];
          },
          set: function (value) {
            var _a;
            this.innerGuides.setState((_a = {}, _a[property] = value, _a));
          },
          enumerable: true,
          configurable: true
        });
      })
      /**
       * @sort 1
       * @extends EventEmitter
       */], Guides);
      return Guides;
    }(EventEmitter);
    //# sourceMappingURL=GuidesManager.js.map

    var Guides$2 = /*#__PURE__*/function (_super) {
      __extends(Guides, _super);
      function Guides() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return Guides;
    }(Guides$1);
    //# sourceMappingURL=index.js.map

    return Guides$2;

})));
//# sourceMappingURL=guides.js.map
