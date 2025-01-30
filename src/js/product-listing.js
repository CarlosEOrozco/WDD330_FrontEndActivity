import ExternalServices    from "./ExternalServices.mjs";
import ProductListing from "./ProductList";
import { loadHeaderFooter, getParams } from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter(renderCartSuperScript);
});

const category    = getParams("category");
const dataSource  = new ExternalServices();
const listElement = document.querySelector(".product-list");
const myList      = new ProductListing(category, dataSource, listElement);
const categoryElement = document.getElementById("category");

categoryElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);


myList.init();
