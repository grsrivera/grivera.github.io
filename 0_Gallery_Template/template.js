let lightBox = document.querySelector(".lightbox");
let displayedLightboxPicture = document.querySelector(".lightbox img");
let xOnLightbox = document.querySelector(".lightbox span");
let galleryPictures = document.querySelectorAll(".gallery img");
let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let currentPictureIndex;
let previousPictureIndex;
let nextPictureIndex;
let n = 0;

function openLightbox(pictureSource) {
    lightBox.style.display = "flex";
    displayedLightboxPicture.src = pictureSource;
}

function closeLightbox() {
    lightBox.style.display = "none";
}


function previousPicture() {
    if (currentPictureIndex == 0) {
        currentPictureIndex = galleryPictures.length - 1;
    } else {
        currentPictureIndex--;
    }    

    openLightbox(galleryPictures[currentPictureIndex].src)

    galleryPictures[currentPictureIndex].style.filter = "grayscale(1)";
}

function nextPicture() {
    if (currentPictureIndex == galleryPictures.length - 1) {
        currentPictureIndex = 0;
    } else {
        currentPictureIndex++;
    }

    openLightbox(galleryPictures[currentPictureIndex].src)

    galleryPictures[currentPictureIndex].style.filter = "grayscale(1)";
}

// This set click event listener to each picture in the gallery to open the lightbox
for (picture of galleryPictures) {
    picture.addEventListener("click", function() {
        currentPictureIndex = Number(this.id);   // This line feeds into previousPicture() and nextPicture()

        openLightbox(this.src);

        this.style.filter = "grayscale(1)";  //Grayscale pic after opened
    })
};


// Closes the lightbox when 'X' is clicked     
xOnLightbox.addEventListener("click", closeLightbox);

// Functionality of arrows. The currentPicture variable is set by the EvenListener function on the gallery pics above

leftArrow.addEventListener("click", function() {
    previousPicture();
});

rightArrow.addEventListener("click", function() {
    nextPicture();
});


