import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.setupZipCodeListener();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
    this.displaySubtotal();
  }

  displaySubtotal() {
    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
      subtotalElement.textContent = this.itemTotal.toFixed(2);
    }
  }

  setupZipCodeListener() {
    const zipInput = document.getElementById('zipCode');
    if (zipInput) {
      zipInput.addEventListener('blur', () => {
        const zipCode = zipInput.value.trim();
        if (zipCode !== '') {
          this.calculateOrderTotal();
        }
      });
    }
  }

  calculateOrderTotal() {
    const totalItems = this.list.reduce((sum, item) => sum + item.quantity, 0);
    // Shipping: $10 for the first item + $2 for each additional item
    this.shipping = 10 + (totalItems > 1 ? 2 * (totalItems - 1) : 0);
    // Tax: 6% sales tax
    this.tax = this.itemTotal * 0.06;
    // Order Total
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    if (shippingElement) {
      shippingElement.textContent = this.shipping.toFixed(2);
    }
    if (taxElement) {
      taxElement.textContent = this.tax.toFixed(2);
    }
    if (totalElement) {
      totalElement.textContent = this.orderTotal.toFixed(2);
    }
  }
}