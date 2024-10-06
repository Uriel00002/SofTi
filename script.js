//HEADER
const navigation = document.getElementById('navigation');
const menu = document.getElementById('menu');
const menu_items = document.getElementById('menu-items');
const menu_btn = document.getElementById('menu-btn');

function slide() {
    const width = window.innerWidth;
    if (width < 640) {
        navigation.style.display = 'none';
        menu.style.display = 'flex';
    }else{
        navigation.style.display = 'flex';
        menu.style.display = 'none';
        menu_items.classList.add('hidden');
    }
    let active = false;
    menu_btn.addEventListener('click', () => {
        if (active) {
            menu_items.classList.add('-mr-32');
            setTimeout(() => {
                menu_items.classList.add('hidden');
            }, 300);
        } else {
            menu_items.classList.remove('hidden');
            setTimeout(() => {
                menu_items.classList.remove('-mr-32');
            }, 300);
        }
        active = !active;
    });
    menu_items.childNodes.forEach((child) => {
        child.addEventListener('click', () => {
            menu_items.classList.add('-mr-32');
            setTimeout(() => {
                menu_items.classList.add('hidden');
            }, 300);
            active = false;
        });
    })
}

document.addEventListener('DOMContentLoaded', slide);
window.addEventListener('resize', slide);

//CAROUSEL
const cards = document.querySelectorAll('.card');
const buttons = document.querySelectorAll('#carousel-buttons div');
const carousel = document.getElementById('carousel');
let currentIndex = 0;
let interval;

let touchstartX = 0;
let touchendX = 0;

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
    interval = setInterval(nextCard, 4000);
}

function handleSwipe() {
    if (touchendX < touchstartX - 50) {
        nextCard();
    } else if (touchendX > touchstartX + 50) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    }
}

carousel.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
});

showCard(currentIndex);
startCarousel();