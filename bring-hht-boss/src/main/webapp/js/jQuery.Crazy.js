/*
Crazy(疯子)
	作者: GT
	开始时间:2016.11
	版本: v1.0.1
	依赖: jQuery
	浏览器支持:支持HTML5
*/
(function($) {
	"function" == typeof define && define.amd ? define(["jquery"], $) : "object" == typeof exports ? module.exports = $ : $(jQuery);
})(function($) {
	// 核心
	var core = {
		// 疯子
		crazy: {
			// 载体
			carrier: undefined,
			// 页面
			page: {},
			// 动态创建的页面
			pageDynamic: {},
			// 无页面
			notPage: false,
			// 浏览记录
			browsingRecord: [],
			// 当前浏览下标
			browsingCurrent: 0,
			// 当前地址
			location: $.extend({}, location),
			// 资源
			source: {},
			// 外部地址列表
			urlExternal: {},
		},
		// 全局设置
		globals: {
			// 开发者模式
			developer: false,
			// 响应模式全局设置
			responseSetting: {},
		},
		// 移动端标识
		mobile: $('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"><meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">'),
		// 设置首页
		setHome: function() {
			if (core.crazy.browsingRecord.length > 0) {
				var link = core.session('location');
				if (!core.crazy.page[link.pathname][link.hash]) {
					// 创建非源缓存页面
					var page = core.crazy.pageDynamic[link.pathname][link.hash],
						jquery = $(page.context),
						context = jquery[0].innerHTML;
					jquery.attr('crazy-pathname', page.path).empty();
					$$.appendPage({
						id: page.id,
						title: page.title,
						css: page.css,
						context: context,
						events: page.events
					});
				}
				$$.go(link.pathname + link.hash, $$);
			} else {
				var hasHome = false;
				$.each(core.crazy.page, function(k, v) {
					$.each(v, function() {
						if (this.jquery.is('[crazy-home="true"]')) {
							$$.go(this.url);
							hasHome = true;
							return false;
						}
					});
				});
				if (!hasHome) $.each(core.crazy.page, function(k, v) {
					$.each(v, function() {
						$$.go(this.url);
						return false;
					});
					core.crazy.notPage = true;
					$$.go(core.crazy.location.href);
				});
			}
		},
		// 设备版本
		appVersion: function() {
			var app = navigator.appVersion.toLowerCase();
			return {
				/*是否为移动设备*/
				mobile: app.indexOf('mobile') > -1 || app.indexOf('ipad') > -1 || app.indexOf('android') > -1,
				/*设备类型 平板电脑 手机 电脑*/
				app: (function(app) {
					if (app.indexOf('mobile') > -1) return 'phone';
					if (app.indexOf('ipad') > -1 || app.indexOf('android') > -1) return 'iPad';
					return 'pc';
				})(app)
			};
		},
		// window resize回调列表
		resizeCallback: {},
		// window resize回调函数
		windowResize: function(e) {
			for (var i in core.resizeCallback) {
				core.resizeCallback[i] && core.resizeCallback[i](e);
			};
		},
		// 服务器存储
		session: function(key, value) {
			if (arguments.length > 1) {
				switch (key) {
					case 'browsingRecord':
						sessionStorage[key] = JSON.stringify(value);
						break;
					case 'pageDynamic':
						var value = $.extend(true, {}, value);
						$.each(value, function(k, v) {
							$.each(v, function(k, v) {
								$.each(v.events, function(k, v) {
									$.each(v, function(k, vs) {
										v[k] = vs.toString();
									});
								});
							});
						});
						sessionStorage[key] = JSON.stringify(value);
						break;
					case 'urlExternal':
					case 'location':
						sessionStorage[key] = JSON.stringify(value);
						break;
					default:
						sessionStorage[key] = value.toString();
						break;
				};
			} else {
				if ($.type(key) === 'object') {
					$.each(key, function(i, v) {
						core.session(i, v);
					});
				} else {
					switch (key) {
						case 'browsingRecord':
							return !sessionStorage[key] ? [] : JSON.parse(sessionStorage[key]);
						case 'pageDynamic':
							if (!sessionStorage[key]) return {};
							var json = JSON.parse(sessionStorage[key]);
							$.each(json, function(k, v) {
								$.each(v, function(k, v) {
									$.each(v.events, function(k, v) {
										$.each(v, function(k, vs) {
											eval('var f =' + vs);
											v[k] = f;
										});
									});
								});
							});
							return json;
						case 'urlExternal':
						case 'location':
							return !sessionStorage[key] ? {} : JSON.parse(sessionStorage[key]);
						case 'browsingCurrent':
							return sessionStorage[key] || 0;
						default:
							return sessionStorage[key];
					};
				}
			}
		},
		// 清空服务器缓存
		clearSession: function() {
			$.each(sessionStorage, function(k) {
				delete sessionStorage[k];
			});
		},
		// 调整html
		adjustment: function() {
			$body.find('>*').filter('[crazy-type!="' + (core.crazy.carrier ? 'carrier' : 'page') + '"]').remove();
		},
		// 创建载体
		createCarrier: function() {
			if (!core.crazy.carrier || core.crazy.carrier.length < 1) {
				core.crazy.carrier = undefined;
				return;
			}
			// $body.empty();
			var hasSubCarrier = core.crazy.carrier.find('[crazy-type="sub-carrier"]').length > 0,
				carrier = {
					// 载体对象
					jquery: core.crazy.carrier,
					// 子载体对象
					subCarrier: (hasSubCarrier ? core.crazy.carrier.find('[crazy-type="sub-carrier"]').remove() : $('<div crazy-type="sub-carrier"></div>')).appendTo(core.crazy.carrier)
				};
			$.each(core.crazy.page, function(k, v) {
				$.each(v, function(k, v) {
					v.jquery.appendTo(carrier.subCarrier);
				});
			});
			carrier.jquery.appendTo($body);
			core.crazy.carrier = carrier;
		}
	},
		// 疯子
		$$ = crazy = function(callback) {
			$(function() {
				callback && callback.call(crazy, $, crazy);
				core.windowResize();
				// 创建载体
				core.createCarrier();
				core.setHome();
			});
		},
		$win, $dom, $html, $head, $body,
		// 拓展
		extend = {
			// 用户界面
			ui: {
				// 图片
				image: function(options) {
					if (!options) return;
					var isjQuery = options.jquery,
						op = isjQuery ? options : $.extend({
							// 路径
							src: '',
							// 大小
							size: 'auto',
							// 居中
							center: true,
							// 补白
							filler: 'content'
						}, options);
					if (isjQuery) {
						if (!op.length) return;
						var append = function(e) {
							return $$.image({
								jq: e,
								src: e.attr('crazy-image-src'),
								size: e.attr('crazy-image-size'),
								center: e.attr('crazy-image-center'),
								filler: e.attr('crazy-image-filler')
							});
						};
						if (op.length > 1) {
							var list = {};
							op.each(function(i) {
								list[i] = append($(this));
							});
							return list;
						}
						return append(op);
					}
					if (!op.src) return;
					var jquery = (op.jq ? op.jq : $('<div crazy-type="image" crazy-image-src="' + op.src + '"></div>')).attr('crazy-register', true),
						sizeType = {
							auto: 'contain',
							filler: 'cover',
							origin: 'initial'
						},
						img = new Image(),
						exist = $('*').filter(jquery).length;
					if (!exist) jquery.appendTo($body);
					var width = jquery.outerWidth(),
						height = jquery.outerHeight();
					if (!exist) jquery.remove();
					img.src = op.src;
					img.onload = function() {
						if (jquery.width() <= 0 || jquery.height() <= 0) {
							if (width > 0) this.width = width;
							if (height > 0) this.height = height;
							$(this).appendTo($body);
							width = this.width;
							height = this.height;
						}
						jquery.outerWidth(width).outerHeight(height);
						$(this).remove();
						jquery.css({
							'background-image': 'url(' + op.src + ')',
							'background-repeat': 'no-repeat',
							'background-size': sizeType[op.size] || op.size,
							'background-position': op.center ? 'center center' : 'left top',
							'background-origin': op.filler + '-box'
						}).attr({
							'crazy-image-src': op.src,
							'crazy-image-size': op.size,
							'crazy-image-center': op.center,
							'crazy-image-filler': op.filler
						});
					};
					return {
						type: 'image',
						jquery: jquery,
						src: op.src,
						size: op.size,
						center: op.center,
						filler: op.filler
					};
				}
			}
		};
	// 疯子核心
	$.extend($$,
		// 核心
		{
			// 加载外部页面资源
			loadSource: function(url) {
				if (!url) return this;
				if ($.type(url) === 'array') {
					$.each(url, function() {
						$$.loadSource(this);
					});
					return this;
				}
				var link = $('<a href="' + url + '"></a>')[0];
				if (link.host !== core.crazy.location.host || core.crazy.urlExternal[link.pathname]) return this;
				core.crazy.urlExternal[link.pathname] = true;
				core.session('urlExternal', core.crazy.urlExternal);
				$.ajax({
					url: link.href,
					type: 'get',
					async: false,
					success: function(data) {
						var page = $(data).filter('[crazy-type="page"]').attr('crazy-pathname', link.pathname);
						if (!core.crazy.carrier || core.crazy.carrier.length < 1) core.crazy.carrier = $(data).filter('[crazy-type="carrier"]');
						core.crazy.source[link.pathname] = {
							script: $(data).filter('script[type="crazy"]').attr('type', 'text/javascript'),
							css: $(data).filter('link[type="crazy"], style[type="crazy"]').attr('type', 'text/css')
						};
						for (var i = 0; i < page.length; i++) {

						};
						page.each(function() {
							var source = {
								script: $(this).find('script[src]').remove(),
								css: $(this).find('link').remove()
							},
								newSource = {
									script: $(''),
									css: $('')
								};
							$.each(source, function(k, v) {
								v.each(function(k, v) {
									var isScript = v.tagName === 'SCRIPT';
									$.ajax({
										url: v[isScript ? 'src' : 'href'],
										type: 'get',
										async: false,
										dataType: 'text',
										success: function(data) {
											newSource[isScript ? 'script' : 'css'] = newSource[isScript ? 'script' : 'css'].add($('<' + (isScript ? 'script' : 'style') + ' type="text/' + (isScript ? 'javascript' : 'css') + '">' + data + '</' + (isScript ? 'script' : 'style') + '>'));
										}
									});
								});
							});
							$(this).append(newSource.css.add(newSource.script));
						});
						core.crazy.page[link.pathname] = {};
						$$.appendPage(page, $$);
					}
				});
				return this;
			},
		},
		// 用户界面
		{
			// 响应模式
			responseModel: function(options) {
				var $this = this,
					op = $.extend(true, {
						// 页面尺寸
						size: {
							pc: {
								width: 'auto',
								height: 'auto'
							},
							iPad: {
								width: 768,
								height: 1024
							},
							phone: {
								width: 320,
								height: 480
							}
						},
						// 样式
						style: {
							pc: '',
							iPad: '',
							phone: ''
						},
						// 缩放
						scale: {
							pc: false,
							iPad: true,
							phone: true
						}
					}, core.globals.responseSetting, options);
				core.globals.responseSetting = op;
				core.resizeCallback.responseModel = function() {
					// 设备类型
					var app = $$.appVersion.app,
						// 缩放
						isScale = op.scale[app],
						scale = $win.width() / op.size[app].width;
					for (var i in op.style) {
						$body.removeClass(op.style[i]);
					};
					core.mobile.remove();
					// 移动设备
					if ($$.appVersion.mobile) $head.append(core.mobile);
					// 缩放
					$body.width(op.size[app].width === 'auto' ? '100%' : op.size[app].width).height(isScale ? $win.height() / scale : (op.size[app].height === 'auto' ? '100%' : op.size[app].height)).css({
						'transform': isScale ? 'scale(' + scale + ')' : 'none',
						'transform-origin': isScale ? 'left top' : 'none'
					});
					$body.addClass(op.style[app]);
				};
				core.resizeCallback.responseModel();
				return this;
			},
			// 追加页面
			appendPage: function(options, dynamic) {
				if (!options) return;
				var isjQuery = options.jquery,
					op = isjQuery ? options : $.extend(true, {
						// 页面ID
						id: '',
						// 页面标题
						title: $dom[0].title,
						// 页面样式
						css: '',
						// 页面上下文
						context: '',
						// 事件列表
						events: {
							// 加载事件
							load: []
						}
					}, options);
				if (isjQuery) {
					if (!op.length) return;
					var append = function(e) {
						return $$.appendPage({
							jq: e,
							id: e[0].id,
							title: e.attr('crazy-title')
						}, dynamic);
					};
					if (op.length > 1) {
						var list = {};
						op.each(function(i) {
							list[i] = append($(this));
						});
						return list;
					}
					return append(op);
				}
				if (!op.id) return;
				core.crazy.notPage = false;
				var jquery = (op.jq ? op.jq.remove() : $('<div crazy-type="page">' + op.context + '</div>')).attr('crazy-register', true).hide(),
					page = {
						type: 'page',
						jquery: jquery,
						children: {},
						childrenDynamic: {},
						source: {
							script: jquery.find('script').remove(),
							css: jquery.find('style, link')
						},
						id: op.id,
						path: (jquery.attr('crazy-pathname') || core.crazy.location.pathname),
						hash: '#' + op.id,
						url: (jquery.attr('crazy-pathname') || core.crazy.location.pathname) + '#' + op.id,
						title: jquery.attr('crazy-title') || op.title,
						css: op.css,
						events: {},
						// 跳转到当前页面
						go: function() {
							return $$.go(this.url);
						}
					};
				$.each(extend.ui, function(k, v) {
					page[k] = function(options, callback) {
						var child = v(options);
						page.childrenDynamic[child.type].push(child);
						page.jquery.append(child.jquery);
						callback && callback.call(child, page);
						return child;
					};
				});
				jquery.attr({
					'crazy-pathname': page.path,
					'crazy-title': page.title
				}).appendTo(core.crazy.carrier && !dynamic ? core.crazy.carrier.subCarrier : $body).show().addClass(page.css)[0].id = page.id;
				$.each(op.events, function(i, v) {
					page.events[i] = $.type(v) === 'array' ? v : (v ? [v] : []);
					page['on' + i] = function(callback) {
						if (callback === $$) {
							var $this = this;
							$.each(this.events[i], function(i, v) {
								this && this.call($this, $this);
							});
						} else {
							if ($.type(callback) !== 'function') return this;
							this.events[i].push(callback);
						}
						return this;
					};
				});
				core.crazy.page[page.path][page.hash] = page;
				// 设置内域链接
				jquery.find('a').each(function() {
					var url = parseInt($(this).attr('href'));
					if (isNaN(url)) {
						if ($(this)[0].protocol !== 'http:' && $(this)[0].protocol !== 'https:') return;
						if ($(this)[0].host !== core.crazy.location.host) return;
						url = $(this)[0].protocol + '//' + $(this)[0].host + ($(this).attr('href').indexOf('#') === 0 ? page.path : $(this)[0].pathname) + $(this)[0].hash,
						path = $(this)[0].pathname;
						$(this).attr({
							'href': 'javascript: void(0);',
							'onclick': 'Crazy.go("' + url + '")'
						});
						for (var i = 0; i < core.crazy.urlExternal.length; i++) {
							if (core.crazy.urlExternal[i] === path) return;
						};
						$$.loadSource(url);
					} else {
						$(this).attr({
							'href': 'javascript: void(0);',
							'onclick': 'Crazy.go(' + url + ')'
						});
					}
				});
				// 设置图片
				page.children.image = [];
				page.childrenDynamic.image = [];
				page.jquery.find('[crazy-type="image"][crazy-register!="true"]').each(function() {
					page.children.image.push($$.image($(this)));
				});
				if (!dynamic) {
					if (!core.crazy.pageDynamic[page.path]) core.crazy.pageDynamic[page.path] = {};
					core.crazy.pageDynamic[page.path][page.hash] = {
						id: page.id,
						title: page.title,
						css: page.css,
						context: page.jquery[0].outerHTML,
						path: page.path,
						hash: page.hash,
						events: page.events
					};
					core.session('pageDynamic', core.crazy.pageDynamic);
				}
				jquery.hide();
				return page;
			},
			// 获取页面
			page: function(url, callback) {
				var page;
				if (!url || $.type(url) === 'function') {
					page = core.crazy.page[core.crazy.location.pathname][core.crazy.location.hash];
					url && url.call(page, page);
				} else {
					var link = $('<a href="' + url + '"></a>')[0];
					page = core.crazy.page[link.pathname][link.hash];
					callback && callback.call(page, page);
				}
				return page;
			},
			// 页面跳转
			go: function(url) {
				if (!url && url !== 0) return $$.page();
				if ($.type(url) === 'object') return $$.go(url.url);
				if ($.type(url) === 'number') {
					if (url === 0) return $$.go(core.crazy.location.href);
					core.crazy.browsingCurrent = url > 0 ? Math.min(core.crazy.browsingCurrent + 1, core.crazy.browsingRecord.length - 1) : Math.max(core.crazy.browsingCurrent - 1, 0);
					return $$.go(core.crazy.browsingRecord[core.crazy.browsingCurrent], $$);
				}
				var last = $$.page(),
					link = $('<a href="' + url + '"></a>')[0],
					page = core.crazy.page[link.pathname][link.hash],
					source = core.crazy.source[link.pathname],
					isBegin = false,
					show = function() {
						$.each(core.crazy.page, function(k, v) {
							$.each(v, function(k, v) {
								$.each(v.childrenDynamic, function(k, v) {
									$.each(v, function(k, v) {
										v.jquery.remove();
									});
									v = [];
								});
							});
						});
						page.jquery.append(page.source.css.add(page.source.script)).fadeIn(300).siblings().unbind().find('*').unbind().filter('script, style, link').remove();
					};
				if (link.href === core.crazy.location.href && core.crazy.browsingRecord.length > 0) return page;
				$body.append(core.crazy.source[link.pathname].css.add(core.crazy.source[link.pathname].script));
				if (!core.crazy.page[link.pathname][link.hash]) return $$.go(-1);
				if ($$.page()) {
					$$.page().jquery.fadeOut(300, show);
				} else {
					isBegin = true;
				}
				core.crazy.location.pathname = link.pathname;
				core.crazy.location.hash = link.hash;
				core.crazy.location.href = core.crazy.location.protocol + '//' + core.crazy.location.host + core.crazy.location.pathname + core.crazy.location.hash;
				if (isBegin) show();
				core.adjustment();
				if (arguments[1] !== $$) {
					if (core.crazy.browsingCurrent !== core.crazy.browsingRecord.length - 1) core.crazy.browsingRecord.splice(core.crazy.browsingCurrent + 1);
					core.crazy.browsingCurrent = core.crazy.browsingRecord.push(link.pathname + link.hash) - 1;
				}
				core.session({
					browsingRecord: core.crazy.browsingRecord,
					browsingCurrent: core.crazy.browsingCurrent,
					location: core.crazy.location
				});
				$win.unbind().resize(core.windowResize);
				$dom.add($html).unbind()[0].title = page.title;
				page.onload($$);
				return page;
			}
		},
		// 工具
		{
			// 版本号
			version: '1.0.1',
			// 设备版本
			appVersion: core.appVersion()
		}, extend.ui);
	$(function() {
		// 设置变量
		$win = $(window);
		$dom = $(document);
		$html = $('html');
		$head = $('head');
		$body = $('body').empty();
		// 获取服务器存储
		core.crazy.browsingRecord = core.session('browsingRecord');
		core.crazy.browsingCurrent = core.session('browsingCurrent');
		core.crazy.pageDynamic = core.session('pageDynamic');
		core.resizeCallback.appVersion = function() {
			$$.appVersion = core.appVersion();
			$body.attr('crazy-appVersion', $$.appVersion.app);
		};
		$$.responseModel();
		// 加载外部页面
		var urlExternal = core.session('urlExternal');
		$.each(urlExternal, function(k) {
			$$.loadSource(k);
		});
		$win.resize(core.windowResize);
		$$.loadSource(core.crazy.location.pathname);
		// 创建载体
		core.createCarrier();
		// 载入公用脚本和样式
		$body.append(core.crazy.source[core.crazy.location.pathname].css.add(core.crazy.source[core.crazy.location.pathname].script));
		// 设置首页
		core.setHome();
	});
	Crazy = $.Crazy = $$;
	window.core = core;
});