
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

var panToLondon = document.getElementById('pan-to-london');
panToLondon.addEventListener('click', function() {
  var pan = ol.animation.pan({
    duration: 2000,
    source: /** @type {ol.Coordinate} */ (view.getCenter())
  });
  map.beforeRender(pan);
  view.setCenter(london);
}, false);

var flyToBern = document.getElementById('fly-to-bern');
flyToBern.addEventListener('click', function() {
  var duration = 2000;
  var start = +new Date();
  var pan = ol.animation.pan({
    duration: duration,
    source: /** @type {ol.Coordinate} */ (view.getCenter()),
    start: start
  });
  var bounce = ol.animation.bounce({
    duration: duration,
    resolution: 4 * view.getResolution(),
    start: start
  });
  map.beforeRender(pan, bounce);
  view.setCenter(bern);
}, false);
