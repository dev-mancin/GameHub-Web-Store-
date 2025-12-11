// ============================================
// FUNCIONALIDAD DE TABS EN COMUNIDAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Función para cambiar de tab
    function switchTab(tabName) {
        // Remover clase active de todos los botones y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Agregar clase active al botón clickeado
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Mostrar el contenido correspondiente
        const activeContent = document.getElementById(`${tabName}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Guardar la tab activa en localStorage (opcional)
        localStorage.setItem('activeCommunityTab', tabName);
    }

    // Event listeners para los botones de tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Restaurar la última tab activa al cargar la página (opcional)
    const savedTab = localStorage.getItem('activeCommunityTab');
    if (savedTab) {
        switchTab(savedTab);
    }

    // ============================================
    // FUNCIONALIDAD ADICIONAL: LIKES EN POSTS
    // ============================================
    const postActions = document.querySelectorAll('.post-action');

    postActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('.action-icon');
            const count = this.querySelector('.action-count');
            
            if (icon && count && icon.textContent === '❤️') {
                // Toggle like
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    const currentCount = parseInt(count.textContent);
                    count.textContent = currentCount - 1;
                } else {
                    this.classList.add('liked');
                    const currentCount = parseInt(count.textContent);
                    count.textContent = currentCount + 1;
                    
                    // Animación de like
                    icon.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    });

    // ============================================
    // FUNCIONALIDAD: BOTÓN "UNIRSE" EN EVENTOS
    // ============================================
    const eventButtons = document.querySelectorAll('.event-btn');

    eventButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.textContent === 'Unirse') {
                this.textContent = 'Unido ✓';
                this.style.background = 'rgba(46, 213, 115, 0.3)';
                this.style.borderColor = 'rgba(46, 213, 115, 0.5)';
            } else if (this.textContent === 'Registrarse') {
                this.textContent = 'Registrado ✓';
                this.style.background = 'rgba(46, 213, 115, 0.3)';
                this.style.borderColor = 'rgba(46, 213, 115, 0.5)';
            }
        });
    });

    // ============================================
    // FUNCIONALIDAD: CLICK EN HILOS DE FORO
    // ============================================
    const forumThreads = document.querySelectorAll('.forum-thread');

    forumThreads.forEach(thread => {
        thread.addEventListener('click', function() {
            const threadTitle = this.querySelector('.thread-title').textContent;
            console.log(`Abriendo hilo: ${threadTitle}`);
            
            // Aquí puedes agregar la lógica para abrir el hilo completo
            // Por ejemplo, mostrar un modal o redirigir a otra página
            
            // Ejemplo de feedback visual
            this.style.background = 'rgba(255, 255, 255, 0.12)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });

    // ============================================
    // ANIMACIÓN DE ENTRADA PARA CARDS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los cards
    const cards = document.querySelectorAll('.post-card, .guide-card, .event-card, .forum-thread');
    cards.forEach(card => observer.observe(card));

    // ============================================
    // EFECTO HOVER EN IMÁGENES DE POSTS
    // ============================================
    const postImages = document.querySelectorAll('.post-image');

    postImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    console.log('✅ Sistema de comunidad inicializado correctamente');
});