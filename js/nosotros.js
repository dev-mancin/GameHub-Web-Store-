// ============================================
// ANIMACIONES DE ENTRADA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Animar secciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll('.about-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // Animar cards individualmente
    const animateCards = (selector, delay = 100) => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, delay * index);
        });
    };

    // Animar diferentes elementos con delays
    setTimeout(() => animateCards('.stat-card', 150), 200);
    setTimeout(() => animateCards('.value-card', 100), 400);
    setTimeout(() => animateCards('.team-card', 150), 600);
    setTimeout(() => animateCards('.reason-item', 200), 800);
    setTimeout(() => animateCards('.contact-card', 150), 1000);

    // Contador animado para las estadísticas
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Formatear números según el tipo
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (target % 1 !== 0) {
                element.textContent = current.toFixed(1) + '/5';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Observar y animar contadores cuando son visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const valueText = entry.target.textContent.replace(/[^0-9.]/g, '');
                const value = parseFloat(valueText);
                
                if (!isNaN(value)) {
                    animateCounter(entry.target, value);
                }
            }
        });
    }, { threshold: 0.5 });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Efecto parallax suave en decoración del hero
    const hero = document.querySelector('.about-hero');
    const decorationCircles = document.querySelectorAll('.decoration-circle');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroTop = hero.offsetTop;
            const heroHeight = hero.offsetHeight;

            if (scrolled >= heroTop - window.innerHeight && scrolled <= heroTop + heroHeight) {
                const offset = (scrolled - heroTop) * 0.5;
                
                decorationCircles.forEach((circle, index) => {
                    const speed = 0.3 + (index * 0.1);
                    circle.style.transform = `translateY(${offset * speed}px)`;
                });
            }
        });
    }

    // Efecto hover mejorado en las tarjetas de equipo
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de brillo en los valores al hacer hover
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(145, 0, 0, 0.15), rgba(243, 0, 0, 0.05))`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(73, 0, 0, 0.34)';
        });
    });

    // Smooth scroll para enlaces internos
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

    // Actualizar año en el footer automáticamente
    const footerYear = document.getElementById('ghFooterYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Efecto de typing en el subtítulo del hero (opcional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let charIndex = 0;

        const typeEffect = setInterval(() => {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeEffect);
            }
        }, 50);
    }

    // Log de confirmación
    console.log('✅ Página Nosotros cargada correctamente');
    console.log('📊 Estadísticas animadas');
    console.log('🎨 Efectos visuales activados');
});

// ============================================
// ANIMACIÓN DE SCROLL REVEAL
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Efecto fade en elementos mientras se hace scroll
    const fadeElements = document.querySelectorAll('.value-card, .team-card, .contact-card');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ============================================
// EASTER EGG - Click en el logo del hero
// ============================================

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let clickCount = 0;
    heroTitle.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            heroTitle.style.animation = 'none';
            setTimeout(() => {
                heroTitle.style.animation = 'rainbow 2s linear infinite';
            }, 10);
            
            console.log('🎮 ¡Easter Egg activado! Modo Rainbow 🌈');
            
            // Restablecer después de 5 segundos
            setTimeout(() => {
                heroTitle.style.animation = 'fadeInUp 0.8s ease';
                clickCount = 0;
            }, 5000);
        }
    });
}

// Animación rainbow para el easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);