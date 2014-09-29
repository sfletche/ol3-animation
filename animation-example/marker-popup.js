var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
app.map.addOverlay(popup);

// display popup on click
app.map.on('click', function(evt) {
  var feature = app.map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
$(app.map.getViewport()).on('mousemove', function(e) {
  var pixel = app.map.getEventPixel(e.originalEvent);
  var hit = app.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return true;
  });
  if (hit) {
    app.map.getTarget().style.cursor = 'pointer';
  } else {
    app.map.getTarget().style.cursor = '';
  }
});