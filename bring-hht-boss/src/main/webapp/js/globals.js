
$.fn.extend({
	pagination: function(option, callback) {
		var root = $(this)
		var selector = $('.pagination');

		var option   = option          || {};
		var total    = option.total    || 0;            // data row total
		var href     = option.href     || '#';

		if (selector.attr('data-rowtotal') == total) return;

		var pageSize = option.pageSize || 20,           // how many row in a page
			currentPageNo = option.currentPageNo || 1,  // the current page no
			pageNum  = option.pageNum  || 8;            // how many pages on show


		var linkNum = Math.ceil(total / pageSize),
			maxShow = (linkNum >= pageNum + 1) ? pageNum : linkNum;

		// create page link
		function createLink(tarNo) {
			var tmp     = '';
			var tarNo   = Number(tarNo) || 1,
				midNo   = Math.floor((pageNum - 1) / 2),
				startNo = (tarNo > midNo) ? tarNo - midNo : 1,
				endNo   = (tarNo + midNo >= linkNum) ? linkNum : startNo + maxShow - 1;

			if (tarNo + midNo >= linkNum) {
				startNo = endNo - maxShow + 1;
			}

			if (startNo > 1) {
				tmp += '<li><span class="plink">...</span></li>';
			}

			for(var i = startNo; i <= endNo; i++) {
				tmp += '<li><a class="plink" data-pageno="' + i + '" href="#">' + i + '</a></li>';
			}

			if ((tarNo + Math.ceil((pageNum - 1) / 2) < linkNum) && linkNum > pageNum) {
				tmp += '<li><span class="plink">...</span></li>';
			}

			// prev and next stauts
			direction(tarNo, linkNum);

			selector.find('.plink').parent().remove();
			selector.find('li:last-child').before(tmp);
			selector.find('[data-pageno="' + tarNo + '"]').parent().addClass('active');
			selector.attr({
				'data-rowtotal': total,
				'data-pagesize': pageSize
			});
		}
		createLink(currentPageNo);

		function direction(tarNo, linkNum) {
			// prev stauts
			if (tarNo > 1) {
				selector.find('.prev').parent().removeClass('disabled');
			} else {
				selector.find('.prev').parent().addClass('disabled');
			}
			// next stauts
			if (tarNo < linkNum) {
				selector.find('.next').parent().removeClass('disabled');
			} else {
				selector.find('.next').parent().addClass('disabled');
			}
		}

		// bind link action
		selector.off('click');
		selector.on('click', 'a', function(e) {
			e.preventDefault();
			var _this     = $(this),
				_parent   = _this.parent(),
				pageNo    = _this.attr('data-pageno')      || 1,
				pageSize  = selector.attr('data-pagesize') || 20;

			if (_parent.hasClass('disabled') || _parent.hasClass('active')) return;

			var tarNo = Number(selector.find('li.active a').attr('data-pageno') || 1);
			var targetNo = tarNo;

			// current page
			// prev
			if (_this.hasClass('prev')) {
				tarNo = Number(tarNo) - 1;
				// next
			} else if (_this.hasClass('next')) {
				tarNo = Number(tarNo) + 1;
			} else {
				tarNo = pageNo;
			}
			var href = option.href, url = /\?/.test(href) ? href + '&page='+ tarNo : option.href+'?page='+tarNo;
			window.location.href = url;
			/*// prev and next stauts
			direction(tarNo, linkNum);

			if (linkNum <= pageNum) {
				selector.find('[data-pageno="' + tarNo + '"]').parent().addClass('active').siblings().removeClass('active');
			} else {
				createLink(tarNo);
			}

			if (callback) {
				root.find('.pageno').val('');
				option.page = tarNo;
//                option.pageNo = tarNo;
				callback(tarNo, option);
			};*/
		});

        $('body').on('click', 'button[class*=pagego]', function(e) {
        	var _href = $(this).data('href');
        	var _page = $('input[class*=pageno]').val();
        	window.location.href = _href + '&page=' + _page;
        });

	},

	paginationGo: function(target, callback) {
		var _target = target || $('.gopage'),
			_input = _target.find('.pageno'),
			_button = _target.find('.pagego'),
			_pageNo = _input.val() || 1,
			_pageSize = _input.attr('data-pagesize') || 20;

		if (callback) {
			_target.on('click', '.pagego', function() {
				callback(_pageNo, _pageSize);
			});
		};
	}
});

