// Main.js - Lu Chia-Ying Shoe Store E-commerce Engine

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Global Features
  initHeaderScroll();
  initMobileMenu();
  initCart();
  initNewsletter();
  
  // Page-specific Initializations
  const bodyId = document.body.id;
  if (bodyId === "page-shop-category") {
    initCategoryPage();
  } else if (bodyId === "page-product-detail") {
    initDetailPage();
  } else if (bodyId === "page-contact") {
    initContactPage();
  } else if (bodyId === "page-home") {
    initHomePage();
  }
});

/* ==========================================================================
   1. Navigation & Header
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });
  
  // Close menu when clicking a link
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
    });
  });
}

/* ==========================================================================
   2. Shopping Cart Engine (Cross-page, LocalStorage-backed)
   ========================================================================== */
let cart = [];

function initCart() {
  // Load cart from localStorage
  const savedCart = localStorage.getItem("lu_shoe_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
  
  // Cart Drawer Elements
  const cartOpenBtn = document.getElementById("cart-open-btn");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const cartDrawer = document.getElementById("cart-drawer");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  if (cartOpenBtn && cartOverlay && cartDrawer) {
    cartOpenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }
  
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", closeCartDrawer);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartDrawer);
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", simulateCheckout);
  }
  
  updateCartUI();
}

function openCartDrawer() {
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const cartDrawer = document.getElementById("cart-drawer");
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.add("open");
    cartDrawer.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll
  }
}

function closeCartDrawer() {
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const cartDrawer = document.getElementById("cart-drawer");
  if (cartOverlay && cartDrawer) {
    cartOverlay.classList.remove("open");
    cartDrawer.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable scroll
  }
}

