import { getLocalStorage } from "./utils.mjs";

function cartSuperScriptTemplate(count) {
  return `<div class="cart-superscript">${count}</div>`;
}

export function renderCartSuperScript() {
  const cartItems = getLocalStorage("so-cart") || [];
  const element   = document.querySelector(".cart")

  element.insertAdjacentHTML("beforeend", cartSuperScriptTemplate(cartItems.length));
}


