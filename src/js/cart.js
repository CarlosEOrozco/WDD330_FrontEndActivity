import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from './utils.mjs';
import { renderCartSuperScript } from './cartSuperscript.js';

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter(renderCartSuperScript);

  const removeButtons = document.querySelectorAll(".cart-remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
});

function removeFromCart(e) {
  const id        = e.target.dataset.id;
  const cartItems = getLocalStorage("so-cart") || [];
  const newCart   = cartItems.filter((item) => item.Id !== id);

  setLocalStorage("so-cart", newCart);
  renderCartContents();
  renderCartSuperScript();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  updateCartTotal(cartItems);
  const quantityInputs = document.querySelectorAll(".cart-card__quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      updateQuantity(e.target.dataset.id, e.target.value);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<div class="cart-item-container">
                    <li class="cart-card divider">
                      <a href="#" class="cart-card__image">
                        <img
                          src="${item.Image}"
                          alt="${item.Name}"
                        />
                      </a>
                      <a href="#">
                        <h2 class="card__name">${item.Name}</h2>
                      </a>
                      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
                      <p class="cart-card__quantity">qty: ${item.quantity}</p>
                      <label for="quantity-${item.Id}">Quantity:</label>
                      <input 
                        type="number" 
                        id="quantity-${item.Id}" 
                        class="cart-card__quantity-input" 
                        value="${item.quantity}" 
                        min="1" 
                        data-id="${item.Id}"
                      />
                      <p class="cart-card__price">$${item.FinalPrice}</p>
                    </li>
                    <button class="cart-remove-button" data-id="${item.Id}">Remove</button>
                  </div>`;

  return newItem;
}

function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => {
      const quantity = item.quantity || 1; 
      return sum + item.FinalPrice * quantity;
    }, 0);
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  }
);
function updateQuantity(id, newQuantity) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.map((item) => {
    if (item.Id === id) {
      return { ...item, quantity: parseInt(newQuantity, 10) || 1 };
    }
    return item;
  });

  setLocalStorage("so-cart", updatedCart);
  renderCartContents(); 
  renderCartSuperScript(); 
}


renderCartContents();
