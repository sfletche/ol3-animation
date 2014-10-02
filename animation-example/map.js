var usa = ol.proj.transform([-99, 39], 'EPSG:4326', 'EPSG:3857');

var view = new ol.View({
  // the view's initial state
  center: usa,
  zoom: 3
});

var markers = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      // new ol.Feature({
      //   geometry: new ol.geom.Point(usa),
      //   name: 'USA'
      // })
    ]
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: '../images/home_marker_icon_resized.png'
    })
  })
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      preload: 4,
      source: new ol.source.OSM()
    }),
    markers,
  ],
  renderer: exampleNS.getRendererFromQueryString(),
  target: document.getElementById('map'),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: view
});

app.map = map;
app.markers = markers;

function onMoveEnd(evt) {
  var map = evt.map;
  var center = ol.proj.transform(map.getView().getCenter(),
      'EPSG:3857', 'EPSG:4326');
}

map.on('moveend', onMoveEnd);