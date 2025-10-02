document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const flowerContainer = document.getElementById('flower-container');

    let currentPage = 0;

    // Inicializar clases
    pages[0].classList.add('visible');
    for (let i = 1; i < pages.length; i++) {
        pages[i].classList.add('back');
    }

    // Leer el parámetro 'invitado' y poblar nombre en ambas páginas
    try {
        const params = new URLSearchParams(window.location.search);
        const invitado = params.get('invitado');
        if (invitado && invitado.trim().length > 0) {
            const name = decodeURIComponent(invitado.trim());
            // Poblar página 2
            const guestNamePage2El = document.getElementById('guest-name-page2');
            if (guestNamePage2El) guestNamePage2El.textContent = name;
        }
    } catch (e) {
        console.warn('No se pudo leer el parámetro invitado:', e);
    }

    // Crear flores SVG en movimiento (pétalos flotando)
    function createFlower() {
        if (!flowerContainer) return;
        const flower = document.createElement('div');
        flower.classList.add('flower');

        const flowerSVGs = [
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                    <circle cx="0" cy="0" r="8" fill="#ff69b4" opacity="0.8"/>
                    <circle cx="-12" cy="-8" r="12" fill="#ff1493" opacity="0.7"/>
                    <circle cx="12" cy="-8" r="12" fill="#ff1493" opacity="0.7"/>
                    <circle cx="-8" cy="12" r="12" fill="#ff1493" opacity="0.7"/>
                    <circle cx="8" cy="12" r="12" fill="#ff1493" opacity="0.7"/>
                    <circle cx="0" cy="-15" r="10" fill="#ff69b4" opacity="0.8"/>
                </g>
            </svg>`,
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                    <circle cx="0" cy="0" r="6" fill="#ffd700"/>
                    <ellipse cx="0" cy="-15" rx="8" ry="15" fill="#ffb6c1" opacity="0.8"/>
                    <ellipse cx="14" cy="5" rx="8" ry="15" fill="#ffb6c1" opacity="0.8" transform="rotate(72)"/>
                    <ellipse cx="9" cy="12" rx="8" ry="15" fill="#ffb6c1" opacity="0.8" transform="rotate(144)"/>
                    <ellipse cx="-9" cy="12" rx="8" ry="15" fill="#ffb6c1" opacity="0.8" transform="rotate(216)"/>
                    <ellipse cx="-14" cy="5" rx="8" ry="15" fill="#ffb6c1" opacity="0.8" transform="rotate(288)"/>
                </g>
            </svg>`,
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                    <circle cx="0" cy="0" r="8" fill="#ffff00"/>
                    <ellipse cx="0" cy="-18" rx="4" ry="12" fill="#ffffff" opacity="0.9"/>
                    <ellipse cx="13" cy="-13" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(45)"/>
                    <ellipse cx="18" cy="0" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(90)"/>
                    <ellipse cx="13" cy="13" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(135)"/>
                    <ellipse cx="0" cy="18" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(180)"/>
                    <ellipse cx="-13" cy="13" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(225)"/>
                    <ellipse cx="-18" cy="0" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(270)"/>
                    <ellipse cx="-13" cy="-13" rx="4" ry="12" fill="#ffffff" opacity="0.9" transform="rotate(315)"/>
                </g>
            </svg>`,
            `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(50,50)">
                    <ellipse cx="-8" cy="-10" rx="6" ry="18" fill="#ff6347" opacity="0.8" transform="rotate(-20)"/>
                    <ellipse cx="0" cy="-12" rx="6" ry="18" fill="#ff4500" opacity="0.8"/>
                    <ellipse cx="8" cy="-10" rx="6" ry="18" fill="#ff6347" opacity="0.8" transform="rotate(20)"/>
                    <circle cx="0" cy="5" r="3" fill="#32cd32"/>
                </g>
            </svg>`
        ];

        const randomSVG = flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];
        flower.innerHTML = randomSVG;
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = Math.random() * 5 + 10 + 's';
        flower.style.animationDelay = Math.random() * 2 + 's';
        flowerContainer.appendChild(flower);

        setTimeout(() => {
            if (flower.parentNode) flower.remove();
        }, 17000);
    }

    // Crear flores decorativas en las esquinas
    function createCornerFlowers() {
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        const cornerFlowerSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(50,50)">
                <circle cx="0" cy="0" r="6" fill="#ffd700" opacity="0.6"/>
                <ellipse cx="0" cy="-15" rx="8" ry="15" fill="#ffb6c1" opacity="0.5"/>
                <ellipse cx="14" cy="5" rx="8" ry="15" fill="#ffb6c1" opacity="0.5" transform="rotate(72)"/>
                <ellipse cx="9" cy="12" rx="8" ry="15" fill="#ffb6c1" opacity="0.5" transform="rotate(144)"/>
                <ellipse cx="-9" cy="12" rx="8" ry="15" fill="#ffb6c1" opacity="0.5" transform="rotate(216)"/>
                <ellipse cx="-14" cy="5" rx="8" ry="15" fill="#ffb6c1" opacity="0.5" transform="rotate(288)"/>
            </g>
        </svg>`;
        
        corners.forEach(corner => {
            const cornerFlower = document.createElement('div');
            cornerFlower.classList.add('corner-flower', corner);
            cornerFlower.innerHTML = cornerFlowerSVG;
            document.body.appendChild(cornerFlower);
        });
    }

    // Inicializar flores decorativas
    createCornerFlowers();

    setInterval(createFlower, 800); // Genera una flor nueva cada 800ms

    // Temporizador de cuenta regresiva
    function updateCountdown() {
        const weddingDate = new Date('November 22, 2025 17:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Actualizar los elementos del DOM
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours;
            if (minutesElement) minutesElement.textContent = minutes;
            if (secondsElement) secondsElement.textContent = seconds;

            // Añadir animación de pulso cuando cambian los segundos
            if (secondsElement) {
                secondsElement.parentElement.classList.add('pulse');
                setTimeout(() => {
                    secondsElement.parentElement.classList.remove('pulse');
                }, 600);
            }
        } else {
            // La boda ya pasó
            document.getElementById('countdown-container').innerHTML = 
                '<h4 style="color: #8B4513;">¡Ya nos casamos!</h4>';
        }
    }

    // Actualizar el temporizador cada segundo
    updateCountdown(); // Llamada inicial
    setInterval(updateCountdown, 1000);

    // Efectos de partículas brillantes
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2000);
    }

    // Crear partículas brillantes en movimiento del mouse
    let sparkleTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(sparkleTimer);
        sparkleTimer = setTimeout(() => {
            if (Math.random() < 0.1) { // 10% de probabilidad
                createSparkle(e.clientX, e.clientY);
            }
        }, 50);
    });

    // Efectos de sonido simulados con vibraciones (si está disponible)
    function playHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // Agregar feedback háptico a los botones
    nextBtn.addEventListener('click', playHapticFeedback);
    prevBtn.addEventListener('click', playHapticFeedback);

    // Function to create explosion for page7
    function createExplosion() {
        const explosion = document.getElementById('explosion');
        if (!explosion) return;
        explosion.innerHTML = ''; // Clear previous
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            particle.style.setProperty('--angle', Math.random() * 360 + 'deg');
            particle.style.setProperty('--distance', Math.random() * 200 + 100 + 'px');
            explosion.appendChild(particle);
        }
    }

    // Animación de entrada para elementos cuando se cargan
    function animatePageElements(pageElement) {
        const elements = pageElement.querySelectorAll('h3, p, .section-image, #countdown-container, #map-container');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Trigger explosion for page7
        if (pageElement.id === 'page7') {
            setTimeout(() => {
                createExplosion();
            }, 500);
        }
    }

    // Mejorar la navegación con animaciones
    const originalNextClick = nextBtn.onclick;
    const originalPrevClick = prevBtn.onclick;

    nextBtn.onclick = null;
    prevBtn.onclick = null;

    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.remove('visible');
            pages[currentPage].classList.add('flipped');
            currentPage++;
            pages[currentPage].classList.remove('back');
            
            setTimeout(() => {
                pages[currentPage].classList.add('visible');
                animatePageElements(pages[currentPage]);
            }, 200);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            pages[currentPage].classList.remove('visible');
            pages[currentPage].classList.add('back');
            currentPage--;
            pages[currentPage].classList.remove('flipped');
            
            setTimeout(() => {
                pages[currentPage].classList.add('visible');
                animatePageElements(pages[currentPage]);
            }, 200);
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
    });

    // Navegación con gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next page
                nextBtn.click();
            } else {
                // Swipe right - previous page
                prevBtn.click();
            }
        }
    }

    // Animar la primera página al cargar
    setTimeout(() => {
        animatePageElements(pages[0]);
    }, 500);

    // Función para confirmar asistencia
    window.confirmAttendance = function(willAttend) {
        const messageEl = document.getElementById('confirmation-message');
        const buttons = document.querySelectorAll('.confirm-btn');
        
        // Deshabilitar botones
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
        
        // Mostrar mensaje
        if (willAttend) {
            messageEl.innerHTML = '¡Excelente! Nos vemos el 22 de Noviembre 💕';
            messageEl.style.color = '#4CAF50';
        } else {
            messageEl.innerHTML = 'Entendemos, gracias por avisarnos. Te extrañaremos 💔';
            messageEl.style.color = '#f44336';
        }
        
        messageEl.classList.add('show');
        
        // Guardar respuesta en localStorage
        const guestName = document.getElementById('guest-name-page2').textContent || 'Invitado';
        const response = {
            name: guestName,
            willAttend: willAttend,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('weddingConfirmation', JSON.stringify(response));
        
        // Opcional: Enviar a servidor (si tienes backend)
        // sendConfirmationToServer(response);
    };

    // Carousel functionality for page3
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const carouselPrevBtn = document.querySelector('.carousel .prev-btn');
    const carouselNextBtn = document.querySelector('.carousel .next-btn');

    if (carouselContainer && carouselImages.length > 0) {
        let currentImageIndex = 0;

        function updateCarousel() {
            const translateX = -currentImageIndex * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;
        }

        carouselPrevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : carouselImages.length - 1;
            updateCarousel();
        });

        carouselNextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex < carouselImages.length - 1) ? currentImageIndex + 1 : 0;
            updateCarousel();
        });

        // Auto-play carousel
        setInterval(() => {
            currentImageIndex = (currentImageIndex < carouselImages.length - 1) ? currentImageIndex + 1 : 0;
            updateCarousel();
        }, 3000);
    }
});

// Inicializar mostrando solo la cubierta
// document.addEventListener('DOMContentLoaded', () => {
//     flipPage(0); // Muestra la cubierta al cargar
// });