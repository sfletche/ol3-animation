var popupElement = document.getElementById('popup');

var popup = new ol.Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  stopEvent: false
});
app.map.addOverlay(popup);

// grabbed from stackoverflow
// http://stackoverflow.com/questions/10238089/how-can-you-ensure-twitter-bootstrap-popover-windows-are-visible
var determinePosition = function(tip, element) {
    var $element, above, actualHeight, actualWidth, below, boundBottom, boundLeft, boundRight, boundTop, elementAbove, elementBelow, elementLeft, elementRight, isWithinBounds, left, pos, right;
    isWithinBounds = function(elementPosition) {
      return boundTop < elementPosition.top && boundLeft < elementPosition.left && boundRight > (elementPosition.left + actualWidth) && boundBottom > (elementPosition.top + actualHeight);
    };
    $element = $(element);
    pos = $.extend({}, $element.offset(), {
      width: element.offsetWidth,
      height: element.offsetHeight
    });
    actualWidth = 283;
    actualHeight = 117;
    boundTop = $(document).scrollTop();
    boundLeft = $(document).scrollLeft();
    boundRight = boundLeft + $(window).width();
    boundBottom = boundTop + $(window).height();
    elementAbove = {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    };
    elementBelow = {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    };
    elementLeft = {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    };
    elementRight = {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    };
    above = isWithinBounds(elementAbove);
    below = isWithinBounds(elementBelow);
    left = isWithinBounds(elementLeft);
    right = isWithinBounds(elementRight);
    if (above) {
      return "top";
    } else {
      if (below) {
        return "bottom";
      } else {
        if (left) {
          return "left";
        } else {
          if (right) {
            return "right";
          } else {
            return "right";
          }
        }
      }
    }
};


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
      'placement': determinePosition,
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