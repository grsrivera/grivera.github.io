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
// There are 2 strips: strip and 
//  radio-button strip (as the user cycles through–there are only 7 displayed at a time)

function moveStrip() {
    strip.style.marginLeft = -checkedButtonIndex * 820 + 'px';

    if (checkedButtonIndex >= 21) {
        labelStrip.style.marginLeft = -20*25 + 2 + 'px'; // Checking how many circles and gaps to move to the left. 4px is needed to center in viewport
    } else if (checkedButtonIndex <=5) {
            labelStrip.style.marginLeft = '4px';
    } else if (checkedButtonIndex > 5 && checkedButtonIndex <= 10) {
            labelStrip.style.marginLeft = -5*25 + 2 + 'px';
    } else if (checkedButtonIndex >10 && checkedButtonIndex <= 15) {
                labelStrip.style.marginLeft = -10*25 + 2 + 'px';
    } else {
        labelStrip.style.marginLeft = -15*25 + 2 + 'px';
    }
    
    activeStyling();
};

// This function makes styling changes as the user clicks through the picture set
// 1. The circular buttons on the ends will be smaller if there are additional pictures to click through
//      If the user is at the end, the button will be normal sized
// 2. Update the display on the slide indicator
//   a. The slide indicator disappears after some time then reappears when the user clicks

let i;

function activeStyling() {
    // Update labels nodeList
    radioButtonLabels = document.querySelectorAll('label[class=radio-button-label]');

    for (i=0; i < 24; i++) {
        radioButtonLabels[i].style.scale = "1.0";
    }

    if (checkedButtonIndex >= 21) {
        radioButtonLabels[20].style.scale = "0.5";
    } else if (checkedButtonIndex <=5) {
            radioButtonLabels[6].style.scale = "0.5";
    } else if (checkedButtonIndex > 5 && checkedButtonIndex <= 10) {
            radioButtonLabels[5].style.scale = "0.5";
            radioButtonLabels[11].style.scale = "0.5";
    } else if (checkedButtonIndex >10 && checkedButtonIndex <= 15) {
            radioButtonLabels[10].style.scale = "0.5";
            radioButtonLabels[16].style.scale = "0.5";
    } else {
            radioButtonLabels[15].style.scale = "0.5";
            radioButtonLabels[21].style.scale = "0.5";
    }

    slideIndicator.textContent = (checkedButtonIndex + 1) + '/24';

    // Makes slide indicator appear and disappear

    clearTimeout(timer);

    slideIndicator.classList.remove("invis");
        
    timer = setTimeout(function() {
        slideIndicator.classList.add("invis");
    }, 2000);   
}

// These 2 functions are for the arrows. They change the checked radio button then calls moveStrip.

function previousSlide() {
    // Go to last slide if currently on first slide.
    if (checkedButtonIndex == 0) {
        radioButtons[23].checked = true; // <--- Edit here. Last button is index 10 with 11 pictures
        checkedButtonIndex = 23;
    } else {
        radioButtons[checkedButtonIndex - 1].checked = true;
        checkedButtonIndex--;
    }

    moveStrip();
}

function nextSlide() {
    // Go to first slide if currently on last slide.
    if (checkedButtonIndex == 23) { // <--- Edit here.>
        radioButtons[0].checked = true; 
        checkedButtonIndex = 0;
    } else {
        radioButtons[checkedButtonIndex + 1].checked = true;
        checkedButtonIndex++;
    }

    moveStrip();
}

// Here is the main body of the 
// Begin slideshow with slide indicator displayed for one cycle

setTimeout(function() {
    slideIndicator.classList.add("invis");
}, 2500);

// Functionality of buttons. Add event listener to each button label (radio buttons are hidden)
// Find index of checked (with 200ms delay to allow 'checked' property of radios update) then moveButtons

for (buttonLabel of radioButtonLabels) {
    buttonLabel.addEventListener("click", function() { 
        setTimeout(function() {
            checkedButtonIndex = findCheckedButton();
            moveStrip();
        }, 200)
    })
};


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

//Touchscreen swipe functionality
let touchStartX = 0;
let touchEndX = 0;
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
    if (touchEndX < touchStartX - swipeThreshold) {
        previousSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        nextSlide();
    }
}