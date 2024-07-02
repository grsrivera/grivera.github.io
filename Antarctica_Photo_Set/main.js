// 2 lines customizable to accomodate different number of photos:
// Line 38: Set index of last picture (using its radio button)
// Line 55: Set index of last picture (using its radio button)

let radioButtons;
let strip = document.querySelector(".strip");
let labelStrip = document.querySelector(".label-strip");
let slideIndicator = document.querySelector(".slide-indicator");
let timer;
let nextRadioButton; 
let radioButtonLabels = document.querySelectorAll('label[class=radio-button-label]');
let checkedButtonIndex;
let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let i;

// This function finds what radio button is checked

function findCheckedButton() {
    radioButtons = document.querySelectorAll("input[name='radio-buttons']");
    radioButtons = Array.from(radioButtons);

    return radioButtons.findIndex(function(button) {
        if (button.checked ==true) {
            return true;
        }    
    }) 
}

// This slides the strips along in order to change the displayed picture.
// There are 2 strips: strip (which has pictures and captions) and the 
//  radio-button strip (aka. labelStrip because only labels are displayed), (as the user cycles through–there are only 7 displayed at a time)

function moveStrips() {
    strip.style.marginLeft = -checkedButtonIndex * 820 + 'px';

    if (checkedButtonIndex >= 6) {
        labelStrip.style.marginLeft = -5*25 + 2 + 'px';  // -5*25px + 2px needed to center in viewport
    } else {                                             // (n-1)*25px ... 25px is width of a button + 1 gap of 5px
        labelStrip.style.marginLeft = "2px";
    }
    
    activeStyling();
};

// This function makes styling changes as the user clicks through the picture set
// 1. The circular buttons on the ends will be smaller if there are additional pictures to click through
//      If the user is at the end, the button will be normal sized
// 2. Update the display on the slide indicator
//   a. The slide indicator disappears after some time then reappears when the user clicks

function activeStyling() {
    // Update labels nodeList
    radioButtonLabels = document.querySelectorAll('label[class=radio-button-label]');

    for (i=0; i < 11; i++) {
        radioButtonLabels[i].style.scale = "1.0";
    }

    if (checkedButtonIndex > 5) {
        radioButtonLabels[5].style.scale = "0.5";
    } else {                                      
        radioButtonLabels[6].style.scale = "0.5";
    }

    slideIndicator.textContent = (checkedButtonIndex + 1) + '/11';

    // Makes slide indicator appear and disappear

    clearTimeout(timer);

    slideIndicator.classList.remove("invis");
        
    timer = setTimeout(function() {
        slideIndicator.classList.add("invis");
    }, 2000);   
}

// These 2 functions are for the arrows. They change the checked radio button then calls moveStrips.

function previousSlide() {
    // Go to last slide if currently on first slide.
    if (checkedButtonIndex == 0) {
        radioButtons[radioButtons.length - 1].checked = true; // <--- Edit here. Last button is index 10 with 11 pictures
        checkedButtonIndex = radioButtons.length - 1;
    } else {
        radioButtons[checkedButtonIndex - 1].checked = true;
        checkedButtonIndex--;
    }

    moveStrips();
}

function nextSlide() {
    // Go to first slide if currently on last slide.
    if (checkedButtonIndex == radioButtons.length - 1) { // <--- Edit here.>
        radioButtons[0].checked = true; 
        checkedButtonIndex = 0;
    } else {
        radioButtons[checkedButtonIndex + 1].checked = true;
        checkedButtonIndex++;
    }

    moveStrips();
}

// Here is the main body of the 
// Begin slideshow with slide indicator displayed for one cycle

setTimeout(function() {
    slideIndicator.classList.add("invis");
}, 2500);

// Functionality of buttons. Add event listener to each button label (radio buttons are hidden)
// Find index of checked (with 200ms delay to allow 'checked' property of radios update) then moveButtons

document.addEventListener("DOMContentLoaded", function() {
    for (buttonLabel of radioButtonLabels) {
        buttonLabel.addEventListener("click", function() { 
            setTimeout(function() {
                checkedButtonIndex = findCheckedButton();
                moveStrips();
            }, 200)
        })
    }
});

// Functionality of arrow buttons

leftArrow.addEventListener("click", function() {
    checkedButtonIndex = findCheckedButton();
    previousSlide();
});

rightArrow.addEventListener("click", function() {
    checkedButtonIndex = findCheckedButton();
    nextSlide();
});

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
        event.preventDefault();
    }
    
    if (event.key == 'ArrowLeft') {
        previousSlide();
    } else if (event.key == 'ArrowRight') {
        nextSlide();
    }
});

// Touchscreen swipe functionality
let touchStartX;
let touchEndX;
let picture = document.querySelector(".strip");

picture.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, {passive: true});

picture.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    processSwipe();
});

const swipeThreshold = 50;

function processSwipe() {
    checkedButtonIndex = findCheckedButton();

    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        previousSlide();
    }
}