// GLOBAL VARIABLES
$(document).ready(function(){
    //create location object and get location (lat and long)
    var locObj = new LocationObj();
    var myLocation = locObj.getLocation();
    console.log(myLocation.lat);
    console.log(myLocation.long);
    //to access lat and long use:
    //myLocation.lat
    //myLocation.long

});
function LocationObj(){
    var myPosition = {
        lat: null,
        long: null,
        status: null
    };
    var nav = navigator.geolocation;
    nav.getCurrentPosition(success, failure);
    function success(position){
        myPosition.lat = position.coords.latitude;
        myPosition.long = position.coords.longitude;
        myPosition.status = true;
    }
    function failure(error){
        myPosition.status = false;
        myPosition.error = error;
    }
    this.getLocation = function(){
        return myPosition;
    }
}






// PAGE 1 - Date Choice












// PAGE 2 - Date Buttons











// PAGE 3 - Event Choices











// PAGE 4  -  Events Buttons










// Dinner





// Cafe





// Parks





// Theaters





// Malls





// Museum





// PAGE 5














