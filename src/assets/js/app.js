var tabTemplate = Handlebars.compile('<li class="tabs-title"><a href="#{{id}}">{{text}}</a></li>');

$('.tabs-content').children('.tabs-panel').each(function(index, item) {
    var element = tabTemplate({id: item.id, text: ''});

    if( $(item).hasClass('is-active') ) {
        $(element)
            .addClass('is-active')
            .children('a').attr('aria-selected', 'true');
    }

    $('#tabs').append(element);
});

$(document).foundation();

$('#accordion-nav').children('.accordion-item').click(function() {
    var href = $(this).children('a').attr('href').substr(1);
    $('#tabs').foundation('selectTab', href);
    window.location.hash = href;
});
