jQuery(function($) {
    $.post('/Home/info/list', {
        languageType: language
    }, function(data) {
        if (data.success) {
            var list = $('.content .news .list').empty();
            $.each(data.result.result, function(k, v) {
                var img = $('<p image="' + v.artThumb + '"><span>' + v.infoTitle + '</span></p>').image();
                $('<a href="/intelligence.html' + pars({
                    language: language,
                    id: v.infoId
                }) + '"></a>').appendTo(list).append(img);
                img.find('span').height(img.find('span').height()).css('bottom', 0);
            });
        }
    });
    $.post('/Home/merchant/typeList', function(data) {
        var list = $('.content .link').empty();
        if (data.success) {
            $.each(data.result.result, function(k, v) {
                var img = $('<span class="image" image="' + v.icon + '"></span>').image();
                $('<a href="/' + ['Wholesale', 'Retail', 'Souvenir', 'Restaurant', 'Located'][k] + '.html' + pars({
                    id: v.id
                }) + '"></a>').appendTo(list).append(img).append('<p>' + v['merchantTypeName' + lanStr] + '</p>');
            });
        }
    });
    $('.content .news .title').empty().append('<div class="box"><p><span>' + ['最新情報', 'Latest News', 'Últimas Notícias'][language] + '</span></p></div>');

    $('.menu').empty().append('<a href="/news' + pars({
        language: language
    }) + '"><i class="iconfont">&#xe609</i><p>' + ['最新情報', 'News', 'Notícias'][language] + '</p></a><a href="/create' + pars({
        language: language
    }) + '"><i class="iconfont">&#xe60d</i><p>' + ['商家登記', 'Register', 'Inscrição'][language] + '</p></a>');
});