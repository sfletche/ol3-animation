
var london = ol.proj.transform([-0.12755, 51.507222], 'EPSG:4326', 'EPSG:3857');
var bern = ol.proj.transform([7.4458, 46.95], 'EPSG:4326', 'EPSG:3857');
var istanbul = ol.proj.transform([28.9744, 41.0128], 'EPSG:4326', 'EPSG:3857');
var usa = ol.proj.transform([-99, 39], 'EPSG:4326', 'EPSG:3857');

var view = new ol.View({
  // the view's initial state
  center: usa,
  zoom: 3
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      preload: 4,
      source: new ol.source.OSM()
    })
  ],
  renderer: exampleNS.getRendererFromQueryString(),
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: view
});

app = {};
app.map = map;

function onMoveEnd(evt) {
  var map = evt.map;
  var center = ol.proj.transform(map.getView().getCenter(),
      'EPSG:3857', 'EPSG:4326');
}

map.on('moveend', onMoveEnd);