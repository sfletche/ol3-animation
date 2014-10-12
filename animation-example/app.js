
app.addCarouselIndicators = function() {
    var width = 100 / (app.locations.length + 1);

    //create dummy list item (for padding)
    var li = document.createElement("li");        
    li.className = "carousel-indicator-" + i; 
    li.style.width = width + '%';
    document.getElementById('map-carousel-indicators').appendChild(li); 

    for (var i=0; i<app.locations.length; i++) {
        var li = document.createElement("li");        
        li.className = "carousel-indicator-" + i; 
        li.style.width = width + '%';

        var anchor = document.createElement("a");
        anchor.className = "carousel-indicator";
        anchor.setAttribute("onclick","app.flyTo("+i+")"); 

        var icon = document.createElement("icon");
        icon.className = "fa fa-circle-o";
        anchor.appendChild(icon);

        li.appendChild(anchor);

        li.onclick = function() {
            app.destroyPopup();
        };
        
        document.getElementById('map-carousel-indicators').appendChild(li); 
    }
};

app.activateAnchor = function(index) {
    allAnchors = document.getElementsByClassName('carousel-indicator');
    for (var i=0; i < allAnchors.length; i++) {
        allAnchors[i].getElementsByTagName("icon")[0].className = "fa fa-circle-o";
        if (allAnchors[i].className.indexOf("active") !== -1) {
            allAnchors[i].className = allAnchors[i].className.replace(/active/g, '');
        }
    }
    // anchor.getElementsByTagName("icon")[0].className = "fa fa-circle";
    allAnchors[index].getElementsByTagName("icon")[0].className = "fa fa-circle";
    allAnchors[index].className += " active";
};

app.assignTestLocations = function() {
    
};

app.assignTestLocations();
app.addCarouselIndicators();

app.updateURL = function(index) {
    var baseUrl = window.location.href.split('#')[0];
    window.location.replace( baseUrl + '#' + 'mapview-' + index );
};

app.getCurrentMapIndex = function() {
    try {
        var hash = window.location.href.split('#')[1],
            index = hash.replace('mapview-', '');
        if (isNumeric(index)) {
            return index;
        } else {
            return undefined;
        }
    } catch(e) {
        return undefined;
    }
    
}

var isNumeric = function(value) {
    return !isNaN(value);
};

window.onload = function() {
    var hash = (window.location.hash).replace('#mapview-', '');
    if ( isNumeric(hash) && hash !== '' ) {  
        app.flyTo(parseInt(hash));
    }
};

window.addEventListener('click', function (evt) {
    app.destroyPopup();
}, false);

