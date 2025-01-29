import { loadHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';
import { renderCartSuperScript } from './cartSuperscript.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter(renderCartSuperScript);
    createCheckoutForm();
    populateOrderSummary();
});

function createCheckoutForm() {
    const main = document.querySelector('main');

    const checkoutSection = document.createElement('section');
    checkoutSection.classList.add('checkout-form');

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Review & Place your Order';
    checkoutSection.appendChild(formTitle);

    const form = document.createElement('form');
    form.id = 'checkoutForm';

    // Customer Information Fieldset
    const customerFieldset = document.createElement('fieldset');
    const customerLegend = document.createElement('legend');
    customerLegend.textContent = 'Customer Information';
    customerFieldset.appendChild(customerLegend);

    const customerFields = [
        { label: 'First Name', id: 'firstName', type: 'text' },
        { label: 'Last Name', id: 'lastName', type: 'text' },
        { label: 'Street Address', id: 'streetAddress', type: 'text' },
        { label: 'City', id: 'city', type: 'text' },
        { label: 'State', id: 'state', type: 'text' },
        { label: 'Zip Code', id: 'zipCode', type: 'text' },
    ];

    customerFields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = `${field.label}:`;
        formGroup.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.required = true;
        formGroup.appendChild(input);

        customerFieldset.appendChild(formGroup);
    });

    form.appendChild(customerFieldset);

    // Payment Information Fieldset
    const paymentFieldset = document.createElement('fieldset');
    const paymentLegend = document.createElement('legend');
    paymentLegend.textContent = 'Payment Information';
    paymentFieldset.appendChild(paymentLegend);

    const paymentFields = [
        { label: 'Credit Card Number', id: 'ccNumber', type: 'text' },
        { label: 'Expiration Date', id: 'expDate', type: 'text', placeholder: 'MM/YY' },
        { label: 'Security Code', id: 'secCode', type: 'text' },
    ];

    paymentFields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = `${field.label}:`;
        formGroup.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.required = true;
        if (field.placeholder) {
            input.placeholder = field.placeholder;
        }
        formGroup.appendChild(input);

        paymentFieldset.appendChild(formGroup);
    });

    form.appendChild(paymentFieldset);

    // Checkout Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Checkout';
    form.appendChild(submitButton);

    checkoutSection.appendChild(form);
    main.appendChild(checkoutSection);

    // Form Submission Handler
    form.addEventListener('submit', handleCheckout);
}

function populateOrderSummary() {
    const main = document.querySelector('main');

    const summarySection = document.createElement('section');
    summarySection.classList.add('order-summary');

    const summaryTitle = document.createElement('h3');
    summaryTitle.textContent = 'Order Summary';
    summarySection.appendChild(summaryTitle);

    const summaryList = document.createElement('ul');

    const summaryItems = [
        { label: 'Subtotal', id: 'subtotal' },
        { label: 'Shipping Estimate', id: 'shipping' },
        { label: 'Tax', id: 'tax' },
        { label: 'Order Total', id: 'total', strong: true },
    ];

    summaryItems.forEach(item => {
        const listItem = document.createElement('li');
        if (item.strong) {
            listItem.innerHTML = `<strong>${item.label}: $<span id="${item.id}">0.00</span></strong>`;
        } else {
            listItem.innerHTML = `${item.label}: $<span id="${item.id}">0.00</span>`;
        }
        summaryList.appendChild(listItem);
    });

    summarySection.appendChild(summaryList);
    main.appendChild(summarySection);

    // Calculate and Display Totals
    const cartItems = getLocalStorage("so-cart") || [];
    const subtotal = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function calculateShipping(subtotal) {
    // Example shipping calculation
    return subtotal > 100 ? 0 : 10;
}

function calculateTax(subtotal) {
    const taxRate = 0.08; // 8% tax
    return subtotal * taxRate;
}

function handleCheckout(event) {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity()) {
        // In a real application, here you would send the data to the server
        alert('Order placed successfully!');
        // Clear cart
        setLocalStorage("so-cart", []);
        renderCartSuperScript();
        // Redirect to home or confirmation page
        window.location.href = "../index.html";
    } else {
        alert('Please fill out all required fields.');
    }
}