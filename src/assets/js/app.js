var tabs = $('#tabs');

var tabTemplate = Handlebars.compile('<li class="tabs-title"><a href="#{{id}}">{{text}}</a></li>');

$('.tabs-content').children('.tabs-panel').each(function(index, item) {
    var element = tabTemplate({id: item.id, text: ''});
    item = $(item);
    if( item.hasClass('is-active') ) {
        element = $(element);
        element.addClass('is-active');
        element.children('a').attr('aria-selected', 'true');
    }
    tabs.append(element);
});

$('#accordion-nav').find('a.accordion-title').each(function(index, item) {
    var navItem = $(item);
    var pageItem = $(navItem.attr('href'))

    pageItem.children('section').each(function(index, item) {
        // Todo
    });
});

$(document).foundation();

$('#accordion-nav').children('.accordion-item').click(function() {
    var href = $(this).children('a').attr('href');
    $('#tabs').foundation('selectTab', href.substr(1));
});
