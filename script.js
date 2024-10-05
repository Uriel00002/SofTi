const cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll('#carousel-buttons div');
const carousel = document.getElementById('carousel');
let currentIndex = 0;
let interval;

// Function to show the current card
function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    buttons.forEach((button, i) => {
        button.classList.toggle('bg-gray-500', i === index); // Change button style for active card
    });
    carousel.style.backgroundImage = `url(./assets/imgs/img${index+1}.jpg)`;
}

// Function to go to the next card
function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
}

// Event listener for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(interval); // Stop auto rotation when button is clicked
        currentIndex = parseInt(button.getAttribute('data-index'));
        showCard(currentIndex);
        startCarousel(); // Restart auto rotation
    });
});

// Start the carousel automatically
function startCarousel() {
    interval = setInterval(nextCard, 3000); // Change card every 3 seconds
}

// Initialize
showCard(currentIndex);
startCarousel();