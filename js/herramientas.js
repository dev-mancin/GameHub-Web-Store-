// ============================================
// CONVERSOR DE MONEDA
// ============================================

// Tasas de cambio aproximadas a USD (Diciembre 2024)
const exchangeRates = {
    ARS: 0.0011,    // Peso Argentino
    BOB: 0.14,      // Boliviano
    BRL: 0.20,      // Real Brasileño
    CLP: 0.0011,    // Peso Chileno
    COP: 0.00024,   // Peso Colombiano
    CRC: 0.0019,    // Colón Costarricense
    CUP: 0.042,     // Peso Cubano
    DOP: 0.017,     // Peso Dominicano
    GTQ: 0.13,      // Quetzal Guatemalteco
    HNL: 0.040,     // Lempira Hondureño
    MXN: 0.050,     // Peso Mexicano
    NIO: 0.027,     // Córdoba Nicaragüense
    PAB: 1.00,      // Balboa Panameño
    PYG: 0.00013,   // Guaraní Paraguayo
    PEN: 0.27,      // Sol Peruano
    UYU: 0.025,     // Peso Uruguayo
    VES: 0.028      // Bolívar Venezolano
};

const convertBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const usdValueDisplay = document.getElementById('usdValue');
const rateDisplay = document.getElementById('rateDisplay');

function convertCurrency() {
    const amount = parseFloat(amountInput.value) || 0;
    const currency = currencySelect.value;
    const rate = exchangeRates[currency];
    
    const usdAmount = amount * rate;
    
    // Actualizar resultado
    usdValueDisplay.textContent = `$${usdAmount.toFixed(2)}`;
    rateDisplay.textContent = `1 ${currency} = $${rate.toFixed(6)} USD`;
    
    // Animación
    usdValueDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        usdValueDisplay.style.transform = 'scale(1)';
    }, 200);
}

convertBtn.addEventListener('click', convertCurrency);

// Convertir al presionar Enter
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});

// Actualizar tasa al cambiar moneda (sin convertir automáticamente)
currencySelect.addEventListener('change', () => {
    const currency = currencySelect.value;
    const rate = exchangeRates[currency];
    rateDisplay.textContent = `1 ${currency} = $${rate.toFixed(6)} USD`;
});

// Inicializar con tasa actual
currencySelect.dispatchEvent(new Event('change'));

// ============================================
// CALCULADORA DE DESCUENTOS
// ============================================

const originalPriceInput = document.getElementById('originalPrice');
const discountInput = document.getElementById('discount');
const discountRange = document.getElementById('discountRange');
const calculateBtn = document.getElementById('calculateBtn');
const originalDisplay = document.getElementById('originalDisplay');
const savingsDisplay = document.getElementById('savingsDisplay');
const finalDisplay = document.getElementById('finalDisplay');

// Sincronizar range con input (sin calcular automáticamente)
discountRange.addEventListener('input', () => {
    discountInput.value = discountRange.value;
});

discountInput.addEventListener('input', () => {
    const value = parseInt(discountInput.value) || 0;
    // Limitar entre 0 y 100
    if (value > 100) discountInput.value = 100;
    if (value < 0) discountInput.value = 0;
    discountRange.value = discountInput.value;
});

function calculateDiscount() {
    const originalPrice = parseFloat(originalPriceInput.value) || 0;
    const discountPercent = parseFloat(discountInput.value) || 0;
    
    const discountAmount = originalPrice * (discountPercent / 100);
    const finalPrice = originalPrice - discountAmount;
    
    // Actualizar displays
    originalDisplay.textContent = `$${originalPrice.toFixed(2)}`;
    savingsDisplay.textContent = `-$${discountAmount.toFixed(2)}`;
    finalDisplay.textContent = `$${finalPrice.toFixed(2)}`;
    
    // Actualizar badges
    const discountBadge = document.querySelector('.discount-badge');
    const savingsBadge = document.querySelector('.savings-badge');
    
    discountBadge.textContent = `${discountPercent}% OFF`;
    savingsBadge.textContent = `Ahorras $${discountAmount.toFixed(2)}`;
    
    // Animación
    finalDisplay.style.transform = 'scale(1.15)';
    setTimeout(() => {
        finalDisplay.style.transform = 'scale(1)';
    }, 300);
}

// Solo calcular al presionar el botón
calculateBtn.addEventListener('click', calculateDiscount);

// Permitir calcular con Enter en los inputs
originalPriceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateDiscount();
});

discountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateDiscount();
});

// Inicializar con valores actuales (se ejecuta una sola vez al cargar)
calculateDiscount();

// ============================================
// COMPARADOR DE PRECIOS
// ============================================

const store1Input = document.getElementById('store1Price');
const store2Input = document.getElementById('store2Price');
const store3Input = document.getElementById('store3Price');
const compareBtn = document.getElementById('compareBtn');
const bestStoreDisplay = document.getElementById('bestStore');
const bestSavingsDisplay = document.getElementById('bestSavings');
const rankingList = document.getElementById('rankingList');

function comparePrices() {
    const stores = [
        { name: 'Steam', price: parseFloat(store1Input.value) || 0 },
        { name: 'Epic Games', price: parseFloat(store2Input.value) || 0 },
        { name: 'GOG', price: parseFloat(store3Input.value) || 0 }
    ];
    
    // Ordenar por precio
    stores.sort((a, b) => a.price - b.price);
    
    const bestStore = stores[0];
    const worstPrice = stores[2].price;
    const savings = worstPrice - bestStore.price;
    
    // Actualizar mejor precio
    bestStoreDisplay.textContent = `${bestStore.name}: $${bestStore.price.toFixed(2)}`;
    bestSavingsDisplay.textContent = `Ahorras $${savings.toFixed(2)} vs la más cara`;
    
    // Actualizar ranking
    rankingList.innerHTML = `
        <div class="ranking-item">
            <span class="rank">2º</span>
            <span class="rank-store">${stores[1].name}</span>
            <span class="rank-price">$${stores[1].price.toFixed(2)}</span>
        </div>
        <div class="ranking-item">
            <span class="rank">3º</span>
            <span class="rank-store">${stores[2].name}</span>
            <span class="rank-price">$${stores[2].price.toFixed(2)}</span>
        </div>
    `;
    
    // Animación
    const bestStoreCard = document.querySelector('.comparison-item.best');
    bestStoreCard.style.transform = 'scale(1.05)';
    setTimeout(() => {
        bestStoreCard.style.transform = 'scale(1)';
    }, 300);
}

// Solo comparar al presionar el botón
compareBtn.addEventListener('click', comparePrices);

// Permitir comparar con Enter en los inputs
[store1Input, store2Input, store3Input].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') comparePrices();
    });
});

// Inicializar comparación (se ejecuta una sola vez al cargar)
comparePrices();

// ============================================
// ANIMACIONES DE ENTRADA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    console.log('✅ Herramientas GameHub inicializadas correctamente');
});