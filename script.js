
const WHATSAPP_NUMBER = "923222176472";

const categories = [
  {
    name: "Gifts",
    description: "Beautiful gifts for every occasion",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Perfumes",
    description: "Fragrances to remember",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cosmetics",
    description: "Beauty and self-care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Customized Items",
    description: "Personalised gifts",
    image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Jewellery",
    description: "Elegant accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dresses",
    description: "Fashion for every occasion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
  }
];

// Demo products: prices baad mein apne asli prices se replace karein.
const products = [
  { id: 1, name: "Elegant Gift Box", category: "Gifts", price: 2500, image: categories[0].image },
  { id: 2, name: "Premium Gift Set", category: "Gifts", price: 3500, image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Classic Fragrance", category: "Perfumes", price: 2200, image: categories[1].image },
  { id: 4, name: "Signature Perfume", category: "Perfumes", price: 3200, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Beauty Essentials", category: "Cosmetics", price: 1800, image: categories[2].image },
  { id: 6, name: "Makeup Collection", category: "Cosmetics", price: 2800, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" },
{ id: 7, name: "Customized Stylish Neon Light", category: "Customized Items", price: 2999, image: "./IMG-20261029-WA0179.jpg" },

  { id: 8, name: "Custom Gift Box", category: "Customized Items", price: 3000, image: categories[0].image },
  { id: 9, name: "Elegant Jewellery", category: "Jewellery", price: 2000, image: categories[4].image },
  { id: 10, name: "Classic Accessories", category: "Jewellery", price: 1200, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Elegant Dress", category: "Dresses", price: 4500, image: categories[5].image },
  { id: 12, name: "Fashion Collection", category: "Dresses", price: 5500, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" }
];

let activeCategory = "All";
let cart = [];

const $ = id => document.getElementById(id);

const categoryList = $("categoryList");
const productGrid = $("productGrid");
const filterButtons = $("filterButtons");
const productSearch = $("productSearch");
const cartDrawer = $("cartDrawer");
const cartItems = $("cartItems");
const cartCount = $("cartCount");
const cartTotal = $("cartTotal");

function money(amount) {
  return "Rs. " + amount.toLocaleString("en-PK");
}

function renderCategories() {
  categoryList.innerHTML = categories.map(c => `
    <a href="#shop" class="category-card"
       data-category="${c.name}">
      <img src="${c.image}" alt="${c.name}" loading="lazy">
      <div class="category-info">
        <h3>${c.name}</h3>
        <p>${c.description}</p>
      </div>
    </a>
  `).join("");
}

function renderFilters() {
  const names = ["All", ...categories.map(c => c.name)];

  filterButtons.innerHTML = names.map(name => `
    <button type="button"
      class="filter-button ${activeCategory === name ? "active" : ""}"
      data-filter="${name}">
      ${name === "All" ? "All Products" : name}
    </button>
  `).join("");
}

function renderProducts() {
  const query = productSearch.value.trim().toLowerCase();

  const found = products.filter(p => {
    const categoryMatch =
      activeCategory === "All" || p.category === activeCategory;

    const searchMatch =
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

  if (!found.length) {
    productGrid.innerHTML = "<p>No products found. Try another search.</p>";
    return;
  }

  productGrid.innerHTML = found.map(p => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image"
             src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">${money(p.price)}</div>
        <div class="product-actions">
          <button type="button" class="add-to-cart" data-add="${p.id}">
            Add to Bag
          </button>
          <button type="button" class="buy-now" data-buy="${p.id}">
            Buy Now
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  if (!cart.length) {
    cartItems.innerHTML = "<p>Your shopping bag is empty.</p>";
  } else {
    cartItems.innerHTML = cart.map(i => {
      const p = products.find(product => product.id === i.id);

      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <strong>${p.name}</strong>
            <span>${money(p.price)} each</span>
            <div class="quantity-controls">
              <button type="button" data-minus="${p.id}">−</button>
              <span>${i.qty}</span>
              <button type="button" data-plus="${p.id}">+</button>
              <button type="button" class="remove-item" data-remove="${p.id}">
                Remove
              </button>
            </div>
          </div>
          <strong>${money(p.price * i.qty)}</strong>
        </div>
      `;
    }).join("");
  }

  const total = cart.reduce((sum, i) => {
    const p = products.find(product => product.id === i.id);
    return sum + p.price * i.qty;
  }, 0);

  cartTotal.textContent = money(total);
}

categoryList.addEventListener("click", event => {
  const card = event.target.closest("[data-category]");
  if (!card) return;

  activeCategory = card.dataset.category;
  renderFilters();
  renderProducts();
});

filterButtons.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeCategory = button.dataset.filter;
  renderFilters();
  renderProducts();
});

productSearch.addEventListener("input", renderProducts);

productGrid.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const buy = event.target.closest("[data-buy]");

  if (add) addToCart(Number(add.dataset.add));

  if (buy) {
    addToCart(Number(buy.dataset.buy));
    cartDrawer.hidden = false;
  }
});

cartItems.addEventListener("click", event => {
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");

  if (plus) {
    const item = cart.find(i => i.id === Number(plus.dataset.plus));
    if (item) item.qty++;
  }

  if (minus) {
    const id = Number(minus.dataset.minus);
    const item = cart.find(i => i.id === id);

    if (item) {
      item.qty--;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
  }

  if (remove) {
    cart = cart.filter(i => i.id !== Number(remove.dataset.remove));
  }

  updateCart();
});

$("openCart").addEventListener("click", () => {
  cartDrawer.hidden = false;
});

$("closeCart").addEventListener("click", () => {
  cartDrawer.hidden = true;
});

$("checkoutWhatsApp").addEventListener("click", () => {
  if (!cart.length) {
    alert("Please add a product to your shopping bag first.");
    return;
  }

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    alert("WhatsApp number abhi set nahi hua. Isay script.js mein configure karna baqi hai.");
    return;
  }

  let message = "Assalamualaikum Bin Yameen Shop!\n";
  message += "I would like to place an order:\n\n";

  cart.forEach(i => {
    const p = products.find(product => product.id === i.id);
    message += `${p.name} x ${i.qty} = ${money(p.price * i.qty)}\n`;
  });

  const total = cart.reduce((sum, i) => {
    const p = products.find(product => product.id === i.id);
    return sum + p.price * i.qty;
  }, 0);

  message += `\nTotal: ${money(total)}\n`;
  message += "Please confirm availability and delivery charges.";

  const url = "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
});

$("menuToggle").addEventListener("click", () => {
  $("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    $("mainNav").classList.remove("open");
  });
});

$("currentYear").textContent = new Date().getFullYear();

renderCategories();
renderFilters();
renderProducts();
updateCart();
  
