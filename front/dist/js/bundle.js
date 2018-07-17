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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(12);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _burlak = __webpack_require__(2);

var Burlak = _interopRequireWildcard(_burlak);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var view = Burlak.InView;
var request = new Burlak.Request();
var getTop = function getTop() {
	return request.get({
		url: 'https://peaceful-earth-20444.herokuapp.com/my',
		clearData: true
	}).then(function (result) {
		result.sort(function (a, b) {
			var priceA = parseFloat(a.price),
			    priceB = parseFloat(b.price);
			if (priceA < priceB) return 1;
			if (priceA > priceB) return -1;
		});
		var top = result[0]['price'] ? result[0]['price'] : 0;
		return top;
	}).catch(function (error) {
		return 0;
	});
};

var runGetTop = function runGetTop() {
	getTop().then(function (top) {
		document.body.innerHTML = top;
		top = parseFloat(top);
		var oldTop = localStorage.getItem('price') ? parseFloat(localStorage.getItem('price')) : 0;
		console.log(top != oldTop);
		if (top != oldTop) {
			localStorage.setItem('price', top);
			var notification = new Notification(top);
		}

		runGetTop();
	});
};

runGetTop();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InView = exports.Hash = exports.Date = exports.Random = exports.Url = exports.Storage = exports.Cookie = exports.Dom = exports.Request = undefined;

var _Request = __webpack_require__(3);

var _Dom = __webpack_require__(4);

var _Cookie = __webpack_require__(5);

var _Storage = __webpack_require__(6);

var _Url = __webpack_require__(7);

var _Random = __webpack_require__(8);

var _Date = __webpack_require__(9);

var _Hash = __webpack_require__(10);

var _InView = __webpack_require__(11);

var Request = exports.Request = _Request.Request;
var Dom = exports.Dom = _Dom.Dom;
var Cookie = exports.Cookie = _Cookie.Cookie;
var Storage = exports.Storage = _Storage.Storage;
var Url = exports.Url = _Url.Url;
var Random = exports.Random = _Random.Random;
var Date = exports.Date = _Date.Date;
var Hash = exports.Hash = _Hash.Hash;
var InView = exports.InView = _InView.InView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var makeRequest = function makeRequest(method, request) {
	// start: function
	// end: function
	// clearData: boolean
	// url: string
	// data: object
	// headers: object

	return new Promise(function (resolve, reject) {
		if (!request) reject('Empty request');
		request.start && request.start();
		var xhr = new XMLHttpRequest(),
		    url = request.url ? request.url : '',
		    async = request.async ? request.async : true,
		    requestData = request.data,
		    clearData = request.clearData ? true : false,
		    getCount = 0;

		if (method === 'GET') {
			for (var data in requestData) {
				if (!getCount) {
					url += '?' + data + '=' + requestData[data];
				} else {
					url += '&' + data + '=' + requestData[data];
				}
				getCount++;
			}
		}

		xhr.open(method, url, async);
		if (request.headers) {
			for (var header in request.headers) {
				xhr.setRequestHeader(header, request.headers[header]);
			}
		}
		xhr.send(JSON.stringify(requestData));
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status < 200 || xhr.status > 300) {
				request.end && request.end();
				reject(xhr);
			} else {
				request.end && request.end();
				var response = clearData ? JSON.parse(xhr.response) : xhr;
				resolve(response);
			}
		};
	});
};

