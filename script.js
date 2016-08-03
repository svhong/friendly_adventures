// GLOBAL VARIABLES
var locObj;
var genderSelect;
var nameSelect;
var firstName;
var lastName;
var map;
var myAddressString = '';
var getPersonImagesArray = [];
var getNamesArray = [];

function LocationObj(successCallback, errorCallback) {
    this.success = successCallback;
    this.error = errorCallback;
    var myPosition = {
        lat: null,
        long: null,
        status: null
    };
    var nav = navigator.geolocation;

    function success(position) {
        myPosition.lat = position.coords.latitude;
        myPosition.long = position.coords.longitude;
        myPosition.status = true;
        this.success();
    }

    function failure(error) {
        //defaults to learningfuze location if it fails
        myPosition.lat = 33.6362183;
        myPosition.lang = -117.7394721;
        myPosition.status = false;
        myPosition.error = error;
    }

    this.getLocation = function () {
        return myPosition;
    }
    nav.getCurrentPosition(success.bind(this), failure);
}

//DOCUMENT READY
$(document).ready(function () {
    //create location object
    getAddress();
    createDomPage1();

});

function clearMain() {
    $('.main').children().remove();
}
function getAddress() {
    locObj = new LocationObj(checkAddress, null);
}
function checkAddress() {

    console.log(locObj.getLocation());
    var locTest = locObj.getLocation();

    if (locTest.status === false) {
        createAddressBar();
    }
}

function createAddressBar() {
    $('<input>').attr({
        type: 'text',
        placeholder: 'Enter Your Location',
        class: 'form-control',
        id: 'address'
    }).appendTo('.main');
}

// PAGE 1 - Date Choice
function createDomPage1() {
    // var choiceArray = ['Male', 'Female', 'Surprise Me'];
    var choiceIDArray = ['Male', 'Female', 'Shiba']; // Used to set ID to div so we can use ID for search query input

    for (var i = 0; i < choiceIDArray.length; i++) {

        var dateChoices = $('<div>').addClass('col-sm-4 dateChoices').click(genderClicked).attr('gender', choiceIDArray[i]);
        $('.main').append(dateChoices);
        var dateChoicesContainer = $('<div>').addClass('dateChoicesContainer');
        $(dateChoices).append(dateChoicesContainer);

    }
}

function genderClicked() {
    genderSelect = $(this).attr('gender');
    setAddress();
    clearMain();
    getPersonImages();
    getNames();
    console.log(genderSelect);
}

function setAddress() {
    myAddressString = $(':input').val();
    console.log(myAddressString);

    if (myAddressString !== '') {
        //get geocode
        console.log('get geocode');
    } else {
        //default location
        myAddressString = '9080 Irvine Center Dr';
    }
}

