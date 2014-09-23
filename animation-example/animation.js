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
        app.displayAddedLocation(location_name);
    }        
    document.getElementById('location').value="";
};

app.displayAddedLocation = function(location_name) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(location_name));
    document.getElementById('recorded-locations').appendChild(div);
};

app.assignTestLocations = function() {
    app.locations = [
        {
            'location': 'Arbor Lodge',
            'center': [-13657899.462245308, 5712246.434680445],
            'zoom': 16
        },
        {
            'location': 'West Coast',
            'center': [-13548022.56416822, 4514521.121707927],
            'zoom': 10
        }, {
            'location': 'East Coast',
            'center': [-8468032.5702836, 4689460.537542358],
            'zoom': 9
        }, {
            'location': 'MidWest',
            'center': [-10468032.5702836, 4589460.537542358],
            'zoom': 8
        }
    ];
};

app.showTimeline = function() {
    var x = 0;
    if (!app.locations.length) {
        app.assignTestLocations();
    }
    for (var index in app.locations) {
        var location = app.locations[index];        
        app.showAnimations(location, x);
        x++;
    }
};

app.showAnimations = function(location, x) {
    setTimeout( function() {
        app.showAnimation(location);
    }, 5000 * x);
};

app.showAnimation = function(location) {        
    var view = app.map.getView();
    var duration = 4000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: (view.getCenter()), // @type {ol.Coordinate} 
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 7000, //4 * view.getResolution(),
        start: start
    });
    var zoom = ol.animation.zoom({
        resolution: map.getView().getResolution()
    });
    app.map.beforeRender(pan, bounce, zoom);
    view.setCenter(location.center);  
    view.setZoom(location.zoom);
};

