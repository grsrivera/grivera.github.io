// Grayscales pictures once clicked
let pictureLinks = document.querySelectorAll(".links a img");

for (pictureLink of pictureLinks) {
    pictureLink.addEventListener("click", function() {
        this.style.filter = "grayscale(1)";  //Grayscale pic after opened
    })
};