function updateCartUI() {
  const cartItemsWrap = document.getElementById("cart-items-wrap");
  const cartSubtotalPrice = document.getElementById("cart-subtotal-price");
  const cartCounts = document.querySelectorAll(".cart-count");
  
  if (!cartItemsWrap) return;
  
  let totalItems = 0;
  let subtotal = 0;
  
  if (cart.length === 0) {
    cartItemsWrap.innerHTML = `
      <div class="cart-empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>您的購物車是空的</p>
      </div>
    `;
    if (cartSubtotalPrice) cartSubtotalPrice.textContent = "NT$ 0";
  } else {
    let html = "";
    cart.forEach((item, index) => {
      totalItems += item.quantity;
      subtotal += item.price * item.quantity;
      
      html += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">規格: ${item.color} / 尺寸: ${item.size}</div>
            <div class="cart-item-price-row">
              <div class="cart-item-qty">
                <div class="cart-item-qty-btn minus" onclick="changeCartQty(${index}, -1)">-</div>
                <div class="cart-item-qty-val">${item.quantity}</div>
                <div class="cart-item-qty-btn plus" onclick="changeCartQty(${index}, 1)">+</div>
              </div>
              <div class="cart-item-price">NT$ ${(item.price * item.quantity).toLocaleString()}</div>
            </div>
          </div>
          <div class="cart-item-remove" onclick="removeCartItem(${index})">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
        </div>
      `;
    });
    cartItemsWrap.innerHTML = html;
    if (cartSubtotalPrice) cartSubtotalPrice.textContent = `NT$ ${subtotal.toLocaleString()}`;
  }
  
  // Update badge count
  cartCounts.forEach(badge => {
    badge.textContent = totalItems;
    // Animate badge
    badge.classList.remove("bounce-badge");
    void badge.offsetWidth; // Force reflow
    badge.classList.add("bounce-badge");
  });
}

window.addToCart = function(id, name, price, image, color, size, quantity) {
  // Check if item already exists with same size & color
  const existingItemIndex = cart.findIndex(
    item => item.id === id && item.size === size && item.color === color
  );
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      color,
      size,
      quantity
    });
  }
  
  localStorage.setItem("lu_shoe_cart", JSON.stringify(cart));
  updateCartUI();
  openCartDrawer();
};

window.changeCartQty = function(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("lu_shoe_cart", JSON.stringify(cart));
  updateCartUI();
};

window.removeCartItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("lu_shoe_cart", JSON.stringify(cart));
  updateCartUI();
};

function simulateCheckout() {
  if (cart.length === 0) {
    alert("購物車是空的，無法結帳！");
    return;
  }
  
  // Custom styled popup simulation
  const modalHTML = `
    <div id="checkout-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 300;">
      <div style="background: #FAFAF7; padding: 48px; border-radius: 12px; text-align: center; max-width: 480px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 2px solid #C5A880; animation: slideUp 0.5s ease;">
        <div style="width: 80px; height: 80px; background: #C5A880; color: #1E2022; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 24px;">✓</div>
        <h3 style="font-size: 26px; font-weight: 800; color: #1E2022; margin-bottom: 12px;">訂單提交成功！</h3>
        <p style="color: #8E9095; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">感謝您在「呂佳穎的鞋店」消費。我們已收到您的模擬訂單，稍後將會發送通知至您的電子信箱。</p>
        <button id="close-checkout-modal-btn" style="background: #1E2022; color: #FAFAF7; padding: 14px 40px; font-weight: 700; border-radius: 4px; cursor: pointer; transition: all 0.3s;">回到商店</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  
  document.getElementById("close-checkout-modal-btn").addEventListener("click", () => {
    document.getElementById("checkout-modal").remove();
    // Clear cart
    cart = [];
    localStorage.removeItem("lu_shoe_cart");
    updateCartUI();
    closeCartDrawer();
  });
}

/* ==========================================================================
   3. Homepage Utilities
   ========================================================================== */
function initHomePage() {
  const featuredGrid = document.getElementById("featured-products-grid");
  if (!featuredGrid) return;
  
  // Pick 4 top rated products from different categories
  const featured = PRODUCTS_DATA.filter(p => [124, 156, 142, 112].includes(p.reviews)).slice(0, 4);
  renderProductsGrid(featuredGrid, featured);
}

/* ==========================================================================
   4. Category Pages Filtering & Sorting
   ========================================================================== */
let activeCategory = "";
let currentProductsList = [];

function initCategoryPage() {
  const categoryContainer = document.getElementById("category-products-grid");
  if (!categoryContainer) return;
  
  activeCategory = categoryContainer.dataset.category;
  currentProductsList = getProductsByCategory(activeCategory);
  
  // Render filters and products
  renderProductsGrid(categoryContainer, currentProductsList);
  updateResultCount(currentProductsList.length);
  
  // Event listeners for sorting, searching, pricing
  const searchInput = document.getElementById("shop-search");
  const priceSlider = document.getElementById("price-filter");
  const priceDisplay = document.getElementById("price-value");
  const sortSelect = document.getElementById("shop-sort");
  
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
  
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      priceDisplay.textContent = `NT$ ${parseInt(e.target.value).toLocaleString()}`;
      applyFilters();
    });
  }
  
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }
}

