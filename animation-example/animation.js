app.animationIndex = undefined;

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

app.displayAddedLocation = function(index) {
    var location = app.locations[index]; 
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
        // app.addCarouselIndicators();
    }
    for (var index in app.locations) {         
        if (x == 0) {
            app.showAnimations(x, true);    
        } else {
            app.showAnimations(x);
        }        
        x++;
    }
};

app.flyTo = function(index) {
    if (app.animationIndex === index) {
        return false;
    }
    if (app.animationIndex === undefined) {
        var noBounce = true;
    }
    app.showAnimation(index, noBounce);
    return false;
};

app.flyLeft = function() {
    var newIndex = app.locations.length - 1;
    if (app.animationIndex && app.animationIndex > 0) {
        newIndex = app.animationIndex - 1;
    }
    app.flyTo(newIndex);
    app.activateAnchor(newIndex);
};

app.flyRight = function() {
    var newIndex = 0;
    if (app.animationIndex !== undefined && app.animationIndex < app.locations.length - 1) {
        newIndex = app.animationIndex + 1;
    } 
    app.flyTo(newIndex);
    app.activateAnchor(newIndex);
}

app.showAnimations = function(index, noBounce) {
    setTimeout( function() {
        app.showAnimation(index, noBounce);
        app.displayAddedLocation(index);
    }, 5000 * index);
};

app.showAnimation = function(index, noBounce) { 
    app.destroyPopup();
    var location = app.locations[index],
        view = app.map.getView(),
        center = view.getCenter(),
        markers = location.markers,
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
    
    if (markers) {        
        for (var i=0; i<markers.length; i++) {  
            var marker = markers[i];      
            app.markers.getSource().addFeature(new ol.Feature({
                geometry: new ol.geom.Point(marker.position),
                name: marker.content
            }));
        }
    }

    app.animationIndex = index;  
};

