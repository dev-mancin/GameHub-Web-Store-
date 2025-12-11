// Funcionalidad de filtrado
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase active al botón clickeado
        btn.classList.add('active');

        const category = btn.dataset.category;

        // Filtrar productos
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
// ============ MODAL PRODUCTO ============

const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");


productCards.forEach(card => {
    card.addEventListener("click", () => {

        // Obtener información de la tarjeta
        const img = card.querySelector("img").src;
        const title = card.querySelector("h3").textContent;
        const category = card.querySelector("p").textContent;
        const price = card.querySelector(".price").textContent;

        // Añadimos una descripción general (puedes personalizar luego)
        modalDescription.textContent = "Videojuego digital al mejor precio, entrega inmediata y soporte 24/7.";

        // Insertamos en el modal
        modalImg.src = img;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalPrice.textContent = price;

        // Mostrar modal
        modal.style.display = "flex";

        // 🔥 Reinicia el estado visual
        modal.classList.remove("show");

        // 🧠 Forzar reflow para que el navegador “olvide” el estado anterior
        void modal.offsetWidth;

        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    });
});

// Cerrar modal
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 350);

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

// Cerrar haciendo click fuera
modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});



// ------------------------
// ELEMENTOS DE LA VENTANA
// ------------------------
const paymentOverlay = document.getElementById("paymentOverlay");
const paymentModal = document.getElementById("paymentModal");
const paymentClose = document.getElementById("paymentClose");

// Elementos de contenido
const payImg = document.getElementById("paymentImg");
const payTitle = document.getElementById("paymentTitle");
const payPrice = document.getElementById("paymentPrice");
const payDesc = document.getElementById("paymentDescription");
const payRating = document.getElementById("paymentRating");

// --------------------------
// FUNCIÓN PARA ABRIR MODAL 2
// --------------------------
function openPaymentModal(gameData) {

    // 👉 Rellenar datos
    payImg.src = gameData.img;
    payTitle.textContent = gameData.title;
    payPrice.textContent = "Precio: " + gameData.price;
    payDesc.textContent = "Descripción: " + gameData.description;
    payRating.textContent = "Valoración: " + gameData.rating;

    // 👉 Mostrar (con animación reutilizable)
    paymentOverlay.classList.add("active");
    paymentModal.classList.add("active");
}

// -------------------------
// CERRAR MODAL 2
// -------------------------
function closePaymentModal() {
    paymentOverlay.classList.remove("active");
    paymentModal.classList.remove("active");
}

paymentClose.addEventListener("click", closePaymentModal);
paymentOverlay.addEventListener("click", closePaymentModal);



// -----------------------------------------------------
// ESTE ES EL PUNTO CLAVE 👇
// Se ejecuta cuando presionas "Comprar" del modal anterior
// AQUI LLAMAS openPaymentModal() CON LOS DATOS DEL JUEGO
// -----------------------------------------------------
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("modal-buy-btn")) {

        // 🔥 IMPORTANTE:
        // Aquí debes tener guardada la info del juego actual
        // Ejemplo básico (puedes adaptar):
        let gameData = {
            img: currentGame.img,
            title: currentGame.title,
            price: currentGame.price,
            description: currentGame.description,
            rating: currentGame.rating
        };

        openPaymentModal(gameData);
    }

});
