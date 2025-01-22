import ProductData    from "./ProductData.mjs";
import ProductListing from "./ProductList";
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
  });

const listElement = document.getElementById("product-list");

// Tents
const hiddenTentIds = ["989CG", "880RT"]
const tentsData     = new ProductData("tents");
const tentsListing  = new ProductListing("tents", tentsData, listElement, hiddenTentIds);

tentsListing.init();
