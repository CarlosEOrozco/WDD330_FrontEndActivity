import ExternalServices    from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams }  from "./utils.mjs";

import { loadHeaderFooter } from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter(renderCartSuperScript);
});

const dataSource = new ExternalServices("tents");
const product    = new ProductDetails({ productId: getParams("product"), dataSource });

product.init()
