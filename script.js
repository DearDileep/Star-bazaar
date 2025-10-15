// ==================== ADMIN-EDITABLE DATA (Update daily) ====================
const STORE_DATA = {
    // Store Information
    storeInfo: {
        address: "1760 Easton Ave, Somerset, NJ 08873",
        phone: "+1 (732) 356-3000",
        email: "starbazaar@gmail.com",
        website: "https://starbigbazaar.com/"
    },
    
    // Store Carousel Images
    carouselImages: [
        {
            url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=400&fit=crop",
            alt: "Fresh produce section",
            offerBadge: null
        },
        {
            url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
            alt: "Grocery store interior",
            offerBadge: "20% OFF Today!"
        },
        {
            url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&h=400&fit=crop",
            alt: "Fresh fruits and vegetables",
            offerBadge: null
        },
        {
            url: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1200&h=400&fit=crop",
            alt: "Bakery section",
            offerBadge: null
        },
        {
            url: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=400&fit=crop",
            alt: "Snacks and beverages",
            offerBadge: null
        }
    ],
    
    // Today's Special Offers (set active: false to hide)
    todayOffers: [
        {
            title: "Fresh Mango Deal",
            subtitle: "Premium Alphonso Mangoes",
            badgeText: "30% OFF",
            image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=200&fit=crop",
            price: "₹140",
            discountPercent: 30,
            active: true
        },
        {
            title: "Combo Pack",
            subtitle: "3 Samosa + 1 Chutney",
            badgeText: "SAVE ₹20",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
            price: "₹60",
            discountPercent: 0,
            active: true
        }
    ],
    
    // Today's Snacks & Fresh Bites (add/remove items as needed)
    todaySnacks: [
        {
            name: "Samosa",
            description: "Crispy golden triangles filled with spiced potatoes",
            price: "₹15",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Veg Puff",
            description: "Flaky pastry with savory vegetable filling",
            price: "₹20",
            image: "https://images.unsplash.com/photo-1619894991209-4f6e5bb82096?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Bataka Vada",
            description: "Spicy potato fritters in chickpea batter",
            price: "₹12",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Bread Pakora",
            description: "Crispy bread slices stuffed with potato masala",
            price: "₹18",
            image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Mirchi Pakora",
            description: "Stuffed green chilies coated with spiced gram flour",
            price: "₹25",
            image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Dahi Vada",
            description: "Soft lentil dumplings soaked in creamy yogurt",
            price: "₹30",
            image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Khaman",
            description: "Steamed gram flour snack, fluffy and tangy",
            price: "₹35",
            image: "https://images.unsplash.com/photo-1589301773859-bb024d3b5e0a?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Khandvi",
            description: "Rolled gram flour snack with tempered spices",
            price: "₹40",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
            available: true
        },
        {
            name: "Dhokla",
            description: "Light and spongy fermented rice cake",
            price: "₹32",
            image: "https://images.unsplash.com/photo-1589301773859-bb024d3b5e0a?w=300&h=200&fit=crop",
            available: true
        }
    ],
    
    // Categories
    categories: [
        { name: "Veggies", icon: "🥬", link: "/#" },
        { name: "Fruits", icon: "🍎", link: "/#" },
        { name: "Snacks", icon: "🥨", link: "/#" },
        { name: "Frozen Items", icon: "🧊", link: "/#" },
        { name: "Fresh Items", icon: "🥛", link: "/#" },
        { name: "Sweets", icon: "🍰", link: "/#" },
        { name: "Pooja Items", icon: "🪔", link: "/#" }
    ]
};

// ==================== STATE MANAGEMENT ====================
let appState = {
    isAuthenticated: false,
    user: null,
    cart: [],
    currentSlide: 0,
    carouselInterval: null,
    pendingAction: null // Action to perform after authentication
};

// ==================== UTILITY FUNCTIONS ====================
function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// ==================== AUTH FUNCTIONS ====================
function checkAuth() {
    const authStatus = localStorage.getItem('sb_auth');
    const userData = loadFromLocalStorage('sb_user');
    
    if (authStatus === 'true' && userData) {
        appState.isAuthenticated = true;
        appState.user = userData;
        appState.cart = loadFromLocalStorage('sb_cart') || [];
        updateUIForAuth(true);
    } else {
        updateUIForAuth(false);
    }
}

function updateUIForAuth(isAuth) {
    // Update navigation
    const guestElements = document.querySelectorAll('.guest-only');
    const authElements = document.querySelectorAll('.auth-only');
    
    guestElements.forEach(el => {
        el.style.display = isAuth ? 'none' : '';
    });
    
    authElements.forEach(el => {
        el.style.display = isAuth ? '' : 'none';
    });
    
    // Update greeting
    updateGreeting();
    
    // Update cart count
    updateCartCount();
}

