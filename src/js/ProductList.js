import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.ListPrice;
  const discountPercentage = isDiscounted ? Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100) : 0;
  const discountBadge = isDiscounted ? `<span class="discount-badge">${discountPercentage}% OFF</span>` : "";

  return `<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
              <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              ${discountBadge}
              <p class="product-card__price">
                ${isDiscounted ? `<span class="old-price">$${product.ListPrice}</span> ` : ""}
                <span class="new-price">$${product.FinalPrice}</span>
              </p>
            </a>
            <button class="quick-view-button" data-id="${product.Id}">Quick View</button>
          </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement, hiddenProductIds = []) {
    this.category         = category;
    this.dataSource       = dataSource;
    this.listElement      = listElement;
    this.hiddenProductIds = hiddenProductIds;
  }

  async init() {
    const list         = await this.dataSource.getData(this.category);
    const filteredList = this.filterList(list)

    this.renderList(filteredList);
    this.addQuickViewEventListeners();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterList(list) {
    return list.filter(item => !this.hiddenProductIds.includes(item.Id))
  }

  addQuickViewEventListeners() {
    const buttons = document.querySelectorAll(".quick-view-button");
    buttons.forEach(button => {
      button.addEventListener("click", async (event) => {
        const productId = event.target.dataset.id;
        try {
          const product = await this.dataSource.findProductById(productId);
          this.showQuickViewModal(product);
        } catch (error) {
          console.error("Error fetching product data:", error); 
        }
      });
    });
  }

  showQuickViewModal(product) {
    const modal = document.getElementById("quick-view-modal");
    const modalContent = document.getElementById("quick-view-modal-content");

    const description = product.DescriptionHtmlSimple || "No description available.";

    modalContent.innerHTML = `
      <h2>${product.NameWithoutBrand}</h2>
      <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}">
      <p>${description}</p>
      <p>Price: $${product.FinalPrice}</p>
      <button id="close-modal">Close</button>
    `;
    modal.style.display = "block";

    document.getElementById("close-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
}
