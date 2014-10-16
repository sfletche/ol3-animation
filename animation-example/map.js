var usa = ol.proj.transform([-99, 39], 'EPSG:4326', 'EPSG:3857');

var markers = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: []
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: '../images/home_marker_icon_resized.png'
    })
  })
});
app.markers = markers;

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        // ESRI Basemaps to explore...
        // World_Street_Map, World_Topo_Map, World_Imagery, NatGeo_World_Map, World_Light_Gray_Base
        // url: 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
        // Others include 
        url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.png'
      })
    }),
    markers
  ],
  renderer: exampleNS.getRendererFromQueryString(),
  target: document.getElementById('map'),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new ol.View({
    center: usa,
    zoom: 3
  })
});
app.map = map;

function onMoveEnd(evt) {
  var map = evt.map;
  var center = ol.proj.transform(map.getView().getCenter(),
      'EPSG:3857', 'EPSG:4326');
}

map.on('moveend', onMoveEnd);
