
let currentSlide = 0;
const slides = document.querySelectorAll('.featured-banner');
const totalSlides = slides.length;
const slidesContainer = document.getElementById('carouselSlides');
const gameInfoCard = document.getElementById('gameInfoCard');
const gameTitle = document.getElementById('gameTitle');
const gameDescription = document.getElementById('gameDescription');
const gamePrice = document.getElementById('gamePrice');
const gameThumbnails = document.getElementById('gameThumbnails');

// Datos de los juegos
const gamesData = [
    {
        title: 'Stray',
        description: 'Stray es una aventura cyberpunk donde controlas a un gato perdido que debe explorar una ciudad futurista, resolver misterios y encontrar el camino a casa. Ideal para quienes buscan una experiencia única e inmersiva.',
        price: '$17.99 USD',
        thumbnails: [
            '../img/Stray/Muestra1.jpeg',
            '../img/Stray/Muestra2.jpeg',
            '../img/Stray/Muestra3.jpeg',
            '../img/Stray/Muestra4.jpeg'
        ],
        bgColor: 'rgba(255, 0, 0, 0.8)'
    },
    {
        title: 'Minecraft',
        description: 'Es una aventura creativa donde construyes y sobrevives en un mundo abierto, explorando biomas variados, reuniendo recursos y enfrentando criaturas. Ideal para quienes buscan una experiencia infinita y dinámica..',
        price: '$19.06 USD',
        thumbnails: [
            '../img/Minecraft/Muestra1.jpeg',
            '../img/Minecraft/Muestra2.jpg',
            '../img/Minecraft/Muestra3.webp',
            '../img/Minecraft/Muestra4.png'
        ],
        bgColor: 'rgba(6, 184, 0, 0.8)'
    },
    {
        title: 'Hollow Knight',
        description: 'Es una aventura desafiante donde exploras un reino subterráneo, descubriendo secretos antiguos, mejorando habilidades y enfrentando criaturas oscuras. Ideal para quienes buscan una experiencia profunda y atmosférica.',
        price: '$9.97 USD',
        thumbnails: [
            '../img/HollowKnight/Muestra1.jpg',
            '../img/HollowKnight/Muestra2.jpg',
            '../img/HollowKnight/Muestra3.webp',
            '../img/HollowKnight/Muestra4.jpg'
        ],
        bgColor: 'rgba(0, 183, 255, 0.8)'
    }
];

// Función para actualizar la información del juego con animación
function updateGameInfo(slideIndex) {
    // Iniciar animación de salida
    gameInfoCard.classList.remove('fade-in');
    gameInfoCard.classList.add('fade-out');

    // Cambiar el color del body con transición suave
    const game = gamesData[slideIndex];
    document.body.style.background = `radial-gradient(circle at 42% 50%, ${game.bgColor}, rgba(0, 0, 0, 1) 70%)`;

    // Esperar a que termine la animación de salida
    setTimeout(() => {
        // Actualizar contenido
        gameTitle.textContent = game.title;
        gameDescription.textContent = game.description;
        gamePrice.textContent = game.price;

        // Actualizar thumbnails
        gameThumbnails.innerHTML = '';
        game.thumbnails.forEach(thumb => {
            const thumbDiv = document.createElement('div');
            thumbDiv.className = 'thumbnail';
            thumbDiv.style.backgroundImage = `url('${thumb}')`;
            gameThumbnails.appendChild(thumbDiv);
        });

        // Iniciar animación de entrada
        gameInfoCard.classList.remove('fade-out');
        gameInfoCard.classList.add('fade-in');
    }, 200);
}

// Función principal para actualizar el carrusel
function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Actualizar información del juego con animación
    updateGameInfo(currentSlide);
}

// Event listeners para las flechas
document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

// ============================================
// NOTIFICACIONES
// ============================================

