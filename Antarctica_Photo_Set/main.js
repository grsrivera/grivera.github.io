function isChecked(button) {
    if (button.checked == true)
        return true;
}

let radioButtons;
let checkedButtonIndex;
let pictureStrip = document.querySelector(".picture-strip");
let captionStrip = document.querySelector(".caption-strip");

function moveStrips() {
    //Find checked radio button first
    radioButtons = document.querySelectorAll("input[name='radio-buttons']"); 
    radioButtons = Array.from(radioButtons);

    checkedButtonIndex = radioButtons.findIndex(isChecked);

    pictureStrip.style.marginLeft = -checkedButtonIndex * 800 + 'px';
    captionStrip.style.marginLeft = -checkedButtonIndex * 800 + 'px';
};

// This function is for the arrows. It changes the checked radio button then calls moveStrips.

let nextRadioButton; 

function previousSlide() {
    //Find the checked radio button first again
    radioButtons = document.querySelectorAll("input[name='radio-buttons']"); 
    radioButtons = Array.from(radioButtons);

    checkedButtonIndex = radioButtons.findIndex(isChecked);

    // Go to last slide if currently on first slide.
    if (checkedButtonIndex == 0) { //Change index below!!
        radioButtons[9].checked = true; // Last button is index 9 with 10 pictures
    } else {
        radioButtons[checkedButtonIndex - 1].checked = true;
    }

    moveStrips();
}

function nextSlide() {
    //Find the checked radio button first again
    radioButtons = document.querySelectorAll("input[name='radio-buttons']"); 
    radioButtons = Array.from(radioButtons);

    checkedButtonIndex = radioButtons.findIndex(isChecked);

    // Go to first slide if currently on last slide.
    if (checkedButtonIndex == 9) { //Change this index later!
        radioButtons[0].checked = true; 
    } else {
        radioButtons[checkedButtonIndex + 1].checked = true;
    }

    moveStrips();
}

// Functionality of buttons. Add event listener to each button label (radio buttons are hidden)
let radioButtonLabels = document.querySelectorAll(".radio-button-label");

for (buttonLabel of radioButtonLabels) {
    buttonLabel.addEventListener("click", function() { 
    setTimeout(moveStrips, 200);
    }
)};

// Functionality of arrows
let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");


leftArrow.addEventListener("click", previousSlide);
rightArrow.addEventListener("click", nextSlide);

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
let touchStartX = 0;
let touchEndX = 0;
let picture = document.querySelector(".picture-strip");

picture.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

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


