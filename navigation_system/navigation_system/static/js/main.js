function GoogleMapsService() {

  this.init = function(){
    var rendererOptions = {
      draggable: true
    };
    this.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    this.directionsService = new google.maps.DirectionsService();
    var mapOptions = {
      zoom: 7
    };  
    console.log(this.directionsDisplay);
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    this.addCurrentLocationToMap();
    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', function() {
      this.computeTotalDistance();
    });
  }

  this.addCurrentLocationToMap = function(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
        var infowindow = new google.maps.InfoWindow({
          map: this.map,
          position: pos,
          content: 'You are here.'
        });

        this.map.setCenter(pos);
      }, function() {
        this.handleNoGeolocation('Error: The Geolocation service failed.');
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleNoGeolocation('Error: Your browser doesn\'t support geolocation.');
    }
  }

  this.handleNoGeolocation = function(content) {
    var options = {
      map: this.map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    this.map.setCenter(options.position);
  }

  this.calcRoute = function(_origin, _destination) {
    var request = {
      origin: _origin,
      destination: _destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    var ds = this.directionsDisplay;
    this.directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        ds.setDirections(response);
      }
    });
  }

  this.computeTotalDistance = function() {
    var total = 0;
    var myroute = this.directionsDisplay.getDirections()[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
  }

}


