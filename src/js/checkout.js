import { loadHeaderFooter } from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter(renderCartSuperScript);
});
