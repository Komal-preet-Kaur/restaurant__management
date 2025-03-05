let slideIndex = 0;
showSlides(); // Call the function to display the first slide

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    // Hide all slides initially
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increase slide index by 1, and reset to 0 if it exceeds total slides
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; } // Reset to 0

    // Show the current slide
    slides[slideIndex].style.display = "block";

    // Change slide every 3 seconds
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
    let slides = document.getElementsByClassName("slide");
    
    // Update the slide index based on the button clicked
    slideIndex += n;

    // Wrap around the slides if needed
    if (slideIndex >= slides.length) { slideIndex = 0; } // Reset to 0
    if (slideIndex < 0) { slideIndex = slides.length - 1; } // Go to last slide

    // Hide all slides initially
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex].style.display = "block";
}