const GHNotify = {
    drawer: document.getElementById("ghNotifyDrawer"),
    overlay: document.getElementById("ghNotifyOverlay"),
    list: document.getElementById("ghNotifyList"),

    toggle() {
        this.drawer.classList.toggle("gh-show");
        this.overlay.classList.toggle("gh-show");
    },

    close() {
        this.drawer.classList.remove("gh-show");
        this.overlay.classList.remove("gh-show");
    },

    init() {
        // Abrir desde tu botón real
        document.addEventListener("click", e => {
            if (e.target.closest(".notification-section")) {
                this.toggle();
            }
        });

        // Cerrar
        document.getElementById("ghCloseBtn").onclick = () => this.close();
        this.overlay.onclick = () => this.close();

        // Eliminar individual
        document.addEventListener("click", e => {
            if (e.target.hasAttribute("data-gh-remove")) {
                e.target.closest(".gh-notify-card")?.remove();
            }
        });
    }
};

GHNotify.init();

// ============================================
// FOOTER
// ============================================

(function () {
    const yearEl = document.getElementById('ghFooterYear');
    const ownerEl = document.getElementById('ghFooterOwner');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ============================================
// SCROLL REVEAL - ANIMACIONES AL HACER SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar a las secciones principales
    const sectionsToAnimate = document.querySelectorAll('.section');
    
    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(section);
    });

    // Animación especial para las game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Animación para el featured section
    const featuredSection = document.querySelector('.featured-section');
    if (featuredSection) {
        featuredSection.style.opacity = '0';
        featuredSection.style.transform = 'translateY(50px)';
        featuredSection.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            featuredSection.style.opacity = '1';
            featuredSection.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animación para section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateX(-30px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(header);
    });

    // Efecto hover mejorado para game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación para el footer
    const footer = document.querySelector('.gh-footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(footer);
    }

    // ============================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PARALLAX SUAVE EN EL FEATURED BANNER
    // ============================================

    const carousel = document.querySelector('.carousel-wrapper');
    if (carousel) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (carousel.getBoundingClientRect().top < window.innerHeight) {
                carousel.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ============================================
    // ANIMACIÓN DE LOS THUMBNAILS
    // ============================================

    const observeThumbnails = () => {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.style.opacity = '0';
            thumb.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                thumb.style.transition = 'all 0.4s ease';
                thumb.style.opacity = '1';
                thumb.style.transform = 'scale(1)';
            }, index * 100);
        });
    };

    // Observar cambios en los thumbnails
    if (gameThumbnails) {
        const thumbnailObserver = new MutationObserver(observeThumbnails);
        thumbnailObserver.observe(gameThumbnails, { childList: true });
        observeThumbnails(); // Llamar al inicio
    }

    // ============================================
    // CONTADOR DE SCROLL PROGRESS
    // ============================================

    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
        progressBar.style.width = '0%';
        progressBar.style.zIndex = '99999';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    createScrollProgress();

    // ============================================
    // LAZY LOADING PARA IMÁGENES
    // ============================================

    const lazyImages = document.querySelectorAll('.game-card-image, .thumbnail');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // ESTADÍSTICAS DE CARGA
    // ============================================

    console.log('✅ Página Index cargada correctamente');
    console.log('🎨 Scroll Reveal activado');
    console.log(`🎮 ${gameCards.length} juegos en grid`);
    console.log(`🎯 ${totalSlides} slides en carrusel`);
    console.log('🎪 Animaciones y transiciones activas');

    // ============================================
    // EASTER EGG - KONAMI CODE
    // ============================================

    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Efecto especial
            document.body.style.animation = 'rainbow 2s infinite';
            
            setTimeout(() => {
                alert('🎮 ¡KONAMI CODE ACTIVADO!\n\n¡Eres un verdadero gamer! 🏆\n\nDescuento secreto desbloqueado: RETRO2024');
                document.body.style.animation = '';
            }, 500);
            
            console.log('🎉 Easter egg activado: KONAMI CODE');
            konamiCode = [];
        }
    });

    // Agregar keyframes para el efecto rainbow
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// AUTO-PLAY DEL CARRUSEL (OPCIONAL)
// ============================================

let autoPlayInterval;

const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000); // Cambiar cada 5 segundos
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

// Iniciar auto-play
// startAutoPlay();

// Detener auto-play al interactuar
document.getElementById('prevBtn').addEventListener('click', () => {
    stopAutoPlay();
    // Opcional: reiniciar después de 10 segundos de inactividad
    setTimeout(startAutoPlay, 10000);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    stopAutoPlay();
    setTimeout(startAutoPlay, 10000);
});


