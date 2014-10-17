## Experimenting with OpenLayers 3 animation...

Note:  This project requires [OpenLayers 3](https://github.com/openlayers/ol3/releases) to be installed at the same base directory.  

### Next Steps
* how to display marker popups...?
 * I think best UI is to show popups for all markers on the map view
    * activate popups for all markers after zoom in
    * de-activate popups when zooming out
* adjust duration of animation based on distance travelled
* experimenting with rotating map view going to/from New Zealand 
 * still needs some tweaking, might experiment with 180 degree rotation too
 * having issue in which New Zealand flips before rotation and animation begin...
* alternative basemaps...
 * might look at Apple iPhoto basemap
 * http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_US&z=${z}&x=${x}&y=${y}&v=9 
* do a little refactoring...encapsulate methods and variables better...
