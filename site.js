// Sample product data
const products = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Classic delight with 100% real mozzarella cheese",
    price: 8.99,
    category: "pizza",
    image: "https://theawesomedaily.com/wp-content/uploads/2016/09/pictures-of-pizza-23-1.jpg"
  },
  {
    id: 2,
    title: "Cheeseburger",
    description: "Juicy grilled beef patty with cheese and veggies",
    price: 5.49,
    category: "burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream scoop",
    price: 1.5,
    category: "dessert",
    image: "https://tse2.mm.bing.net/th/id/OIP.5zpvRONCi2OWVSv4FWfFtwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
 {
    id: 4,
    title: "Kadhai Paneer",
    description: "Best paneer with real paneer",
    price: 3.99,
    category: "food",
    image: "https://th.bing.com/th/id/OIP.7fjV2Rk5MMu6wg6LGa5kXwHaFl?w=239&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },
  {
    id: 5,
    title: "Daal Makhani",
    description: "Desi daal",
    price: 2.99,
    category: "food",
    image: "https://th.bing.com/th?id=OVFT.1OTIpVYs9zRaxjjMhBL77i&pid=News&w=300&h=186&c=14&rs=2&qlt=90&dpr=1.3"
  },
  {
    id: 6,
    title: "Rice",
    description: "white rice wtih jeera mix",
    price: 1.99,
    category: "food",
    image: " https://th.bing.com/th/id/OIP.nTbfwL4yhdkF69ri_cVyIgHaHa?w=298&h=298&c=10&rs=1&bgcl=fffffe&r=0&o=6&dpr=1.3&pid=23.1"
  },
  {
    id: 7,
    title: "Cholaa",
    description: "Taste our spicy chole",
    price: 3.99,
    category: "food",
    image: "https://media.istockphoto.com/id/533555624/photo/spicy-chick-peas-chola-masala-chana-masala-choley.jpg?s=612x612&w=0&k=20&c=bgwkUMzvc4qm5V2ohuSonFK1FOKVfbBt8qJgmrFMW-U="
  },
  {
    id: 8,
    title: "Aloo Gobhi",
    description: "Taste our spicy Sabji",
    price: 2.99,
    category: "food",
    image: "https://tse3.mm.bing.net/th/id/OIP.f_v9oCaIi6rzZRi_6TNaFgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 9,
    title: "Tandoori",
    description: "Fresh and Hot roti",
    price: 0.33,
    category: "food",
    image: "https://th.bing.com/th/id/OIP.6CQuC0Koi5HdF_-Thny55AHaHa?w=169&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  }

];
 
// Render Menu Items
function renderMenuItems(items) {
  const menuGrid = document.querySelector(".menu-grid");
  menuGrid.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <div class="menu-img">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="menu-content">
        <h3 class="menu-title">${item.title}</h3>
        <p class="menu-desc">${item.description}</p>
        <div class="menu-footer">
          <span class="menu-price">$${item.price.toFixed(2)}</span>
          <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(div);
  });
  attachCartEvents();
}
// contact section
 document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from submitting normally

  // Optionally, collect the input values:
  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  // Show thank you message
  const formMessage = document.getElementById("formMessage");
  formMessage.style.display = "block";

  // Hide form
  this.style.display = "none";
});

// Category Filter
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category-btn.active")?.classList.remove("active");
    btn.classList.add("active");
    const category = btn.dataset.category;
    if (category === "all") {
      renderMenuItems(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderMenuItems(filtered);
    }
  });
});

// Initial load
renderMenuItems(products);

// Cart logic
let cart = [];

function attachCartEvents() {
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartUI();
    });
  });
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="cart-item-actions">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
          <button class="remove-item" data-id="${item.id}">x</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
  document.querySelector(".cart-total span:last-child").textContent = `$${total.toFixed(2)}`;
  document.querySelector(".cart-count").textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
      updateCartUI();
    });
  });

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      item.quantity += 1;
      updateCartUI();
    });
  });

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      cart = cart.filter(i => i.id !== id);
      updateCartUI();
    });
  });
}

// Cart Sidebar Toggle
const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const overlay = document.querySelector(".overlay");
const closeCartBtn = document.querySelector(".close-cart");

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Overlay Click to Close
overlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  authModal.classList.remove("active");
  overlay.classList.remove("active");
});

// Auth Modal Logic
const authModal = document.querySelector(".auth-modal");
const loginBtn = document.querySelector(".login-btn");
const closeAuthBtn = document.querySelector(".close-auth");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");

loginBtn?.addEventListener("click", () => {
  authModal.classList.add("active");
  overlay.classList.add("active");
});

closeAuthBtn.addEventListener("click", () => {
  authModal.classList.remove("active");
  overlay.classList.remove("active");
});

authTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    document.querySelector(".auth-tab.active")?.classList.remove("active");
    document.querySelector(".auth-form.active")?.classList.remove("active");
    tab.classList.add("active");
    authForms[index].classList.add("active");
  });
});

 

  

       

 
 