function updateGreeting() {
    const greetingEl = document.getElementById('greetingText');
    const timeOfDay = getTimeOfDay();
    const userName = appState.isAuthenticated && appState.user ? appState.user.name : "Guest";
    greetingEl.textContent = `Good ${timeOfDay}, ${userName} — welcome to Star Bazaar!`;
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    cartCountEl.textContent = appState.cart.length;
}

function login(email, password) {
    // Simple validation (in production, this would be server-side)
    if (email && password) {
        // For demo, extract name from email
        const name = email.split('@')[0];
        const user = { name, email };
        
        appState.isAuthenticated = true;
        appState.user = user;
        appState.cart = loadFromLocalStorage('sb_cart') || [];
        
        saveToLocalStorage('sb_user', user);
        localStorage.setItem('sb_auth', 'true');
        
        updateUIForAuth(true);
        closeAuthModal();
        showToast(`Welcome back, ${name}!`);
        
        // Execute pending action if any
        if (appState.pendingAction) {
            appState.pendingAction();
            appState.pendingAction = null;
        }
        
        return true;
    }
    return false;
}

function register(name, email, password) {
    // Simple validation
    if (name && email && password) {
        const user = { name, email };
        
        appState.isAuthenticated = true;
        appState.user = user;
        appState.cart = [];
        
        saveToLocalStorage('sb_user', user);
        localStorage.setItem('sb_auth', 'true');
        
        updateUIForAuth(true);
        closeAuthModal();
        showToast(`Account created! Welcome, ${name}!`);
        
        // Execute pending action if any
        if (appState.pendingAction) {
            appState.pendingAction();
            appState.pendingAction = null;
        }
        
        return true;
    }
    return false;
}

function logout() {
    appState.isAuthenticated = false;
    appState.user = null;
    appState.cart = [];
    
    localStorage.removeItem('sb_auth');
    localStorage.removeItem('sb_user');
    localStorage.removeItem('sb_cart');
    
    updateUIForAuth(false);
    showToast('Logged out successfully');
}

function openAuthModal(pendingAction = null) {
    appState.pendingAction = pendingAction;
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    appState.pendingAction = null;
}

// ==================== CART FUNCTIONS ====================
function addToCart(item) {
    if (!appState.isAuthenticated) {
        openAuthModal(() => addToCart(item));
        return;
    }
    
    appState.cart.push(item);
    saveToLocalStorage('sb_cart', appState.cart);
    updateCartCount();
    showToast(`${item.name} added to cart!`);
}

// ==================== CAROUSEL FUNCTIONS ====================
function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    
    // Render slides
    STORE_DATA.carouselImages.forEach((slide, index) => {
        const slideEl = document.createElement('div');
        slideEl.className = 'carousel-slide';
        slideEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${slide.url}')`;
        
        if (slide.offerBadge) {
            const badge = document.createElement('div');
            badge.className = 'offer-badge';
            badge.textContent = slide.offerBadge;
            slideEl.appendChild(badge);
        }
        
        track.appendChild(slideEl);
        
        // Render dot
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });
    
    startCarouselAutoplay();
}

function goToSlide(index) {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    appState.currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const nextIndex = (appState.currentSlide + 1) % STORE_DATA.carouselImages.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (appState.currentSlide - 1 + STORE_DATA.carouselImages.length) % STORE_DATA.carouselImages.length;
    goToSlide(prevIndex);
}

