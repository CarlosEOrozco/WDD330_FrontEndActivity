import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList";
import { loadHeaderFooter } from "./utils.mjs";
import { renderCartSuperScript } from "./cartSuperscript.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter(renderCartSuperScript);
});

const listElement = document.getElementById("product-list");

// Tents
const hiddenTentIds = ["989CG", "880RT"];
const tentsData = new ProductData("tents");
const tentsListing = new ProductListing(
  "tents",
  tentsData,
  listElement,
  hiddenTentIds,
);

//Categories Listing
document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    { name: "Tents", icon: "https://byui-cit.github.io/wdd330/images/category-icons/noun_Tent_3544767.svg", alt: "Tent Icon from Noun Project: Mustofa Bayu", category: "tents" },
    { name: "Sleeping Bag", icon: "https://byui-cit.github.io/wdd330/images/category-icons/noun_Sleeping%20Bag_3544775.svg", alt: "Sleeping Bag Icon from Noun Project: Mustofa Bayu", category: "sleeping-bags" },
    { name: "Backpack", icon: "https://byui-cit.github.io/wdd330/images/category-icons/noun_carrier%20bag_3544771.svg", alt: "Backpack Icon from Noun Project: Mustofa Bayu", category: "backpacks" },
    { name: "Hammock", icon: "https://byui-cit.github.io/wdd330/images/category-icons/noun_Hammock_791143.svg", alt: "Hammock Icon from Noun Project: Paul Richard", category: "hammocks" }
  ];

  const categoryGrid = document.getElementById("category-grid");

  categories.forEach(category => {
    const categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");

    const categoryLink = document.createElement("a");
    categoryLink.href = `product-listing/index.html?category=${category.category}`;

    const categoryImg = document.createElement("img");
    categoryImg.src = category.icon;
    categoryImg.alt = category.alt;

    const categoryText = document.createElement("p");
    categoryText.textContent = category.name;

    categoryLink.appendChild(categoryImg);
    categoryLink.appendChild(categoryText);
    categoryBox.appendChild(categoryLink);
    categoryGrid.appendChild(categoryBox);
  });
});


tentsListing.init();
