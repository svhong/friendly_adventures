// GLOBAL VARIABLES
var locObj;
var genderSelect;

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
    getAddress()
    createDomPage1();
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
        $('<div>').text(choiceArray[i])
            .addClass('col-lg-4').css('border', '1px solid black').click(function(){selectedGender();}).appendTo('.main');
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
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6').text(i+1);
        $(dateDiv).click(clickDateBtns);
        $('.main').append(dateDiv);
    }
}


function clickDateBtns (){
    clearMain();
    //save the img and name of clicked item
    createDomPage3();
}







// PAGE 3 - Event Choices

function createDomPage3(){
    for(var i = 0; i <= 2; i++) {
        var selectEvent = $('<div>').addClass('eventChoices').html('EVENT CHOICE' + i).click(clickeventChoices);
        $('.main').append(selectEvent);
    }
}

function clickeventChoices(){
    clearMain();
    createDomPage4();
}


// PAGE 4  -  Events Buttons
function createDomPage4(){
    for(var i = 0; i < 6 ; i++){
        var div = $('<div>').addClass('eventBtns col-xs-6 col-sm-4 col-md-4 col-lg-4').click(function(){
            clearMain();
            createDomPage5();
        });
        $('.main').append(div);
    }
}











// Dinner





// Cafe





// Parks





// Theaters





// Malls





// Museum





// PAGE 5














