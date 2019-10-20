import $ from 'jquery';

$.easing.jswing = $.easing.swing;
$.extend($.easing, {
	def: 'easeOutQuad',
	swing(e, f, a, h, g) {
		return $.easing[$.easing.def](e, f, a, h, g);
	},
	easeInQuad(e, f, a, h, g) {
		return h * (f /= g) * f + a;
	},
	easeOutQuad(e, f, a, h, g) {
		return -h * (f /= g) * (f - 2) + a;
	},
	easeInOutQuad(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f + a;
		}
		return (-h / 2) * (--f * (f - 2) - 1) + a;
	},
	easeInCubic(e, f, a, h, g) {
		return h * (f /= g) * f * f + a;
	},
	easeOutCubic(e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f + 1) + a;
	},
	easeInOutCubic(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f + a;
		}
		return (h / 2) * ((f -= 2) * f * f + 2) + a;
	},
	easeInQuart(e, f, a, h, g) {
		return h * (f /= g) * f * f * f + a;
	},
	easeOutQuart(e, f, a, h, g) {
		return -h * ((f = f / g - 1) * f * f * f - 1) + a;
	},
	easeInOutQuart(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f * f + a;
		}
		return (-h / 2) * ((f -= 2) * f * f * f - 2) + a;
	},
	easeInQuint(e, f, a, h, g) {
		return h * (f /= g) * f * f * f * f + a;
	},
	easeOutQuint(e, f, a, h, g) {
		return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
	},
	easeInOutQuint(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (h / 2) * f * f * f * f * f + a;
		}
		return (h / 2) * ((f -= 2) * f * f * f * f + 2) + a;
	},
	easeInSine(e, f, a, h, g) {
		return -h * Math.cos((f / g) * (Math.PI / 2)) + h + a;
	},
	easeOutSine(e, f, a, h, g) {
		return h * Math.sin((f / g) * (Math.PI / 2)) + a;
	},
	easeInOutSine(e, f, a, h, g) {
		return (-h / 2) * (Math.cos((Math.PI * f) / g) - 1) + a;
	},
	easeInExpo(e, f, a, h, g) {
		return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
	},
	easeOutExpo(e, f, a, h, g) {
		return f == g ? a + h : h * (-Math.pow(2, (-10 * f) / g) + 1) + a;
	},
	easeInOutExpo(e, f, a, h, g) {
		if (f == 0) {
			return a;
		}
		if (f == g) {
			return a + h;
		}
		if ((f /= g / 2) < 1) {
			return (h / 2) * Math.pow(2, 10 * (f - 1)) + a;
		}
		return (h / 2) * (-Math.pow(2, -10 * --f) + 2) + a;
	},
	easeInCirc(e, f, a, h, g) {
		return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
	},
	easeOutCirc(e, f, a, h, g) {
		return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
	},
	easeInOutCirc(e, f, a, h, g) {
		if ((f /= g / 2) < 1) {
			return (-h / 2) * (Math.sqrt(1 - f * f) - 1) + a;
		}
		return (h / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
	},
	easeInElastic(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}

		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		return (
			-(
				g *
				Math.pow(2, 10 * (h -= 1)) *
				Math.sin(((h * k - i) * (2 * Math.PI)) / j)
			) + e
		);
	},
	easeOutElastic(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k) == 1) {
			return e + l;
		}
		if (!j) {
			j = k * 0.3;
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		return (
			g * Math.pow(2, -10 * h) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) +
			l +
			e
		);
	},
	easeInOutElastic(f, h, e, l, k) {
		var i = 1.70158;
		var j = 0;
		var g = l;
		if (h == 0) {
			return e;
		}
		if ((h /= k / 2) == 2) {
			return e + l;
		}
		if (!j) {
			j = k * (0.3 * 1.5);
		}
		if (g < Math.abs(l)) {
			g = l;
			var i = j / 4;
		} else {
			var i = (j / (2 * Math.PI)) * Math.asin(l / g);
		}
		if (h < 1) {
			return (
				-0.5 *
					(g *
						Math.pow(2, 10 * (h -= 1)) *
						Math.sin(((h * k - i) * (2 * Math.PI)) / j)) +
				e
			);
		}
		return (
			g *
				Math.pow(2, -10 * (h -= 1)) *
				Math.sin(((h * k - i) * (2 * Math.PI)) / j) *
				0.5 +
			l +
			e
		);
	},
	easeInBack(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * (f /= h) * f * ((g + 1) * f - g) + a;
	},
	easeOutBack(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
	},
	easeInOutBack(e, f, a, i, h, g) {
		if (g == undefined) {
			g = 1.70158;
		}
		if ((f /= h / 2) < 1) {
			return (i / 2) * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
		}
		return (i / 2) * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
	},
	easeInBounce(e, f, a, h, g) {
		return h - $.easing.easeOutBounce(e, g - f, 0, h, g) + a;
	},
	easeOutBounce(e, f, a, h, g) {
		if ((f /= g) < 1 / 2.75) {
			return h * (7.5625 * f * f) + a;
		}
		if (f < 2 / 2.75) {
			return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
		}
		if (f < 2.5 / 2.75) {
			return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
		}
		return h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a;
	},
	easeInOutBounce(e, f, a, h, g) {
		if (f < g / 2) {
			return $.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
		}
		return $.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
	},
});

export default $;