jQuery(function($) {
	var _ajax = $.ajax;
	$.ajax = function(options) {
		var op = $.extend({}, options, {
			success: function(e) {
				//if (!e.success && !e.result.__isLogin_) {
				if (!e.success){
					// location.href = "/admin/backLogin.html";
					alert(e.msg);
					return false;
				}
				options.success.apply(this, arguments);
			}
		});
		_ajax(op);
	};

	// ui
	var tabSwitch = function(obj) {
		$('.content .tabBox .tab .child').eq(obj.index() - 1).show().siblings().hide();
		obj.addClass('current').siblings().removeClass('current');
		return false;
	};
	$('.content .tabBox .menu a').on('click', function() {
		return tabSwitch($(this));
	});
	tabSwitch($('.content .tabBox .menu a').eq(0));


	$('.delete').on('click', function(){
		if (confirm("確定要刪除該記錄嗎？")) {
			window.location.href = $(this).data('href')
		} else {
			return
		}
	})

	$('.online').on('click', function(){
		window.location.href = $(this).data('href')
	})

	var opt      = {};
	opt.page     = 1;
	opt.pageSize = 20;
	if ($.fn.pagination) {
		var defaults = {
			total: $('.pagination').data('total'),
			href: $('.pagination').data('href'),
			currentPageNo: $('.pagination').data('page')
		};
		defaults = $.extend(opt, null, defaults);
		$('.pagination').pagination(defaults, function(targetNo, option) {
			debugger
		});
	}

	$('a[name=selectItem]').on('click', function(){
		var _id = $(this).data('id')
		var _name = $(this).data('name')
		var _domid = $(this).data('domid')
		var _domname = $(this).data('domname')
		$(_domid, window.parent.document).val(_id)
		$(_domname,  window.parent.document).val(_name)
		//var dialog = $(window.parent.document.getElementsByTagName("iframe")).attr("data-dialog");
		//$(".ui-dialog[aria-describedby='"+ dialog +"']", window.parent.document).find(".ui-dialog-titlebar-close").trigger("click");
        /*var _dialogDom = $('[id*=dialog]', window.parent.document);
        for(var i=0; i<_dialogDom.length;i++){
            if ($('#'+_dialogDom[i].id, window.parent.document).dialog)
                $('#'+_dialogDom[i].id, window.parent.document).dialog( "close" );
        }*/
	})
});

window.globals = {
	// 获取参数
	getParameters: function(e) {
		var pra = window.location.search,
			getReg = function(e) {
				var reg = new RegExp('(^|&)' + e + '=([^&]*)(&|$)'),
					r = pra.substr(1).match(reg);
				return !r ? undefined : unescape(r[2]);
			};
		if (!pra) return undefined;
		if ($.type(e) == 'string') return getReg(e);
		if ($.type(e) == 'array' || !e) {
			var json = {};
			if (!e) {
				var url = pra.split('?')[1].split('&');
				e = [];
				$.each(url, function(i, v) {
					e.push(v.split('=')[0]);
				});
			}
			$.each(e, function(i, e) {
				json[e] = getReg(e);
			});
			return json;
		}
	},
	// 时间戳
	timestamp: function(value, stamp) {
		var zero = function(value) {
			return value < 10 ? '0' + value : value;
		};
		if (arguments.length === 0) return Math.round(new Date(new Date().toLocaleDateString()).getTime() / 1000);
		if (!stamp) return new Date(value).getTime() / 1000;
		var date = new Date(value * 1000);
		return date.getFullYear() + '-' + zero((date.getMonth() + 1)) + '-' + zero(date.getDate());
	},
	// 上传图片
	uploadImage: function(id, name) {
		if (!name) name = 'imageSrc';
		$.ajaxFileUpload({
			url: '/Picture/upload',
			type: 'post',
			secureuri: false, 
			fileElementId: id, 
			dataType: 'json',
			success: function(data, status) 
			{
				var json = JSON.parse(data);
				if (json.success) {
					var url = json.result.images[0].imgDomain + '/' + json.result.images[0].url;
					$('input[name="' + name + '"]').val(json.result.images[0].url);
					$('#' + name + '').show().attr('src', url);
				}
			}
		});
	}
};