function geocodeAddress() {
    function initMap() {
        var map = new google.maps.Map(document.getElementById('main'), {
            zoom: 8,
            center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function () {
            geocodeAddress(geocoder, map);
        });
    }

    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

}

// PAGE 2 - Date Buttons

function createDomPage2() {
    for (var i = 0; i < 6; i++) {
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6');
        $(dateDiv).click(clickDateBtns);
        $('.main').append(dateDiv);
        var dateContainer = $('<div>').addClass('dateContainers').attr('id', 'second' + i);
        $(dateContainer).append(getPersonImagesArray[i]);
        var nameContainer = $('<div>').addClass('nameContainers');
        $(nameContainer).append(getNamesArray[i]);
        $(dateDiv).append(dateContainer, nameContainer);
    }
}


//Getting random names function via ajax call
function getNames(id) {
    var dataObj = {
        amount: 6
    };
    nameSelect = genderSelect.toLowerCase();
    if (nameSelect != 'shiba') {
        dataObj.gender = nameSelect;
    }
    $.ajax({
        method: 'get',
        datatype: 'json',
        data: dataObj,
        url: 'http://uinames.com/api/',
        success: function (result) {
            // $("#" + id).next().text(firstName + ' ' + lastName);
            for (var i=0; i<6; i++){
                getNamesArray.push(result[i].name + ' ' + result[i].surname);
            }
            if (getPersonImagesArray.length == 6) {
                createDomPage2();
            }
        },

        error: function () {
            console.log('call was unsuccessful');
        }
    })
}
//End of random name function

//Getting images from Flickr function
function getPersonImages() {
    var dataObj = {
        method: 'flickr.photos.search',
        api_key: '4291af049e7b51ff411bc39565109ce6',
        nojsoncallback: '1',
        sort: 'relevance',
        format: 'json',
        cache: false
    };
    if (genderSelect != 'Shiba') {
        dataObj.text = genderSelect + " person closeup";
    } else{
        dataObj.text = genderSelect + " dog closeup";
    }
    $.ajax({
        url: 'https://api.flickr.com/services/rest',
        method: 'get',
        data: dataObj,

        success: function (result) {
            console.log(result);
            for (var i = 0; i < 6; i++) {
                var index = Math.floor((Math.random() * 100));
                console.log(index);
                var all_photo = result.photos.photo;
                var photo_id = all_photo[index].id;
                var farm_id = all_photo[index].farm;
                var secret_id = all_photo[index].secret;
                var server_id = all_photo[index].server;
                console.log(photo_id, farm_id, secret_id);
                var image_src = 'https://farm' + farm_id + '.staticflickr.com/' + server_id + '/' + photo_id + '_' + secret_id + '.jpg';
                console.log(image_src);
                var images = $('<img>').attr('src', image_src).addClass('flickrImg');
                getPersonImagesArray.push(images);
                console.log(getPersonImagesArray);
            }
            if (getNamesArray.length == 6) {
                createDomPage2();
            }

        }

    })
}

function clickDateBtns() {
    clearMain();
    //save the img and name of clicked item
    createDomPage3();
}


// PAGE 3 - Event Choices

function createDomPage3() {
    var api_call_keywords = ['restaurant', 'cafe', 'park', 'movie_theater', 'night_club', 'shopping_mall'];
    for (var i = 0; i < 6; i++) {
        var eventDiv = $('<div>').addClass('eventBtns col-sm-4 col-xs-6 outerbox ' + i).attr("venue", api_call_keywords[i]).click(function () {
            clickeventChoices($(this));
        });//clickeventChoices()
        var eventContainer = $('<div>').addClass('eventContainers box' + i).text(api_call_keywords[i]);
        eventDiv.append(eventContainer).appendTo($('.main'));
        if ($('.eventContainers').hasClass('box5')) {
            $('.box5').text('SURPRISE ME!')
        }
    }
}

function clickeventChoices(clickedElement) {
    var eventSearch = clickedElement.attr('venue');
    console.log('venue clicked : ', eventSearch);
    initMap(eventSearch);
}

var map2;
var infowindow2;
var object_list;

function initMap(keyword) {
    $('<div>').attr("id", 'map').appendTo('.main');
    var myLocation = locObj.getLocation();
    map2 = new google.maps.Map(document.getElementById('map'), {
        center: {lat: myLocation.lat, lng: myLocation.long},
        zoom: 12
    });
    infowindow2 = new google.maps.InfoWindow();//
    var service = new google.maps.places.PlacesService(map2); //constructor
    service.nearbySearch({
        location: {lat: myLocation.lat, lng: myLocation.long}, //use brian's plug in location object
        radius: 10000,//radius in meters
        type: [keyword],//variables for this keyword. use parameter
    }, callback);
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            object_list = results;
            clearMain();
            createDomPage4(object_list);
        }
    }
}

// PAGE 4  -  Events Buttons
var redefinedEventList = [];

function createDomPage4(eventList){
    var j = 0;
    while(redefinedEventList.length < 6){
        if(eventList[j].hasOwnProperty('photos')){
            redefinedEventList.push(eventList[j]);
            j++;
        }
        else{
            j++;
        }
    }
    console.log('redefinedList : ',redefinedEventList);
    for(var i = 0; i < 6 ; i++){
        var eventDiv = $('<div>').addClass('eventBtns col-sm-4 col-xs-6');
        $(eventDiv).click(clickEventBtns);
        $('.main').append(eventDiv);
        var eventContainer = $('<div>').addClass('dateContainers').text(redefinedEventList[i].name).css(
            'background-image', 'url('+redefinedEventList[i].photos[0].getUrl({maxWidth:1000, maxHeight:1000})+')'
        );
        $(eventDiv).append(eventContainer);
    }
}

function clickEventBtns() {
    clearMain();
    //save the img and name of clicked item
    createDomPage5();
}

// Dinner


// Cafe


// Parks


// Theaters


// Malls


// Museum


// PAGE 5


function createDomPage5() {
    for (var i = 0; i < 4; i++) {
        var finalDiv = $('<div>').addClass('finalBtns col-xs-6 col-sm-6');
        $('.main').append(finalDiv);
        var finalDivContainer = $('<div>').addClass('finalDivContainer').text(i + 1).attr('id', 'final_' + i);
        $(finalDiv).append(finalDivContainer);
        navigator.geolocation.getCurrentPosition(initialize);
    }
}


//Getting google maps for the locations
function initialize(location) {
    console.log(location);
    var shibaImage = 'http://orig15.deviantart.net/fb18/f/2011/220/0/e/pixel_shiba_inu_by_babiry-d45xejf.gif';
    var currentLocation = locObj.getLocation();
    var mapOptions = {
        center: new google.maps.LatLng(currentLocation.lat, currentLocation.long),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("final_2"), mapOptions);

    var myLocationMarker = new google.maps.Marker({
        position:  new google.maps.LatLng(currentLocation.lat, currentLocation.long),
        map: map,
        icon: shibaImage,
        animation:google.maps.Animation.BOUNCE
    });
}

//End of google maps function

function createSpinner (){
    $('<div>').addClass("fa fa-refresh fa-spin fa-3x fa-fw").css({
        'width': '60vw',
        'height': '60vh'
    })
}












