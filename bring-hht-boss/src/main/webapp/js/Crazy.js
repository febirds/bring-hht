(function(window, undefined) {
	var readyList,
		rootCrazy,
		core_strundefined = typeof undefined,
		document = window.document,
		location = window.location,
		_Crazy = window.Crazy,
		_$ = window.$,
		class2type = {},
		core_deletedIds = [],
		core_version = "1.0.1",
		core_concat = core_deletedIds.concat,
		core_push = core_deletedIds.push,
		core_slice = core_deletedIds.slice,
		core_indexOf = core_deletedIds.indexOf,
		core_toString = class2type.toString,
		core_hasOwn = class2type.hasOwnProperty,
		core_trim = core_version.trim,
		Crazy = function(selector, context) {
			return new Crazy.fn.init(selector, context, rootCrazy);
		},
		core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		core_rnotwhite = /\S+/g,
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase();
		},
		completed = function(event) {
			if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
				detach();
				Crazy.ready();
			}
		},
		detach = function() {
			if (document.addEventListener) {
				document.removeEventListener("DOMContentLoaded", completed, false);
				window.removeEventListener("load", completed, false);
			} else {
				document.detachEvent("onreadystatechange", completed);
				window.detachEvent("onload", completed);
			}
		};
	Crazy.fn = Crazy.prototype = {
		Crazy: core_version,
		constructor: Crazy,
		init: function(selector, context, rootCrazy) {
			var match, elem;
			if (!selector) return this;
			if (typeof selector === "string") {
				match = selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3 ? [null, selector, null] : match = rquickExpr.exec(selector);
				if (match && (match[1] || !context)) {
					if (match[1]) {
						context = context instanceof Crazy ? context[0] : context;
						Crazy.merge(this, Crazy.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						));
						if (rsingleTag.test(match[1]) && Crazy.isPlainObject(context)) {
							for (match in context) {
								if (Crazy.isFunction(this[match])) {
									this[match](context[match]);
								} else {
									this.attr(match, context[match]);
								}
							}
						}
						return this;
					} else {
						elem = document.getElementById(match[2]);
						if (elem && elem.parentNode) {
							if (elem.id !== match[2]) {
								return rootCrazy.find(selector);
							}
							this.length = 1;
							this[0] = elem;
						}
						this.context = document;
						this.selector = selector;
						return this;
					}
				} else if (!context || context.Crazy) {
					return (context || rootCrazy).find(selector);
				} else {
					return this.constructor(context).find(selector);
				}
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			} else if (Crazy.isFunction(selector)) {
				return rootCrazy.ready(selector);
			}
			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
			return Crazy.makeArray(selector, this);
		},
		selector: "",
		length: 0,
		size: function() {
			return this.length;
		},
		toArray: function() {
			return core_slice.call(this);
		},
		get: function(num) {
			return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
		},
		pushStack: function(elems) {
			var ret = Crazy.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret;
		},
		each: function(callback, args) {
			return Crazy.each(this, callback, args);
		},
		ready: function(fn) {
			Crazy.ready.promise().done(fn);
			return this;
		},
		slice: function() {
			return this.pushStack(core_slice.apply(this, arguments));
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(-1);
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
		map: function(callback) {
			return this.pushStack(Crazy.map(this, function(elem, i) {
				return callback.call(elem, i, elem);
			}));
		},
		end: function() {
			return this.prevObject || this.constructor(null);
		},
		push: core_push,
		sort: [].sort,
		splice: [].splice
	};
	Crazy.fn.init.prototype = Crazy.fn;
	Crazy.extend = Crazy.fn.extend = function() {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (typeof target !== "object" && !Crazy.isFunction(target)) target = {};
		if (length === i) {
			target = this;
			--i;
		}
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					if (deep && copy && (Crazy.isPlainObject(copy) || (copyIsArray = Crazy.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Crazy.isArray(src) ? src : [];
						} else {
							clone = src && Crazy.isPlainObject(src) ? src : {};
						}
						target[name] = Crazy.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	};
	Crazy.extend({
		noConflict: function(deep) {
			if (window.$ === Crazy) {
				window.$ = _$;
			}
			if (deep && window.Crazy === Crazy) {
				window.Crazy = _Crazy;
			}
			return Crazy;
		},
		isReady: false,
		readyWait: 1,
		holdReady: function(hold) {
			if (hold) {
				Crazy.readyWait++;
			} else {
				Crazy.ready(true);
			}
		},
		ready: function(wait) {
			if (wait === true ? --Crazy.readyWait : Crazy.isReady) return;
			if (!document.body) return setTimeout(Crazy.ready);
			Crazy.isReady = true;
			if (wait !== true && --Crazy.readyWait > 0) return;
			readyList.resolveWith(document, [Crazy]);
			if (Crazy.fn.trigger) Crazy(document).trigger("ready").off("ready");
		},
		isFunction: function(obj) {
			return Crazy.type(obj) === "function";
		},
		isArray: Array.isArray || function(obj) {
			return Crazy.type(obj) === "array";
		},
		isWindow: function(obj) {
			return obj != null && obj == obj.window;
		},
		isNumeric: function(obj) {
			return !isNaN(parseFloat(obj)) && isFinite(obj);
		},
		type: function(obj) {
			if (obj == null) return String(obj);
			return typeof obj === "object" || typeof obj === "function" ? class2type[core_toString.call(obj)] || "object" : typeof obj;
		},
		isPlainObject: function(obj) {
			if (!obj || Crazy.type(obj) !== "object" || obj.nodeType || Crazy.isWindow(obj)) return false;
			try {
				if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return false;
			} catch (e) {
				return false;
			}
			var key;
			for (key in obj) {};
			return key === undefined || core_hasOwn.call(obj, key);
		},
		isEmptyObject: function(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},
		error: function(msg) {
			throw new Error(msg);
		},
		parseHTML: function(data, context, keepScripts) {
			if (!data || typeof data !== "string") return null;
			if (typeof context === "boolean") {
				keepScripts = context;
				context = false;
			}
			context = context || document;
			var parsed = rsingleTag.exec(data),
				scripts = !keepScripts && [];
			if (parsed) return [context.createElement(parsed[1])];
			parsed = Crazy.buildFragment([data], context, scripts);
			if (scripts) Crazy(scripts).remove();
			return Crazy.merge([], parsed.childNodes);
		},
		parseJSON: function(data) {
			if (window.JSON && window.JSON.parse) return window.JSON.parse(data);
			if (data === null) return data;
			if (typeof data === "string") {
				data = Crazy.trim(data);
				if (data && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) return (new Function("return " + data))();
			}
			Crazy.error("Invalid JSON: " + data);
		},
		parseXML: function(data) {
			var xml, tmp;
			if (!data || typeof data !== "string") return null;
			try {
				if (window.DOMParser) {
					tmp = new DOMParser();
					xml = tmp.parseFromString(data, "text/xml");
				} else {
					xml = new ActiveXObject("Microsoft.XMLDOM");
					xml.async = "false";
					xml.loadXML(data);
				}
			} catch (e) {
				xml = undefined;
			}
			if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
				Crazy.error("Invalid XML: " + data);
			}
			return xml;
		},
		noop: function() {},
		globalEval: function(data) {
			if (data && Crazy.trim(data)) {
				(window.execScript || function(data) {
					window["eval"].call(window, data);
				})(data);
			}
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},
		nodeName: function(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
		each: function(obj, callback, args) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					};
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					};
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					};
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					};
				}
			}
			return obj;
		},
		trim: function(text) {
			return text == null ? "" : (core_trim && !core_trim.call("\uFEFF\xA0") ? core_trim.call(text) : (text + "").replace(rtrim, ""));
		},
		makeArray: function(arr, results) {
			var ret = results || [];
			if (arr != null) isArraylike(Object(arr)) ? Crazy.merge(ret, (typeof arr === "string" ? [arr] : arr)) : core_push.call(ret, arr);
			return ret;
		},
		inArray: function(elem, arr, i) {
			var len;
			if (arr) {
				if (core_indexOf) return core_indexOf.call(arr, elem, i);
				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
				for (; i < len; i++) {
					if (i in arr && arr[i] === elem) return i;
				};
			}
			return -1;
		},
		merge: function(first, second) {
			var l = second.length,
				i = first.length,
				j = 0;
			if (typeof l === "number") {
				for (; j < l; j++) {
					first[i++] = second[j];
				};
			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				};
			}
			first.length = i;
			return first;
		},
		grep: function(elems, callback, inv) {
			var retVal,
				ret = [],
				i = 0,
				length = elems.length;
			inv = !! inv;
			for (; i < length; i++) {
				retVal = !! callback(elems[i], i);
				if (inv !== retVal) ret.push(elems[i]);
			};
			return ret;
		},
		map: function(elems, callback, arg) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) ret[ret.length] = value;
				};
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) ret[ret.length] = value;
				}
			}
			return core_concat.apply([], ret);
		},
		guid: 1,
		proxy: function(fn, context) {
			var args, proxy, tmp;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}
			if (!Crazy.isFunction(fn)) return undefined;
			args = core_slice.call(arguments, 2);
			proxy = function() {
				return fn.apply(context || this, args.concat(core_slice.call(arguments)));
			};
			proxy.guid = fn.guid = fn.guid || Crazy.guid++;
			return proxy;
		},
		access: function(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
				length = elems.length,
				bulk = key == null;
			if (Crazy.type(key) === "object") {
				chainable = true;
				for (i in key) Crazy.access(elems, fn, i, key[i], true, emptyGet, raw);
			} else if (value !== undefined) {
				chainable = true;
				if (!Crazy.isFunction(value)) raw = true;
				if (bulk) {
					if (raw) {
						fn.call(elems, value);
						fn = null;
					} else {
						bulk = fn;
						fn = function(elem, key, value) {
							return bulk.call(Crazy(elem), value);
						};
					}
				}
				if (fn) {
					for (; i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
			return chainable ? elems : (bulk ? fn.call(elems) : (length ? fn(elems[0], key) : emptyGet));
		},
		now: function() {
			return (new Date()).getTime();
		}
	});
	Crazy.ready.promise = function(obj) {
		if (!readyList) {
			readyList = Crazy.Deferred();
			if (document.readyState === "complete") {
				setTimeout(Crazy.ready);
			} else if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false);
			} else {
				document.attachEvent("onreadystatechange", completed);
				window.attachEvent("onload", completed);
				var top = false;
				try {
					top = window.frameElement == null && document.documentElement;
				} catch (e) {};
				if (top && top.doScroll) {
					(function doScrollCheck() {
						if (!Crazy.isReady) {
							try {
								top.doScroll("left");
							} catch (e) {
								return setTimeout(doScrollCheck, 50);
							};
							detach();
							Crazy.ready();
						}
					})();
				}
			}
		}
		return readyList.promise(obj);
	};
	Crazy.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArraylike(obj) {
		var length = obj.length,
			type = Crazy.type(obj);
		if (Crazy.isWindow(obj)) return false;
		if (obj.nodeType === 1 && length) return true;
		return type === "array" || type !== "function" &&
			(length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj);
	};
	rootCrazy = Crazy(document);
	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		Crazy.each(options.match(core_rnotwhite) || [], function(_, flag) {
			object[flag] = true;
		});
		return object;
	};
	Crazy.Callbacks = function(options) {
		options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : Crazy.extend({}, options);
		var firing,
			memory,
			fired,
			firingLength,
			firingIndex,
			firingStart,
			list = [],
			stack = !options.once && [],
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
						memory = false;
						break;
					}
				};
				firing = false;
				if (list) {
					if (stack) {
						if (stack.length) {
							fire(stack.shift());
						}
					} else if (memory) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			self = {
				add: function() {
					if (list) {
						var start = list.length;
						(function add(args) {
							Crazy.each(args, function(_, arg) {
								var type = Crazy.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) list.push(arg);
								} else if (arg && arg.length && type !== "string") {
									add(arg);
								}
							});
						})(arguments);
						if (firing) {
							firingLength = list.length;
						} else if (memory) {
							firingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				remove: function() {
					if (list) {
						Crazy.each(arguments, function(_, arg) {
							var index;
							while ((index = Crazy.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);

								if (firing) {
									if (index <= firingLength) {
										firingLength--;
									}
									if (index <= firingIndex) {
										firingIndex--;
									}
								}
							};
						});
					}
					return this;
				},
				has: function(fn) {
					return fn ? Crazy.inArray(fn, list) > -1 : !! (list && list.length);
				},
				empty: function() {
					list = [];
					return this;
				},
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				disabled: function() {
					return !list;
				},
				lock: function() {
					stack = undefined;
					if (!memory) {
						self.disable();
					}
					return this;
				},
				locked: function() {
					return !stack;
				},
				fireWith: function(context, args) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					if (list && (!fired || stack)) {
						if (firing) {
							stack.push(args);
						} else {
							fire(args);
						}
					}
					return this;
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this;
				},
				fired: function() {
					return !!fired;
				}
			};
		return self;
	};
	Crazy.extend({
		Deferred: function(func) {
			var tuples = [
				["resolve", "done", Crazy.Callbacks("once memory"), "resolved"],
				["reject", "fail", Crazy.Callbacks("once memory"), "rejected"],
				["notify", "progress", Crazy.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function() {
						var fns = arguments;
						return Crazy.Deferred(function(newDefer) {
							Crazy.each(tuples, function(i, tuple) {
								var action = tuple[0],
									fn = Crazy.isFunction(fns[i]) && fns[i];
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if (returned && Crazy.isFunction(returned.promise)) {
										returned.promise()
											.done(newDefer.resolve)
											.fail(newDefer.reject)
											.progress(newDefer.notify);
									} else {
										newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
									}
								});
							});
							fns = null;
						}).promise();
					},
					promise: function(obj) {
						return obj != null ? Crazy.extend(obj, promise) : promise;
					}
				},
				deferred = {};
			promise.pipe = promise.then;
			Crazy.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if (stateString) {
					list.add(function() {
						state = stateString;
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});
			promise.promise(deferred);
			if (func) func.call(deferred, deferred);
			return deferred;
		},
		when: function(subordinate) {
			var i = 0,
				resolveValues = core_slice.call(arguments),
				length = resolveValues.length,
				remaining = length !== 1 || (subordinate && Crazy.isFunction(subordinate.promise)) ? length : 0,
				deferred = remaining === 1 ? subordinate : Crazy.Deferred(),
				updateFunc = function(i, contexts, values) {
					return function(value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values);
						} else if (!(--remaining)) {
							deferred.resolveWith(contexts, values);
						}
					};
				},
				progressValues, progressContexts, resolveContexts;
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && Crazy.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
					} else {
						--remaining;
					}
				};
			}
			if (!remaining) deferred.resolveWith(resolveContexts, resolveValues);
			return deferred.promise();
		}
	});
	Crazy.support = (function() {
		var support, all, a,
			input, select, fragment,
			opt, eventName, isSupported, i,
			div = document.createElement("div");
		div.setAttribute("className", "t");
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		all = div.getElementsByTagName("*");
		a = div.getElementsByTagName("a")[0];
		if (!all || !a || !all.length) return {};
		select = document.createElement("select");
		opt = select.appendChild(document.createElement("option"));
		input = div.getElementsByTagName("input")[0];
		a.style.cssText = "top:1px;float:left;opacity:.5";
		support = {
			getSetAttribute: div.className !== "t",
			leadingWhitespace: div.firstChild.nodeType === 3,
			tbody: !div.getElementsByTagName("tbody").length,
			htmlSerialize: !! div.getElementsByTagName("link").length,
			style: /top/.test(a.getAttribute("style")),
			hrefNormalized: a.getAttribute("href") === "/a",
			opacity: /^0.5/.test(a.style.opacity),
			cssFloat: !! a.style.cssFloat,
			checkOn: !! input.value,
			optSelected: opt.selected,
			enctype: !! document.createElement("form").enctype,
			html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
			boxModel: document.compatMode === "CSS1Compat",
			deleteExpando: true,
			noCloneEvent: true,
			inlineBlockNeedsLayout: false,
			shrinkWrapBlocks: false,
			reliableMarginRight: true,
			boxSizingReliable: true,
			pixelPosition: false
		};
		input.checked = true;
		support.noCloneChecked = input.cloneNode(true).checked;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		try {
			delete div.test;
		} catch (e) {
			support.deleteExpando = false;
		};
		input = document.createElement("input");
		input.setAttribute("value", "");
		support.input = input.getAttribute("value") === "";
		input.value = "t";
		input.setAttribute("type", "radio");
		support.radioValue = input.value === "t";
		input.setAttribute("checked", "t");
		input.setAttribute("name", "t");
		fragment = document.createDocumentFragment();
		fragment.appendChild(input);
		support.appendChecked = input.checked;
		support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
		if (div.attachEvent) {
			div.attachEvent("onclick", function() {
				support.noCloneEvent = false;
			});
			div.cloneNode(true).click();
		}
		for (i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			div.setAttribute(eventName = "on" + i, "t");

			support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
		};
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		Crazy(function() {
			var container, marginDiv, tds,
				divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				body = document.getElementsByTagName("body")[0];
			if (!body) {
				return;
			}
			container = document.createElement("div");
			container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
			body.appendChild(container).appendChild(div);
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName("td");
			tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = (tds[0].offsetHeight === 0);
			tds[0].style.display = "";
			tds[1].style.display = "none";
			support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
			div.innerHTML = "";
			div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			support.boxSizing = (div.offsetWidth === 4);
			support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
			if (window.getComputedStyle) {
				support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
				support.boxSizingReliable = (window.getComputedStyle(div, null) || {
					width: "4px"
				}).width === "4px";
				marginDiv = div.appendChild(document.createElement("div"));
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
			}
			if (typeof div.style.zoom !== core_strundefined) {
				div.innerHTML = "";
				div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
				support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
				div.style.display = "block";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				support.shrinkWrapBlocks = (div.offsetWidth !== 3);
				if (support.inlineBlockNeedsLayout) {
					body.style.zoom = 1;
				}
			}
			body.removeChild(container);
			container = div = tds = marginDiv = null;
		});
		all = select = fragment = opt = a = input = null;
		return support;
	})();
	var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		rmultiDash = /([A-Z])/g;

	function internalData(elem, name, data, pvt) {
		if (!Crazy.acceptData(elem)) return;
		var thisCache, ret,
			internalKey = Crazy.expando,
			getByName = typeof name === "string",
			isNode = elem.nodeType,
			cache = isNode ? Crazy.cache : elem,
			id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
		if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) return;
		if (!id) {
			if (isNode) {
				elem[internalKey] = id = core_deletedIds.pop() || Crazy.guid++;
			} else {
				id = internalKey;
			}
		}
		if (!cache[id]) {
			cache[id] = {};
			if (!isNode) {
				cache[id].toJSON = Crazy.noop;
			}
		}
		if (typeof name === "object" || typeof name === "function") {
			if (pvt) {
				cache[id] = Crazy.extend(cache[id], name);
			} else {
				cache[id].data = Crazy.extend(cache[id].data, name);
			}
		}
		thisCache = cache[id];
		if (!pvt) {
			if (!thisCache.data) thisCache.data = {};
			thisCache = thisCache.data;
		}
		if (data !== undefined) thisCache[Crazy.camelCase(name)] = data;
		if (getByName) {
			ret = thisCache[name];
			if (ret == null) ret = thisCache[Crazy.camelCase(name)];
		} else {
			ret = thisCache;
		}
		return ret;
	};

	function internalRemoveData(elem, name, pvt) {
		if (!Crazy.acceptData(elem)) return;
		var i, l, thisCache,
			isNode = elem.nodeType,
			cache = isNode ? Crazy.cache : elem,
			id = isNode ? elem[Crazy.expando] : Crazy.expando;
		if (!cache[id]) return;
		if (name) {
			thisCache = pvt ? cache[id] : cache[id].data;
			if (thisCache) {
				if (!Crazy.isArray(name)) {
					if (name in thisCache) {
						name = [name];
					} else {
						name = Crazy.camelCase(name);
						if (name in thisCache) {
							name = [name];
						} else {
							name = name.split(" ");
						}
					}
				} else {
					name = name.concat(Crazy.map(name, Crazy.camelCase));
				}
				for (i = 0, l = name.length; i < l; i++) {
					delete thisCache[name[i]];
				};
				if (!(pvt ? isEmptyDataObject : Crazy.isEmptyObject)(thisCache)) return;
			}
		}
		if (!pvt) {
			delete cache[id].data;
			if (!isEmptyDataObject(cache[id])) return;
		}
		if (isNode) {
			Crazy.cleanData([elem], true);
		} else if (Crazy.support.deleteExpando || cache != cache.window) {
			delete cache[id];
		} else {
			cache[id] = null;
		}
	}
	Crazy.extend({
		cache: {},
		expando: "Crazy" + (core_version + Math.random()).replace(/\D/g, ""),
		noData: {
			"embed": true,
			"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			"applet": true
		},
		hasData: function(elem) {
			elem = elem.nodeType ? Crazy.cache[elem[Crazy.expando]] : elem[Crazy.expando];
			return !!elem && !isEmptyDataObject(elem);
		},
		data: function(elem, name, data) {
			return internalData(elem, name, data);
		},
		removeData: function(elem, name) {
			return internalRemoveData(elem, name);
		},
		_data: function(elem, name, data) {
			return internalData(elem, name, data, true);
		},
		_removeData: function(elem, name) {
			return internalRemoveData(elem, name, true);
		},
		acceptData: function(elem) {
			if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) return false;
			var noData = elem.nodeName && Crazy.noData[elem.nodeName.toLowerCase()];
			return !noData || noData !== true && elem.getAttribute("classid") === noData;
		}
	});
	Crazy.fn.extend({
		data: function(key, value) {
			var attrs, name,
				elem = this[0],
				i = 0,
				data = null;
			if (key === undefined) {
				if (this.length) {
					data = Crazy.data(elem);
					if (elem.nodeType === 1 && !Crazy._data(elem, "parsedAttrs")) {
						attrs = elem.attributes;
						for (; i < attrs.length; i++) {
							name = attrs[i].name;
							if (!name.indexOf("data-")) {
								name = Crazy.camelCase(name.slice(5));
								dataAttr(elem, name, data[name]);
							}
						};
						Crazy._data(elem, "parsedAttrs", true);
					}
				}
				return data;
			}
			if (typeof key === "object") return this.each(function() {
				Crazy.data(this, key);
			});
			return Crazy.access(this, function(value) {
				if (value === undefined) return elem ? dataAttr(elem, key, Crazy.data(elem, key)) : null;
				this.each(function() {
					Crazy.data(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},
		removeData: function(key) {
			return this.each(function() {
				Crazy.removeData(this, key);
			});
		}
	});

	function dataAttr(elem, key, data) {
		if (data === undefined && elem.nodeType === 1) {
			var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = data === "true" ? true : (data === "false" ? false : (data === "null" ? null : (+data + "" === data ? +data : (rbrace.test(data) ? Crazy.parseJSON(data) : data))));
				} catch (e) {};
				Crazy.data(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	};

	function isEmptyDataObject(obj) {
		var name;
		for (name in obj) {
			if (name === "data" && Crazy.isEmptyObject(obj[name])) {
				continue;
			}
			if (name !== "toJSON") return false;
		};
		return true;
	};
	Crazy.extend({
		queue: function(elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = Crazy._data(elem, type);
				if (data) {
					!queue || Crazy.isArray(data) ? queue = Crazy._data(elem, type, Crazy.makeArray(data)) : queue.push(data);
				}
				return queue || [];
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = Crazy.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = Crazy._queueHooks(elem, type),
				next = function() {
					Crazy.dequeue(elem, type);
				};
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}
			hooks.cur = fn;
			if (fn) {
				if (type === "fx") queue.unshift("inprogress");
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}
			if (!startLength && hooks) hooks.empty.fire();
		},
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return Crazy._data(elem, key) || Crazy._data(elem, key, {
				empty: Crazy.Callbacks("once memory").add(function() {
					Crazy._removeData(elem, type + "queue");
					Crazy._removeData(elem, key);
				})
			});
		}
	});
	Crazy.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}
			if (arguments.length < setter) return Crazy.queue(this[0], type);
			return data === undefined ? this : this.each(function() {
				var queue = Crazy.queue(this, type, data);
				Crazy._queueHooks(this, type);
				if (type === "fx" && queue[0] !== "inprogress") Crazy.dequeue(this, type);
			});
		},
		dequeue: function(type) {
			return this.each(function() {
				Crazy.dequeue(this, type);
			});
		},
		delay: function(time, type) {
			time = Crazy.fx ? Crazy.fx.speeds[time] || time : time;
			type = type || "fx";
			return this.queue(type, function(next, hooks) {
				var timeout = setTimeout(next, time);
				hooks.stop = function() {
					clearTimeout(timeout);
				};
			});
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", []);
		},
		promise: function(type, obj) {
			var tmp,
				count = 1,
				defer = Crazy.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!(--count)) {
						defer.resolveWith(elements, [elements]);
					}
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
			while (i--) {
				tmp = Crazy._data(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var nodeHook, boolHook,
		rclass = /[\t\r\n]/g,
		rreturn = /\r/g,
		rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i,
		rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		ruseDefault = /^(?:checked|selected)$/i,
		getSetAttribute = Crazy.support.getSetAttribute,
		getSetInput = Crazy.support.input;
	Crazy.fn.extend({
		attr: function(name, value) {
			return Crazy.access(this, Crazy.attr, name, value, arguments.length > 1);
		},
		removeAttr: function(name) {
			return this.each(function() {
				Crazy.removeAttr(this, name);
			});
		},
		prop: function(name, value) {
			return Crazy.access(this, Crazy.prop, name, value, arguments.length > 1);
		},
		removeProp: function(name) {
			name = Crazy.propFix[name] || name;
			return this.each(function() {
				try {
					this[name] = undefined;
					delete this[name];
				} catch (e) {}
			});
		},
		addClass: function(value) {
			var classes, elem, cur, clazz, j,
				i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;
			if (Crazy.isFunction(value)) return this.each(function(j) {
				Crazy(this).addClass(value.call(this, j, this.className));
			});
			if (proceed) {
				classes = (value || "").match(core_rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ?
						(" " + elem.className + " ").replace(rclass, " ") :
						" "
					);
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						};
						elem.className = Crazy.trim(cur);
					}
				};
			}
			return this;
		},
		removeClass: function(value) {
			var classes, elem, cur, clazz, j,
				i = 0,
				len = this.length,
				proceed = arguments.length === 0 || typeof value === "string" && value;
			if (Crazy.isFunction(value)) return this.each(function(j) {
				Crazy(this).removeClass(value.call(this, j, this.className));
			});
			if (proceed) {
				classes = (value || "").match(core_rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {

							while (cur.indexOf(" " + clazz + " ") >= 0) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						};
						elem.className = value ? Crazy.trim(cur) : "";
					}
				};
			}
			return this;
		},
		toggleClass: function(value, stateVal) {
			var type = typeof value,
				isBool = typeof stateVal === "boolean";
			if (Crazy.isFunction(value)) return this.each(function(i) {
				Crazy(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
			});
			return this.each(function() {
				if (type === "string") {
					var className,
						i = 0,
						self = Crazy(this),
						state = stateVal,
						classNames = value.match(core_rnotwhite) || [];
					while ((className = classNames[i++])) {

						state = isBool ? state : !self.hasClass(className);
						self[state ? "addClass" : "removeClass"](className);
					};
				} else if (type === core_strundefined || type === "boolean") {
					if (this.className) Crazy._data(this, "__className__", this.className);
					this.className = this.className || value === false ? "" : Crazy._data(this, "__className__") || "";
				}
			});
		},
		hasClass: function(selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++) {
				if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
					return true;
				}
			};
			return false;
		},
		val: function(value) {
			var ret, hooks, isFunction,
				elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks = Crazy.valHooks[elem.type] || Crazy.valHooks[elem.nodeName.toLowerCase()];
					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) return ret;
					ret = elem.value;
					return typeof ret === "string" ? ret.replace(rreturn, "") : (ret == null ? "" : ret);
				}
				return;
			}
			isFunction = Crazy.isFunction(value);
			return this.each(function(i) {
				var val,
					self = Crazy(this);
				if (this.nodeType !== 1) return;
				val = isFunction ? value.call(this, i, self.val()) : value;
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Crazy.isArray(val)) {
					val = Crazy.map(val, function(value) {
						return value == null ? "" : value + "";
					});
				}
				hooks = Crazy.valHooks[this.type] || Crazy.valHooks[this.nodeName.toLowerCase()];
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) this.value = val;
			});
		}
	});
	Crazy.extend({
		valHooks: {
			option: {
				get: function(elem) {
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}
			},
			select: {
				get: function(elem) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ? max : (one ? index : 0);
					for (; i < max; i++) {
						option = options[i];
						if ((option.selected || i === index) && (Crazy.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !Crazy.nodeName(option.parentNode, "optgroup"))) {
							value = Crazy(option).val();
							if (one) return value;
							values.push(value);
						}
					};
					return values;
				},
				set: function(elem, value) {
					var values = Crazy.makeArray(value);
					Crazy(elem).find("option").each(function() {
						this.selected = Crazy.inArray(Crazy(this).val(), values) >= 0;
					});
					if (!values.length) elem.selectedIndex = -1;
					return values;
				}
			}
		},
		attr: function(elem, name, value) {
			var hooks, notxml, ret,
				nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) return;
			if (typeof elem.getAttribute === core_strundefined) return Crazy.prop(elem, name, value);
			notxml = nType !== 1 || !Crazy.isXMLDoc(elem);
			if (notxml) {
				name = name.toLowerCase();
				hooks = Crazy.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
			}
			if (value !== undefined) {
				if (value === null) {
					Crazy.removeAttr(elem, name);
				} else if (hooks && notxml && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				} else {
					elem.setAttribute(name, value + "");
					return value;
				}
			} else if (hooks && notxml && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			} else {
				if (typeof elem.getAttribute !== core_strundefined) ret = elem.getAttribute(name);
				return ret == null ? undefined : ret;
			}
		},
		removeAttr: function(elem, value) {
			var name, propName,
				i = 0,
				attrNames = value && value.match(core_rnotwhite);
			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					propName = Crazy.propFix[name] || name;
					if (rboolean.test(name)) {
						if (!getSetAttribute && ruseDefault.test(name)) {
							elem[Crazy.camelCase("default-" + name)] = elem[propName] = false;
						} else {
							elem[propName] = false;
						}
					} else {
						Crazy.attr(elem, name, "");
					}
					elem.removeAttribute(getSetAttribute ? name : propName);
				};
			}
		},
		attrHooks: {
			type: {
				set: function(elem, value) {
					if (!Crazy.support.radioValue && value === "radio" && Crazy.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) elem.value = val;
						return value;
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(elem, name, value) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) return;
			notxml = nType !== 1 || !Crazy.isXMLDoc(elem);
			if (notxml) {
				name = Crazy.propFix[name] || name;
				hooks = Crazy.propHooks[name];
			}
			if (value !== undefined) {
				return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
			} else {
				return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
			}
		},
		propHooks: {
			tabIndex: {
				get: function(elem) {
					var attributeNode = elem.getAttributeNode("tabindex");
					return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined);
				}
			}
		}
	});
	boolHook = {
		get: function(elem, name) {
			var prop = Crazy.prop(elem, name),
				attr = typeof prop === "boolean" && elem.getAttribute(name),
				detail = typeof prop === "boolean" ? getSetInput && getSetAttribute ? attr != null : ruseDefault.test(name) ? elem[Crazy.camelCase("default-" + name)] : !! attr : elem.getAttributeNode(name);
			return detail && detail.value !== false ? name.toLowerCase() : undefined;
		},
		set: function(elem, value, name) {
			if (value === false) {
				Crazy.removeAttr(elem, name);
			} else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
				elem.setAttribute(!getSetAttribute && Crazy.propFix[name] || name, name);
			} else {
				elem[Crazy.camelCase("default-" + name)] = elem[name] = true;
			}
			return name;
		}
	};
	if (!getSetInput || !getSetAttribute) {
		Crazy.attrHooks.value = {
			get: function(elem, name) {
				var ret = elem.getAttributeNode(name);
				return Crazy.nodeName(elem, "input") ? elem.defaultValue : (ret && ret.specified ? ret.value : undefined);
			},
			set: function(elem, value, name) {
				if (Crazy.nodeName(elem, "input")) {
					elem.defaultValue = value;
				} else {
					return nodeHook && nodeHook.set(elem, value, name);
				}
			}
		};
	}
	if (!getSetAttribute) {
		nodeHook = Crazy.valHooks.button = {
			get: function(elem, name) {
				var ret = elem.getAttributeNode(name);
				return ret && (name === "id" || name === "name" || name === "coords" ? ret.value !== "" : (ret.specified) ? ret.value : ndefined);
			},
			set: function(elem, value, name) {
				var ret = elem.getAttributeNode(name);
				if (!ret) elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute(name))
				);
				ret.value = value += "";
				return name === "value" || value === elem.getAttribute(name) ? value : undefined;
			}
		};
		Crazy.attrHooks.contenteditable = {
			get: nodeHook.get,
			set: function(elem, value, name) {
				nodeHook.set(elem, value === "" ? false : value, name);
			}
		};
		Crazy.each(["width", "height"], function(i, name) {
			Crazy.attrHooks[name] = Crazy.extend(Crazy.attrHooks[name], {
				set: function(elem, value) {
					if (value === "") {
						elem.setAttribute(name, "auto");
						return value;
					}
				}
			});
		});
	}
	if (!Crazy.support.hrefNormalized) {
		Crazy.each(["href", "src", "width", "height"], function(i, name) {
			Crazy.attrHooks[name] = Crazy.extend(Crazy.attrHooks[name], {
				get: function(elem) {
					var ret = elem.getAttribute(name, 2);
					return ret == null ? undefined : ret;
				}
			});
		});
		Crazy.each(["href", "src"], function(i, name) {
			Crazy.propHooks[name] = {
				get: function(elem) {
					return elem.getAttribute(name, 4);
				}
			};
		});
	}
	if (!Crazy.support.style) Crazy.attrHooks.style = {
		get: function(elem) {
			return elem.style.cssText || undefined;
		},
		set: function(elem, value) {
			return (elem.style.cssText = value + "");
		}
	};
	if (!Crazy.support.optSelected) Crazy.propHooks.selected = Crazy.extend(Crazy.propHooks.selected, {
		get: function(elem) {
			var parent = elem.parentNode;
			if (parent) {
				parent.selectedIndex;
				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
	if (!Crazy.support.enctype) Crazy.propFix.enctype = "encoding";
	if (!Crazy.support.checkOn) Crazy.each(["radio", "checkbox"], function() {
		Crazy.valHooks[this] = {
			get: function(elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
	Crazy.each(["radio", "checkbox"], function() {
		Crazy.valHooks[this] = Crazy.extend(Crazy.valHooks[this], {
			set: function(elem, value) {
				if (Crazy.isArray(value)) {
					return (elem.checked = Crazy.inArray(Crazy(elem).val(), value) >= 0);
				}
			}
		});
	});
	var rformElems = /^(?:input|select|textarea)$/i,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	};

	function returnFalse() {
		return false;
	};

	Crazy.event = {
		global: {},
		add: function(elem, types, handler, data, selector) {
			var tmp, events, t, handleObjIn,
				special, eventHandle, handleObj,
				handlers, type, namespaces, origType,
				elemData = Crazy._data(elem);
			if (!elemData) return;
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
			if (!handler.guid) handler.guid = Crazy.guid++;
			if (!(events = elemData.events)) events = elemData.events = {};
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {
					return typeof Crazy !== core_strundefined && (!e || Crazy.event.triggered !== e.type) ? Crazy.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
				};
				eventHandle.elem = elem;
			}
			types = (types || "").match(core_rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				special = Crazy.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				special = Crazy.event.special[type] || {};
				handleObj = Crazy.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && Crazy.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle, false);
						} else if (elem.attachEvent) {
							elem.attachEvent("on" + type, eventHandle);
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) handleObj.handler.guid = handler.guid;
				}
				selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj);
				Crazy.event.global[type] = true;
			};
			elem = null;
		},
		remove: function(elem, types, handler, selector, mappedTypes) {
			var j, handleObj, tmp,
				origCount, t, events,
				special, handlers, type,
				namespaces, origType,
				elemData = Crazy.hasData(elem) && Crazy._data(elem);
			if (!elemData || !(events = elemData.events)) return;
			types = (types || "").match(core_rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					for (type in events) {
						Crazy.event.remove(elem, type + types[t], handler, selector, true);
					};
					continue;
				}
				special = Crazy.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);
						if (handleObj.selector) handlers.delegateCount--;
						if (special.remove) special.remove.call(elem, handleObj);
					}
				};
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) Crazy.removeEvent(elem, type, elemData.handle);
					delete events[type];
				}
			};
			if (Crazy.isEmptyObject(events)) {
				delete elemData.handle;
				Crazy._removeData(elem, "events");
			}
		},
		trigger: function(event, data, elem, onlyHandlers) {
			var handle, ontype, cur,
				bubbleType, special, tmp, i,
				eventPath = [elem || document],
				type = core_hasOwn.call(event, "type") ? event.type : event,
				namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
			cur = tmp = elem = elem || document;
			if (elem.nodeType === 3 || elem.nodeType === 8) return;
			if (rfocusMorph.test(type + Crazy.event.triggered)) return;
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			event = event[Crazy.expando] ? event : new Crazy.Event(type, typeof event === "object" && event);
			event.isTrigger = true;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
			event.result = undefined;
			if (!event.target) event.target = elem;
			data = data == null ? [event] : Crazy.makeArray(data, [event]);
			special = Crazy.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) return;
			if (!onlyHandlers && !special.noBubble && !Crazy.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) cur = cur.parentNode;
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				};
				if (tmp === (elem.ownerDocument || document)) eventPath.push(tmp.defaultView || tmp.parentWindow || window);
			}
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1 ? bubbleType : special.bindType || type;
				handle = (Crazy._data(cur, "events") || {})[event.type] && Crazy._data(cur, "handle");
				if (handle) handle.apply(cur, data);
				handle = ontype && cur[ontype];
				if (handle && Crazy.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) event.preventDefault();
			};
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && Crazy.nodeName(elem, "a")) && Crazy.acceptData(elem)) {
					if (ontype && elem[type] && !Crazy.isWindow(elem)) {
						tmp = elem[ontype];
						if (tmp) elem[ontype] = null;
						Crazy.event.triggered = type;
						try {
							elem[type]();
						} catch (e) {};
						Crazy.event.triggered = undefined;
						if (tmp) elem[ontype] = tmp;
					}
				}
			}
			return event.result;
		},
		dispatch: function(event) {
			event = Crazy.event.fix(event);
			var i, ret, handleObj, matched, j,
				handlerQueue = [],
				args = core_slice.call(arguments),
				handlers = (Crazy._data(this, "events") || {})[event.type] || [],
				special = Crazy.event.special[event.type] || {};
			args[0] = event;
			event.delegateTarget = this;
			if (special.preDispatch && special.preDispatch.call(this, event) === false) return;
			handlerQueue = Crazy.event.handlers.call(this, event, handlers);
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
					if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
						event.handleObj = handleObj;
						event.data = handleObj.data;
						ret = ((Crazy.event.special[handleObj.origType] || {}).handle || handleObj.handler)
							.apply(matched.elem, args);
						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				};
			};
			if (special.postDispatch) special.postDispatch.call(this, event);
			return event.result;
		},
		handlers: function(event, handlers) {
			var sel, handleObj, matches, i,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
				for (; cur != this; cur = cur.parentNode || this) {
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							sel = handleObj.selector + " ";
							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ?
									Crazy(sel, this).index(cur) >= 0 :
									Crazy.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) matches.push(handleObj);
						}
						if (matches.length) handlerQueue.push({
							elem: cur,
							handlers: matches
						});
					}
				};
			}
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: this,
					handlers: handlers.slice(delegateCount)
				});
			}
			return handlerQueue;
		},
		fix: function(event) {
			if (event[Crazy.expando]) return event;
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];
			if (!fixHook) this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : (rkeyEvent.test(type) ? this.keyHooks : {});
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
			event = new Crazy.Event(originalEvent);
			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			};
			if (!event.target) event.target = originalEvent.srcElement || document;
			if (event.target.nodeType === 3) event.target = event.target.parentNode;
			event.metaKey = !! event.metaKey;
			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(event, original) {
				if (event.which == null) event.which = original.charCode != null ? original.charCode : original.keyCode;
				return event;
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(event, original) {
				var body, eventDoc, doc,
					button = original.button,
					fromElement = original.fromElement;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}
				if (!event.relatedTarget && fromElement) event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
				if (!event.which && button !== undefined) event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
				return event;
			}
		},
		special: {
			load: {
				noBubble: true
			},
			click: {
				trigger: function() {
					if (Crazy.nodeName(this, "input") && this.type === "checkbox" && this.click) {
						this.click();
						return false;
					}
				}
			},
			focus: {
				trigger: function() {
					if (this !== document.activeElement && this.focus) {
						try {
							this.focus();
							return false;
						} catch (e) {};
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === document.activeElement && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			beforeunload: {
				postDispatch: function(event) {
					if (event.result !== undefined) event.originalEvent.returnValue = event.result;
				}
			}
		},
		simulate: function(type, elem, event, bubble) {
			var e = Crazy.extend(new Crazy.Event(), event, {
				type: type,
				isSimulated: true,
				originalEvent: {}
			});
			bubble ? Crazy.event.trigger(e, null, elem) : Crazy.event.dispatch.call(elem, e);
			if (e.isDefaultPrevented()) event.preventDefault();
		}
	};
	Crazy.removeEvent = document.removeEventListener ? function(elem, type, handle) {
		if (elem.removeEventListener) elem.removeEventListener(type, handle, false);
	} : function(elem, type, handle) {
		var name = "on" + type;
		if (elem.detachEvent) {
			if (typeof elem[name] === core_strundefined) elem[name] = null;
			elem.detachEvent(name, handle);
		}
	};
	Crazy.Event = function(src, props) {
		if (!(this instanceof Crazy.Event)) return new Crazy.Event(src, props);
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
		} else {
			this.type = src;
		}
		if (props) Crazy.extend(this, props);
		this.timeStamp = src && src.timeStamp || Crazy.now();
		this[Crazy.expando] = true;
	};
	Crazy.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (!e) return;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (!e) return;
			if (e.stopPropagation) e.stopPropagation();
			e.cancelBubble = true;
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		}
	};
	Crazy.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(orig, fix) {
		Crazy.event.special[orig] = {
			delegateType: fix,
			bindType: fix,
			handle: function(event) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
				if (!related || (related !== target && !Crazy.contains(target, related))) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});
	if (!Crazy.support.submitBubbles) {
		Crazy.event.special.submit = {
			setup: function() {
				if (Crazy.nodeName(this, "form")) return false;
				Crazy.event.add(this, "click._submit keypress._submit", function(e) {
					var elem = e.target,
						form = Crazy.nodeName(elem, "input") || Crazy.nodeName(elem, "button") ? elem.form : undefined;
					if (form && !Crazy._data(form, "submitBubbles")) {
						Crazy.event.add(form, "submit._submit", function(event) {
							event._submit_bubble = true;
						});
						Crazy._data(form, "submitBubbles", true);
					}
				});

			},
			postDispatch: function(event) {
				if (event._submit_bubble) {
					delete event._submit_bubble;
					if (this.parentNode && !event.isTrigger) Crazy.event.simulate("submit", this.parentNode, event, true);
				}
			},
			teardown: function() {
				if (Crazy.nodeName(this, "form")) return false;
				Crazy.event.remove(this, "._submit");
			}
		};
	}
	if (!Crazy.support.changeBubbles) {
		Crazy.event.special.change = {
			setup: function() {
				if (rformElems.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") {
						Crazy.event.add(this, "propertychange._change", function(event) {
							if (event.originalEvent.propertyName === "checked") this._just_changed = true;
						});
						Crazy.event.add(this, "click._change", function(event) {
							if (this._just_changed && !event.isTrigger) this._just_changed = false;
							Crazy.event.simulate("change", this, event, true);
						});
					}
					return false;
				}
				Crazy.event.add(this, "beforeactivate._change", function(e) {
					var elem = e.target;
					if (rformElems.test(elem.nodeName) && !Crazy._data(elem, "changeBubbles")) {
						Crazy.event.add(elem, "change._change", function(event) {
							if (this.parentNode && !event.isSimulated && !event.isTrigger) {
								Crazy.event.simulate("change", this.parentNode, event, true);
							}
						});
						Crazy._data(elem, "changeBubbles", true);
					}
				});
			},
			handle: function(event) {
				var elem = event.target;
				if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) return event.handleObj.handler.apply(this, arguments);
			},
			teardown: function() {
				Crazy.event.remove(this, "._change");
				return !rformElems.test(this.nodeName);
			}
		};
	}
	if (!Crazy.support.focusinBubbles) {
		Crazy.each({
			focus: "focusin",
			blur: "focusout"
		}, function(orig, fix) {
			var attaches = 0,
				handler = function(event) {
					Crazy.event.simulate(fix, event.target, Crazy.event.fix(event), true);
				};
			Crazy.event.special[fix] = {
				setup: function() {
					if (attaches++ === 0) {
						document.addEventListener(orig, handler, true);
					}
				},
				teardown: function() {
					if (--attaches === 0) {
						document.removeEventListener(orig, handler, true);
					}
				}
			};
		});
	}
	Crazy.fn.extend({
		on: function(types, selector, data, fn, one) {
			var type, origFn;
			if (typeof types === "object") {
				if (typeof selector !== "string") {
					data = data || selector;
					selector = undefined;
				}
				for (type in types) {
					this.on(type, selector, data, types[type], one);
				};
				return this;
			}
			if (data == null && fn == null) {
				fn = selector;
				data = selector = undefined;
			} else if (fn == null) {
				if (typeof selector === "string") {
					fn = data;
					data = undefined;
				} else {
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if (fn === false) {
				fn = returnFalse;
			} else if (!fn) {
				return this;
			}
			if (one === 1) {
				origFn = fn;
				fn = function(event) {
					Crazy().off(event);
					return origFn.apply(this, arguments);
				};
				fn.guid = origFn.guid || (origFn.guid = Crazy.guid++);
			}
			return this.each(function() {
				Crazy.event.add(this, types, fn, data, selector);
			});
		},
		one: function(types, selector, data, fn) {
			return this.on(types, selector, data, fn, 1);
		},
		off: function(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				handleObj = types.handleObj;
				Crazy(types.delegateTarget).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if (typeof types === "object") {
				for (type in types) this.off(type, selector, types[type]);
				return this;
			}
			if (selector === false || typeof selector === "function") {
				fn = selector;
				selector = undefined;
			}
			if (fn === false) fn = returnFalse;
			return this.each(function() {
				Crazy.event.remove(this, types, fn, selector);
			});
		},
		bind: function(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn);
		},
		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function(selector, types, fn) {
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		},
		trigger: function(type, data) {
			return this.each(function() {
				Crazy.event.trigger(type, data, this);
			});
		},
		triggerHandler: function(type, data) {
			var elem = this[0];
			if (elem) {
				return Crazy.event.trigger(type, data, elem, true);
			}
		}
	});
	(function(window, undefined) {
		var i,
			cachedruns,
			Expr,
			getText,
			isXML,
			compile,
			hasDuplicate,
			outermostContext,
			setDocument,
			document,
			docElem,
			documentIsXML,
			rbuggyQSA,
			rbuggyMatches,
			matches,
			contains,
			sortOrder,
			expando = "sizzle" + -(new Date()),
			preferredDoc = window.document,
			support = {},
			dirruns = 0,
			done = 0,
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			strundefined = typeof undefined,
			MAX_NEGATIVE = 1 << 31,
			arr = [],
			pop = arr.pop,
			push = arr.push,
			slice = arr.slice,
			indexOf = arr.indexOf || function(elem) {
				var i = 0,
					len = this.length;
				for (; i < len; i++) {
					if (this[i] === elem) {
						return i;
					}
				};
				return -1;
			},
			whitespace = "[\\x20\\t\\r\\n\\f]",
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			identifier = characterEncoding.replace("w", "w#"),
			operators = "([*^$|!~]?=)",
			attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
			pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
			rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
			rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
			rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
			rpseudo = new RegExp(pseudos),
			ridentifier = new RegExp("^" + identifier + "$"),
			matchExpr = {
				"ID": new RegExp("^#(" + characterEncoding + ")"),
				"CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
				"NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
				"TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
				"ATTR": new RegExp("^" + attributes),
				"PSEUDO": new RegExp("^" + pseudos),
				"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
				"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
			},
			rsibling = /[\x20\t\r\n\f]*[+~]/,
			rnative = /^[^{]+\{\s*\[native code/,
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			rinputs = /^(?:input|select|textarea|button)$/i,
			rheader = /^h\d$/i,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
			funescape = function(_, escaped) {
				var high = "0x" + escaped - 0x10000;
				return high !== high ? escaped : (high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00));
			};
		try {
			slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
		} catch (e) {
			slice = function(i) {
				var elem,
					results = [];
				while ((elem = this[i++])) {
					results.push(elem);
				};
				return results;
			};
		};

		function isNative(fn) {
			return rnative.test(fn + "");
		};

		function createCache() {
			var cache,
				keys = [];
			return (cache = function(key, value) {
				if (keys.push(key += " ") > Expr.cacheLength) delete cache[keys.shift()];
				return (cache[key] = value);
			});
		};

		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		};

		function assert(fn) {
			var div = document.createElement("div");
			try {
				return fn(div);
			} catch (e) {
				return false;
			} finally {
				div = null;
			};
		};

		function Sizzle(selector, context, results, seed) {
			var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
			if ((context ? context.ownerDocument || context : preferredDoc) !== document) setDocument(context);
			context = context || document;
			results = results || [];
			if (!selector || typeof selector !== "string") return results;
			if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) return [];
			if (!documentIsXML && !seed) {
				if ((match = rquickExpr.exec(selector))) {
					if ((m = match[1])) {
						if (nodeType === 9) {
							elem = context.getElementById(m);
							if (elem && elem.parentNode) {
								if (elem.id === m) {
									results.push(elem);
									return results;
								}
							} else {
								return results;
							}
						} else {
							if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
								contains(context, elem) && elem.id === m) {
								results.push(elem);
								return results;
							}
						}
					} else if (match[2]) {
						push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
						return results;
					} else if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
						push.apply(results, slice.call(context.getElementsByClassName(m), 0));
						return results;
					}
				}
				if (support.qsa && !rbuggyQSA.test(selector)) {
					old = true;
					nid = expando;
					newContext = context;
					newSelector = nodeType === 9 && selector;
					if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
						groups = tokenize(selector);
						if ((old = context.getAttribute("id"))) {
							nid = old.replace(rescape, "\\$&");
						} else {
							context.setAttribute("id", nid);
						}
						nid = "[id='" + nid + "'] ";
						i = groups.length;
						while (i--) {
							groups[i] = nid + toSelector(groups[i]);
						};
						newContext = rsibling.test(selector) && context.parentNode || context;
						newSelector = groups.join(",");
					}
					if (newSelector) {
						try {
							push.apply(results, slice.call(newContext.querySelectorAll(
								newSelector
							), 0));
							return results;
						} catch (qsaError) {} finally {
							if (!old) {
								context.removeAttribute("id");
							}
						};
					}
				}
			}
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		};
		isXML = Sizzle.isXML = function(elem) {
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};
		setDocument = Sizzle.setDocument = function(node) {
			var doc = node ? node.ownerDocument || node : preferredDoc;
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) return document;
			document = doc;
			docElem = doc.documentElement;
			documentIsXML = isXML(doc);
			support.tagNameNoComments = assert(function(div) {
				div.appendChild(doc.createComment(""));
				return !div.getElementsByTagName("*").length;
			});
			support.attributes = assert(function(div) {
				div.innerHTML = "<select></select>";
				var type = typeof div.lastChild.getAttribute("multiple");
				return type !== "boolean" && type !== "string";
			});
			support.getByClassName = assert(function(div) {
				div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
				if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) return false;
				div.lastChild.className = "e";
				return div.getElementsByClassName("e").length === 2;
			});
			support.getByName = assert(function(div) {
				div.id = expando + 0;
				div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
				docElem.insertBefore(div, docElem.firstChild);
				var pass = doc.getElementsByName &&
					doc.getElementsByName(expando).length === 2 + doc.getElementsByName(expando + 0).length;
				support.getIdNotName = !doc.getElementById(expando);
				docElem.removeChild(div);
				return pass;
			});
			Expr.attrHandle = assert(function(div) {
				div.innerHTML = "<a href='#'></a>";
				return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
			}) ? {} : {
				"href": function(elem) {
					return elem.getAttribute("href", 2);
				},
				"type": function(elem) {
					return elem.getAttribute("type");
				}
			};
			if (support.getIdNotName) {
				Expr.find["ID"] = function(id, context) {
					if (typeof context.getElementById !== strundefined && !documentIsXML) {
						var m = context.getElementById(id);
						return m && m.parentNode ? [m] : [];
					}
				};
				Expr.filter["ID"] = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				Expr.find["ID"] = function(id, context) {
					if (typeof context.getElementById !== strundefined && !documentIsXML) {
						var m = context.getElementById(id);
						return m ? (m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined) : [];
					}
				};
				Expr.filter["ID"] = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}
			Expr.find["TAG"] = support.tagNameNoComments ? function(tag, context) {
				if (typeof context.getElementsByTagName !== strundefined) return context.getElementsByTagName(tag);
			} : function(tag, context) {
				var elem,
					tmp = [],
					i = 0,
					results = context.getElementsByTagName(tag);
				if (tag === "*") {
					while ((elem = results[i++])) {
						if (elem.nodeType === 1) tmp.push(elem);
					};
					return tmp;
				}
				return results;
			};
			Expr.find["NAME"] = support.getByName && function(tag, context) {
				if (typeof context.getElementsByName !== strundefined) return context.getElementsByName(name);
			};
			Expr.find["CLASS"] = support.getByClassName && function(className, context) {
				if (typeof context.getElementsByClassName !== strundefined && !documentIsXML) return context.getElementsByClassName(className);
			};
			rbuggyMatches = [];
			rbuggyQSA = [":focus"];
			if ((support.qsa = isNative(doc.querySelectorAll))) {
				assert(function(div) {
					div.innerHTML = "<select><option selected=''></option></select>";
					if (!div.querySelectorAll("[selected]").length) rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
					if (!div.querySelectorAll(":checked").length) rbuggyQSA.push(":checked");
				});
				assert(function(div) {
					div.innerHTML = "<input type='hidden' i=''/>";
					if (div.querySelectorAll("[i^='']").length) rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
					if (!div.querySelectorAll(":enabled").length) rbuggyQSA.push(":enabled", ":disabled");
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}
			if ((support.matchesSelector = isNative((matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
				assert(function(div) {
					support.disconnectedMatch = matches.call(div, "div");
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}
			rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
			contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function(a, b) {
				if (b) {
					while ((b = b.parentNode)) {
						if (b === a) return true;
					};
				}
				return false;
			};
			sortOrder = docElem.compareDocumentPosition ? function(a, b) {
				var compare;
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}
				if ((compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b))) {
					if (compare & 1 || a.parentNode && a.parentNode.nodeType === 11) {
						if (a === doc || contains(preferredDoc, a)) return -1;
						if (b === doc || contains(preferredDoc, b)) return 1;
						return 0;
					}
					return compare & 4 ? -1 : 1;
				}
				return a.compareDocumentPosition ? -1 : 1;
			} : function(a, b) {
				var cur,
					i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [a],
					bp = [b];
				if (a === b) {
					hasDuplicate = true;
					return 0;
				} else if (!aup || !bup) {
					return a === doc ? -1 : (b === doc ? 1 : (aup ? -1 : (bup ? 1 : 0)));
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}
				cur = a;
				while ((cur = cur.parentNode)) {
					ap.unshift(cur);
				};
				cur = b;
				while ((cur = cur.parentNode)) {
					bp.unshift(cur);
				};
				while (ap[i] === bp[i]) {
					i++;
				};
				return i ? siblingCheck(ap[i], bp[i]) : (ap[i] === preferredDoc ? -1 : (bp[i] === preferredDoc ? 1 : 0));
			};
			hasDuplicate = false;
			[0, 0].sort(sortOrder);
			support.detectDuplicates = hasDuplicate;
			return document;
		};
		Sizzle.matches = function(expr, elements) {
			return Sizzle(expr, null, null, elements);
		};
		Sizzle.matchesSelector = function(elem, expr) {
			if ((elem.ownerDocument || elem) !== document) setDocument(elem);
			expr = expr.replace(rattributeQuotes, "='$1']");
			if (support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr)) {
				try {
					var ret = matches.call(elem, expr);
					if (ret || support.disconnectedMatch ||
						elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {};
			}
			return Sizzle(expr, document, null, [elem]).length > 0;
		};
		Sizzle.contains = function(context, elem) {
			if ((context.ownerDocument || context) !== document) setDocument(context);
			return contains(context, elem);
		};
		Sizzle.attr = function(elem, name) {
			var val;
			if ((elem.ownerDocument || elem) !== document) setDocument(elem);
			if (!documentIsXML) name = name.toLowerCase();
			if ((val = Expr.attrHandle[name])) return val(elem);
			if (documentIsXML || support.attributes) return elem.getAttribute(name);
			return ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && val.specified ? val.value : null;
		};
		Sizzle.error = function(msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};
		Sizzle.uniqueSort = function(results) {
			var elem,
				duplicates = [],
				i = 1,
				j = 0;
			hasDuplicate = !support.detectDuplicates;
			results.sort(sortOrder);
			if (hasDuplicate) {
				for (;
					(elem = results[i]); i++) {
					if (elem === results[i - 1]) {
						j = duplicates.push(i);
					}
				};
				while (j--) {
					results.splice(duplicates[j], 1);
				};
			}
			return results;
		};

		function siblingCheck(a, b) {
			var cur = b && a,
				diff = cur && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
			if (diff) return diff;
			if (cur) {
				while ((cur = cur.nextSibling)) {
					if (cur === b) {
						return -1;
					}
				};
			}
			return a ? 1 : -1;
		};

		function createInputPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		};

		function createButtonPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		};

		function createPositionalPseudo(fn) {
			return markFunction(function(argument) {
				argument = +argument;
				return markFunction(function(seed, matches) {
					var j,
						matchIndexes = fn([], seed.length, argument),
						i = matchIndexes.length;
					while (i--) {
						if (seed[(j = matchIndexes[i])]) seed[j] = !(matches[j] = seed[j]);
					};
				});
			});
		};
		getText = Sizzle.getText = function(elem) {
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;
			if (!nodeType) {
				for (;
					(node = elem[i]); i++) {
					ret += getText(node);
				};
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					};
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			return ret;
		};
		Expr = Sizzle.selectors = {
			cacheLength: 50,
			createPseudo: markFunction,
			match: matchExpr,
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: true
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: true
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				"ATTR": function(match) {
					match[1] = match[1].replace(runescape, funescape);
					match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
					if (match[2] === "~=") match[3] = " " + match[3] + " ";
					return match.slice(0, 4);
				},
				"CHILD": function(match) {
					match[1] = match[1].toLowerCase();
					if (match[1].slice(0, 3) === "nth") {
						if (!match[3]) Sizzle.error(match[0]);
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +((match[7] + match[8]) || match[3] === "odd");
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}
					return match;
				},
				"PSEUDO": function(match) {
					var excess,
						unquoted = !match[5] && match[2];
					if (matchExpr["CHILD"].test(match[0])) return null;
					if (match[4]) {
						match[2] = match[4];
					} else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}
					return match.slice(0, 3);
				}
			},
			filter: {
				"TAG": function(nodeName) {
					if (nodeName === "*") return function() {
						return true;
					};
					nodeName = nodeName.replace(runescape, funescape).toLowerCase();
					return function(elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},
				"CLASS": function(className) {
					var pattern = classCache[className + " "];
					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
						return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
					});
				},
				"ATTR": function(name, operator, check) {
					return function(elem) {
						var result = Sizzle.attr(elem, name);
						if (result == null) return operator === "!=";
						if (!operator) return true;
						result += "";
						return operator === "=" ? result === check : (operator === "!=" ? result !== check : (operator === "^=" ? check && result.indexOf(check) === 0 : (operator === "*=" ? check && result.indexOf(check) > -1 : (operator === "$=" ? check && result.slice(-check.length) === check : (operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : (operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false))))));
					};
				},
				"CHILD": function(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
						forward = type.slice(-4) !== "last",
						ofType = what === "of-type";
					return first === 1 && last === 0 ? function(elem) {
						return !!elem.parentNode;
					} : function(elem, context, xml) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
						if (parent) {
							if (simple) {
								while (dir) {
									node = elem;
									while ((node = node[dir])) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
											return false;
										}
									};
									start = dir = type === "only" && !start && "nextSibling";
								};
								return true;
							}
							start = [forward ? parent.firstChild : parent.lastChild];
							if (forward && useCache) {
								outerCache = parent[expando] || (parent[expando] = {});
								cache = outerCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];
								while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
									if (node.nodeType === 1 && ++diff && node === elem) {
										outerCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								};
							} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
								diff = cache[1];
							} else {
								while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
									if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
										if (useCache)(node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
										if (node === elem) {
											break;
										}
									}
								};
							}
							diff -= last;
							return diff === first || (diff % first === 0 && diff / first >= 0);
						}
					};
				},
				"PSEUDO": function(pseudo, argument) {
					var args,
						fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
					if (fn[expando]) return fn(argument);
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
							var idx,
								matched = fn(seed, argument),
								i = matched.length;
							while (i--) {
								idx = indexOf.call(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							};
						}) : function(elem) {
							return fn(elem, 0, args);
						};
					}
					return fn;
				}
			},
			pseudos: {
				"not": markFunction(function(selector) {
					var input = [],
						results = [],
						matcher = compile(selector.replace(rtrim, "$1"));
					return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
						var elem,
							unmatched = matcher(seed, null, xml, []),
							i = seed.length;
						while (i--) {
							if ((elem = unmatched[i])) {
								seed[i] = !(matches[i] = elem);
							}
						};
					}) : function(elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						return !results.pop();
					};
				}),
				"has": markFunction(function(selector) {
					return function(elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),
				"contains": markFunction(function(text) {
					return function(elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),
				"lang": markFunction(function(lang) {
					if (!ridentifier.test(lang || "")) Sizzle.error("unsupported lang: " + lang);
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function(elem) {
						var elemLang;
						do {
							if ((elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang)) {
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),
				"target": function(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},
				"root": function(elem) {
					return elem === docElem;
				},
				"focus": function(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex);
				},
				"enabled": function(elem) {
					return elem.disabled === false;
				},
				"disabled": function(elem) {
					return elem.disabled === true;
				},
				"checked": function(elem) {
					var nodeName = elem.nodeName.toLowerCase();
					return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
				},
				"selected": function(elem) {
					if (elem.parentNode) elem.parentNode.selectedIndex;
					return elem.selected === true;
				},
				"empty": function(elem) {
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) return false;
					};
					return true;
				},
				"parent": function(elem) {
					return !Expr.pseudos["empty"](elem);
				},
				"header": function(elem) {
					return rheader.test(elem.nodeName);
				},
				"input": function(elem) {
					return rinputs.test(elem.nodeName);
				},
				"button": function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},
				"text": function(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
				},
				"first": createPositionalPseudo(function() {
					return [0];
				}),
				"last": createPositionalPseudo(function(matchIndexes, length) {
					return [length - 1];
				}),
				"eq": createPositionalPseudo(function(matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),
				"even": createPositionalPseudo(function(matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					};
					return matchIndexes;
				}),
				"odd": createPositionalPseudo(function(matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					};
					return matchIndexes;
				}),
				"lt": createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					};
					return matchIndexes;
				}),
				"gt": createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					};
					return matchIndexes;
				})
			}
		};
		for (i in {
			radio: true,
			checkbox: true,
			file: true,
			password: true,
			image: true
		}) {
			Expr.pseudos[i] = createInputPseudo(i);
		};
		for (i in {
			submit: true,
			reset: true
		}) {
			Expr.pseudos[i] = createButtonPseudo(i);
		};

		function tokenize(selector, parseOnly) {
			var matched, match, tokens, type,
				soFar, groups, preFilters,
				cached = tokenCache[selector + " "];
			if (cached) return parseOnly ? 0 : cached.slice(0);
			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;
			while (soFar) {
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) soFar = soFar.slice(match[0].length) || soFar;
					groups.push(tokens = []);
				}
				matched = false;
				if ((match = rcombinators.exec(soFar))) {
					matched = match.shift();
					tokens.push({
						value: matched,

						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				};
				if (!matched) {
					break;
				}
			}
			return parseOnly ? soFar.length : (soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0));
		};

		function toSelector(tokens) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			};
			return selector;
		};

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;
			return combinator.first ? function(elem, context, xml) {
				while ((elem = elem[dir])) {
					if (elem.nodeType === 1 || checkNonElements) matcher(elem, context, xml);
				};
			} : function(elem, context, xml) {
				var data, cache, outerCache,
					dirkey = dirruns + " " + doneName;
				if (xml) {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) return true;
						}
					};
				} else {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});
							if ((cache = outerCache[dir]) && cache[0] === dirkey) {
								if ((data = cache[1]) === true || data === cachedruns) return data === true;
							} else {
								cache = outerCache[dir] = [dirkey];
								cache[1] = matcher(elem, context, xml) || cachedruns;
								if (cache[1] === true) return true;
							}
						}
					};
				}
			};
		};

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function(elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) return false;
				};
				return true;
			} : matchers[0];
		};

		function condense(unmatched, map, filter, context, xml) {
			var elem,
				newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;
			for (; i < len; i++) {
				if ((elem = unmatched[i])) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) map.push(i);
					}
				}
			};
			return newUnmatched;
		};

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) postFilter = setMatcher(postFilter);
			if (postFinder && !postFinder[expando]) postFinder = setMatcher(postFinder, postSelector);
			return markFunction(function(seed, results, context, xml) {
				var temp, i, elem,
					preMap = [],
					postMap = [],
					preexisting = results.length,
					elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
					matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
					matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
				if (matcher) matcher(matcherIn, matcherOut, context, xml);
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);
					i = temp.length;
					while (i--) {
						if ((elem = temp[i])) matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
					};
				}
				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i])) temp.push((matcherIn[i] = elem));
							};
							postFinder(null, (matcherOut = []), temp, xml);
						}
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) seed[temp] = !(results[temp] = elem);
						};
					}
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
				}
			});
		};

		function matcherFromTokens(tokens) {
			var checkContext, matcher, j,
				len = tokens.length,
				leadingRelative = Expr.relative[tokens[0].type],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,
				matchContext = addCombinator(function(elem) {
					return elem === checkContext;
				}, implicitRelative, true),
				matchAnyContext = addCombinator(function(elem) {
					return indexOf.call(checkContext, elem) > -1;
				}, implicitRelative, true),
				matchers = [
					function(elem, context, xml) {
						return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
					}
				];
			for (; i < len; i++) {
				if ((matcher = Expr.relative[tokens[i].type])) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
					if (matcher[expando]) {
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						};
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			};
			return elementMatcher(matchers);
		};

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var matcherCachedRuns = 0,
				bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function(seed, context, xml, results, expandContext) {
					var elem, j, matcher,
						setMatched = [],
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						outermost = expandContext != null,
						contextBackup = outermostContext,
						elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
					if (outermost) {
						outermostContext = context !== document && context;
						cachedruns = matcherCachedRuns;
					}
					for (;
						(elem = elems[i]) != null; i++) {
						if (byElement && elem) {
							j = 0;
							while ((matcher = elementMatchers[j++])) {
								if (matcher(elem, context, xml)) {
									results.push(elem);
									break;
								}
							};
							if (outermost) {
								dirruns = dirrunsUnique;
								cachedruns = ++matcherCachedRuns;
							}
						}
						if (bySet) {
							if ((elem = !matcher && elem)) matchedCount--;
							if (seed) unmatched.push(elem);
						}
					};
					matchedCount += i;
					if (bySet && i !== matchedCount) {
						j = 0;
						while ((matcher = setMatchers[j++])) {
							matcher(unmatched, setMatched, context, xml);
						};
						if (seed) {
							if (matchedCount > 0) {
								while (i--) {
									if (!(unmatched[i] || setMatched[i])) setMatched[i] = pop.call(results);
								};
							}
							setMatched = condense(setMatched);
						}
						push.apply(results, setMatched);
						if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) Sizzle.uniqueSort(results);
					}
					if (outermost) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}
					return unmatched;
				};
			return bySet ? markFunction(superMatcher) : superMatcher;
		};
		compile = Sizzle.compile = function(selector, group) {
			var i,
				setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[selector + " "];
			if (!cached) {
				if (!group) group = tokenize(selector);
				i = group.length;
				while (i--) {
					cached = matcherFromTokens(group[i]);
					cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
				};
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
			}
			return cached;
		};

		function multipleContexts(selector, contexts, results) {
			var i = 0,
				len = contexts.length;
			for (; i < len; i++) Sizzle(selector, contexts[i], results);
			return results;
		};

		function select(selector, context, results, seed) {
			var i, tokens, token, type, find,
				match = tokenize(selector);
			if (!seed) {
				if (match.length === 1) {
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						context.nodeType === 9 && !documentIsXML &&
						Expr.relative[tokens[1].type]) {
						context = Expr.find["ID"](token.matches[0].replace(runescape, funescape), context)[0];
						if (!context) return results;
						selector = selector.slice(tokens.shift().value.length);
					}
					i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];
						if (Expr.relative[(type = token.type)]) {
							break;
						}
						if ((find = Expr.find[type])) {
							if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, slice.call(seed, 0));
									return results;
								}
								break;
							}
						}
					};
				}
			}
			compile(selector, match)(seed, context, documentIsXML, results, rsibling.test(selector));
			return results;
		};
		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		function setFilters() {};
		Expr.filters = setFilters.prototype = Expr.pseudos;
		Expr.setFilters = new setFilters();
		setDocument();
		Sizzle.attr = Crazy.attr;
		Crazy.find = Sizzle;
		Crazy.expr = Sizzle.selectors;
		Crazy.expr[":"] = Crazy.expr.pseudos;
		Crazy.unique = Sizzle.uniqueSort;
		Crazy.text = Sizzle.getText;
		Crazy.isXMLDoc = Sizzle.isXML;
		Crazy.contains = Sizzle.contains;
	})(window);
	var runtil = /Until$/,
		rparentsprev = /^(?:parents|prev(?:Until|All))/,
		isSimple = /^.[^:#\[\.,]*$/,
		rneedsContext = Crazy.expr.match.needsContext,
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	Crazy.fn.extend({
		find: function(selector) {
			var i, ret, self,
				len = this.length;
			if (typeof selector !== "string") {
				self = this;
				return this.pushStack(Crazy(selector).filter(function() {
					for (i = 0; i < len; i++) {
						if (Crazy.contains(self[i], this)) return true;
					};
				}));
			}
			ret = [];
			for (i = 0; i < len; i++) {
				Crazy.find(selector, this[i], ret);
			};
			ret = this.pushStack(len > 1 ? Crazy.unique(ret) : ret);
			ret.selector = (this.selector ? this.selector + " " : "") + selector;
			return ret;
		},
		has: function(target) {
			var i,
				targets = Crazy(target, this),
				len = targets.length;
			return this.filter(function() {
				for (i = 0; i < len; i++) {
					if (Crazy.contains(this, targets[i])) return true;
				};
			});
		},
		not: function(selector) {
			return this.pushStack(winnow(this, selector, false));
		},
		filter: function(selector) {
			return this.pushStack(winnow(this, selector, true));
		},
		is: function(selector) {
			return !!selector && (
				typeof selector === "string" ?
				rneedsContext.test(selector) ?
				Crazy(selector, this.context).index(this[0]) >= 0 :
				Crazy.filter(selector, this).length > 0 :
				this.filter(selector).length > 0);
		},
		closest: function(selectors, context) {
			var cur,
				i = 0,
				l = this.length,
				ret = [],
				pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? Crazy(selectors, context || this.context) : 0;
			for (; i < l; i++) {
				cur = this[i];
				while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
					if (pos ? pos.index(cur) > -1 : Crazy.find.matchesSelector(cur, selectors)) {
						ret.push(cur);
						break;
					}
					cur = cur.parentNode;
				};
			};
			return this.pushStack(ret.length > 1 ? Crazy.unique(ret) : ret);
		},
		index: function(elem) {
			if (!elem) return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
			if (typeof elem === "string") return Crazy.inArray(this[0], Crazy(elem));
			return Crazy.inArray(elem.Crazy ? elem[0] : elem, this);
		},
		add: function(selector, context) {
			var set = typeof selector === "string" ? Crazy(selector, context) : Crazy.makeArray(selector && selector.nodeType ? [selector] : selector),
				all = Crazy.merge(this.get(), set);
			return this.pushStack(Crazy.unique(all));
		},
		addBack: function(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});
	Crazy.fn.andSelf = Crazy.fn.addBack;

	function sibling(cur, dir) {
		do {
			cur = cur[dir];
		} while (cur && cur.nodeType !== 1);
		return cur;
	};
	Crazy.each({
		parent: function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function(elem) {
			return Crazy.dir(elem, "parentNode");
		},
		parentsUntil: function(elem, i, until) {
			return Crazy.dir(elem, "parentNode", until);
		},
		next: function(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function(elem) {
			return Crazy.dir(elem, "nextSibling");
		},
		prevAll: function(elem) {
			return Crazy.dir(elem, "previousSibling");
		},
		nextUntil: function(elem, i, until) {
			return Crazy.dir(elem, "nextSibling", until);
		},
		prevUntil: function(elem, i, until) {
			return Crazy.dir(elem, "previousSibling", until);
		},
		siblings: function(elem) {
			return Crazy.sibling((elem.parentNode || {}).firstChild, elem);
		},
		children: function(elem) {
			return Crazy.sibling(elem.firstChild);
		},
		contents: function(elem) {
			return Crazy.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : Crazy.merge([], elem.childNodes);
		}
	}, function(name, fn) {
		Crazy.fn[name] = function(until, selector) {
			var ret = Crazy.map(this, fn, until);
			if (!runtil.test(name)) selector = until;
			if (selector && typeof selector === "string") ret = Crazy.filter(selector, ret);
			ret = this.length > 1 && !guaranteedUnique[name] ? Crazy.unique(ret) : ret;
			if (this.length > 1 && rparentsprev.test(name)) ret = ret.reverse();
			return this.pushStack(ret);
		};
	});
	Crazy.extend({
		filter: function(expr, elems, not) {
			if (not) expr = ":not(" + expr + ")";
			return elems.length === 1 ? (Crazy.find.matchesSelector(elems[0], expr) ? [elems[0]] : []) : Crazy.find.matches(expr, elems);
		},
		dir: function(elem, dir, until) {
			var matched = [],
				cur = elem[dir];
			while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !Crazy(cur).is(until))) {
				if (cur.nodeType === 1) matched.push(cur);
				cur = cur[dir];
			};
			return matched;
		},
		sibling: function(n, elem) {
			var r = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) r.push(n);
			};
			return r;
		}
	});

	function winnow(elements, qualifier, keep) {
		qualifier = qualifier || 0;
		if (Crazy.isFunction(qualifier)) {
			return Crazy.grep(elements, function(elem, i) {
				var retVal = !! qualifier.call(elem, i, elem);
				return retVal === keep;
			});
		} else if (qualifier.nodeType) {
			return Crazy.grep(elements, function(elem) {
				return (elem === qualifier) === keep;
			});
		} else if (typeof qualifier === "string") {
			var filtered = Crazy.grep(elements, function(elem) {
				return elem.nodeType === 1;
			});
			if (isSimple.test(qualifier)) {
				return Crazy.filter(qualifier, filtered, !keep);
			} else {
				qualifier = Crazy.filter(qualifier, filtered);
			}
		}
		return Crazy.grep(elements, function(elem) {
			return (Crazy.inArray(elem, qualifier) >= 0) === keep;
		});
	};

	function createSafeFragment(document) {
		var list = nodeNames.split("|"),
			safeFrag = document.createDocumentFragment();
		if (safeFrag.createElement) {
			while (list.length) {
				safeFrag.createElement(list.pop());
			};
		}
		return safeFrag;
	};
	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlineCrazy = / Crazy\d+="(?:null|\d+)"/g,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		rleadingWhitespace = /^\s+/,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: Crazy.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		safeFragment = createSafeFragment(document),
		fragmentDiv = safeFragment.appendChild(document.createElement("div"));
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	Crazy.fn.extend({
		text: function(value) {
			return Crazy.access(this, function(value) {
				return value === undefined ? Crazy.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
			}, null, value, arguments.length);
		},
		wrapAll: function(html) {
			if (Crazy.isFunction(html)) return this.each(function(i) {
				Crazy(this).wrapAll(html.call(this, i));
			});
			if (this[0]) {
				var wrap = Crazy(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) wrap.insertBefore(this[0]);
				wrap.map(function() {
					var elem = this;
					while (elem.firstChild && elem.firstChild.nodeType === 1) {
						elem = elem.firstChild;
					};
					return elem;
				}).append(this);
			}
			return this;
		},
		wrapInner: function(html) {
			if (Crazy.isFunction(html)) return this.each(function(i) {
				Crazy(this).wrapInner(html.call(this, i));
			});
			return this.each(function() {
				var self = Crazy(this),
					contents = self.contents();
				contents.length ? contents.wrapAll(html) : self.append(html);
			});
		},
		wrap: function(html) {
			var isFunction = Crazy.isFunction(html);
			return this.each(function(i) {
				Crazy(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},
		unwrap: function() {
			return this.parent().each(function() {
				if (!Crazy.nodeName(this, "body")) Crazy(this).replaceWith(this.childNodes);
			}).end();
		},
		append: function() {
			return this.domManip(arguments, true, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.appendChild(elem);
			});
		},
		prepend: function() {
			return this.domManip(arguments, true, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.insertBefore(elem, this.firstChild);
			});
		},
		before: function() {
			return this.domManip(arguments, false, function(elem) {
				if (this.parentNode) this.parentNode.insertBefore(elem, this);
			});
		},
		after: function() {
			return this.domManip(arguments, false, function(elem) {
				if (this.parentNode) this.parentNode.insertBefore(elem, this.nextSibling);
			});
		},
		remove: function(selector, keepData) {
			var elem,
				i = 0;
			for (;
				(elem = this[i]) != null; i++) {
				if (!selector || Crazy.filter(selector, [elem]).length > 0) {
					if (!keepData && elem.nodeType === 1) Crazy.cleanData(getAll(elem));
					if (elem.parentNode) {
						if (keepData && Crazy.contains(elem.ownerDocument, elem)) setGlobalEval(getAll(elem, "script"));
						elem.parentNode.removeChild(elem);
					}
				}
			};
			return this;
		},
		empty: function() {
			var elem,
				i = 0;
			for (;
				(elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) Crazy.cleanData(getAll(elem, false));
				while (elem.firstChild) {
					elem.removeChild(elem.firstChild);
				};
				if (elem.options && Crazy.nodeName(elem, "select")) elem.options.length = 0;
			};
			return this;
		},
		clone: function(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function() {
				return Crazy.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},
		html: function(value) {
			return Crazy.access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if (value === undefined) return elem.nodeType === 1 ? elem.innerHTML.replace(rinlineCrazy, "") : undefined;
				if (typeof value === "string" && !rnoInnerhtml.test(value) && (Crazy.support.htmlSerialize || !rnoshimcache.test(value)) && (Crazy.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = value.replace(rxhtmlTag, "<$1></$2>");
					try {
						for (; i < l; i++) {
							elem = this[i] || {};
							if (elem.nodeType === 1) {
								Crazy.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}
						elem = 0;
					} catch (e) {};
				}
				if (elem) this.empty().append(value);
			}, null, value, arguments.length);
		},
		replaceWith: function(value) {
			var isFunc = Crazy.isFunction(value);
			if (!isFunc && typeof value !== "string") value = Crazy(value).not(this).detach();
			return this.domManip([value], true, function(elem) {
				var next = this.nextSibling,
					parent = this.parentNode;
				if (parent) {
					Crazy(this).remove();
					parent.insertBefore(elem, next);
				}
			});
		},
		detach: function(selector) {
			return this.remove(selector, true);
		},
		domManip: function(args, table, callback) {
			args = core_concat.apply([], args);
			var first, node, hasScripts,
				scripts, doc, fragment,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = Crazy.isFunction(value);
			if (isFunction || !(l <= 1 || typeof value !== "string" || Crazy.support.checkClone || !rchecked.test(value))) {
				return this.each(function(index) {
					var self = set.eq(index);
					if (isFunction) args[0] = value.call(this, index, table ? self.html() : undefined);
					self.domManip(args, table, callback);
				});
			}
			if (l) {
				fragment = Crazy.buildFragment(args, this[0].ownerDocument, false, this);
				first = fragment.firstChild;
				if (fragment.childNodes.length === 1) fragment = first;
				if (first) {
					table = table && Crazy.nodeName(first, "tr");
					scripts = Crazy.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;
					for (; i < l; i++) {
						node = fragment;
						if (i !== iNoClone) {
							node = Crazy.clone(node, true, true);
							if (hasScripts) Crazy.merge(scripts, getAll(node, "script"));
						}
						callback.call(table && Crazy.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], node, i);
					};
					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;
						Crazy.map(scripts, restoreScript);
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !Crazy._data(node, "globalEval") && Crazy.contains(doc, node)) {
								if (node.src) {
									Crazy.ajax({
										url: node.src,
										type: "GET",
										dataType: "script",
										async: false,
										global: false,
										"throws": true
									});
								} else {
									Crazy.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
								}
							}
						};
					}
					fragment = first = null;
				}
			}
			return this;
		}
	});

	function findOrAppend(elem, tag) {
		return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
	};

	function disableScript(elem) {
		var attr = elem.getAttributeNode("type");
		elem.type = (attr && attr.specified) + "/" + elem.type;
		return elem;
	};

	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);
		match ? elem.type = match[1] : elem.removeAttribute("type");
		return elem;
	};

	function setGlobalEval(elems, refElements) {
		var elem,
			i = 0;
		for (;
			(elem = elems[i]) != null; i++) {
			Crazy._data(elem, "globalEval", !refElements || Crazy._data(refElements[i], "globalEval"));
		};
	};

	function cloneCopyEvent(src, dest) {
		if (dest.nodeType !== 1 || !Crazy.hasData(src)) return;
		var type, i, l,
			oldData = Crazy._data(src),
			curData = Crazy._data(dest, oldData),
			events = oldData.events;
		if (events) {
			delete curData.handle;
			curData.events = {};
			for (type in events) {
				for (i = 0, l = events[type].length; i < l; i++) Crazy.event.add(dest, type, events[type][i]);
			};
		}
		if (curData.data) curData.data = Crazy.extend({}, curData.data);
	};

	function fixCloneNodeIssues(src, dest) {
		var nodeName, e, data;
		if (dest.nodeType !== 1) return;
		nodeName = dest.nodeName.toLowerCase();
		if (!Crazy.support.noCloneEvent && dest[Crazy.expando]) {
			data = Crazy._data(dest);
			for (e in data.events) Crazy.removeEvent(dest, e, data.handle);
			dest.removeAttribute(Crazy.expando);
		}
		if (nodeName === "script" && dest.text !== src.text) {
			disableScript(dest).text = src.text;
			restoreScript(dest);
		} else if (nodeName === "object") {
			if (dest.parentNode) dest.outerHTML = src.outerHTML;
			if (Crazy.support.html5Clone && (src.innerHTML && !Crazy.trim(dest.innerHTML))) dest.innerHTML = src.innerHTML;

		} else if (nodeName === "input" && manipulation_rcheckableType.test(src.type)) {
			dest.defaultChecked = dest.checked = src.checked;
			if (dest.value !== src.value) dest.value = src.value;
		} else if (nodeName === "option") {
			dest.defaultSelected = dest.selected = src.defaultSelected;
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	};

	Crazy.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original) {
		Crazy.fn[name] = function(selector) {
			var elems,
				i = 0,
				ret = [],
				insert = Crazy(selector),
				last = insert.length - 1;
			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				Crazy(insert[i])[original](elems);
				core_push.apply(ret, elems.get());
			};
			return this.pushStack(ret);
		};
	});

	function getAll(context, tag) {
		var elems, elem,
			i = 0,
			found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") :
				typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") :
				undefined;
		if (!found) {
			for (found = [], elems = context.childNodes || context;
				(elem = elems[i]) != null; i++) {
				!tag || Crazy.nodeName(elem, tag) ? found.push(elem) : Crazy.merge(found, getAll(elem, tag));
			};
		}
		return tag === undefined || tag && Crazy.nodeName(context, tag) ? Crazy.merge([context], found) : found;
	};

	function fixDefaultChecked(elem) {
		if (manipulation_rcheckableType.test(elem.type)) elem.defaultChecked = elem.checked;
	};

	Crazy.extend({
		clone: function(elem, dataAndEvents, deepDataAndEvents) {
			var destElements, node, clone, i, srcElements,
				inPage = Crazy.contains(elem.ownerDocument, elem);
			if (Crazy.support.html5Clone || Crazy.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
				clone = elem.cloneNode(true);
			} else {
				fragmentDiv.innerHTML = elem.outerHTML;
				fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
			}
			if ((!Crazy.support.noCloneEvent || !Crazy.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !Crazy.isXMLDoc(elem)) {
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0;
					(node = srcElements[i]) != null; ++i) {
					if (destElements[i]) fixCloneNodeIssues(node, destElements[i]);
				};
			}
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);
					for (i = 0;
						(node = srcElements[i]) != null; i++) {
						cloneCopyEvent(node, destElements[i]);
					};
				} else {
					cloneCopyEvent(elem, clone);
				}
			}
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}
			destElements = srcElements = node = null;
			return clone;
		},
		buildFragment: function(elems, context, scripts, selection) {
			var j, elem, contains, tmp, tag, tbody, wrap,
				l = elems.length,
				safe = createSafeFragment(context),
				nodes = [],
				i = 0;
			for (; i < l; i++) {
				elem = elems[i];
				if (elem || elem === 0) {
					if (Crazy.type(elem) === "object") {
						Crazy.merge(nodes, elem.nodeType ? [elem] : elem);
					} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));
					} else {
						tmp = tmp || safe.appendChild(context.createElement("div"));
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
						j = wrap[0];
						while (j--) {
							tmp = tmp.lastChild;
						};
						if (!Crazy.support.leadingWhitespace && rleadingWhitespace.test(elem)) nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
						if (!Crazy.support.tbody) {
							elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : (wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0);
							j = elem && elem.childNodes.length;
							while (j--) {
								if (Crazy.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) elem.removeChild(tbody);
							};
						}
						Crazy.merge(nodes, tmp.childNodes);
						tmp.textContent = "";
						while (tmp.firstChild) {
							tmp.removeChild(tmp.firstChild);
						};
						tmp = safe.lastChild;
					}
				}
			};
			if (tmp) safe.removeChild(tmp);
			if (!Crazy.support.appendChecked) Crazy.grep(getAll(nodes, "input"), fixDefaultChecked);
			i = 0;
			while ((elem = nodes[i++])) {
				if (selection && Crazy.inArray(elem, selection) !== -1) {
					continue;
				}
				contains = Crazy.contains(elem.ownerDocument, elem);
				tmp = getAll(safe.appendChild(elem), "script");
				if (contains) setGlobalEval(tmp);
				if (scripts) {
					j = 0;
					while ((elem = tmp[j++])) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem);
						}
					};
				}
			};
			tmp = null;
			return safe;
		},
		cleanData: function(elems, acceptData) {
			var elem, type, id, data,
				i = 0,
				internalKey = Crazy.expando,
				cache = Crazy.cache,
				deleteExpando = Crazy.support.deleteExpando,
				special = Crazy.event.special;
			for (;
				(elem = elems[i]) != null; i++) {
				if (acceptData || Crazy.acceptData(elem)) {
					id = elem[internalKey];
					data = id && cache[id];
					if (data) {
						if (data.events) {
							for (type in data.events) {
								special[type] ? Crazy.event.remove(elem, type) : Crazy.removeEvent(elem, type, data.handle);
							};
						}
						if (cache[id]) {
							delete cache[id];
							if (deleteExpando) {
								delete elem[internalKey];
							} else if (typeof elem.removeAttribute !== core_strundefined) {
								elem.removeAttribute(internalKey);
							} else {
								elem[internalKey] = null;
							}
							core_deletedIds.push(id);
						}
					}
				}
			};
		}
	});
	var iframe, getStyles, curCSS,
		ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity\s*=\s*([^)]*)/,
		rposition = /^(top|right|bottom|left)$/,
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rmargin = /^margin/,
		rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
		rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
		rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
		elemdisplay = {
			BODY: "block"
		},
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: 0,
			fontWeight: 400
		},
		cssExpand = ["Top", "Right", "Bottom", "Left"],
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];

	function vendorPropName(style, name) {
		if (name in style) return name;
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in style) return name;
		};
		return origName;
	};

	function isHidden(elem, el) {
		elem = el || elem;
		return Crazy.css(elem, "display") === "none" || !Crazy.contains(elem.ownerDocument, elem);
	}

	function showHide(elements, show) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			values[index] = Crazy._data(elem, "olddisplay");
			display = elem.style.display;
			if (show) {
				if (!values[index] && display === "none") elem.style.display = "";
				if (elem.style.display === "" && isHidden(elem)) values[index] = Crazy._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
			} else {
				if (!values[index]) {
					hidden = isHidden(elem);
					if (display && display !== "none" || !hidden) Crazy._data(elem, "olddisplay", hidden ? display : Crazy.css(elem, "display"));
				}
			}
		};
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") elem.style.display = show ? values[index] || "" : "none";
		};
		return elements;
	};

	Crazy.fn.extend({
		css: function(name, value) {
			return Crazy.access(this, function(elem, name, value) {
				var len, styles,
					map = {},
					i = 0;
				if (Crazy.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;
					for (; i < len; i++) {
						map[name[i]] = Crazy.css(elem, name[i], false, styles);
					};
					return map;
				}
				var reval = (value !== undefined ? Crazy.style(elem, name, value) : Crazy.css(elem, name));
				if (!reval) return reval;
				return reval.indexOf('px') > -1 ? ((parseFloat(reval) / (Crazy.AdaptiveMultiple || 1)) + 'px') : reval;
			}, name, value, arguments.length > 1);
		},
		show: function() {
			return showHide(this, true);
		},
		hide: function() {
			return showHide(this);
		},
		toggle: function(state) {
			var bool = typeof state === "boolean";
			return this.each(function() {
				if (bool ? state : isHidden(this)) {
					Crazy(this).show();
				} else {
					Crazy(this).hide();
				}
			});
		}
	});
	Crazy.extend({
		cssHooks: {
			opacity: {
				get: function(elem, computed) {
					if (computed) {
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
		cssProps: {
			"float": Crazy.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(elem, name, value, extra) {
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) return;
			var ret, type, hooks,
				origName = Crazy.camelCase(name),
				style = elem.style;
			name = Crazy.cssProps[origName] || (Crazy.cssProps[origName] = vendorPropName(style, origName));
			hooks = Crazy.cssHooks[name] || Crazy.cssHooks[origName];
			if (value !== undefined) {
				type = typeof value;
				if (type === "string" && (ret = rrelNum.exec(value))) {
					value = (ret[1] + 1) * ret[2] + parseFloat(Crazy.css(elem, name));
					type = "number";
				}
				if (value == null || type === "number" && isNaN(value)) return;
				if (type === "number" && !Crazy.cssNumber[origName]) value += "px";
				if (!Crazy.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) style[name] = "inherit";
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
					try {
						style[name] = value;
					} catch (e) {};
				}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) return ret;
				return style[name];
			}
		},
		css: function(elem, name, extra, styles) {
			var num, val, hooks,
				origName = Crazy.camelCase(name);
			name = Crazy.cssProps[origName] || (Crazy.cssProps[origName] = vendorPropName(elem.style, origName));
			hooks = Crazy.cssHooks[name] || Crazy.cssHooks[origName];
			if (hooks && "get" in hooks) val = hooks.get(elem, true, extra);
			if (val === undefined) val = curCSS(elem, name, styles);
			if (val === "normal" && name in cssNormalTransform) val = cssNormalTransform[name];
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || Crazy.isNumeric(num) ? num || 0 : val;
			}
			return val;
		},
		swap: function(elem, options, callback, args) {
			var ret, name,
				old = {};
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name];
			};
			ret = callback.apply(elem, args || []);
			for (name in options) {
				elem.style[name] = old[name];
			};
			return ret;
		}
	});
	if (window.getComputedStyle) {
		getStyles = function(elem) {
			return window.getComputedStyle(elem, null);
		};
		curCSS = function(elem, name, _computed) {
			var width, minWidth, maxWidth,
				computed = _computed || getStyles(elem),
				ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
				style = elem.style;
			if (computed) {
				if (ret === "" && !Crazy.contains(elem.ownerDocument, elem)) ret = Crazy.style(elem, name);
				if (rnumnonpx.test(ret) && rmargin.test(name)) {
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}
			return ret;
		};
	} else if (document.documentElement.currentStyle) {
		getStyles = function(elem) {
			return elem.currentStyle;
		};
		curCSS = function(elem, name, _computed) {
			var left, rs, rsLeft,
				computed = _computed || getStyles(elem),
				ret = computed ? computed[name] : undefined,
				style = elem.style;
			if (ret == null && style && style[name]) ret = style[name];
			if (rnumnonpx.test(ret) && !rposition.test(name)) {
				left = style.left;
				rs = elem.runtimeStyle;
				rsLeft = rs && rs.left;
				if (rsLeft) rs.left = elem.currentStyle.left;
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";
				style.left = left;
				if (rsLeft) rs.left = rsLeft;
			}
			return ret === "" ? "auto" : ret;
		};
	}

	function setPositiveNumber(elem, value, subtract) {
		var matches = rnumsplit.exec(value);
		return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
	};

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ? 4 : (name === "width" ? 1 : 0),
			val = 0;
		for (; i < 4; i += 2) {
			if (extra === "margin") val += Crazy.css(elem, extra + cssExpand[i], true, styles);
			if (isBorderBox) {
				if (extra === "content") val -= Crazy.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "margin") val -= Crazy.css(elem, "border" + cssExpand[i] + "Width", true, styles);
			} else {
				val += Crazy.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "padding") val += Crazy.css(elem, "border" + cssExpand[i] + "Width", true, styles);
			}
		};
		return val;
	};

	function getWidthOrHeight(elem, name, extra) {
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = Crazy.support.boxSizing && Crazy.css(elem, "boxSizing", false, styles) === "border-box";
		if (val <= 0 || val == null) {
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) val = elem.style[name];
			if (rnumnonpx.test(val)) return val;
			valueIsBorderBox = isBorderBox && (Crazy.support.boxSizingReliable || val === elem.style[name]);
			val = parseFloat(val) || 0;
		}
		return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
	};

	function css_defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];
		if (!display) {
			display = actualDisplay(nodeName, doc);
			if (display === "none" || !display) {
				iframe = (iframe || Crazy("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement);
				doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
				doc.write("<!doctype html><html><body>");
				doc.close();
				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}
			elemdisplay[nodeName] = display;
		}
		return display;
	};

	function actualDisplay(name, doc) {
		var elem = Crazy(doc.createElement(name)).appendTo(doc.body),
			display = Crazy.css(elem[0], "display");
		elem.remove();
		return display;
	};
	Crazy.each(["height", "width"], function(i, name) {
		Crazy.cssHooks[name] = {
			get: function(elem, computed, extra) {
				if (computed) return elem.offsetWidth === 0 && rdisplayswap.test(Crazy.css(elem, "display")) ? Crazy.swap(elem, cssShow, function() {
					return getWidthOrHeight(elem, name, extra);
				}) : getWidthOrHeight(elem, name, extra);
			},
			set: function(elem, value, extra) {
				var styles = extra && getStyles(elem);
				return setPositiveNumber(elem, value, extra ? (augmentWidthOrHeight(elem, name, extra, Crazy.support.boxSizing && Crazy.css(elem, "boxSizing", false, styles) === "border-box", styles) / (Crazy.AdaptiveMultiple || 1)) : 0);
			}
		};
	});
	if (!Crazy.support.opacity) {
		Crazy.cssHooks.opacity = {
			get: function(elem, computed) {
				return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : "";
			},
			set: function(elem, value) {
				var style = elem.style,
					currentStyle = elem.currentStyle,
					opacity = Crazy.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
					filter = currentStyle && currentStyle.filter || style.filter || "";
				style.zoom = 1;
				if ((value >= 1 || value === "") && Crazy.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
					style.removeAttribute("filter");
					if (value === "" || currentStyle && !currentStyle.filter) return;
				}
				style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
			}
		};
	}
	Crazy(function() {
		if (!Crazy.support.reliableMarginRight) {
			Crazy.cssHooks.marginRight = {
				get: function(elem, computed) {
					if (computed) return Crazy.swap(elem, {
						"display": "inline-block"
					}, curCSS, [elem, "marginRight"]);
				}
			};
		}
		if (!Crazy.support.pixelPosition && Crazy.fn.position) {
			Crazy.each(["top", "left"], function(i, prop) {
				Crazy.cssHooks[prop] = {
					get: function(elem, computed) {
						if (computed) {
							computed = curCSS(elem, prop);
							return rnumnonpx.test(computed) ? Crazy(elem).position()[prop] + "px" : computed;
						}
					}
				};
			});
		}
	});
	if (Crazy.expr && Crazy.expr.filters) {
		Crazy.expr.filters.hidden = function(elem) {
			return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!Crazy.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || Crazy.css(elem, "display")) === "none");
		};
		Crazy.expr.filters.visible = function(elem) {
			return !Crazy.expr.filters.hidden(elem);
		};
	}
	Crazy.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix) {
		Crazy.cssHooks[prefix + suffix] = {
			expand: function(value) {
				var i = 0,
					expanded = {},
					parts = typeof value === "string" ? value.split(" ") : [value];
				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				};
				return expanded;
			}
		};
		if (!rmargin.test(prefix)) {
			Crazy.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	Crazy.fn.extend({
		serialize: function() {
			return Crazy.param(this.serializeArray());
		},
		serializeArray: function() {
			return this.map(function() {
				var elements = Crazy.prop(this, "elements");
				return elements ? Crazy.makeArray(elements) : this;
			}).filter(function() {
				var type = this.type;
				return this.name && !Crazy(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
			}).map(function(i, elem) {
				var val = Crazy(this).val();
				return val == null ? null : Crazy.isArray(val) ? Crazy.map(val, function(val) {
					return {
						name: elem.name,
						value: val.replace(rCRLF, "\r\n")
					};
				}) : {
					name: elem.name,
					value: val.replace(rCRLF, "\r\n")
				};
			}).get();
		}
	});
	Crazy.param = function(a, traditional) {
		var prefix,
			s = [],
			add = function(key, value) {
				value = Crazy.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
		if (traditional === undefined) traditional = Crazy.ajaxSettings && Crazy.ajaxSettings.traditional;
		if (Crazy.isArray(a) || (a.Crazy && !Crazy.isPlainObject(a))) {
			Crazy.each(a, function() {
				add(this.name, this.value);
			});
		} else {
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}
		return s.join("&").replace(r20, "+");
	};

	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (Crazy.isArray(obj)) {
			Crazy.each(obj, function(i, v) {
				traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
			});
		} else if (!traditional && Crazy.type(obj) === "object") {
			for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
		} else {
			add(prefix, obj);
		}
	};
	Crazy.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu touchstart touchmove touchend").split(" "), function(i, name) {
		Crazy.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});
	Crazy.fn.hover = function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	};
	var ajaxLocParts,
		ajaxLocation,
		ajax_nonce = Crazy.now(),
		ajax_rquery = /\?/,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		_load = Crazy.fn.load,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href;
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	function addToPrefiltersOrTransports(structure) {
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
			if (Crazy.isFunction(func)) {
				while ((dataType = dataTypes[i++])) {
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				};
			}
		};
	};

	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			Crazy.each(structure[dataType] || [], function(_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		};
		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	};

	function ajaxExtend(target, src) {
		var deep, key,
			flatOptions = Crazy.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined)(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
		};
		if (deep) Crazy.extend(true, target, deep);
		return target;
	};
	Crazy.fn.load = function(url, params, callback) {
		if (typeof url !== "string" && _load) return _load.apply(this, arguments);
		var selector, response, type,
			self = this,
			off = url.indexOf(" ");
		if (off >= 0) {
			selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}
		if (Crazy.isFunction(params)) {
			callback = params;
			params = undefined;
		} else if (params && typeof params === "object") {
			type = "POST";
		}
		if (self.length > 0) {
			Crazy.ajax({
				url: url,
				type: type,
				dataType: "html",
				data: params
			}).done(function(responseText) {
				response = arguments;
				self.html(selector ? Crazy("<div>").append(Crazy.parseHTML(responseText)).find(selector) : responseText);
			}).complete(callback && function(jqXHR, status) {
				self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
			});
		}
		return this;
	};
	Crazy.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
		Crazy.fn[type] = function(fn) {
			return this.on(type, fn);
		};
	});
	Crazy.each(["get", "post"], function(i, method) {
		Crazy[method] = function(url, data, callback, type) {
			if (Crazy.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
			return Crazy.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});
	Crazy.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": window.String,
				"text html": true,
				"text json": Crazy.parseJSON,
				"text xml": Crazy.parseXML
			},
			flatOptions: {
				url: true,
				context: true
			}
		},
		ajaxSetup: function(target, settings) {
			return settings ? ajaxExtend(ajaxExtend(target, Crazy.ajaxSettings), settings) : ajaxExtend(Crazy.ajaxSettings, target);
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(url, options) {
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}
			options = options || {};
			var parts,
				i,
				cacheURL,
				responseHeadersString,
				timeoutTimer,
				fireGlobals,
				transport,
				responseHeaders,
				s = Crazy.ajaxSetup({}, options),
				callbackContext = s.context || s,
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.Crazy) ? Crazy(callbackContext) : Crazy.event,
				deferred = Crazy.Deferred(),
				completeDeferred = Crazy.Callbacks("once memory"),
				statusCode = s.statusCode || {},
				requestHeaders = {},
				requestHeadersNames = {},
				state = 0,
				strAbort = "canceled",
				jqXHR = {
					readyState: 0,
					getResponseHeader: function(key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase()] = match[2];
								};
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
					setRequestHeader: function(name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value;
						}
						return this;
					},
					overrideMimeType: function(type) {
						if (!state) s.mimeType = type;
						return this;
					},
					statusCode: function(map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {
									statusCode[code] = [statusCode[code], map[code]];
								};
							} else {
								jqXHR.always(map[jqXHR.status]);
							}
						}
						return this;
					},
					abort: function(statusText) {
						var finalText = statusText || strAbort;
						if (transport) transport.abort(finalText);
						done(0, finalText);
						return this;
					}
				};
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
			s.type = options.method || options.type || s.method || s.type;
			s.dataTypes = Crazy.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [""];
			if (s.crossDomain == null) {
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
			}
			if (s.data && s.processData && typeof s.data !== "string") s.data = Crazy.param(s.data, s.traditional);
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			if (state === 2) return jqXHR;
			fireGlobals = s.global;
			if (fireGlobals && Crazy.active++ === 0) Crazy.event.trigger("ajaxStart");
			s.type = s.type.toUpperCase();
			s.hasContent = !rnoContent.test(s.type);
			cacheURL = s.url;
			if (!s.hasContent) {
				if (s.data) {
					cacheURL = (s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data);
					delete s.data;
				}
				if (s.cache === false) s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++;
			}
			if (s.ifModified) {
				if (Crazy.lastModified[cacheURL]) jqXHR.setRequestHeader("If-Modified-Since", Crazy.lastModified[cacheURL]);
				if (Crazy.etag[cacheURL]) jqXHR.setRequestHeader("If-None-Match", Crazy.etag[cacheURL]);
			}
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) jqXHR.setRequestHeader("Content-Type", s.contentType);
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
				s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
				s.accepts["*"]
			);
			for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) return jqXHR.abort();
			strAbort = "abort";
			for (i in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				jqXHR[i](s[i]);
			};
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;
				if (fireGlobals) globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				if (s.async && s.timeout > 0) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout);
				}
				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {
					if (state < 2) {
						done(-1, e);
					} else {
						throw e;
					}
				};
			}

			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
				if (state === 2) return;
				state = 2;
				if (timeoutTimer) clearTimeout(timeoutTimer);
				transport = undefined;
				responseHeadersString = headers || "";
				jqXHR.readyState = status > 0 ? 4 : 0;
				if (responses) response = ajaxHandleResponses(s, jqXHR, responses);
				if (status >= 200 && status < 300 || status === 304) {
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) Crazy.lastModified[cacheURL] = modified;
						modified = jqXHR.getResponseHeader("etag");
						if (modified) Crazy.etag[cacheURL] = modified;
					}
					if (status === 204) {
						isSuccess = true;
						statusText = "nocontent";
					} else if (status === 304) {
						isSuccess = true;
						statusText = "notmodified";
					} else {
						isSuccess = ajaxConvert(s, response);
						statusText = isSuccess.state;
						success = isSuccess.data;
						error = isSuccess.error;
						isSuccess = !error;
					}
				} else {
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) status = 0;
					}
				}
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					if (!(--Crazy.active)) Crazy.event.trigger("ajaxStop");
				}
			};
			return jqXHR;
		},
		getScript: function(url, callback) {
			return Crazy.get(url, undefined, callback, "script");
		},
		getJSON: function(url, data, callback) {
			return Crazy.get(url, data, callback, "json");
		}
	});

	function ajaxHandleResponses(s, jqXHR, responses) {
		var firstDataType, ct, finalDataType, type,
			contents = s.contents,
			dataTypes = s.dataTypes,
			responseFields = s.responseFields;
		for (type in responseFields) {
			if (type in responses) jqXHR[responseFields[type]] = responses[type];
		}
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		};
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			};
		}
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) firstDataType = type;
			};
			finalDataType = finalDataType || firstDataType;
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) dataTypes.unshift(finalDataType);
			return responses[finalDataType];
		}
	};

	function ajaxConvert(s, response) {
		var conv2, current, conv, tmp,
			converters = {},
			i = 0,
			dataTypes = s.dataTypes.slice(),
			prev = dataTypes[0];
		if (s.dataFilter) response = s.dataFilter(response, s.dataType);
		if (dataTypes[1]) {
			for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
		}
		for (;
			(current = dataTypes[++i]);) {
			if (current !== "*") {
				if (prev !== "*" && prev !== current) {
					conv = converters[prev + " " + current] || converters["* " + current];
					if (!conv) {
						for (conv2 in converters) {
							tmp = conv2.split(" ");
							if (tmp[1] === current) {
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {
									if (conv === true) {
										conv = converters[conv2];
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.splice(i--, 0, current);
									}
									break;
								}
							}
						};
					}
					if (conv !== true) {
						if (conv && s["throws"]) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							};
						}
					}
				}
				prev = current;
			}
		}
		return {
			state: "success",
			data: response
		};
	};
	Crazy.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(text) {
				Crazy.globalEval(text);
				return text;
			}
		}
	});
	Crazy.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) s.cache = false;
		if (s.crossDomain) {
			s.type = "GET";
			s.global = false;
		}
	});
	Crazy.ajaxTransport("script", function(s) {
		if (s.crossDomain) {
			var script,
				head = document.head || Crazy("head")[0] || document.documentElement;
			return {
				send: function(_, callback) {
					script = document.createElement("script");
					script.async = true;
					if (s.scriptCharset) script.charset = s.scriptCharset;
					script.src = s.url;
					script.onload = script.onreadystatechange = function(_, isAbort) {
						if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
							script.onload = script.onreadystatechange = null;
							if (script.parentNode) script.parentNode.removeChild(script);
							script = null;
							if (!isAbort) callback(200, "success");
						}
					};
					head.insertBefore(script, head.firstChild);
				},
				abort: function() {
					if (script) script.onload(undefined, true);
				}
			};
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	Crazy.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || (Crazy.expando + "_" + (ajax_nonce++));
			this[callback] = true;
			return callback;
		}
	});
	Crazy.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
				"url" :
				typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
			);
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			callbackName = s.jsonpCallback = Crazy.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}
			s.converters["script json"] = function() {
				if (!responseContainer) Crazy.error(callbackName + " was not called");
				return responseContainer[0];
			};
			s.dataTypes[0] = "json";
			overwritten = window[callbackName];
			window[callbackName] = function() {
				responseContainer = arguments;
			};
			jqXHR.always(function() {
				window[callbackName] = overwritten;
				if (s[callbackName]) {
					s.jsonpCallback = originalSettings.jsonpCallback;
					oldCallbacks.push(callbackName);
				}
				if (responseContainer && Crazy.isFunction(overwritten)) overwritten(responseContainer[0]);
				responseContainer = overwritten = undefined;
			});
			return "script";
		}
	});
	var xhrCallbacks, xhrSupported,
		xhrId = 0,
		xhrOnUnloadAbort = window.ActiveXObject && function() {
			var key;
			for (key in xhrCallbacks) xhrCallbacks[key](undefined, true);
		};

	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {};
	};

	function createActiveXHR() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {};
	};
	Crazy.ajaxSettings.xhr = window.ActiveXObject ? function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} : createStandardXHR;
	xhrSupported = Crazy.ajaxSettings.xhr();
	Crazy.support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
	xhrSupported = Crazy.support.ajax = !! xhrSupported;
	if (xhrSupported) {
		Crazy.ajaxTransport(function(s) {
			if (!s.crossDomain || Crazy.support.cors) {
				var callback;
				return {
					send: function(headers, complete) {
						var handle, i,
							xhr = s.xhr();
						s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async);
						if (s.xhrFields) {
							for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
						}
						if (s.mimeType && xhr.overrideMimeType) xhr.overrideMimeType(s.mimeType);
						if (!s.crossDomain && !headers["X-Requested-With"]) headers["X-Requested-With"] = "XMLHttpRequest";
						try {
							for (i in headers) xhr.setRequestHeader(i, headers[i]);
						} catch (err) {};
						xhr.send((s.hasContent && s.data) || null);
						callback = function(_, isAbort) {
							var status, responseHeaders, statusText, responses;
							try {
								if (callback && (isAbort || xhr.readyState === 4)) {
									callback = undefined;
									if (handle) {
										xhr.onreadystatechange = Crazy.noop;
										if (xhrOnUnloadAbort) delete xhrCallbacks[handle];
									}
									if (isAbort) {
										if (xhr.readyState !== 4) xhr.abort();
									} else {
										responses = {};
										status = xhr.status;
										responseHeaders = xhr.getAllResponseHeaders();
										if (typeof xhr.responseText === "string") responses.text = xhr.responseText;
										try {
											statusText = xhr.statusText;
										} catch (e) {
											statusText = "";
										};
										if (!status && s.isLocal && !s.crossDomain) {
											status = responses.text ? 200 : 404;
										} else if (status === 1223) {
											status = 204;
										}
									}
								}
							} catch (firefoxAccessException) {
								if (!isAbort) complete(-1, firefoxAccessException);
							};
							if (responses) complete(status, statusText, responses, responseHeaders);
						};
						if (!s.async) {
							callback();
						} else if (xhr.readyState === 4) {
							setTimeout(callback);
						} else {
							handle = ++xhrId;
							if (xhrOnUnloadAbort) {
								if (!xhrCallbacks) {
									xhrCallbacks = {};
									Crazy(window).unload(xhrOnUnloadAbort);
								}
								xhrCallbacks[handle] = callback;
							}
							xhr.onreadystatechange = callback;
						}
					},
					abort: function() {
						if (callback) callback(undefined, true);
					}
				};
			}
		});
	}
	var fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [
				function(prop, value) {
					var end, unit,
						tween = this.createTween(prop, value),
						parts = rfxnum.exec(value),
						target = tween.cur(),
						start = +target || 0,
						scale = 1,
						maxIterations = 20;
					if (parts) {
						end = +parts[2];
						unit = parts[3] || (Crazy.cssNumber[prop] ? "" : "px");
						if (unit !== "px" && start) {
							start = Crazy.css(tween.elem, prop, true) || end || 1;
							do {
								scale = scale || ".5";
								start = start / scale;
								Crazy.style(tween.elem, prop, start + unit);
							} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
						}
						tween.unit = unit;
						tween.start = start;
						tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
					}
					return tween;
				}
			]
		};

	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return (fxNow = Crazy.now());
	};

	function createTweens(animation, props) {
		Crazy.each(props, function(prop, value) {
			var collection = (tweeners[prop] || []).concat(tweeners["*"]),
				index = 0,
				length = collection.length;
			for (; index < length; index++) {
				if (collection[index].call(animation, prop, value)) return;
			}
		});
	};

	function Animation(elem, properties, options) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = Crazy.Deferred().always(function() {
				delete tick.elem;
			}),
			tick = function() {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) animation.tweens[index].run(percent);
				deferred.notifyWith(elem, [animation, percent, remaining]);
				if (percent < 1 && length) return remaining;
				deferred.resolveWith(elem, [animation]);
				return false;
			},
			animation = deferred.promise({
				elem: elem,
				props: Crazy.extend({}, properties),
				opts: Crazy.extend(true, {
					specialEasing: {}
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function(prop, end) {
					var tween = Crazy.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function(gotoEnd) {
					var index = 0,
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) return this;
					stopped = true;
					for (; index < length; index++) animation.tweens[index].run(1);
					gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]);
					return this;
				}
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = animationPrefilters[index].call(animation, elem, props, animation.opts);
			if (result) return result;
		};
		createTweens(animation, props);
		if (Crazy.isFunction(animation.opts.start)) animation.opts.start.call(elem, animation);
		Crazy.fx.timer(Crazy.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	};

	function propFilter(props, specialEasing) {
		var value, name, index, easing, hooks;
		for (index in props) {
			name = Crazy.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Crazy.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}
			if (index !== name) {
				props[name] = value;
				delete props[index];
			}
			hooks = Crazy.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				};
			} else {
				specialEasing[name] = easing;
			}
		};
	};
	Crazy.Animation = Crazy.extend(Animation, {
		tweener: function(props, callback) {
			if (Crazy.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.split(" ");
			}
			var prop,
				index = 0,
				length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				tweeners[prop] = tweeners[prop] || [];
				tweeners[prop].unshift(callback);
			};
		},
		prefilter: function(callback, prepend) {
			prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
		}
	});

	function defaultPrefilter(elem, props, opts) {
		var prop, index, length,
			value, dataShow, toggle,
			tween, hooks, oldfire,
			anim = this,
			style = elem.style,
			orig = {},
			handled = [],
			hidden = elem.nodeType && isHidden(elem);
		if (!opts.queue) {
			hooks = Crazy._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if (!hooks.unqueued) oldfire();
				};
			}
			hooks.unqueued++;
			anim.always(function() {
				anim.always(function() {
					hooks.unqueued--;
					if (!Crazy.queue(elem, "fx").length) hooks.empty.fire();
				});
			});
		}
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			if (Crazy.css(elem, "display") === "inline" && Crazy.css(elem, "float") === "none") {
				if (!Crazy.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
					style.display = "inline-block";
				} else {
					style.zoom = 1;
				}
			}
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			if (!Crazy.support.shrinkWrapBlocks) {
				anim.always(function() {
					style.overflow = opts.overflow[0];
					style.overflowX = opts.overflow[1];
					style.overflowY = opts.overflow[2];
				});
			}
		}
		for (index in props) {
			value = props[index];
			if (rfxtypes.exec(value)) {
				delete props[index];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {
					continue;
				}
				handled.push(index);
			}
		}
		length = handled.length;
		if (length) {
			dataShow = Crazy._data(elem, "fxshow") || Crazy._data(elem, "fxshow", {});
			if ("hidden" in dataShow) hidden = dataShow.hidden;
			if (toggle) dataShow.hidden = !hidden;
			if (hidden) {
				Crazy(elem).show();
			} else {
				anim.done(function() {
					Crazy(elem).hide();
				});
			}
			anim.done(function() {
				var prop;
				Crazy._removeData(elem, "fxshow");
				for (prop in orig) {
					Crazy.style(elem, prop, orig[prop]);
				}
			});
			for (index = 0; index < length; index++) {
				prop = handled[index];
				tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
				orig[prop] = dataShow[prop] || Crazy.style(elem, prop);
				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			};
		}
	};

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	};
	Crazy.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (Crazy.cssNumber[prop] ? "" : "px");
		},
		cur: function() {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function(percent) {
			var eased,
				hooks = Tween.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = eased = Crazy.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) this.options.step.call(this.elem, this.now, this);
			hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this);
			return this;
		}
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function(tween) {
				var result;
				if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) return tween.elem[tween.prop];
				result = Crazy.css(tween.elem, tween.prop, "");
				return !result || result === "auto" ? 0 : result;
			},
			set: function(tween) {
				if (Crazy.fx.step[tween.prop]) {
					Crazy.fx.step[tween.prop](tween);
				} else if (tween.elem.style && (tween.elem.style[Crazy.cssProps[tween.prop]] != null || Crazy.cssHooks[tween.prop])) {
					Crazy.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) tween.elem[tween.prop] = tween.now;
		}
	};
	Crazy.each(["toggle", "show", "hide"], function(i, name) {
		var cssFn = Crazy.fn[name];
		Crazy.fn[name] = function(speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});
	Crazy.fn.extend({
		fadeTo: function(speed, to, easing, callback) {
			return this.filter(isHidden).css("opacity", 0).show().end().animate({
				opacity: to
			}, speed, easing, callback);
		},
		animate: function(prop, speed, easing, callback) {
			var empty = Crazy.isEmptyObject(prop),
				optall = Crazy.speed(speed, easing, callback),
				doAnimation = function() {
					var anim = Animation(this, Crazy.extend({}, prop), optall);
					doAnimation.finish = function() {
						anim.stop(true);
					};
					if (empty || Crazy._data(this, "finish")) anim.stop(true);
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function(type, clearQueue, gotoEnd) {
			var stopQueue = function(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = Crazy.timers,
					data = Crazy._data(this);
				if (index) {
					if (data[index] && data[index].stop) stopQueue(data[index]);
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) stopQueue(data[index]);
					};
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				};
				if (dequeue || !gotoEnd) Crazy.dequeue(this, type);
			});
		},
		finish: function(type) {
			if (type !== false) type = type || "fx";
			return this.each(function() {
				var index,
					data = Crazy._data(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = Crazy.timers,
					length = queue ? queue.length : 0;
				data.finish = true;
				Crazy.queue(this, type, []);
				if (hooks && hooks.cur && hooks.cur.finish) hooks.cur.finish.call(this);
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				};
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) queue[index].finish.call(this);
				};
				delete data.finish;
			});
		}
	});

	function genFx(type, includeWidth) {
		var which,
			attrs = {
				height: type
			},
			i = 0;
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		};
		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}
		return attrs;
	};
	Crazy.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(name, props) {
		Crazy.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});
	Crazy.speed = function(speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? Crazy.extend({}, speed) : {
			complete: fn || !fn && easing || Crazy.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !Crazy.isFunction(easing) && easing
		};
		opt.duration = Crazy.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in Crazy.fx.speeds ? Crazy.fx.speeds[opt.duration] : Crazy.fx.speeds._default;
		if (opt.queue == null || opt.queue === true) opt.queue = "fx";
		opt.old = opt.complete;
		opt.complete = function() {
			if (Crazy.isFunction(opt.old)) opt.old.call(this);
			if (opt.queue) Crazy.dequeue(this, opt.queue);
		};
		return opt;
	};
	Crazy.easing = {
		linear: function(p) {
			return p;
		},
		swing: function(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		}
	};
	Crazy.timers = [];
	Crazy.fx = Tween.prototype.init;
	Crazy.fx.tick = function() {
		var timer,
			timers = Crazy.timers,
			i = 0;
		fxNow = Crazy.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			if (!timer() && timers[i] === timer) timers.splice(i--, 1);
		};
		if (!timers.length) Crazy.fx.stop();
		fxNow = undefined;
	};
	Crazy.fx.timer = function(timer) {
		if (timer() && Crazy.timers.push(timer)) Crazy.fx.start();
	};
	Crazy.fx.interval = 13;
	Crazy.fx.start = function() {
		if (!timerId) timerId = setInterval(Crazy.fx.tick, Crazy.fx.interval);
	};
	Crazy.fx.stop = function() {
		clearInterval(timerId);
		timerId = null;
	};
	Crazy.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	Crazy.fx.step = {};
	if (Crazy.expr && Crazy.expr.filters) {
		Crazy.expr.filters.animated = function(elem) {
			return Crazy.grep(Crazy.timers, function(fn) {
				return elem === fn.elem;
			}).length;
		};
	}
	Crazy.fn.offset = function(options) {
		if (arguments.length) {
			return options === undefined ? this : this.each(function(i) {
				Crazy.offset.setOffset(this, options, i);
			});
		}
		var docElem, win,
			box = {
				top: 0,
				left: 0
			},
			elem = this[0],
			doc = elem && elem.ownerDocument;
		if (!doc) return;
		docElem = doc.documentElement;
		if (!Crazy.contains(docElem, elem)) return box;
		if (typeof elem.getBoundingClientRect !== core_strundefined) box = elem.getBoundingClientRect();
		win = getWindow(doc);
		return {
			top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
			left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
		};
	};
	Crazy.offset = {
		setOffset: function(elem, options, i) {
			var position = Crazy.css(elem, "position");
			if (position === "static") elem.style.position = "relative";
			var curElem = Crazy(elem),
				curOffset = curElem.offset(),
				curCSSTop = Crazy.css(elem, "top"),
				curCSSLeft = Crazy.css(elem, "left"),
				calculatePosition = (position === "absolute" || position === "fixed") && Crazy.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
				props = {}, curPosition = {}, curTop, curLeft;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}
			if (Crazy.isFunction(options)) options = options.call(elem, i, curOffset);
			if (options.top != null) props.top = (options.top - curOffset.top) + curTop;
			if (options.left != null) props.left = (options.left - curOffset.left) + curLeft;
			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};
	Crazy.fn.extend({
		position: function() {
			if (!this[0]) {
				return;
			}
			var offsetParent, offset,
				parentOffset = {
					top: 0,
					left: 0
				},
				elem = this[0];
			if (Crazy.css(elem, "position") === "fixed") {
				offset = elem.getBoundingClientRect();
			} else {
				offsetParent = this.offsetParent();
				offset = this.offset();
				if (!Crazy.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}
				parentOffset.top += Crazy.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += Crazy.css(offsetParent[0], "borderLeftWidth", true);
			}
			return {
				top: offset.top - parentOffset.top - Crazy.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - Crazy.css(elem, "marginLeft", true)
			};
		},
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || document.documentElement;
				while (offsetParent && (!Crazy.nodeName(offsetParent, "html") && Crazy.css(offsetParent, "position") === "static")) {
					offsetParent = offsetParent.offsetParent;
				};
				return offsetParent || document.documentElement;
			});
		}
	});
	Crazy.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(method, prop) {
		var top = /Y/.test(prop);
		Crazy.fn[method] = function(val) {
			return Crazy.access(this, function(elem, method, val) {
				var win = getWindow(elem);
				if (val === undefined) {
					return win ? ((prop in win) ? win[prop] : win.document.documentElement[method]) : elem[method];
				}
				if (win) {
					win.scrollTo(!top ? val : Crazy(win).scrollLeft(), top ? val : Crazy(win).scrollTop());
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length, null);
		};
	});

	function getWindow(elem) {
		return Crazy.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
	};
	Crazy.each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		Crazy.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			Crazy.fn[funcName] = function(margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
				return Crazy.access(this, function(elem, type, value) {
					var doc;
					if (Crazy.isWindow(elem)) return elem.document.documentElement["client" + name];
					if (elem.nodeType === 9) {
						doc = elem.documentElement;
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}
					var reval = value === undefined ? Crazy.css(elem, type, extra) : Crazy.style(elem, type, value, extra);
					if (!reval) return reval;
					return reval / (Crazy.AdaptiveMultiple || 1);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});
	document.querySelector('html').style.opacity = '0';
	(function($) {
		"function" == typeof define && define.amd ? define(["crazy"], $) : "object" == typeof exports ? module.exports = $ : $(Crazy)
	})(function(a) {
		function b(b) {
			var g = b || window.event,
				h = i.call(arguments, 1),
				j = 0,
				l = 0,
				m = 0,
				n = 0,
				o = 0,
				p = 0;
			if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
				if (1 === g.deltaMode) {
					var q = a.data(this, "mousewheel-line-height");
					j *= q, m *= q, l *= q
				} else if (2 === g.deltaMode) {
					var r = a.data(this, "mousewheel-page-height");
					j *= r, m *= r, l *= r
				}
				if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
					var s = this.getBoundingClientRect();
					o = b.clientX - s.left, p = b.clientY - s.top
				}
				return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
			}
		}

		function c() {
			f = null
		}

		function d(a, b) {
			return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
		}
		var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
			h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
			i = Array.prototype.slice;
		if (a.event.fixHooks)
			for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
		var k = a.event.special.mousewheel = {
			version: "3.1.12",
			setup: function() {
				if (this.addEventListener)
					for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
				else this.onmousewheel = b;
				a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
			},
			teardown: function() {
				if (this.removeEventListener)
					for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
				else this.onmousewheel = null;
				a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
			},
			getLineHeight: function(b) {
				var c = a(b),
					d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
				return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
			},
			getPageHeight: function(b) {
				return a(b).height()
			},
			settings: {
				adjustOldDeltas: !0,
				normalizeOffset: !0
			}
		};
		a.fn.extend({
			mousewheel: function(a) {
				return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
			},
			unmousewheel: function(a) {
				return this.unbind("mousewheel", a)
			}
		})
	});
	(function($, h, c) {
		var a = $([]),
			e = $.resize = $.extend($.resize, {}),
			i, k = "setTimeout",
			j = "resize",
			d = j + "-special-event",
			b = "delay",
			f = "throttleWindow";
		e[b] = 250;
		e[f] = true;
		$.event.special[j] = {
			setup: function() {
				if (!e[f] && this[k]) {
					return false
				}
				var l = $(this);
				a = a.add(l);
				$.data(this, d, {
					w: l.width(),
					h: l.height()
				});
				if (a.length === 1) {
					g()
				}
			},
			teardown: function() {
				if (!e[f] && this[k]) {
					return false
				}
				var l = $(this);
				a = a.not(l);
				l.removeData(d);
				if (!a.length) {
					clearTimeout(i)
				}
			},
			add: function(l) {
				if (!e[f] && this[k]) {
					return false
				}
				var n;

				function m(s, o, p) {
					var q = $(this),
						r = $.data(this, d);
					r.w = o !== c ? o : q.width();
					r.h = p !== c ? p : q.height();
					n.apply(this, arguments)
				}
				if ($.isFunction(l)) {
					n = l;
					return m
				} else {
					n = l.handler;
					l.handler = m
				}
			}
		};

		function g() {
			i = h[k](function() {
				a.each(function() {
					var n = $(this),
						m = n.width(),
						l = n.height(),
						o = $.data(this, d) || {};
					if (m !== o.w || l !== o.h) {
						n.trigger(j, [o.w = m, o.h = l])
					}
				});
				g()
			}, e[b])
		}
	})(Crazy, this);
	Crazy.fn.extend({
		image: function(options, fn) {
			return this.each(function() {
				// console.log(Crazy(this));
				var obj = Crazy(this),
					op = Crazy.extend({}, {
						url: null,
						position: 'center center',
						size: 'container',
						origin: 'padding'
					}, {
						url: obj.attr('image'),
						position: obj.attr('position'),
						size: obj.attr('size'),
						origin: obj.attr('origin')
					}, options);
				if (!op.url) {
					console.error('No Pictrue!');
					return;
				}
				obj.css('display', 'block');
				var img = new Image();
				img.src = op.url;
				img.onload = function() {
					if (obj.width() <= 0 || obj.height() <= 0) {
						if (obj.width() > 0) img.width = obj.width();
						if (obj.height() > 0) img.height = obj.height();
						var news = Crazy('body').append(img).find('img').last();
						if (obj.width() <= 0) obj.width(img.width);
						if (obj.height() <= 0) obj.height(img.height);
						obj.width(img.width).height(img.height);
						news.remove();
					}
					obj.css({
						'background-image': 'url(' + op.url + ')',
						'background-repeat': 'no-repeat',
						'background-size': op.size == 'container' ? 'contain' : (op.size == 'max' ? 'cover' : op.size),
						'background-position': op.position,
						'background-origin': op.origin + '-box'
					}).attr({
						image: op.url,
						position: op.position,
						size: op.size,
						origin: op.origin
					});
					if (Crazy.type(fn) == 'function') fn.call(obj, {
						width: obj.width(),
						height: obj.height()
					});
				};
			});
		},
		preloading: function(href) { //尚未实现
			return this.each(function() {
				var obj = Crazy(this),
					href = href || obj.attr('href');
				if (href && href.indexOf('javascript') < 0) {
					// window.open(href, 'aa', 'fullscreen=1', false);
				}
			});
		},
		swipe: function(fn, type) {
			return this.each(function() {
				if (Crazy.type(fn) != 'function') return;
				var obj = Crazy(this),
					reval = true,
					start = {},
					move = function(e) {
						if (e.originalEvent.targetTouches.length = 1) {
							var x = e.originalEvent.targetTouches[0].pageX - start.x,
								y = e.originalEvent.targetTouches[0].pageY - start.y,
								direct;
							with(Math) {
								if (abs(x) || abs(y) > 30 * (Crazy['Multiple'] || 1)) {
									direct = abs(x) > abs(y) ? (x > 0 ? 'right' : 'left') : (y > 0 ? 'down' : 'up');
									arguments[0].type = 'swipe' + direct;
									if (!type || type == direct) return reval = fn.call(obj, arguments[0]);
								}
							};
						}
						e.stopPropagation();
					};
				obj.touchstart(function(e) {
					if (e.originalEvent.targetTouches.length = 1) {
						start.x = e.originalEvent.targetTouches[0].pageX;
						start.y = e.originalEvent.targetTouches[0].pageY;
						obj.one('touchmove', move);
					}
					e.stopPropagation();
					return reval;
				}).touchend(function(e) {
					obj.unbind('touchmove', move);
					e.stopPropagation();
					return reval;
				});
			});
		},
		imgcarousel: function(options) { //点 和 主题扩展尚未实现
			return this.each(function() {
				var obj = Crazy(this),
					op = Crazy.extend({
						image: null,
						link: null,
						button: !Crazy.isMobile(),
						point: true,
						theme: '1',
						position: 'center center',
						size: 'container',
						origin: 'padding',
						speed: 500,
						interval: 3000,
						filter: 4,
					}, {
						image: Crazy.trim((obj.attr('imglist') || '')).split(' '),
						link: Crazy.trim((obj.attr('link') || '')).split(' '),
						button: obj.attr('button') == 'true',
						point: obj.attr('point') == 'true',
						theme: obj.attr('theme') || '1',
						position: obj.attr('position'),
						size: obj.attr('size'),
						origin: obj.attr('origin'),
						speed: parseInt(obj.attr('speed')) || 500,
						interval: parseInt(obj.attr('interval')) || 3000,
						filter: parseInt(obj.attr('filter')) || 4
					}, options),
					time,
					length = op.image.length,
					width = obj.width(),
					height = obj.height(),
					picbox, pointbox, btn, img,
					fn = function() {
						obj.width(width).height(height).css('position', 'relative');
						img = picbox.find('a').width(width).height(height);
						var show = 0,
							fn = function() {
								time = setInterval(function() {
									var hide = show;
									show = count(true);
									switchs(show, hide, true);
								}, op.interval);
							},
							count = function(e) {
								return e ? (show + 1 > img.length - 1 ? 0 : show + 1) : (show - 1 < 0 ? img.length - 1 : show - 1);
							};
						if (op.button) {
							btn.css('top', (obj.height() - btn.height()) / 2);
							btn.click(function() {
								if ( !! Crazy['AdaptiveChange']) return;
								clearInterval(time);
								var hide = show;
								show = count(Crazy(this).hasClass('CrazyImgcarouselButtonNext'));
								switchs(show, hide, Crazy(this).hasClass('CrazyImgcarouselButtonNext'), fn);
							});
						}
						if (op.point) {
							pointbox = obj.append('<div class="CrazyImgcarouselPoint"></div>').find('.CrazyImgcarouselPoint');
							for (var i = 0; i < img.length; i++) {
								pointbox.append('<p></p>');
							};
							pointbox.find('p').eq(0).addClass('CrazyImgcarouselPointShow').siblings().removeClass('CrazyImgcarouselPointShow');
						}
						if (op.image.length < 2) return;
						fn();
						if (Crazy.isMobile()) Crazy.each({
							swipeleft: 'left',
							swiperight: 'right'
						}, function(i, e) {
							obj[i](function() {
								if (Crazy['AdaptiveChange']) return;
								clearInterval(time);
								var hide = show;
								show = count(e == 'left');
								switchs(show, hide, e == 'left', fn);
							});
						});
					},
					switchs = function(show, hide, dir, callback) {
						Crazy['AdaptiveChange'] = true;
						var fn = function() {
							img.eq(show).show().css({
								'left': 0,
								'top': 0
							});
							img.eq(hide).hide();
							if (op.point) pointbox.find('p').eq(show).addClass('CrazyImgcarouselPointShow').siblings().removeClass('CrazyImgcarouselPointShow');
							Crazy['AdaptiveChange'] = false;
							if (Crazy.type(callback) == 'function') callback();
						},
							filter = function() {
								var list = [];
								for (var i = 0; i < op.filter; i++) {
									list.push(picbox.append('<div class="switch"></div>').find('.switch').last());
								};
								return list;
							},
							themes = op.theme == 'random' ? parseInt(Math.random() * 7 + 1) : parseInt(op.theme) || 1;
						img.eq(show).css('z-index', 1);
						img.eq(hide).css('z-index', 0);
						switch (themes) {
							case 2:
								img.eq(show).css('left', dir ? '100%' : '-100%').show().animate({
									'left': 0
								}, op.speed, fn);
								img.eq(hide).animate({
									'left': dir ? '-100%' : '100%'
								}, op.speed, function() {
									Crazy(this).hide();
								});
								break;
							case 3:
								img.eq(show).css('left', dir ? '100%' : '-100%').show().animate({
									'left': 0
								}, op.speed, function() {
									img.eq(hide).hide();
									fn();
								});
								break;
							case 4:
								img.eq(hide).animate({
									'width': 0,
									'height': 0,
									'left': '50%',
									'top': '50%'
								}, op.speed / 2, function() {
									Crazy(this).hide().width(width).height(height).css('top', 0);
									img.eq(show).show().width(0).height(0).css({
										'left': '50%',
										'top': '50%'
									}).animate({
										'width': width * (Crazy['AdaptiveMultiple'] || 1),
										'height': height * (Crazy['AdaptiveMultiple'] || 1),
										'left': 0,
										'top': 0
									}, fn);
								});
								break;
							case 5:
								Crazy.each(filter(), function(i, e) {
									e.css({
										'position': 'absolute',
										'width': 100 / op.filter + '%',
										'height': '100%',
										'left': (dir ? i + 1 : i) * (100 / op.filter) + '%',
										'top': 0,
										'z-index': 2,
										'background': 'url(' + img.eq(show).attr('image') + ') ' + (i * (100 / (op.filter - 1)) + '%') + ' center / ' + (100 * op.filter) + '% 100%',
									}).width(0).animate({
										'width': 100 / op.filter + '%',
										'left': i * (100 / op.filter) + '%'
									}, op.speed, function() {
										Crazy(this).remove();
										if (i == op.filter - 1) fn();
									});
								});
								break;
							case 6:
								Crazy.each(filter(), function(i, e) {
									e.css({
										'position': 'absolute',
										'width': '100%',
										'height': 100 / op.filter + '%',
										'left': i % 2 == 0 ? (dir ? '100%' : 0) : (dir ? 0 : '100%'),
										'top': i * (100 / op.filter) + '%',
										'z-index': 2,
										'background': 'url(' + img.eq(show).attr('image') + ') center ' + (i * (100 / (op.filter - 1)) + '%') + ' / 100% ' + (100 * op.filter) + '%',
									}).width(0).animate({
										'width': '100%',
										'left': 0
									}, op.speed, function() {
										Crazy(this).remove();
										if (i == op.filter - 1) fn();
									});
								});
								break;
							case 7:
								Crazy.each(filter(), function(i, e) {
									e.css({
										'position': 'absolute',
										'width': 100 / op.filter + '%',
										'height': '100%',
										'left': i * (100 / op.filter) + '%',
										'top': i % 2 == 0 ? (dir ? '100%' : 0) : (dir ? 0 : '100%'),
										'z-index': 2,
										'background': 'url(' + img.eq(show).attr('image') + ') ' + (i * (100 / (op.filter - 1)) + '%') + ' center / ' + (100 * op.filter) + '% 100%',
									}).height(0).animate({
										'height': '100%',
										'top': 0
									}, op.speed, function() {
										Crazy(this).remove();
										if (i == op.filter - 1) fn();
									});
								});
								break;
							case 1:
							default:
								img.eq(hide).fadeOut(op.speed).siblings().hide();
								img.eq(show).fadeIn(op.speed, fn);
								break;
						};
					};
				if ((op.image.length == 1 && !op.image[0]) || !op.image) {
					console.error('No Pictrue!');
					return;
				}
				op.interval += op.speed;
				picbox = obj.empty().append('<div class="CrazyImgcarouselImage"></div>').find('.CrazyImgcarouselImage');
				if (op.button) btn = obj.append('<a javascript: void(0); class="CrazyImgcarouselButton CrazyImgcarouselButtonLast"><p></p></a><a javascript: void(0); class="CrazyImgcarouselButton CrazyImgcarouselButtonNext"><p></p></a>').find('.CrazyImgcarouselButton');
				Crazy.each(op.image, function(i, e) {
					picbox.append('<a href="' + (op.link[i] || 'javascript: void(0);') + '"></a>').find('a').last().image({
						url: e,
						position: op.position,
						size: op.size,
						origin: op.origin
					}, function(e) {
						length--;
						Crazy(this).css('position', 'absolute');
						if (i != 0) Crazy(this).hide();
						if (!obj.width()) width = Math.max(width, e.width);
						if (!obj.height()) height = Math.max(height, e.height);
						if (length === 0) fn.call(Crazy(this), arguments);
					});
				});
				Crazy.each(op, function(i, e) {
					if (i == 'image') {
						var str = '';
						for (var j in e) {
							str += (e[j] + ' ');
						};
						obj.attr('imglist', str);
						return;
					}
					obj.attr(i, e);
				});
			});
		},
		imgroll: function(options) { //尚未实现
			return this.each(function() {
				var obj = Crazy(this),
					op = Crazy.extend({
						image: null,
						link: null,
						button: false,
						position: 'center center',
						size: 'container',
						origin: 'padding',
						speed: 500
					}, {
						image: Crazy.trim((obj.attr('imglist') || '')).split(' '),
						link: Crazy.trim((obj.attr('link') || '')).split(' '),
						button: obj.attr('button') == 'true',
						position: obj.attr('position'),
						size: obj.attr('size'),
						origin: obj.attr('origin'),
						speed: parseInt(obj.attr('speed')) || 500
					}, options);
			});
		},
		scrollbar: function(options) {
			return this.each(function() {
				var obj = Crazy(this),
					op = Crazy.extend({
						type: 'auto',
						speed: 5
					}, {
						type: obj.attr('scrollbar') || 'auto',
						speed: parseFloat(obj.attr('speed')) || 5
					}, op),
					data = obj.data('scrollbar'),
					child = data ? undefined : obj.children(),
					scroll = data ? obj.find('>.CrazyScroll') : obj.append('<div class="CrazyScroll"></div>').find('>.CrazyScroll').css({
						'padding-left': obj.css('padding-left'),
						'padding-right': obj.css('padding-right'),
						'padding-top': obj.css('padding-top'),
						'padding-right': obj.css('padding-right')
					}),
					scrollX = data ? obj.find('>.CrazyScrollX') : obj.append('<div class="CrazyScrollX"><div class="bar"></div></div>').find('>.CrazyScrollX'),
					scrollY = data ? obj.find('>.CrazyScrollY') : obj.append('<div class="CrazyScrollY"><div class="bar"></div></div>').find('>.CrazyScrollY'),
					scrollXB = scrollX.find('.bar'),
					scrollYB = scrollY.find('.bar'),
					resizeFN = function() {
						var objSize = {
							width: obj.width(),
							height: obj.height()
						},
							scrollSize = {
								width: scroll.width() - (scroll.outerWidth() - scroll.width()) / 2,
								height: scroll.height() - (scroll.outerHeight() - scroll.height()) / 2
							},
							data = {
								x: scroll.data('percentageX'),
								y: scroll.data('percentageY')
							},
							percentage = {
								width: scrollSize.width / objSize.width,
								height: scrollSize.height / objSize.height
							},
							scrollFN = function(e) {
								Crazy('body').find('.CrazyScrollFilter').remove();
								var type = Crazy(this).get(0) === scrollXB.get(0),
									down = type ? e.pageX - scrollXB.offset().left : e.pageY - scrollYB.offset().top,
									css = type ? 'left' : 'top',
									object = type ? scrollXB : scrollYB,
									min = 0,
									max = type ? scrollX.width() - scrollXB.width() : scrollY.height() - scrollYB.height(),
									filter = Crazy('body').append('<div class="CrazyScrollFilter"></div>').find('.CrazyScrollFilter'),
									filterMove = function(e) {
										var move = type ? e.pageX - down - scrollX.offset().left : e.pageY - down - scrollY.offset().top,
											value = move <= min ? min : (move >= max ? max : move),
											percentage = -(type ? value / scrollX.width() * scrollSize.width : value / scrollY.height() * scrollSize.height),
											data = {};
										data[type ? 'percentageX' : 'percentageY'] = max / value;
										object.css(css, value);
										scroll.css(css, percentage).data(data);
									},
									filterUp = function(e) {
										filter.remove();
									};
								Crazy(filter).mousemove(filterMove).mouseup(filterUp);
								return false;
							},
							wheelFN = function(e, v) {
								var type = percentage.height > 1 && (op.type === 'auto' || op.type === 'y'),
									css = type ? 'top' : 'left',
									object = type ? scrollYB : scrollXB,
									min = 0,
									max = type ? scrollY.height() - scrollYB.height() : scrollX.width() - scrollXB.width(),
									move = (type ? object.position().top : object.position().left) - v * (op.speed / (type ? 1 : 15)),
									value = move <= min ? min : (move >= max ? max : move),
									percentageVal = -(type ? value / scrollY.height() * scrollSize.height : value / scrollX.width() * scrollSize.width),
									data = {};
								data[type ? 'percentageY' : 'percentageX'] = max / value;
								object.css(css, value);
								scroll.css(css, percentageVal).data(data);
								return false;
							};
						if ((percentage.width > 1 && percentage.width !== Infinity && (op.type === 'auto' || op.type === 'x')) || percentage.height > 1 && percentage.height !== Infinity && (op.type === 'auto' || op.type === 'y')) {
							obj.unbind('mousewheel', wheelFN).mousewheel(wheelFN);
						}
						if (percentage.width > 1 && percentage.width !== Infinity && (op.type === 'auto' || op.type === 'x')) {
							scrollX.show();
							scrollXB.width(objSize.width / percentage.width).css('left', (scrollX.width() - scrollXB.width()) / data.x).unbind('mousedown').mousedown(scrollFN);
							scroll.css('left', (objSize.width - scrollSize.width) / data.x);
						} else {
							scrollX.hide();
							scroll.css('left', 0);
						}
						if (percentage.height > 1 && percentage.height !== Infinity && (op.type === 'auto' || op.type === 'y')) {
							scrollY.show();
							scrollYB.height(objSize.height / percentage.height).css('left', (scrollX.height() - scrollXB.height()) / data.y).unbind('mousedown').mousedown(scrollFN);
							scroll.css('top', (objSize.height - scrollSize.height) / data.y);
						} else {
							scrollY.hide();
							scroll.css('top', 0);
						}
					};
				if (obj.css('position') !== 'absolute' && obj.css('position') !== 'fixed' && obj.css('position') !== 'fixed' !== 'relative') obj.css('position', 'relative');
				if (op.type !== 'auto' && op.type !== 'x' && op.type !== 'y') op.type = 'auto';
				if (!data) {
					scroll.append(child.clone(true));
					child.remove();
					var fn = function() {
						clearInterval(time);
						obj.children().each(function() {
							if (Crazy(this).get(0) !== scroll.get(0) && Crazy(this).get(0) !== scrollX.get(0) && Crazy(this).get(0) !== scrollY.get(0)) {
								scroll.append(Crazy(this).clone(true));
								Crazy(this).remove();
							}
						});
						time = setInterval(fn, 100)
					},
						time = setInterval(fn, 100);
				}
				scroll.data({
					percentageX: 0,
					percentageY: 0
				});
				resizeFN();
				obj.attr({
					'scrollbar': op.type,
					'speed': op.speed
				}).unbind('resize', resizeFN).resize(resizeFN);
				scroll.unbind('resize', resizeFN).resize(resizeFN);
				obj.data({
					scrollbar: {
						scroll: scroll,
						scrollX: scrollX,
						scrollY: scrollY,
						scrollXB: scrollXB,
						scrollYB: scrollYB,
						resizeFN: resizeFN
					}
				}).find('*[scrollbar]').scrollbar();
				obj.find('*[image]').image();
			});
		}
	});
	Crazy.extend({
		language: function(type) {
			if (type != 'ch-cn' && type != 'ch-hk') return;
			var zh_cn = '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄',
				zh_hk = '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩',
				f = function(h) {
					var s = '';
					for (var i = 0; i < h.length; i++) s += h.charCodeAt(i) > 10000 && (type == 'ch-hk' ? zh_cn.indexOf(h.charAt(i)) : zh_hk.indexOf(h.charAt(i))) != -1 ? type == 'ch-hk' ? zh_hk.charAt(zh_cn.indexOf(h.charAt(i))) : zh_cn.charAt(zh_hk.indexOf(h.charAt(i))) : h.charAt(i);
					return s;
				},
				fs = function(o) {
					o = typeof o == 'object' ? o.childNodes : document.childNodes;
					for (var i = 0; i < o.length; i++) {
						var oc = o.item(i);
						if ("||BR|HR|TEXTAREA|".indexOf("|" + oc.tagName + "|") > 0) continue;
						if (oc.title != "" && oc.title != null) oc.title = f(oc.title);
						if (oc.alt != "" && oc.alt != null) oc.alt = f(oc.alt);
						if (oc.tagName == "INPUT" && oc.value != "" && oc.type != "text" && oc.type != "hidden") oc.value = f(oc.value);
						oc.nodeType == 3 ? oc.data = f(oc.data) : fs(oc);
					};
				};
			fs();
		},
		isMobile: function() {
			return !(navigator.userAgent.indexOf('Windows') > 0);
		},
		adaptive: function(options) {
			var html = Crazy('html'),
				op = Crazy.extend({
					debug: false,
					mobileWidth: 320,
					pcWidth: 1020,
					openPC: false,
					fn: function() {},
					mobileFn: function() {}
				}, {
					debug: html.attr('debug') == 'true',
					mobileiWdth: Number(html.attr('mobileWidth')) || 320,
					pcWidth: Number(html.attr('pcWidth')) || 1020,
					openPC: html.attr('openPC') == 'true',
					fn: html.attr('fn'),
					mobileFn: html.attr('mobileFn')
				}, options);
			Crazy.type(op.fn) == 'string' ? eval(op.fn) : op.fn();
			if (Crazy.isMobile()) Crazy.type(op.mobileFn) == 'string' ? eval(op.mobileFn) : op.mobileFn();
			var currentNode = Crazy('*[adaptive!="true"][id!="CrazyAdaptive"]'),
				th = this,
				wait = [],
				multiple = Crazy(window).width() / (Crazy.isMobile() ? op.mobileWidth : op.pcWidth),
				processor = function(e, v) {
					var arr = e.split('px'),
						newArr = [],
						style = '',
						getIndex = function(e) {
							var index = turn(e).indexOf(':') > 0 ? e.length - turn(e).indexOf(':') - 1 : turn(e).indexOf(':'),
								str = turn(e.substr(index));
							return str.indexOf(' ') > -1 ? index + (str.length - str.indexOf(' ') - 1) : index + 1;
						},
						turn = function(e) {
							e = e.toString();
							var str = '';
							for (var i = e.length - 1; i >= 0; i--) {
								str += e.charAt(i);
							};
							return Crazy.trim(str);
						};
					for (var i in arr) {
						var json = {};
						if (!parseFloat(turn(arr[i]))) {
							json[arr[i]] = false;
						} else {
							var index = getIndex(arr[i]),
								value = parseFloat(index < 0 ? arr[i] : arr[i].substr(index)) * (v && th['AdaptiveMultiple'] ? th['AdaptiveMultiple'] : multiple),
								key = index < 0 ? '' : arr[i].substr(0, index);
							json[key] = value;
						}
						newArr.push(json);
					};
					for (var i in newArr) {
						for (var j in newArr[i]) {
							style += (Crazy.trim(j) + ' ' + (!newArr[i][j] ? '' : newArr[i][j] + 'px '));
						};
					};
					return Crazy.trim(style);
				},
				set = function(e) {
					var fn = function(e) {
						if (!e) return {};
						var arr = e.split(';'),
							json = {};
						for (var i in arr) {
							if (arr[i]) {
								var index = arr[i].indexOf(':');
								json[arr[i].substr(0, index).trim()] = arr[i].substr(index + 1).trim();
							}
						};
						return json;
					},
						origin = fn(e.css),
						proce = fn(processor(e.css, true)),
						current = fn(e.element.attr('style')),
						news = '';

					for (var i in current) {
						news += (i + ': ' + (current[i] != proce[i] ? current[i] : origin[i]) + '; ');
					};
					return news;
				},
				begin = function() {
					this['AdaptiveChange'] = true;
					if (!Crazy.isMobile() && !op.openPC || multiple < 1) {
						Crazy('html').css('opacity', '1');
						return;
					}
					Crazy('#CrazyAdaptive').remove();
					var style = '<style id="CrazyAdaptive" adaptive="true">\n',
						styleList = {};
					Crazy.each(th['Css'], function(i, e) {
						if (e.elemStr) {
							if (Crazy.isMobile() && e.mobile) {
								styleList[e.index] = processor(e);
							} else if (!e.mobile) {
								styleList[e.index] = processor(e.css);
							}
							e.element.remove();
						} else {
							e.css = set(e);
							e.element.attr('style', processor(e.css));
						}
					});
					for (var i in styleList) {
						style += styleList[i];
					};
					style += '</style>';
					Crazy('head').append(style);
					if (!th['AdaptiveMultiple']) Crazy('html').animate({
						'opacity': 1
					}, 500);
					th['AdaptiveMultiple'] = op.debug ? 1 : multiple;
					th['AdaptiveHTML'] = Crazy('html').html();
					if (th['AdaptiveTime']) clearInterval(th['AdaptiveTime']);
					th['AdaptiveTime'] = setInterval(function() {
						if (!th['AdaptiveChange'] && th['AdaptiveHTML'] != Crazy('html').html()) {
							th.adaptive();
						}
					}, 100);
					th['AdaptiveChange'] = false;
				},
				time;
			this['Css'] = this['Css'] || [];
			Crazy.each(this['Css'], function(i, e) {
				if (!e.elemStr) {
					var fn = function(e) {
						var arr = e.split(';'),
							json = {};
						for (var i in arr) {
							var index = arr[i].indexOf(':'),
								key = Crazy.trim(arr[i].substr(0, index));
							if (key) json[key] = Crazy.trim(arr[i].substr(index + 1));
						};
						return json;
					},
						css = fn(processor(e.css)),
						cuCss = fn(e.element.attr('style')),
						style = '';
					for (var i in cuCss) {
						style += (i + ': ' + (cuCss[i] != css[i] ? cuCss[i] : fn(e.css)[i]) + '; ');
					};
					e.css = style;
				}
			});
			currentNode.each(function() {
				if (this.tagName == 'LINK') {
					Crazy(this).attr('adaptive', 'true');
					wait.push(true);
					var elem = Crazy('body').append('<adaptive></adaptive>').find('adaptive').last(),
						ts = Crazy(this);
					elem.load(Crazy(this).attr('href'), function(e, v) {
						if (v == 'success') th['Css'].push({
							element: ts,
							elemStr: ts.get(0).outerHTML,
							mobile: Boolean(ts.attr('mobile')),
							css: e,
							index: parseInt(ts.parent().index() + '' + ts.index())
						});
						elem.remove();
						wait.pop();
					});
				} else if (this.tagName == 'STYLE') {
					Crazy(this).attr('adaptive', 'true');
					th['Css'].push({
						element: Crazy(this),
						elemStr: Crazy(this).get(0).outerHTML,
						mobile: Boolean(Crazy(this).attr('mobile')),
						css: Crazy.trim(Crazy(this).text()),
						index: parseInt(Crazy(this).parent().index() + '' + Crazy(this).index())
					});
				} else if (Crazy.trim(Crazy(this).attr('style')).length > 0) {
					Crazy(this).attr('adaptive', 'true');
					th['Css'].push({
						element: Crazy(this),
						mobile: Boolean(Crazy(this).attr('mobile')),
						css: Crazy(this).attr('style')
					});
				}
			});
			time = setInterval(function() {
				if (wait.length === 0) {
					clearInterval(time);
					if (op.debug) {
						Crazy('html').css('opacity', '1').width((Crazy.isMobile() ? op.mobileWidth : op.pcWidth));
						return;
					}
					begin();
					Crazy(window).resize(function() {
						multiple = Crazy(window).width() / (Crazy.isMobile() ? op.mobileWidth : op.pcWidth);
						begin();
					});
				}
			}, 10);
			Crazy.each({
				adapWidth: 'width',
				adapHeight: 'height'
			}, function(i, e) {
				Crazy.fn[i] = function() {
					if (Crazy(this).get(0) !== window) return undefined;
					return Crazy(this)[e]() / (Crazy.AdaptiveMultiple || 1);
				};
			});
		},
		getParameters: function(e) {
			var pra = window.location.search,
				getReg = function(e) {
					var reg = new RegExp('(^|&)' + e + '=([^&]*)(&|$)'),
						r = pra.substr(1).match(reg);
					return !r ? undefined : unescape(r[2]);
				};
			if (Crazy.type(e) == 'string') return getReg(e);
			if (Crazy.type(e) == 'array' || !e) {
				var json = {};
				if (!e) {
					var url = pra.split('?')[1].split('&');
					e = [];
					Crazy.each(url, function(i, v) {
						e.push(v.split('=')[0]);
					});
				}
				Crazy.each(e, function(i, e) {
					json[e] = getReg(e);
				});
				return json;
			}
		}
	});
	Crazy.each('swipeleft swiperight swipeup swipedown'.split(' '), function(i, e) {
		Crazy.fn[e] = function(fn) {
			return Crazy(this).swipe(fn, e.split('swipe')[1]);
		};
	});
	Crazy(function($) {
		if (Crazy.isMobile() && !this['Mobile']) {
			Crazy('head').prepend('<meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
			$('head').prepend('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="0" />');
			this['Mobile'] = true;
		}
		$.language($('html').attr('language'));
		$('*[imglist]').imgcarousel();
		$('*[image]').image();
		$('*[scrollbar]').scrollbar();
		$('body *[href]').preloading();
		setTimeout(function() {
			if (!$.Css) $('html').animate({
				'opacity': 1
			}, 500);
		}, 100);
	});
	Crazy.extend(String.prototype, {
		replaceAll: function(e, v) {
			var str = this.toString();
			if (!e || !v) return str;
			while (str != str.replace(e, v)) {
				str = str.replace(e, v);
			};
			return str;
		},
		trim: function() {
			return Crazy.trim(this.toString());
		}
	});
	window.Crazy = window.jQuery = window.$ = Crazy;
	if (typeof define === "function" && define.amd && define.amd.Crazy) define("crazy", [], function() {
		return Crazy;
	});
})(window);