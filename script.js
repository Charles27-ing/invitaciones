document.addEventListener('DOMContentLoaded', function() {
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

    // Leer los parámetros 'invitado' y 'cantidad'
   try {
        const urlParams = new URLSearchParams(window.location.search);
        let invitado = urlParams.get('invitado');
        let cantidad = urlParams.get('cantidad');

        // Si no se encuentra con URLSearchParams, intentar método manual
        if (!invitado || !cantidad) {
            const queryString = window.location.search.substring(1);
            const params = queryString.split('&');
            for (let param of params) {
                const [key, value] = param.split('=');
                if (key === 'invitado') {
                    invitado = value;
                } else if (key === 'cantidad') {
                    cantidad = value;
                }
            }
        }

        if (invitado && invitado.trim().length > 0) {
            // Decodificar el nombre (convierte %20 y + en espacios)
            const name = decodeURIComponent(invitado.replace(/\+/g, ' ')).trim();
            
            if (name.length > 0) {
                const guestNamePage2El = document.getElementById('guest-name-page2');
                if (guestNamePage2El) {
                    guestNamePage2El.textContent = name;
                }
            }
        }

        // Procesar cantidad de personas
        if (cantidad && cantidad.trim().length > 0) {
            const quantity = decodeURIComponent(cantidad.replace(/\+/g, ' ')).trim();
            if (quantity.length > 0 && !isNaN(quantity)) {
                const guestQuantityEl = document.getElementById('guest-quantity-page5b');
                if (guestQuantityEl) {
                    guestQuantityEl.textContent = quantity + (quantity === '1' ? ' Persona' : ' Personas');
                }
            }
        }
    } catch (e) {
        console.warn('No se pudo leer los parámetros de la URL:', e);
    }

    // Crear flores SVG en movimiento
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

    createCornerFlowers();
    setInterval(createFlower, 800);

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

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours;
            if (minutesElement) minutesElement.textContent = minutes;
            if (secondsElement) secondsElement.textContent = seconds;

            if (secondsElement) {
                secondsElement.parentElement.classList.add('pulse');
                setTimeout(() => {
                    secondsElement.parentElement.classList.remove('pulse');
                }, 600);
            }
        } else {
            document.getElementById('countdown-container').innerHTML = 
                '<h4 style="color: #8B4513;">¡Ya nos casamos!</h4>';
        }
    }

    updateCountdown();
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
            if (sparkle.parentNode) sparkle.remove();
        }, 2000);
    }

    let sparkleTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(sparkleTimer);
        sparkleTimer = setTimeout(() => {
            if (Math.random() < 0.1) {
                createSparkle(e.clientX, e.clientY);
            }
        }, 50);
    });

    // Feedback háptico
    function playHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    nextBtn.addEventListener('click', playHapticFeedback);
    prevBtn.addEventListener('click', playHapticFeedback);

    // Crear explosión para página 7
    function createExplosion() {
        const explosion = document.getElementById('explosion');
        if (!explosion) return;
        explosion.innerHTML = '';
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

    // Animación de entrada para elementos
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

        if (pageElement.id === 'page7') {
            setTimeout(() => {
                createExplosion();
            }, 500);
        }
    }

    // Navegación
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
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    }

    setTimeout(() => {
        animatePageElements(pages[0]);
    }, 500);

    // Funcionalidad del carrusel
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

        setInterval(() => {
            currentImageIndex = (currentImageIndex < carouselImages.length - 1) ? currentImageIndex + 1 : 0;
            updateCarousel();
        }, 3000);
    }
});

