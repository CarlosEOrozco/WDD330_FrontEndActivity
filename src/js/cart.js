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
                      <p class="cart-card__quantity">qty: 1</p>
                      <p class="cart-card__price">$${item.FinalPrice}</p>
                    </li>
                    <button class="cart-remove-button" data-id="${item.Id}">Remove</button>
                  </div>`;

  return newItem;
}

renderCartContents();
