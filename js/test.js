const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let counter = 0;
const slideWidth = slides[0].clientWidth;

prevBtn.addEventListener('click', () => {
  counter--;
  if (counter < 0) {
    counter = slides.length - 1;
  }
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  counter++;
  if (counter === slides.length) {
    counter = 0;
  }
  updateSlider();
});

function updateSlider() {
  slider.style.transform = `translateX(${-counter * slideWidth}px)`;
}
function updateSlider() {
    console.log("Updating slider...");
    console.log("Current slide index:", counter);
    console.log("Slide width:", slideWidth);
    slider.style.transform = `translateX(${-counter * slideWidth}px)`;
    console.log("Transform applied:", slider.style.transform);
  }
  
