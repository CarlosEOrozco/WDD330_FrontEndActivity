import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from './utils.mjs';
import { renderCartSuperScript } from './cartSuperscript.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter(renderCartSuperScript);
  });

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
document.addEventListener("DOMContentLoaded", () => {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length > 0){
    cartFooter.classList.remove("hide");
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.innerHTML = "Total: $${total.toFixed(2)}";
  }
});

renderCartContents();
