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
})({"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"assets/scss/site.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/layout/header_bg.png":[["header_bg.329c3bb6.png","assets/images/layout/header_bg.png"],"assets/images/layout/header_bg.png"],"./../images/layout/header_cursor.png":[["header_cursor.5e4f3c0b.png","assets/images/layout/header_cursor.png"],"assets/images/layout/header_cursor.png"],"./../images/layout/header_btn-menu.png":[["header_btn-menu.3de951b1.png","assets/images/layout/header_btn-menu.png"],"assets/images/layout/header_btn-menu.png"],"./../images/layout/header_btn-menu-txt.png":[["header_btn-menu-txt.78c5678e.png","assets/images/layout/header_btn-menu-txt.png"],"assets/images/layout/header_btn-menu-txt.png"],"./../images/layout/home_btn-scroll-down.png":[["home_btn-scroll-down.7062d3d0.png","assets/images/layout/home_btn-scroll-down.png"],"assets/images/layout/home_btn-scroll-down.png"],"./../images/layout/gallery_share-icons.png":[["gallery_share-icons.735384ed.png","assets/images/layout/gallery_share-icons.png"],"assets/images/layout/gallery_share-icons.png"],"./../images/layout/header_btn-previous.png":[["header_btn-previous.c359f322.png","assets/images/layout/header_btn-previous.png"],"assets/images/layout/header_btn-previous.png"],"./../images/layout/header_btn-next.png":[["header_btn-next.161d81ee.png","assets/images/layout/header_btn-next.png"],"assets/images/layout/header_btn-next.png"],"./../images/layout/gallery_cursor.png":[["gallery_cursor.89d8922a.png","assets/images/layout/gallery_cursor.png"],"assets/images/layout/gallery_cursor.png"],"./../images/layout/btn_arrow.png":[["btn_arrow.a7e49652.png","assets/images/layout/btn_arrow.png"],"assets/images/layout/btn_arrow.png"],"./../images/layout/btn_arrow-inverted.png":[["btn_arrow-inverted.2c8c5c3e.png","assets/images/layout/btn_arrow-inverted.png"],"assets/images/layout/btn_arrow-inverted.png"],"./../images/layout/footer_logo.png":[["footer_logo.966e9d70.png","assets/images/layout/footer_logo.png"],"assets/images/layout/footer_logo.png"],"./../images/layout/about_btn-scroll-down.png":[["about_btn-scroll-down.5e644e6a.png","assets/images/layout/about_btn-scroll-down.png"],"assets/images/layout/about_btn-scroll-down.png"],"./../images/layout/about_signature.png":[["about_signature.ff5d3612.png","assets/images/layout/about_signature.png"],"assets/images/layout/about_signature.png"],"./../images/layout/icon_1.png":[["icon_1.7f8f049a.png","assets/images/layout/icon_1.png"],"assets/images/layout/icon_1.png"],"./../images/layout/home_signature.png":[["home_signature.e8418ef7.png","assets/images/layout/home_signature.png"],"assets/images/layout/home_signature.png"],"./../images/layout/icon_1-small-dark.png":[["icon_1-small-dark.ceb49b36.png","assets/images/layout/icon_1-small-dark.png"],"assets/images/layout/icon_1-small-dark.png"],"./../images/layout/header_logo.png":[["header_logo.4d3656c0.png","assets/images/layout/header_logo.png"],"assets/images/layout/header_logo.png"],"./../images/layout/tips_btn-arrow.png":[["tips_btn-arrow.e23f4864.png","assets/images/layout/tips_btn-arrow.png"],"assets/images/layout/tips_btn-arrow.png"],"./../images/layout/bullet_dash-white.png":[["bullet_dash-white.5f5e505a.png","assets/images/layout/bullet_dash-white.png"],"assets/images/layout/bullet_dash-white.png"],"./../images/layout/contact_share-separator.png":[["contact_share-separator.3b3a6eb2.png","assets/images/layout/contact_share-separator.png"],"assets/images/layout/contact_share-separator.png"],"./../images/layout/contact_share-fb.png":[["contact_share-fb.a8c5dfb9.png","assets/images/layout/contact_share-fb.png"],"assets/images/layout/contact_share-fb.png"],"./../images/layout/contact_share-twitter.png":[["contact_share-twitter.87a1e265.png","assets/images/layout/contact_share-twitter.png"],"assets/images/layout/contact_share-twitter.png"],"./../images/layout/contact_share-pinterest.png":[["contact_share-pinterest.ca475d85.png","assets/images/layout/contact_share-pinterest.png"],"assets/images/layout/contact_share-pinterest.png"],"./../images/layout/icon_3.png":[["icon_3.85a11744.png","assets/images/layout/icon_3.png"],"assets/images/layout/icon_3.png"],"./../images/layout/icon_2.png":[["icon_2.e86664b5.png","assets/images/layout/icon_2.png"],"assets/images/layout/icon_2.png"],"./../images/layout/bullet_dash.png":[["bullet_dash.25a8407d.png","assets/images/layout/bullet_dash.png"],"assets/images/layout/bullet_dash.png"],"./../images/layout/icon_2-dark.png":[["icon_2-dark.f1ec289e.png","assets/images/layout/icon_2-dark.png"],"assets/images/layout/icon_2-dark.png"],"./../images/layout/icon_4.png":[["icon_4.f5d3e30d.png","assets/images/layout/icon_4.png"],"assets/images/layout/icon_4.png"],"./../images/layout/portfolio_icon-door.png":[["portfolio_icon-door.d8a668df.png","assets/images/layout/portfolio_icon-door.png"],"assets/images/layout/portfolio_icon-door.png"],"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/site.ab2270ee.js.map