app.locations = [];

app.saveLocation = function() {
    var location_name = document.getElementById('location').value;
    if (location_name !== "") {
        var location = {
            'location': location_name,        
            'center': app.map.getView().getCenter(),
            'zoom': app.map.getView().getZoom() 
        };
        app.locations.push(location);
        document.getElementById('instructions').innerHTML="Set your next location.";
        // app.displayAddedLocation(location_name);
    }        
    document.getElementById('location').value="";
};

app.displayAddedLocation = function(location) {
    var div = document.createElement("div");
    div.style.opacity = 0;
    div.className = "single-location";
    if (location.start_date === location.end_date) {
        var output = location.location_name + ' (' + location.start_date  + ')';
    } else {
        var output = location.location_name + ' (' + location.start_date + '-' + location.end_date + ')';
    }
    div.appendChild(document.createTextNode(output));
    document.getElementById('recorded-locations').appendChild(div); 
    window.getComputedStyle(div).opacity;   
    div.style.opacity = 1;
};

app.showTimeline = function() {
    var x = 0;
    if (!app.locations.length) {
        app.assignTestLocations();
    }
    for (var index in app.locations) {
        var location = app.locations[index];  
        if (x == 0) {
            app.showAnimations(location, x, true);    
        } else {
            app.showAnimations(location, x);
        }        
        x++;
    }
};

app.showAnimations = function(location, x, noBounce) {
    setTimeout( function() {
        if (x == 0) {}
        app.showAnimation(location, noBounce);
        app.displayAddedLocation(location);
    }, 5000 * x);
};

app.showAnimation = function(location, noBounce) {        
    var view = app.map.getView(),
        center = view.getCenter(),
        distance = Math.sqrt(Math.pow(center[0]-location.center[0],2)+Math.pow(center[1]-location.center[1],2)),
        resolution_from_distance = distance / 1000,
        duration = 4000,
        start = +new Date(),
        pan = ol.animation.pan({
            duration: duration,
            source: (view.getCenter())
        }),
        bounce = ol.animation.bounce({
            duration: duration,
            // resolution: 7000
            resolution: resolution_from_distance
        }),
        zoom = ol.animation.zoom({
            resolution: map.getView().getResolution(),
            duration: duration / 4
        });
    if (resolution_from_distance < 20) {
        resolution_from_distance = 20;
    }
    if (noBounce) {
        app.map.beforeRender(zoom);    
    } else {
        app.map.beforeRender(pan, bounce, zoom);
    }
    
    view.setCenter(location.center);  
    view.setZoom(location.zoom);
    app.markers.getSource().addFeature(new ol.Feature({
        geometry: new ol.geom.Point(location.center),
        name: location.location_name
    }));
};

