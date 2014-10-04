var popupElement = document.getElementById('popup');

var popup = new ol.Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  stopEvent: false
});
app.map.addOverlay(popup);

app.destroyPopup = function() {
  $(popupElement).popover('destroy');
};

// display popup on click
app.map.on('click', function(evt) {
  app.destroyPopup();
  var feature = app.map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    $(popupElement).popover({
      'placement': 'top',
      'html': true,
      'content': feature.get('name')
    });
    $(popupElement).popover('show');
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