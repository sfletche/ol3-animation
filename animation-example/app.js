app = {};

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
        anchor.setAttribute("onclick","app.flyTo("+i+"); app.activateAnchor(this);"); 

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

app.activateAnchor = function(anchor) {
    allAnchors = document.getElementsByClassName('carousel-indicator');
    for (var i=0; i < allAnchors.length; i++) {
        allAnchors[i].getElementsByTagName("icon")[0].className = "fa fa-circle-o";
    }
    anchor.getElementsByTagName("icon")[0].className = "fa fa-circle";
};

app.assignTestLocations = function() {
    app.locations = [
        {
            'location_name': 'Palo Alto, California',
            'start_date': '1970',
            'end_date': '1973',
            'center': [-13599769.092903735, 4501691.122649623],
            'zoom': 12
        },
        {
            'location_name': 'Chicago, Illinois',
            'start_date': '1973',
            'end_date': '1974',
            'center': [-9791652.457164913, 5140704.679113694],
            'zoom': 9
        },
        {
            'location_name': 'San Diego, California',
            'start_date': '1974',
            'end_date': '1977',
            'center': [-13045543.88285731, 3861234.9352657003],
            'zoom': 11
        },
        {
            'location_name': 'Huntington Beach, California',
            'start_date': '1977',
            'end_date': '1978',
            'center': [-13134612.858978685, 3983632.804352021],
            'zoom': 11
        },
        {
            'location_name': 'Vienna, Virginia',
            'start_date': '1978',
            'end_date': '1981',
            'center': [-8603108.966488985, 4707135.661937859],
            'zoom': 15
        },
        {
            'location_name': 'Orem, Utah',
            'start_date': '1981',
            'end_date': '1983',
            'center': [-12430871.411407793, 4904306.100473413],
            'zoom': 12
        },
        {
            'location_name': 'Eugene, Oregon',
            'start_date': '1983',
            'end_date': '1985',
            'center': [-13701206.9363964, 5471191.766121895],
            'zoom': 14
        },
        {
            'location_name': 'Vienna, Virginia',
            'start_date': '1985',
            'end_date': '1990',
            'center': [-8603108.966488985, 4707135.661937859],
            'zoom': 15
        },
        {
            'location_name': 'Fredericksburg, Virginia',
            'start_date': '1990',
            'end_date': '1996',
            'center': [-8623725.830554046, 4622357.41779462],
            'zoom': 15
        },
        {
            'location_name': 'Buckeye, Arizona',
            'start_date': '1996',
            'end_date': '1997',
            'center': [-12543604.486507818, 3951443.345307156],
            'zoom': 12
        },
        {
            'location_name': 'Eugene, Oregon',
            'start_date': '1997',
            'end_date': '1997',
            'center': [-13702685.879504586, 5473705.872863501],
            'zoom': 13
        },
        {
            'location_name': 'New Zealand',
            'start_date': '1998',
            'end_date': '1998',
            'center': [-20857057.6012507, -5012432.8117420925],
            'zoom': 5
        },
        {
            'location_name': 'Chantilly, Virginia',
            'start_date': '1998',
            'end_date': '1998',
            'center': [-8624546.831756316, 4707777.43642773],
            'zoom': 14
        },
        {
            'location_name': 'Odensa, Denmark',
            'start_date': '1998',
            'end_date': '1999',
            'center': [1156993.6182504012, 7439243.268719285],
            'zoom': 13
        },
        {
            'location_name': 'Chantilly, Virginia',
            'start_date': '1999',
            'end_date': '2001',
            'center': [-8624546.831756316, 4707777.43642773],
            'zoom': 14
        },
        {
            'location_name': 'Washington, D.C.',
            'start_date': '2001',
            'end_date': '2003',
            'center': [-8580106.040735168, 4709966.016168837],
            'zoom': 15
        },
        {
            'location_name': 'Centreville, Virginia',
            'start_date': '2003',
            'end_date': '2004',
            'center': [-8620012.891989125, 4698915.245211905],
            'zoom': 15
        },
        {
            'location_name': 'Sterling, Virginia',
            'start_date': '2004',
            'end_date': '2007',
            'center': [-8616142.660937179, 4726183.557888361],
            'zoom': 13
        },
        {
            'location_name': 'Portland, Oregon',
            'start_date': '2007',
            'end_date': '2008',
            'center': [-13654149.930907784, 5706500.832514474],
            'zoom': 17
        },
        {
            'location_name': 'Portland, Oregon',
            'start_date': '2008',
            'end_date': '2014',
            'center': [-13657899.462245308, 5712246.434680445],
            'zoom': 16
        }
    ];
};

app.assignTestLocations();
app.addCarouselIndicators();