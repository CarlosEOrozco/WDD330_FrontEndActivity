import ExternalServices          from "./ExternalServices.mjs";
import ProductListing            from "./ProductList";
import { loadHeaderFooter }      from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";
import Alert                     from "./Alert.mjs"

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter(renderCartSuperScript);
  });

const listElement = document.getElementById("product-list");

// Tents
const hiddenTentIds = ["989CG", "880RT"]
const tentsData     = new ExternalServices("tents");
const tentsListing  = new ProductListing("tents", tentsData, listElement, hiddenTentIds);

tentsListing.init();

// Alert
const alert = new Alert()
alert.init()
