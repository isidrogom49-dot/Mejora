// ===== VARIABLES =====
const productModal = document.getElementById("productModal");
const purchaseModal = document.getElementById("purchaseModal");
const ticketModal = document.getElementById("ticketModal");
const dishes = document.querySelectorAll(".dish");
const buyBtn = document.getElementById("buyBtn");
const purchaseForm = document.getElementById("purchaseForm");
const ticketContent = document.getElementById("ticketContent");
const quantityInput = document.getElementById("quantity");
const extrasInput = document.getElementById("extras");
const subtotalDisplay = purchaseForm.querySelector(".subtotal");

// ===== CLICK EN PLATO =====
dishes.forEach(dish => {
  dish.addEventListener("click", () => {
    const img = dish.dataset.img;
    const name = dish.querySelector("h3").textContent;
    const price = dish.querySelector("p").textContent;
    productModal.querySelector("img").src = img;
    productModal.querySelector("h3").textContent = name;
    productModal.querySelector(".price").textContent = price;
    productModal.querySelector("p").textContent = "Delicious gourmet dish!";
    productModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// ===== BOTÓN COMPRAR =====
buyBtn.addEventListener("click", () => {
  productModal.classList.remove("active");
  purchaseForm.reset();
  subtotalDisplay.textContent = "";
  purchaseModal.classList.add("active");

  const name = productModal.querySelector("h3").textContent;
  const price = parseFloat(productModal.querySelector(".price").textContent.replace('$',''));
  purchaseForm.dataset.dishName = name;
  purchaseForm.dataset.price = price;

  // Actualizar subtotal al abrir
  updateSubtotal();
});

// ===== SUBTOTAL DINÁMICO =====
function updateSubtotal() {
  const quantity = parseInt(quantityInput.value) || 1;
  const price = parseFloat(purchaseForm.dataset.price) || 0;
  subtotalDisplay.textContent = `Subtotal: $${(price * quantity).toFixed(2)}`;
}
quantityInput.addEventListener("input", updateSubtotal);

// ===== FORM SUBMIT =====
purchaseForm.addEventListener("submit", e => {
  e.preventDefault();
  const customer = document.getElementById("customerName").value;
  const extras = extrasInput.value || "None";
  const quantity = parseInt(quantityInput.value);
  const dish = purchaseForm.dataset.dishName;
  const price = parseFloat(purchaseForm.dataset.price);
  const total = (price * quantity).toFixed(2);

  purchaseModal.classList.remove("active");

  ticketContent.innerHTML = `
    <h3>Ticket</h3>
    <p><strong>Customer:</strong> ${customer}</p>
    <p><strong>Dish:</strong> ${dish}</p>
    <p><strong>Extras:</strong> ${extras}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <p><strong>Total:</strong> $${total}</p>
    <div id="qrcodeWrapper"></div>
  `;

  new QRCode(document.getElementById("qrcodeWrapper"), {
    text: `Customer: ${customer}\nDish: ${dish}\nExtras: ${extras}\nQuantity: ${quantity}\nTotal: $${total}`,
    width: 120,
    height: 120
  });

  ticketModal.classList.add("active");
});

// ===== CERRAR MODALES =====
document.querySelectorAll(".modal .close").forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest(".modal").classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// ===== ESC CLOSE =====
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach(m => {
      m.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }
});

// ===== CLICK FUERA DEL MODAL PARA CERRAR =====
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// ===== BACK BUTTON =====
document.querySelector(".back-btn").addEventListener("click", () => {
  window.history.back();
});