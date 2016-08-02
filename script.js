// GLOBAL VARIABLES









// PAGE 1 - Date Choice












// PAGE 2 - Date Buttons

function createDomPage2 (){
    for (var i=0; i < 6; i++){
        var dateDiv = $('<div>').addClass('dateBtns col-sm-4 col-xs-6').text(i+1);
        $('.main').append(dateDiv);
    }
}


function clickDate (){
    clearMain();
    createDomPage3();
}








// PAGE 3 - Event Choices










// PAGE 4  -  Events Buttons










// Dinner





// Cafe





// Parks





// Theaters





// Malls





// Museum





// PAGE 5