// Función mejorada para confirmar asistencia con detección de conversación
window.confirmAttendance = function(willAttend) {
    const messageEl = document.getElementById('confirmation-message');
    const buttons = document.querySelectorAll('.confirm-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // Obtener datos del invitado
    const guestName = document.getElementById('guest-name-page2').textContent || 'Invitado';
    const guestQuantity = document.getElementById('guest-quantity-page5b').textContent || '2 Personas';
    
    let confirmationMessage, whatsappMessage;
    
    if (willAttend) {
        confirmationMessage = '¡Excelente! Nos vemos el 22 de Noviembre 💕';
        whatsappMessage = `🌸 Confirmación de Asistencia 🌸\n\n` +
                         `Hola, soy *${guestName}*.\n` +
                         `✅ *Confirmo mi asistencia* a tu boda.\n` +
                         `👥 Asistiremos: *${guestQuantity}*\n` +
                         `📅 Fecha: 22 de Noviembre 2025\n` +
                         `⏰ Hora: 5:00 PM\n` +
                         `📍 Lugar: Casa de Eventos "Las Marias"\n\n` +
                         `¡Estamos muy emocionados de compartir este momento con ustedes! 💕\n\n` +
                         `Con amor,\n${guestName}`;
    } else {
        confirmationMessage = 'Entendemos, gracias por avisarnos. Te extrañaremos 💔';
        whatsappMessage = `🌸 Confirmación de Asistencia 🌸\n\n` +
                         `Hola, soy *${guestName}*.\n` +
                         `❌ *Lamentablemente no podré asistir* a tu boda.\n` +
                         `📅 Fecha: 22 de Noviembre 2025\n\n` +
                         `Les deseo lo mejor en este nuevo camino juntos. ¡Felicidades! 🥰\n\n` +
                         `Con cariño,\n${guestName}`;
    }
    
    messageEl.innerHTML = confirmationMessage;
    messageEl.style.color = willAttend ? '#4CAF50' : '#f44336';
    messageEl.classList.add('show');
    
    // Intentar detectar el número de WhatsApp del remitente
    let phoneNumber = detectWhatsAppNumber();
    
    if (phoneNumber) {
        // Si detectamos un número, crear botón para responder en la misma conversación
        createWhatsAppButtons(whatsappMessage, phoneNumber, guestName, willAttend);
    } else {
        // Si no detectamos número, crear botón genérico
        createGenericWhatsAppButton(whatsappMessage);
    }
    
    // Guardar en localStorage
    const response = {
        name: guestName,
        quantity: guestQuantity,
        willAttend: willAttend,
        timestamp: new Date().toISOString(),
        message: whatsappMessage
    };
    
    localStorage.setItem('weddingConfirmation', JSON.stringify(response));
};

// Función para detectar número de WhatsApp (si viene de un enlace de WhatsApp)
function detectWhatsAppNumber() {
    // Verificar si viene de un referer de WhatsApp
    if (document.referrer.includes('api.whatsapp.com')) {
        try {
            const refererUrl = new URL(document.referrer);
            const textParam = refererUrl.searchParams.get('text');
            if (textParam) {
                // Intentar extraer número del mensaje original
                const decodedText = decodeURIComponent(textParam);
                // Buscar patrones de números de teléfono en el mensaje
                const phoneMatch = decodedText.match(/https?:\/\/wa\.me\/(\d+)/);
                if (phoneMatch) {
                    return phoneMatch[1];
                }
            }
        } catch (e) {
            console.log('No se pudo extraer número del referer');
        }
    }
    
    // Verificar parámetros en la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const fromWhatsApp = urlParams.get('from');
    if (fromWhatsApp) {
        return fromWhatsApp.replace(/\D/g, ''); // Solo números
    }
    
    return null;
}

// Función para crear botones de WhatsApp específicos
function createWhatsAppButtons(message, phoneNumber, guestName, willAttend) {
    const messageEl = document.getElementById('confirmation-message');
    
    // Botón para responder en la misma conversación
    const replyBtn = document.createElement('button');
    replyBtn.className = 'confirm-btn';
    replyBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
    replyBtn.style.marginTop = '15px';
    replyBtn.style.marginRight = '10px';
    replyBtn.style.width = 'calc(70% - 10px)';
    replyBtn.innerHTML = `💚 Responder en WhatsApp`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    replyBtn.onclick = function() {
        window.open(whatsappUrl, '_blank');
    };
    
    // Botón alternativo (abrir WhatsApp sin número específico)
    const genericBtn = document.createElement('button');
    genericBtn.className = 'confirm-btn';
    genericBtn.style.background = 'linear-gradient(135deg, #667780, #54656f)';
    genericBtn.style.marginTop = '15px';
    genericBtn.style.width = '30%';
    genericBtn.innerHTML = `📱 Otro chat`;
    
    genericBtn.onclick = function() {
        const genericWhatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(genericWhatsappUrl, '_blank');
    };
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '15px';
    
    buttonContainer.appendChild(replyBtn);
    buttonContainer.appendChild(genericBtn);
    messageEl.appendChild(buttonContainer);
    
    // Enviar automáticamente después de 5 segundos
    setTimeout(() => {
        if (confirm(`¿Quieres enviar tu confirmación a ${guestName} ahora?`)) {
            window.open(whatsappUrl, '_blank');
        }
    }, 5000);
}

// Función para crear botón genérico de WhatsApp
function createGenericWhatsAppButton(message) {
    const messageEl = document.getElementById('confirmation-message');
    
    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'confirm-btn';
    whatsappBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
    whatsappBtn.style.marginTop = '15px';
    whatsappBtn.style.width = '100%';
    whatsappBtn.innerHTML = `📱 Enviar confirmación por WhatsApp`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    whatsappBtn.onclick = function() {
        window.open(whatsappUrl, '_blank');
    };
    
    messageEl.appendChild(whatsappBtn);
    
    // Mostrar instrucciones
    const instructions = document.createElement('p');
    instructions.style.marginTop = '10px';
    instructions.style.fontSize = '0.9rem';
    instructions.style.color = '#666';
    instructions.innerHTML = 'Se abrirá WhatsApp. Elige la conversación donde recibiste la invitación y envía el mensaje.';
    messageEl.appendChild(instructions);
}