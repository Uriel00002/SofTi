const cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll('#carousel-buttons div');
const carousel = document.getElementById('carousel');
let currentIndex = 0;
let interval;

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    buttons.forEach((button, i) => {
        button.classList.toggle('bg-gray-500', i === index);
    });
    carousel.style.backgroundImage = `url(./assets/imgs/img${index+1}.jpg)`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = parseInt(button.getAttribute('data-index'));
        showCard(currentIndex);
        startCarousel();
    });
});

function startCarousel() {
    interval = setInterval(nextCard, 3000);
}

// Initialize
showCard(currentIndex);
startCarousel();