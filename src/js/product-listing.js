import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParams } from './utils.mjs';

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const category = getParams('category');
  const dataSource = new ProductData();
  const listElement = document.querySelector('.product-list');
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
});
