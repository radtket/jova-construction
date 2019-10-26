// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/modernizr-custom.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-svg-setclasses-shiv ! */
!function (e, t, n) {
  function a(e, t) {
    return _typeof(e) === t;
  }

  function o() {
    var e;
    var t;
    var n;
    var o;
    var r;
    var c;
    var l;

    for (var f in s) {
      if (s.hasOwnProperty(f)) {
        if (e = [], t = s[f], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }

        for (o = a(t.fn, 'function') ? t.fn() : t.fn, r = 0; r < e.length; r++) {
          c = e[r], l = c.split('.'), l.length === 1 ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), i.push((o ? '' : 'no-') + l.join('-'));
        }
      }
    }
  }

  function r(e) {
    var t = l.className;
    var n = Modernizr._config.classPrefix || '';

    if (f && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var a = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)');
      t = t.replace(a, '$1' + n + 'js$2');
    }

    Modernizr._config.enableClasses && (t += ' ' + n + e.join(' ' + n), f ? l.className.baseVal = t : l.className = t);
  }

  var i = [];
  var s = [];
  var c = {
    _version: '3.6.0',
    _config: {
      classPrefix: '',
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e]);
      }, 0);
    },
    addTest: function addTest(e, t, n) {
      s.push({
        name: e,
        fn: t,
        options: n
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      s.push({
        name: null,
        fn: e
      });
    }
  };

  var Modernizr = function Modernizr() {};

  Modernizr.prototype = c, Modernizr = new Modernizr(), Modernizr.addTest('svg', !!t.createElementNS && !!t.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
  var l = t.documentElement;
  var f = l.nodeName.toLowerCase() === 'svg';
  f || !function (e, t) {
    function n(e, t) {
      var n = e.createElement('p');
      var a = e.getElementsByTagName('head')[0] || e.documentElement;
      return n.innerHTML = 'x<style>' + t + '</style>', a.insertBefore(n.lastChild, a.firstChild);
    }

    function a() {
      var e = E.elements;
      return typeof e === 'string' ? e.split(' ') : e;
    }

    function o(e, t) {
      var n = E.elements;
      typeof n !== 'string' && (n = n.join(' ')), typeof e !== 'string' && (e = e.join(' ')), E.elements = n + ' ' + e, l(t);
    }

    function r(e) {
      var t = y[e[g]];
      return t || (t = {}, v++, e[g] = v, y[v] = t), t;
    }

    function i(e, n, a) {
      if (n || (n = t), u) return n.createElement(e);
      a || (a = r(n));
      var o;
      return o = a.cache[e] ? a.cache[e].cloneNode() : p.test(e) ? (a.cache[e] = a.createElem(e)).cloneNode() : a.createElem(e), !o.canHaveChildren || h.test(e) || o.tagUrn ? o : a.frag.appendChild(o);
    }

    function s(e, n) {
      if (e || (e = t), u) return e.createDocumentFragment();
      n = n || r(e);

      for (var o = n.frag.cloneNode(), i = 0, s = a(), c = s.length; c > i; i++) {
        o.createElement(s[i]);
      }

      return o;
    }

    function c(e, t) {
      t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
        return E.shivMethods ? i(n, e, t) : t.createElem(n);
      }, e.createDocumentFragment = Function('h,f', 'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' + a().join().replace(/[\w\-:]+/g, function (e) {
        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")';
      }) + ');return n}')(E, t.frag);
    }

    function l(e) {
      e || (e = t);
      var a = r(e);
      return !E.shivCSS || f || a.hasCSS || (a.hasCSS = !!n(e, 'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}')), u || c(e, a), e;
    }

    var f;
    var u;
    var d = '3.7.3';
    var m = e.html5 || {};
    var h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
    var p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
    var g = '_html5shiv';
    var v = 0;
    var y = {};
    !function () {
      try {
        var e = t.createElement('a');
        e.innerHTML = '<xyz></xyz>', f = 'hidden' in e, u = e.childNodes.length == 1 || function () {
          t.createElement('a');
          var e = t.createDocumentFragment();
          return typeof e.cloneNode === 'undefined' || typeof e.createDocumentFragment === 'undefined' || typeof e.createElement === 'undefined';
        }();
      } catch (n) {
        f = !0, u = !0;
      }
    }();
    var E = {
      elements: m.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
      version: d,
      shivCSS: m.shivCSS !== !1,
      supportsUnknownElements: u,
      shivMethods: m.shivMethods !== !1,
      type: 'default',
      shivDocument: l,
      createElement: i,
      createDocumentFragment: s,
      addElements: o
    };
    e.html5 = E, l(t), (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports && (module.exports = E);
  }(typeof e !== 'undefined' ? e : this, t), o(), r(i), delete c.addTest, delete c.addAsyncTest;

  for (var u = 0; u < Modernizr._q.length; u++) {
    Modernizr._q[u]();
  }

  e.Modernizr = Modernizr;
}(window, document);
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64459" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/modernizr-custom.js"], null)
//# sourceMappingURL=/modernizr-custom.35b973c6.js.map