function applyFilters() {
  const searchInput = document.getElementById("shop-search");
  const priceSlider = document.getElementById("price-filter");
  const sortSelect = document.getElementById("shop-sort");
  const categoryContainer = document.getElementById("category-products-grid");
  
  let filtered = getProductsByCategory(activeCategory);
  
  // 1. Search Filter
  if (searchInput && searchInput.value.trim() !== "") {
    const query = searchInput.value.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.englishName.toLowerCase().includes(query) || 
      p.summary.toLowerCase().includes(query)
    );
  }
  
  // 2. Price Filter
  if (priceSlider) {
    const maxPrice = parseInt(priceSlider.value);
    filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  // 3. Sorting
  if (sortSelect) {
    const sortVal = sortSelect.value;
    if (sortVal === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // default / popularity (reviews count)
      filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }
  
  renderProductsGrid(categoryContainer, filtered);
  updateResultCount(filtered.length);
}

function updateResultCount(count) {
  const countEl = document.getElementById("result-count-val");
  if (countEl) countEl.textContent = count;
}

function renderProductsGrid(container, list) {
  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: #8E9095;">
        <p style="font-size: 16px; font-weight: 500;">找不到符合條件的商品</p>
      </div>
    `;
    return;
  }
  
  let html = "";
  list.forEach(p => {
    const hasDiscount = p.originalPrice > p.price;
    const discountBadge = hasDiscount ? `<div class="product-badge product-badge-sale">SALE</div>` : "";
    const originalPriceHtml = hasDiscount ? `<span class="price-original">NT$ ${p.originalPrice.toLocaleString()}</span>` : "";
    
    html += `
      <div class="product-card">
        ${discountBadge}
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.alt || p.name}" title="${p.title || p.name}">
          <div class="product-actions-overlay">
            <a href="product-detail.html?id=${p.id}" class="overlay-btn" title="查看詳情">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </a>
            <div class="overlay-btn" title="加入購物車" onclick="quickAdd('${p.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="product-info">
          <div class="product-cat">${p.categoryName}</div>
          <a href="product-detail.html?id=${p.id}"><h4 class="product-name">${p.name}</h4></a>
          <div class="product-rating">
            ${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}
            <span>(${p.reviews})</span>
          </div>
          <div class="product-price-row">
            <span class="price-current">NT$ ${p.price.toLocaleString()}</span>
            ${originalPriceHtml}
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

window.quickAdd = function(productId) {
  const p = PRODUCTS_DATA.find(x => x.id === productId);
  if (!p) return;
  
  // Default specs
  const color = p.colorNames[0];
  const size = p.sizes[0];
  addToCart(p.id, p.name, p.price, p.image, color, size, 1);
};

/* ==========================================================================
   5. Dynamic Product Details Page Loading
   ========================================================================== */
function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
  if (!productId) {
    window.location.href = "index.html";
    return;
  }
  
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) {
    window.location.href = "index.html";
    return;
  }
  
  // Render Product Detail UI Elements
  document.getElementById("detail-title").textContent = product.name;
  document.getElementById("detail-en-title").textContent = product.englishName;
  document.getElementById("detail-category").textContent = product.categoryName;
  document.getElementById("detail-summary").textContent = product.summary;
  document.getElementById("detail-description").textContent = product.description;
  document.getElementById("detail-price").textContent = `NT$ ${product.price.toLocaleString()}`;
  
  // Set breadcrumbs / title tags
  document.title = `${product.name} | 呂佳穎的鞋店`;
  
  const originalPriceEl = document.getElementById("detail-original-price");
  if (product.originalPrice > product.price) {
    originalPriceEl.textContent = `NT$ ${product.originalPrice.toLocaleString()}`;
  } else {
    originalPriceEl.style.display = "none";
  }
  
  // Rating star rendering
  const ratingWrap = document.getElementById("detail-rating-wrap");
  if (ratingWrap) {
    ratingWrap.innerHTML = `
      ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}
      <span style="color: #8E9095; font-size: 13px; margin-left: 8px;">${product.rating} 分 / ${product.reviews} 則評價</span>
    `;
  }
  
  // Render main image
  const gallery = document.getElementById("detail-gallery-wrap");
  if (gallery) {
    gallery.innerHTML = `<img src="${product.image}" alt="${product.alt || product.name}" title="${product.title || product.name}" id="main-detail-img">`;
  }
  
  // Color selection swatches
  const colorContainer = document.getElementById("detail-color-swatches");
  if (colorContainer) {
    let colorHtml = "";
    product.colors.forEach((c, index) => {
      const activeClass = index === 0 ? "active" : "";
      colorHtml += `<div class="color-swatch ${activeClass}" data-color-name="${product.colorNames[index]}" style="background-color: ${c};" onclick="selectSwatch(this)"></div>`;
    });
    colorContainer.innerHTML = colorHtml;
  }
  
  // Size selection options
  const sizeContainer = document.getElementById("detail-size-options");
  if (sizeContainer) {
    let sizeHtml = "";
    product.sizes.forEach((s, index) => {
      const activeClass = index === 0 ? "active" : "";
      sizeHtml += `<div class="size-option ${activeClass}" data-size-val="${s}" onclick="selectSizeOption(this)">${s}</div>`;
    });
    sizeContainer.innerHTML = sizeHtml;
  }
  
  // Features list
  const featuresList = document.getElementById("detail-features");
  if (featuresList) {
    let featuresHtml = "";
    product.features.forEach(f => {
      featuresHtml += `<li>${f}</li>`;
    });
    featuresList.innerHTML = featuresHtml;
  }
  
  // Quantity buttons
  const qtyMinus = document.getElementById("detail-qty-minus");
  const qtyPlus = document.getElementById("detail-qty-plus");
  const qtyVal = document.getElementById("detail-qty-val");
  
  if (qtyMinus && qtyPlus && qtyVal) {
    qtyMinus.addEventListener("click", () => {
      let val = parseInt(qtyVal.textContent);
      if (val > 1) {
        qtyVal.textContent = val - 1;
      }
    });
    qtyPlus.addEventListener("click", () => {
      let val = parseInt(qtyVal.textContent);
      qtyVal.textContent = val + 1;
    });
  }
  
  // Add to cart button wiring
  const addCartBtn = document.getElementById("detail-add-cart-btn");
  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const activeColor = document.querySelector(".color-swatch.active").dataset.colorName;
      const activeSize = document.querySelector(".size-option.active").dataset.sizeVal;
      const quantity = parseInt(qtyVal.textContent);
      
      addToCart(product.id, product.name, product.price, product.image, activeColor, activeSize, quantity);
    });
  }
  
  // Render Related/Recommended Products
  const relatedGrid = document.getElementById("related-products-grid");
  if (relatedGrid) {
    const related = PRODUCTS_DATA.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    // If fewer than 4 related, fill with other categories
    if (related.length < 4) {
      const extras = PRODUCTS_DATA.filter(p => p.category !== product.category).slice(0, 4 - related.length);
      related.push(...extras);
    }
    renderProductsGrid(relatedGrid, related);
  }
}

