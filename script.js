// GLOBAL VARIABLES
var locObj;
var genderSelect;
var firstName;
var lastName;
var map;

function LocationObj(successCallback, errorCallback){
    this.success = successCallback;
    this.error = errorCallback;
    var myPosition = {
        lat: null,
        long: null,
        status: null
    };
    var nav = navigator.geolocation;

    function success(position){
        myPosition.lat = position.coords.latitude;
        myPosition.long = position.coords.longitude;
        myPosition.status = true;
        this.success();
    }
    function failure(error){
        //defaults to learningfuze location if it fails
        myPosition.lat = 33.6362183;
        myPosition.lang = -117.7394721;
        myPosition.status = false;
        myPosition.error = error;
    }
    this.getLocation = function(){
        return myPosition;
    }
    nav.getCurrentPosition(success.bind(this), failure);
}
//DOCUMENT READY
$(document).ready(function(){
    //create location object
    getAddress();
    createDomPage1();


    //Added from Amina
    getNames();
    navigator.geolocation.getCurrentPosition(initialize);
    getPersonImages();

});

function clearMain(){
    $('.main').children().remove();
}
function getAddress(){
    locObj = new LocationObj(checkAddress, null);

}
function checkAddress(){
    console.log(locObj.getLocation());
    
    if (!locObj.success){
        createAddressBar();
    }
}

function createAddressBar(){
    $('<input>').attr({
        type: 'text',
        placeholder: 'Enter Your Location',
        class: 'col-lg-6 col-lg-offset-3'
    }).appendTo('.main');

}

// PAGE 1 - Date Choice
function createDomPage1(){
    var choiceArray = ['Male', 'Female', 'Surprise Me'];
    for (var i = 0; i < choiceArray.length; i++){
        var dateChoices = $('<div>').addClass('col-sm-4 dateChoices').click(selectedGender);
        $('.main').append(dateChoices);
        var dateChoicesContainer = $('<div>').addClass('dateChoicesContainer').text(choiceArray[i]);
        $(dateChoices).append(dateChoicesContainer);
    }
}

function selectedGender() {
    genderSelect = $(this).text();
    
    if (genderSelect === 'Surprise Me'){
        createDomPage5();
    }
    
    clearMain();
    createDomPage2();
    console.log(genderSelect);
}


// PAGE 2 - Date Buttons

function createDomPage2 (){
    for (var i=0; i < 6; i++){
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6');
        $(dateDiv).click(clickDateBtns);
        $('.main').append(dateDiv);
        var dateContainer = $('<div>').addClass('dateContainers').text(i+1);
        $(dateDiv).append(dateContainer);
    }
}


//Getting random names function via ajax call
function getNames() {
    $.ajax({
        method: 'get',
        datatype: 'json',
        url: 'http://uinames.com/api/',
        success: function (result) {
            firstName = result.name;
            lastName = result.surname;

            $(".name").html(firstName + ' ' + lastName);
        },

        error: function () {
            console.log('call was unsuccessful');
        }
    })
}
//End of random name function

//Getting images from Flickr function
function getPersonImages() {
    $.ajax({
        url: 'https://api.flickr.com/services/rest',
        method: 'get',
        data: {
            method: 'flickr.photos.search',
            api_key: '4291af049e7b51ff411bc39565109ce6',
            nojsoncallback: '1',
            sort: 'relevance',
            text: 'person',
            format: 'json'
        },

        success: function (result) {
            console.log(result);

        }
    })
}

function clickDateBtns (){
    clearMain();
    //save the img and name of clicked item
    createDomPage3();
}


// PAGE 3 - Event Choices

function createDomPage3(){
    for(var i = 0; i < 6; i++) {
        var selectEvent = $('<div>').addClass('eventChoices col-sm-4 col-xs-6 box' + i).text('EVENT CHOICE' + i).click(clickeventChoices);
        $('.main').append(selectEvent);
        if ($('.eventChoices').hasClass('box5')){
            $('.box5').text('SURPRISE ME!')
        }
    }
}

function clickeventChoices(){
    if($(this).hasClass('box5')){
        clearMain();
        createDomPage5();
    } else {
        clearMain();
        createDomPage4();
    }
}

// PAGE 4  -  Events Buttons
function createDomPage4(){
    for(var i = 0; i < 6 ; i++){
        var eventDiv = $('<div>').addClass('eventBtns col-sm-4 col-xs-6');
        $(eventDiv).click(clickEventBtns);
        $('.main').append(eventDiv);
        var eventContainer = $('<div>').addClass('dateContainers').text(i+1);
        $(eventDiv).append(eventContainer);
    }
}

function clickEventBtns () {
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


function createDomPage5(){
    for (var i=0; i<4; i++){
        var finalDiv = $('<div>').addClass('finalBtns col-sm-6 col-xs-12')
        $('.main').append(finalDiv);
        var finalDivContainer = $('<div>').addClass('finalDivContainer').text(i+1);
        $(finalDiv).append(finalDivContainer);
    }
}


//Getting google maps for the locations

function initialize(location) {
    console.log(location);

    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

//End of google maps function