function startCarouselAutoplay() {
    stopCarouselAutoplay();
    appState.carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarouselAutoplay() {
    if (appState.carouselInterval) {
        clearInterval(appState.carouselInterval);
    }
}

// ==================== RENDER FUNCTIONS ====================
function renderOffers() {
    const activeOffers = STORE_DATA.todayOffers.filter(offer => offer.active);
    
    if (activeOffers.length === 0) {
        document.getElementById('offersSection').style.display = 'none';
        return;
    }
    
    document.getElementById('offersSection').style.display = 'block';
    const strip = document.getElementById('offersStrip');
    
    activeOffers.forEach(offer => {
        const card = document.createElement('div');
        card.className = 'offer-card';
        card.innerHTML = `
            <img src="${offer.image}" alt="${offer.title}">
            <div class="offer-card-content">
                <h3>${offer.title}</h3>
                <p>${offer.subtitle}</p>
                <div>
                    <span class="offer-price">${offer.price}</span>
                    ${offer.discountPercent ? `<span class="offer-discount">${offer.discountPercent}% OFF</span>` : `<span class="offer-discount">${offer.badgeText}</span>`}
                </div>
            </div>
        `;
        strip.appendChild(card);
    });
}

function renderSnacks() {
    const grid = document.getElementById('snacksGrid');
    
    STORE_DATA.todaySnacks.forEach((snack, index) => {
        const card = document.createElement('div');
        card.className = 'snack-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${snack.image}" alt="${snack.name}">
            <div class="snack-card-content">
                <h3>${snack.name}</h3>
                <p>${snack.description}</p>
                <div class="snack-price">${snack.price}</div>
                <button class="add-cart-btn" ${!snack.available ? 'disabled' : ''} data-snack='${JSON.stringify(snack)}'>
                    ${snack.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Add event listeners to add-to-cart buttons
    grid.querySelectorAll('.add-cart-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const snack = JSON.parse(e.target.getAttribute('data-snack'));
            addToCart(snack);
        });
    });
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    
    STORE_DATA.categories.forEach(category => {
        const tile = document.createElement('a');
        tile.href = category.link;
        tile.className = 'category-tile';
        tile.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <span class="explore-btn">Explore</span>
        `;
        grid.appendChild(tile);
    });
}

function renderFooter() {
    // Update footer contact details (these are now links in HTML)
    document.getElementById('footerAddress').textContent = STORE_DATA.storeInfo.address;
    
    const phoneLink = document.getElementById('footerPhone');
    phoneLink.textContent = STORE_DATA.storeInfo.phone;
    phoneLink.href = 'tel:' + STORE_DATA.storeInfo.phone.replace(/[^0-9+]/g, '');
    
    const emailLink = document.getElementById('footerEmail');
    emailLink.textContent = STORE_DATA.storeInfo.email;
    emailLink.href = 'mailto:' + STORE_DATA.storeInfo.email;
}

// ==================== EVENT HANDLERS ====================
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        // In a real app, this would navigate to search results
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

function handleContinueShopping() {
    if (!appState.isAuthenticated) {
        openAuthModal(() => handleContinueShopping());
        return;
    }
    
    // Scroll to categories and highlight them
    const categoriesSection = document.getElementById('categoriesSection');
    categoriesSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add highlight animation to category tiles
    const tiles = categoriesSection.querySelectorAll('.category-tile');
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('highlight');
            setTimeout(() => tile.classList.remove('highlight'), 1000);
        }, index * 100);
    });
}

// ==================== INITIALIZATION ====================
function init() {
    // Check authentication
    checkAuth();
    
    // Render all sections
    renderCarousel();
    renderOffers();
    renderSnacks();
    renderCategories();
    renderFooter();
    
    // Navigation event listeners
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    document.getElementById('navLogin').addEventListener('click', () => openAuthModal());
    document.getElementById('navRegister').addEventListener('click', () => {
        openAuthModal();
        // Switch to register tab
        document.querySelector('[data-tab="register"]').click();
    });
    document.getElementById('navLogout').addEventListener('click', logout);
    
    // Carousel controls
    document.getElementById('carouselPrev').addEventListener('click', () => {
        stopCarouselAutoplay();
        prevSlide();
        startCarouselAutoplay();
    });
    
    document.getElementById('carouselNext').addEventListener('click', () => {
        stopCarouselAutoplay();
        nextSlide();
        startCarouselAutoplay();
    });
    
    // Continue Shopping button
    document.getElementById('continueShoppingBtn').addEventListener('click', handleContinueShopping);
    
    // Modal controls
    document.getElementById('modalClose').addEventListener('click', closeAuthModal);
    document.getElementById('authModal').addEventListener('click', (e) => {
        if (e.target.id === 'authModal') closeAuthModal();
    });
    
    // Modal tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.toggle('active', form.getAttribute('data-form') === tab);
            });
        });
    });
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const message = document.getElementById('loginMessage');
        
        if (login(email, password)) {
            message.className = 'form-message success';
            message.textContent = 'Login successful!';
        } else {
            message.className = 'form-message error';
            message.textContent = 'Please enter valid credentials';
        }
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const message = document.getElementById('registerMessage');
        
        if (register(name, email, password)) {
            message.className = 'form-message success';
            message.textContent = 'Account created successfully!';
        } else {
            message.className = 'form-message error';
            message.textContent = 'Please fill all fields';
        }
    });
    
    // Keyboard accessibility for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('authModal');
            if (modal.style.display === 'flex') {
                closeAuthModal();
            }
        }
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