var Request = exports.Request = function Request() {
	this.post = function (request) {
		return makeRequest('POST', request);
	};
	this.get = function (request) {
		return makeRequest('GET', request);
	};
	this.put = function (request) {
		return makeRequest('PUT', request);
	};
	this.delete = function (request) {
		return makeRequest('DELETE', request);
	};
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Dom = exports.Dom = function Dom() {
	this.createElem = function (tag, props, html, children) {
		var element = document.createElement(tag);
		for (var prop in props) {
			element.setAttribute(prop, props[prop]);
		}
		if (html) element.innerHTML = html;
		if (children) {
			if (children instanceof Element) {
				element.appendChild(children);
			}
			if (children instanceof Array) {
				children.forEach(function (elem, index) {
					elem instanceof Element && element.appendChild(elem);
				});
			}
		}
		return element;
	};

	this.removeElem = function (elem) {
		if (Element.prototype.remove) {
			elem.remove();
		} else {
			var parent = elem.parentNode;
			parent.removeChild(elem);
		}
	};

	this.getStyle = function (elem, rule) {
		var result = '';
		if (document.defaultView && document.defaultView.getComputedStyle) {
			result = document.defaultView.getComputedStyle(elem, '').getPropertyValue(rule);
		} else if (elem.currentStyle) {
			rule = rule.replace(/\-(\w)/g, function (strMatch, p1) {
				return p1.toUpperCase();
			});
			result = elem.currentStyle[rule];
		}
		return result;
	};
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Cookie = exports.Cookie = function Cookie() {
	this.set = function (name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	};

	this.get = function (name) {
		var stateReq = name + '=',
		    cookieArr = document.cookie.split(';');
		for (var i = 0; i < cookieArr.length; i++) {
			var cookie = cookieArr[i];
			while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1, cookie.length);
			}if (cookie.indexOf(stateReq) == 0) return cookie.substring(stateReq.length, cookie.length);
		}
		return null;
	};

	this.remove = function (name) {
		document.cookie = name + '=; Max-Age=-1; path=/';
	};

	this.clear = function () {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		});
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Storage = exports.Storage = function Storage() {
	var localStorage = window.localStorage;
	this.set = function (name, value) {
		localStorage.setItem(name, value);
		return this.get(name);
	};
	this.get = function (name) {
		return localStorage.getItem(name) || null;
	};
	this.remove = function (name) {
		localStorage.removeItem(name);
		return true;
	};
	this.clear = function () {
		localStorage.clear();
		return true;
	};
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Url = exports.Url = function Url() {
	this.getParametr = function (name) {
		if (name = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search)) {
			return decodeURIComponent(name[1]);
		}
		return null;
	};
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Random = exports.Random = function Random() {
	this.defaultSystem = 10;
	this.defaultLength = 13;
	this.defaultUIdCount = 4;
	this.maxLength = this.defaultLength;

	this.single = function () {
		var system = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultSystem;
		var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultLength;

		if (length > this.maxLength) {
			length = this.maxLength;
			console.warn('Max length of random number is ' + this.maxLength);
		}
		var rand = window.Math.floor(window.Math.random() * 0x10000000000000),
		    result = void 0;
		rand = rand.toString(system).substring(1), result = rand.split('').splice(0, length).join('');
		return result;
	};

	this.multy = function () {
		var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultUIdCount;
		var system = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultSystem;
		var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.defaultLength;

		var result = '';
		for (var i = 0; i < count; i++) {
			result += this.single(system, length) + '-';
			if (i == count - 1) result = result.substring(0, result.length - 1);
		}
		return result;
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Date = exports.Date = function Date() {
	var Date = window.Date;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Hash = exports.Hash = function Hash() {
	this.sha256 = function (s) {
		var chrsz = 8;
		var hexcase = 0;
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return msw << 16 | lsw & 0xFFFF;
		}

		function S(X, n) {
			return X >>> n | X << 32 - n;
		}
		function R(X, n) {
			return X >>> n;
		}
		function Ch(x, y, z) {
			return x & y ^ ~x & z;
		}
		function Maj(x, y, z) {
			return x & y ^ x & z ^ y & z;
		}
		function Sigma0256(x) {
			return S(x, 2) ^ S(x, 13) ^ S(x, 22);
		}
		function Sigma1256(x) {
			return S(x, 6) ^ S(x, 11) ^ S(x, 25);
		}
		function Gamma0256(x) {
			return S(x, 7) ^ S(x, 18) ^ R(x, 3);
		}
		function Gamma1256(x) {
			return S(x, 17) ^ S(x, 19) ^ R(x, 10);
		}

		function core_sha256(m, l) {
			var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
			var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
			var W = new Array(64);
			var a, b, c, d, e, f, g, h, i, j;
			var T1, T2;

			m[l >> 5] |= 0x80 << 24 - l % 32;
			m[(l + 64 >> 9 << 4) + 15] = l;

			for (var i = 0; i < m.length; i += 16) {
				a = HASH[0];
				b = HASH[1];
				c = HASH[2];
				d = HASH[3];
				e = HASH[4];
				f = HASH[5];
				g = HASH[6];
				h = HASH[7];

				for (var j = 0; j < 64; j++) {
					if (j < 16) W[j] = m[j + i];else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

					T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
					T2 = safe_add(Sigma0256(a), Maj(a, b, c));

					h = g;
					g = f;
					f = e;
					e = safe_add(d, T1);
					d = c;
					c = b;
					b = a;
					a = safe_add(T1, T2);
				}

				HASH[0] = safe_add(a, HASH[0]);
				HASH[1] = safe_add(b, HASH[1]);
				HASH[2] = safe_add(c, HASH[2]);
				HASH[3] = safe_add(d, HASH[3]);
				HASH[4] = safe_add(e, HASH[4]);
				HASH[5] = safe_add(f, HASH[5]);
				HASH[6] = safe_add(g, HASH[6]);
				HASH[7] = safe_add(h, HASH[7]);
			}
			return HASH;
		}

		function str2binb(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz) {
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32;
			}
			return bin;
		}

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode(c >> 6 | 192);
					utftext += String.fromCharCode(c & 63 | 128);
				} else {
					utftext += String.fromCharCode(c >> 12 | 224);
					utftext += String.fromCharCode(c >> 6 & 63 | 128);
					utftext += String.fromCharCode(c & 63 | 128);
				}
			}

			return utftext;
		}

		function binb2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
			}
			return str;
		}

		s = Utf8Encode(s);
		return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	};
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var InView = exports.InView = function InView(selector, options) {
    this.items = document.querySelectorAll(selector);
    this.in = options.in ? options.in : false;
    this.out = options.out ? options.out : false;
    this.scrollTop = 0;
    this.offset = options.offset ? options.offset : 0;

    this.setScrollTop = function (top) {
        this.scrollTop = top;
    };

    this.checkItem = function (e) {
        var elem = e.getBoundingClientRect(),
            offset = this.offset,
            windowHeight = window.innerHeight;
        if (elem.top + offset + windowHeight <= windowHeight * 2 && elem.top - offset + elem.height >= 0) {
            return true;
        }
        return false;
    };

    this.checkItems = function () {
        var _this = this;

        if (!this.items) return false;
        this.items.forEach(function (e, i) {
            var boolCheck = _this.checkItem(e);
            if (boolCheck && _this.in) _this.in(e);
            if (!boolCheck && _this.out) _this.out(e);
        });
    };

    this.watch = function () {
        var _this2 = this;

        this.setScrollTop(window.pageYOffset);
        this.checkItems();
        window.addEventListener('scroll', function () {
            _this2.setScrollTop(window.pageYOffset);
            _this2.checkItems();
        });
        window.addEventListener('resize', function () {
            _this2.setScrollTop(window.pageYOffset);
            _this2.checkItems();
        });
    };

    this.watch();
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map