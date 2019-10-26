/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-svg-setclasses-shiv ! */
!(function(e, t, n) {
	function a(e, t) {
		return typeof e === t;
	}
	function o() {
		var e;
		var t;
		var n;
		var o;
		var r;
		var c;
		var l;
		for (var f in s)
			if (s.hasOwnProperty(f)) {
				if (
					((e = []),
					(t = s[f]),
					t.name &&
						(e.push(t.name.toLowerCase()),
						t.options && t.options.aliases && t.options.aliases.length))
				)
					for (n = 0; n < t.options.aliases.length; n++)
						e.push(t.options.aliases[n].toLowerCase());
				for (o = a(t.fn, 'function') ? t.fn() : t.fn, r = 0; r < e.length; r++)
					(c = e[r]),
						(l = c.split('.')),
						l.length === 1
							? (Modernizr[l[0]] = o)
							: (!Modernizr[l[0]] ||
									Modernizr[l[0]] instanceof Boolean ||
									(Modernizr[l[0]] = new Boolean(Modernizr[l[0]])),
							  (Modernizr[l[0]][l[1]] = o)),
						i.push((o ? '' : 'no-') + l.join('-'));
			}
	}
	function r(e) {
		var t = l.className;
		var n = Modernizr._config.classPrefix || '';
		if ((f && (t = t.baseVal), Modernizr._config.enableJSClass)) {
			var a = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)');
			t = t.replace(a, '$1' + n + 'js$2');
		}
		Modernizr._config.enableClasses &&
			((t += ' ' + n + e.join(' ' + n)),
			f ? (l.className.baseVal = t) : (l.className = t));
	}
	var i = [];
	var s = [];
	var c = {
		_version: '3.6.0',
		_config: {
			classPrefix: '',
			enableClasses: !0,
			enableJSClass: !0,
			usePrefixes: !0,
		},
		_q: [],
		on: function(e, t) {
			var n = this;
			setTimeout(function() {
				t(n[e]);
			}, 0);
		},
		addTest: function(e, t, n) {
			s.push({ name: e, fn: t, options: n });
		},
		addAsyncTest: function(e) {
			s.push({ name: null, fn: e });
		},
	};
	var Modernizr = function() {};
	(Modernizr.prototype = c),
		(Modernizr = new Modernizr()),
		Modernizr.addTest(
			'svg',
			!!t.createElementNS &&
				!!t.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
		);
	var l = t.documentElement;
	var f = l.nodeName.toLowerCase() === 'svg';
	f ||
		!(function(e, t) {
			function n(e, t) {
				var n = e.createElement('p');
				var a = e.getElementsByTagName('head')[0] || e.documentElement;
				return (
					(n.innerHTML = 'x<style>' + t + '</style>'),
					a.insertBefore(n.lastChild, a.firstChild)
				);
			}
			function a() {
				var e = E.elements;
				return typeof e === 'string' ? e.split(' ') : e;
			}
			function o(e, t) {
				var n = E.elements;
				typeof n !== 'string' && (n = n.join(' ')),
					typeof e !== 'string' && (e = e.join(' ')),
					(E.elements = n + ' ' + e),
					l(t);
			}
			function r(e) {
				var t = y[e[g]];
				return t || ((t = {}), v++, (e[g] = v), (y[v] = t)), t;
			}
			function i(e, n, a) {
				if ((n || (n = t), u)) return n.createElement(e);
				a || (a = r(n));
				var o;
				return (
					(o = a.cache[e]
						? a.cache[e].cloneNode()
						: p.test(e)
						? (a.cache[e] = a.createElem(e)).cloneNode()
						: a.createElem(e)),
					!o.canHaveChildren || h.test(e) || o.tagUrn
						? o
						: a.frag.appendChild(o)
				);
			}
			function s(e, n) {
				if ((e || (e = t), u)) return e.createDocumentFragment();
				n = n || r(e);
				for (
					var o = n.frag.cloneNode(), i = 0, s = a(), c = s.length;
					c > i;
					i++
				)
					o.createElement(s[i]);
				return o;
			}
			function c(e, t) {
				t.cache ||
					((t.cache = {}),
					(t.createElem = e.createElement),
					(t.createFrag = e.createDocumentFragment),
					(t.frag = t.createFrag())),
					(e.createElement = function(n) {
						return E.shivMethods ? i(n, e, t) : t.createElem(n);
					}),
					(e.createDocumentFragment = Function(
						'h,f',
						'return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(' +
							a()
								.join()
								.replace(/[\w\-:]+/g, function(e) {
									return (
										t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
									);
								}) +
							');return n}'
					)(E, t.frag));
			}
			function l(e) {
				e || (e = t);
				var a = r(e);
				return (
					!E.shivCSS ||
						f ||
						a.hasCSS ||
						(a.hasCSS = !!n(
							e,
							'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}'
						)),
					u || c(e, a),
					e
				);
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
			!(function() {
				try {
					var e = t.createElement('a');
					(e.innerHTML = '<xyz></xyz>'),
						(f = 'hidden' in e),
						(u =
							e.childNodes.length == 1 ||
							(function() {
								t.createElement('a');
								var e = t.createDocumentFragment();
								return (
									typeof e.cloneNode === 'undefined' ||
									typeof e.createDocumentFragment === 'undefined' ||
									typeof e.createElement === 'undefined'
								);
							})());
				} catch (n) {
					(f = !0), (u = !0);
				}
			})();
			var E = {
				elements:
					m.elements ||
					'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
				version: d,
				shivCSS: m.shivCSS !== !1,
				supportsUnknownElements: u,
				shivMethods: m.shivMethods !== !1,
				type: 'default',
				shivDocument: l,
				createElement: i,
				createDocumentFragment: s,
				addElements: o,
			};
			(e.html5 = E),
				l(t),
				typeof module === 'object' && module.exports && (module.exports = E);
		})(typeof e !== 'undefined' ? e : this, t),
		o(),
		r(i),
		delete c.addTest,
		delete c.addAsyncTest;
	for (var u = 0; u < Modernizr._q.length; u++) Modernizr._q[u]();
	e.Modernizr = Modernizr;
})(window, document);
