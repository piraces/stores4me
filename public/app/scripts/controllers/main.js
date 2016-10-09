'use strict';

/**
* @ngdoc function
* @name ismaelApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the ismaelApp
*/
angular.module('ismaelApp')
.controller('MainCtrl', function (leafletData,$scope,$http) {


  var self = this;
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];


  this.center = {
    lat:41.3947688,
    long:2.0787282,
    zoom:12
  };

  this.allPoints = [];

  this.markers = [];
  this.ageFrom = 20;
  this.ageTo = 50;
  this.topLeft = {}
  this.bottomRight = {};

  $scope.$on('leafletDirectiveMarker.mouseover', function(e, args) {
    args.leafletEvent.target.openPopup();
  });


  $scope.$on('leafletDirectiveMap.moveend', function(e,args){
    console.log("se ha movido");

    leafletData.getMap().then(function(map) {
      //L.GeoIP.centerMapOnPosition(map, 15);
      var bounds  = map.getBounds();
      self.topLeft = {
        lat: bounds._northEast.lat,
        lon: bounds._southWest.lng
      }

      self.bottomRight = {
        lat: bounds._southWest.lat,
        lon: bounds._northEast.lng

      }

      console.log(self.bottomRight);

    });

    //Dibujamos solo los markers que estén en nuestra parte


  });
  $scope.$on('leafletDirectiveMarker.mouseout', function(e, args) {

    args.leafletEvent.target.closePopup();
  });


  //First, set to Barcelona
  leafletData.getMap().then(function(map) {
    //L.GeoIP.centerMapOnPosition(map, 15);
    map.setView(new L.LatLng(41.3878145,2.1734853), 12);

  });



  var markerClusters = L.markerClusterGroup();


  var icon =   L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  })




  //Function to paint heatMaps. INput format: the one from the backend
  this.paintHeatMap = function(sourceData){

    var result = [];
    for(var i = 0; i < sourceData.length; i++){
      var current = sourceData[i];
      result.push([current.lat,current.lon,current.intensity]);
      self.markers.push({lat:current.lat,lng:current.lon,message: "Intensity: " + current.intensity, draggable:false, icon: {
        iconUrl: 'images/marker.png',
        shadowUrl: 'images/marker.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62]
    }})

    }


    leafletData.getMap().then(function(map) {
      //L.GeoIP.centerMapOnPosition(map, 15);
      var heat = L.heatLayer(result, {radius: 25}).addTo(map);
      map.addLayer( markerClusters );

      console.log("Painted new points: " + result.length)
    });


  };



  this.loadData = function(){
    $http.get('/heat/' + self.topLeft.lat + "/" + self.topLeft.lon + "/" + self.bottomRight.lat + "/" + self.bottomRight.lon + "/" + self.ageFrom).then(function(result){

        self.allPoints = result.data;
        self.paintHeatMap(result.data);


    })
    .catch(function(error){
      console.error(error);
    });
  }





  var pointsFromBackend = [{lat:41.3878145,lon:2.1734853,intensity:10},{lat:41.3895,lon:2.1734853,intensity:10}];
  this.paintHeatMap(pointsFromBackend);






});
