'use strict';

var tabTemplate = Handlebars.compile(
    '<li class="tabs-title"><a href="#{{id}}">{{text}}</a></li>');

// Prepare content before loading foundation modules
$('.tabs-content').children('.tabs-panel').each(function(index, item) {
    var element = $(tabTemplate({id: item.id, text: ''}));

    if( $(item).hasClass('is-active') ) {
        element
            .addClass('is-active')
            .children('a').attr('aria-selected', 'true');

        var accordionItem = $('#accordion-nav')
            .find('a[href$="#' + $(item).attr('id') + '"]');
        accordionItem.parent().addClass('is-active');
        accordionItem.attr('aria-selected', 'true');
    }

    $('#tabs').append(element);
});

// Load all foundation models
$(document).foundation();

function addMap(selector, center, zoom, title) {
    var map = new google.maps.Map($(selector).get()[0], {
        center: center,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: title,
    });

    return map;
}

function initMap() {
  var center = {lat: 43.106774, lng: -87.912205};
  var map = addMap('#google-map', center, 17, 'J&R Industrial');
}

$('#accordion-nav').children('.accordion-item').click(function() {
    var href = $(this).children('a').attr('href').substr(1);
    $('#tabs').foundation('selectTab', href);

    if(href==="location")
        initMap();

    if(history.pushState)
        history.pushState(null, null, '#' + href);
    else
        window.location.hash = href;
});

$('#accordion-nav').children('.accordion-item').find('li').click(function() {
    if(Foundation.MediaQuery.current === 'small')
        $('#offCanvas').foundation('close');
});
