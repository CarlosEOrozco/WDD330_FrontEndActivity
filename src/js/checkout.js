import { loadHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';
import { renderCartSuperScript } from './cartSuperscript.js';
import CheckoutProcess, { packageItems } from './checkoutProcess.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter(renderCartSuperScript);
    createCheckoutForm();
    populateOrderSummary();

    // Initialize CheckoutProcess
    const checkout = new CheckoutProcess("so-cart");
    checkout.init();

    // Pass the checkout instance to the form submission handler
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleCheckout(event, checkout);
    });
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
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.id);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id; // Ensure the name attribute matches the key in formJSON

        customerFieldset.appendChild(label);
        customerFieldset.appendChild(input);
    });

    form.appendChild(customerFieldset);

    // Payment Information Fieldset
    const paymentFieldset = document.createElement('fieldset');
    const paymentLegend = document.createElement('legend');
    paymentLegend.textContent = 'Payment Information';
    paymentFieldset.appendChild(paymentLegend);

    const paymentFields = [
        { label: 'Credit Card Number', id: 'cardNumber', type: 'text' }, // Ensure the id and name match the key in formJSON
        { label: 'Expiration Date', id: 'expDate', type: 'text', placeholder: 'MM/YY' },
        { label: 'Security Code', id: 'secCode', type: 'text' },
    ];

    paymentFields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.id);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id; // Ensure the name attribute matches the key in formJSON
        if (field.placeholder) {
            input.placeholder = field.placeholder;
        }

        paymentFieldset.appendChild(label);
        paymentFieldset.appendChild(input);
    });

    form.appendChild(paymentFieldset);

    // Checkout Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Checkout';
    form.appendChild(submitButton);

    checkoutSection.appendChild(form);
    main.appendChild(checkoutSection);
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
}

async function handleCheckout(event, checkout) {
    const form = event.target;

    if (form.checkValidity()) {
        // Gather form data
        const formData = new FormData(form);
        const formJSON = {};

        formData.forEach((value, key) => {
            formJSON[key] = value;
        });

        // Prepare the data object
        const orderData = {
            orderDate: new Date().toISOString(),
            fname: formJSON.firstName,
            lname: formJSON.lastName,
            street: formJSON.streetAddress,
            city: formJSON.city,
            state: formJSON.state,
            zip: formJSON.zipCode,
            cardNumber: formJSON.ccNumber, // For testing; replace with formJSON.ccNumber
            expiration: formJSON.expDate, // For testing; replace with formJSON.expDate
            code: formJSON.secCode, // For testing; replace with formJSON.secCode
            items: packageItems(checkout.list),
            orderTotal: checkout.orderTotal.toFixed(2),
            shipping: checkout.shipping,
            tax: checkout.tax.toFixed(2)
        };

        try {
            // Submit order
            const response = await checkout.checkout(form);
            if (response.success) {
                alert('Order placed successfully!');
                // Clear cart
                setLocalStorage("so-cart", []);
                renderCartSuperScript();
                // Redirect to confirmation page or home
                window.location.href = "../index.html";
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while placing your order. Please try again later.');
        }
    } else {
        alert('Please fill out all required fields.');
    }
}