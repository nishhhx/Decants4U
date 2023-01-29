// ================================= referenced javascript code ======================================
// CAROUSEL
// Set the initial slideIndex to 1
let slideIndex = 1;
// Display the first slide using showSlides(1) function
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  // Display the next/previous slide by adding to the slideIndex
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  // Display the current slide by setting the slideIndex to n
  showSlides(slideIndex = n);
}

// function to display the slide 
function showSlides(n) {
  // Access to the slide container element using class selector method
  let slides = document.getElementsByClassName("container");
  // Access to the navigational dot elements using class selector method
  let dots = document.getElementsByClassName("dot");
  // if n is greater than length of slides, then reset the slideIndex to 1
  if (n > slides.length) {
    slideIndex = 1
  }
  // if n is 0 or negative then set the slideIndex to be the length of the slides
  if (n < 1) {
    slideIndex = slides.length
  }
  // iterating through each slide container 
  for (let i = 0; i < slides.length; i++) {
    // hiding every slide
    slides[i].style.display = "none";
    // removing the highlight (active) from all the dots
    dots[i].className = dots[i].className.replace(" active", "");
  }
  // Making the given slide appear
  slides[slideIndex - 1].style.display = "block";
  // Highlighting the given dot  
  dots[slideIndex - 1].className += " active";
}

// TOP BUTTON
// Access to the top button element using id selector method
let mybtn = document.getElementById("topBtn");
// scrollFunction() is called when scroll happens on the window
window.onscroll = function () {
  scrollFunction()
};
// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  // display the top button when user scrolls down 20px from the top of the document
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 || window.scrollY > 20) {
    mybtn.style.display = "block";
  }
  // hides the top button otherwise
  else {
    mybtn.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  window.scrollY = 0; // For all the browsers except IE
}

// ================================= self-written javascript code ======================================
// Responsive Navbar
function responsiveNavbar() {
  // get the navbar element using access modifier
  var x = document.getElementById("myNavbar");
  // make navbar responsive when screen size decreases
  if (x.className === "navbar") {
    x.className += " responsive";
  } 
  // remove responsive class from the navbar 
  else {
    x.className = "navbar";
  }
}

// Display the seller information on click of seller information button
function getInfo() {
  // get the seller info element using access modifier
  var container = document.getElementById('seller_info');
  var btnText = document.getElementById('seller_info_button');
  // display the seller information if hidden
  if (container.style.display === "none") {
    container.style.display = "block";
    btnText.textContent = "Hide Seller Information";
  } 
  // hide the seller information if visible
  else {
    container.style.display = "none";
    btnText.textContent = "Show Seller Information";
  }
}

// Read call to the realtime database
firebase.database().ref("productInfoForm").on('value', (snapshot) => {
  // iterate through the snapshot of all the data in productInfoForm
  snapshot.forEach(childSnapshot => {
  // div which will contain all the product cards
  var dynamicCard = document.querySelector('.cards');
  // iteratively add all the product cards to the .cards div element
  dynamicCard.innerHTML +=
  // template for a generic product card 
  `<div class="card-container" data-action="zoom">
    <img class="test" src="../image/${childSnapshot.val().imageName}" alt="prod">
    <h2>${childSnapshot.val().title}</h2>
    <p class="price">$${childSnapshot.val().price}</p>
    <p>${childSnapshot.val().tags}</p>
    <p><a href="../html/description.html"><button>More Information</button></a></p>
  </div>`;
  });
});