window.selectSwatch = function(el) {
  const swatches = document.querySelectorAll(".color-swatch");
  swatches.forEach(s => s.classList.remove("active"));
  el.classList.add("active");
  
  // Dynamic color change simulation
  const mainImg = document.getElementById("main-detail-img");
  if (mainImg) {
    mainImg.style.opacity = "0.7";
    setTimeout(() => {
      mainImg.style.opacity = "1";
    }, 150);
  }
};

window.selectSizeOption = function(el) {
  const options = document.querySelectorAll(".size-option");
  options.forEach(o => o.classList.remove("active"));
  el.classList.add("active");
};

/* ==========================================================================
   6. Contact Page FAQ & Map
   ========================================================================== */
function initContactPage() {
  // FAQ toggles
  const faqHeaders = document.querySelectorAll(".faq-header");
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");
      
      // Close all FAQs first
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("active");
      });
      
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
  
  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Get values
      const name = document.getElementById("contact-name").value;
      
      // Clear inputs
      contactForm.reset();
      
      // Display visual confirmation popup
      const confirmationHTML = `
        <div id="contact-success-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 300;">
          <div style="background: #FAFAF7; padding: 48px; border-radius: 12px; text-align: center; max-width: 480px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 2px solid #C5A880; animation: slideUp 0.5s ease;">
            <div style="width: 80px; height: 80px; background: #C5A880; color: #1E2022; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 24px;">✓</div>
            <h3 style="font-size: 26px; font-weight: 800; color: #1E2022; margin-bottom: 12px;">已收到您的訊息</h3>
            <p style="color: #8E9095; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">親愛的 ${name} 您好，感謝您對「呂佳穎的鞋店」的支持，客服小幫手將會在 24 小時內以電子郵件或電話回覆您的提問！</p>
            <button id="close-contact-modal-btn" style="background: #1E2022; color: #FAFAF7; padding: 14px 40px; font-weight: 700; border-radius: 4px; cursor: pointer; transition: all 0.3s;">好的</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", confirmationHTML);
      
      document.getElementById("close-contact-modal-btn").addEventListener("click", () => {
        document.getElementById("contact-success-modal").remove();
      });
    });
  }
}

/* ==========================================================================
   7. Newsletter Subscription Handling
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input) return;
      
      const email = input.value;
      input.value = "";
      
      alert(`感謝您的訂閱！「呂佳穎的鞋店」最新優惠消息將會寄送至：${email}`);
    });
  });
}
