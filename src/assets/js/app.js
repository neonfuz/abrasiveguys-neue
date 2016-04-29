var tabTemplate = Handlebars.compile(
    '<li class="tabs-title"><a href="#{{id}}">{{text}}</a></li>');

// Prepare content before loading foundation modules
$('.tabs-content').children('.tabs-panel').each(function(index, item) {
    var element = tabTemplate({id: item.id, text: ''});

    if( $(item).hasClass('is-active') ) {
        $(element)
            .addClass('is-active')
            .children('a').attr('aria-selected', 'true');
    }

    $('#tabs').append(element);
});

// Load all foundation models
$(document).foundation();

$('#accordion-nav').children('.accordion-item').click(function() {
    var href = $(this).children('a').attr('href').substr(1);
    $('#tabs').foundation('selectTab', href);

    if(history.pushState)
        history.pushState(null, null, '#' + href);
    else
        window.location.hash = href;
});

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

var center = {lat: 43.107064, lng: -87.912658};

var map = addMap('#google-map', center, 17, 'J&R Industrial');

// Google maps will refuse to render properly until resized for some reason.
// This resizes the map as soon as it renders to fix this.
// TODO: better fix for this
google.maps.event.addListenerOnce(map, 'idle', function() {
    google.maps.event.trigger(map, 'resize');
});
