import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter(renderCartSuperScript);
});


const dataSource = new ProductData();
const product = new ProductDetails({
  productId: getParams("product"),
  dataSource,
});

product.init();
