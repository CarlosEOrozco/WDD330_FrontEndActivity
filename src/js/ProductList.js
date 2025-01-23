import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.ListPrice;
  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100,
      )
    : 0;
  const discountBadge = isDiscounted
    ? `<span class="discount-badge">${discountPercentage}% OFF</span>`
    : "";

  return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img src="${product.Image}" alt="${product.NameWithoutBrand}">
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              ${discountBadge}
              <p class="product-card__price">
                ${isDiscounted ? `<span class="old-price">$${product.ListPrice}</span> ` : ""}
                <span class="new-price">$${product.FinalPrice}</span>
              </p>
            </a>
          </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement, hiddenProductIds = []) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.hiddenProductIds = hiddenProductIds;
  }

  async init() {
    const list = await this.dataSource.getData();
    const filteredList = this.filterList(list);

    this.renderList(filteredList);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterList(list) {
    return list.filter((item) => !this.hiddenProductIds.includes(item.Id));
  }
}
