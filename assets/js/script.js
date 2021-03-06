//Variables for textarea fields
var nineInput = $("#input-9AM");
var tenInput = $("#input-10AM");
var elevenInput = $("#input-11AM");
var twelveInput = $("#input-12PM");
var oneInput = $("#input-1PM");
var twoInput = $("#input-2PM");
var threeInput = $("#input-3PM");
var fourInput = $("#input-4PM");

// Variable for saving buttons
var saveBtn = $(".saveBtn");

// Variables for Moment functions for displaying hours in different colors
var now = moment();
var currentDay = $("#currentDay");
var currentHour = now.format("HH");


// Variables for local storage functions
var calendarEvents = {
    nineInput: nineInput.val(), 
    tenInput: tenInput.val(), 
    elevenInput: elevenInput.val(),
    twelveInput: twelveInput.val(), 
    oneInput: oneInput.val(), 
    twoInput: twoInput.val(), 
    threeInput: threeInput.val(), 
    fourInput: fourInput.val(),
}


// Starts the calendar page but setting the current date, comparing the current time to set colors, and calling the function load existing events
function start() {
    currentDay.text(now.format("MMMM DD, YYYY"));

    $("input").each( function(){
        var dataHour = $(this).attr("data-hour")
       
        if (dataHour > currentHour) {
            $(this).addClass("future");
            
        } else if (dataHour == currentHour) {
            $(this).addClass("present");
    
        } else if (dataHour < currentHour) {
            $(this).addClass("past");

        } 
    })

    displayCalendarEvents();
}

// Poulates textarea fields with any events saved in local storage when page loads
function displayCalendarEvents() {
    
    if (localStorage.getItem("calendarEvents") !== null) {
        calendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
        nineInput.val(calendarEvents.nineInput);
        tenInput.val(calendarEvents.tenInput);
        elevenInput.val(calendarEvents.elevenInput);
        twelveInput.val(calendarEvents.twelveInput);
        oneInput.val(calendarEvents.oneInput);
        twoInput.val(calendarEvents.twoInput);
        threeInput.val(calendarEvents.threeInput);
        fourInput.val(calendarEvents.fourInput);
    }
}

// Saves any new input entered in textareas on the global events variable
function saveEventData(siblingInput) { 
    var eventTime = siblingInput.id.split("-")[1];
    
    if (eventTime === "9AM") {
        calendarEvents.nineInput = siblingInput.value;
    } else if (eventTime === "10AM") {
        calendarEvents.tenInput = siblingInput.value;
    } else if (eventTime === "11AM") {
        calendarEvents.elevenInput = siblingInput.value;
    } else if (eventTime === "12PM") {
        calendarEvents.twelveInput = siblingInput.value;
    } else if (eventTime === "1PM") {
        calendarEvents.oneInput = siblingInput.value;
    } else if (eventTime === "2PM") {
        calendarEvents.twoInput = siblingInput.value;
    } else if (eventTime === "3PM") {
        calendarEvents.threeInput = siblingInput.value;
    } else
         calendarEvents.fourInput = siblingInput.value;
   
    // Saves updated calendarEvents back to local storage
    localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
}
    

// Event listener for click on image class
saveBtn.on("click", function(event) {
    event.preventDefault();
    var siblingInput = ($(this).siblings("input")[0]); 
    saveEventData(siblingInput);
})

// Calls start function
start();

