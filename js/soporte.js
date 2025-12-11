// ============================================
// FUNCIONALIDAD FAQ - ACORDEÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle del item clickeado
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // FILTRADO DE FAQ POR CATEGORÍA
    // ============================================

    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Actualizar botón activo
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar preguntas
            faqItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    // Animación de entrada
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // BÚSQUEDA EN FAQ
    // ============================================

    const searchInput = document.getElementById('supportSearchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Mostrar todos si no hay búsqueda
                faqItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                return;
            }
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    // Destacar coincidencias
                    item.style.borderColor = 'rgba(102, 126, 234, 0.4)';
                } else {
                    item.classList.add('hidden');
                    item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            // Resetear categorías
            categoryBtns.forEach(btn => {
                if (btn.dataset.category === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }

    // ============================================
    // BOTONES DE MÉTODO DE CONTACTO
    // ============================================

    const openChatBtn = document.getElementById('openChatBtn');
    const openEmailBtn = document.getElementById('openEmailBtn');
    const openWhatsAppBtn = document.getElementById('openWhatsAppBtn');
    const openTicketBtn = document.getElementById('openTicketBtn');

    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            alert('🎉 Iniciando chat en vivo...\n\nEn un momento te conectaremos con un agente de soporte.');
            console.log('Chat en vivo solicitado');
        });
    }

    if (openEmailBtn) {
        openEmailBtn.addEventListener('click', () => {
            window.location.href = 'mailto:soporte@gamehub.com?subject=Consulta de Soporte&body=Hola GameHub,%0D%0A%0D%0AMe gustaría consultar sobre...';
        });
    }

    if (openWhatsAppBtn) {
        openWhatsAppBtn.addEventListener('click', () => {
            window.open('https://wa.me/15551234567?text=Hola%20GameHub,%20necesito%20ayuda%20con...', '_blank');
        });
    }

    if (openTicketBtn) {
        openTicketBtn.addEventListener('click', () => {
            alert('🎫 Creando ticket de soporte...\n\nSerás redirigido al formulario de tickets.');
            console.log('Ticket de soporte solicitado');
        });
    }

    // ============================================
    // BOTONES DE GUÍAS
    // ============================================

    const guideButtons = document.querySelectorAll('.guide-button');
    
    guideButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const guideTitle = btn.parentElement.querySelector('.guide-title').textContent;
            alert(`📚 Abriendo guía: ${guideTitle}\n\nSerás redirigido a la documentación detallada.`);
            console.log(`Guía solicitada: ${guideTitle}`);
        });
    });

    // ============================================
    // ACTUALIZACIÓN DE HORA DEL ESTADO
    // ============================================

    function updateStatusTime() {
        const statusTime = document.getElementById('statusTime');
        if (statusTime) {
            const now = new Date();
            const minutes = Math.floor(Math.random() * 5) + 1; // Simular 1-5 minutos
            statusTime.textContent = `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        }
    }

    // Actualizar cada 30 segundos
    updateStatusTime();
    setInterval(updateStatusTime, 30000);

    // ============================================
    // ANIMACIONES DE ENTRADA
    // ============================================

    const animateElements = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay * index);
        });
    };

    setTimeout(() => animateElements('.method-card', 150), 200);
    setTimeout(() => animateElements('.faq-item', 80), 400);
    setTimeout(() => animateElements('.guide-card', 120), 600);

    // ============================================
    // SCROLL REVEAL
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.contact-methods, .faq-section, .guides-section, .status-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // ============================================
    // EFECTO HOVER EN METHOD CARDS
    // ============================================

    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // CONTADOR DE PREGUNTAS VISIBLES
    // ============================================

    function updateFaqCount() {
        const visibleFaqs = document.querySelectorAll('.faq-item:not(.hidden)').length;
        console.log(`📋 Mostrando ${visibleFaqs} preguntas frecuentes`);
    }

    // Actualizar contador al cambiar categoría
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', updateFaqCount);
    });

    // ============================================
    // SIMULACIÓN DE ESTADO EN VIVO
    // ============================================

    function simulateStatusUpdates() {
        const statusItems = document.querySelectorAll('.status-item');
        
        // Simular actualización aleatoria
        const randomIndex = Math.floor(Math.random() * statusItems.length);
        const randomItem = statusItems[randomIndex];
        
        // Efecto de parpadeo
        randomItem.style.opacity = '0.5';
        setTimeout(() => {
            randomItem.style.opacity = '1';
        }, 200);
    }

    // Simular actualizaciones cada 10 segundos
    setInterval(simulateStatusUpdates, 10000);

    // ============================================
    // TOOLTIPS INTERACTIVOS (OPCIONAL)
    // ============================================

    const infoLabels = document.querySelectorAll('.info-label');
    
    infoLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.2s ease';
        });

        label.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // ACTUALIZAR AÑO EN FOOTER
    // ============================================

    const footerYear = document.getElementById('ghFooterYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
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
    // ESTADÍSTICAS DE USO
    // ============================================

    console.log('✅ Página de Soporte cargada correctamente');
    console.log('💬 Chat en vivo disponible');
    console.log(`📋 ${faqItems.length} preguntas frecuentes cargadas`);
    console.log('🎧 Soporte 24/7 activo');

    // ============================================
    // EASTER EGG - KONAMI CODE
    // ============================================

    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            alert('🎮 ¡KONAMI CODE ACTIVADO!\n\n¡Eres un verdadero gamer! 🏆\n\nTe has ganado un 5% de descuento adicional en tu próxima compra.\nCódigo: KONAMI2024');
            console.log('🎉 Easter egg activado: KONAMI CODE');
            konamiCode = [];
        }
    });

    // ============================================
    // DETECCIÓN DE PROBLEMAS COMUNES
    // ============================================

    function detectCommonIssues() {
        const searchTerm = searchInput.value.toLowerCase();
        const urgentKeywords = ['no funciona', 'error', 'problema', 'urgente', 'ayuda', 'no recibí'];
        
        const isUrgent = urgentKeywords.some(keyword => searchTerm.includes(keyword));
        
        if (isUrgent && searchTerm.length > 5) {
            // Resaltar el chat en vivo para problemas urgentes
            if (openChatBtn) {
                openChatBtn.style.animation = 'pulse 1s ease-in-out 3';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', detectCommonIssues);
    }
});

// ============================================
// FUNCIÓN GLOBAL PARA ABRIR SECCIÓN
// ============================================

function openSupportSection(sectionName) {
    const section = document.querySelector(`[data-section="${sectionName}"]`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}