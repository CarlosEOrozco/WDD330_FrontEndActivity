import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { renderCartSuperScript }             from "./cartSuperscript.js";
import CheckoutProcess                       from "./checkoutProcess.js";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter(renderCartSuperScript);
    populateOrderSummary();

    // Initialize CheckoutProcess
    const checkout = new CheckoutProcess("so-cart");
    checkout.init();

    // Pass the checkout instance to the form submission handler
    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await handleCheckout(event, checkout);
    });
});

function populateOrderSummary() {
    const main = document.querySelector("main");

    const summarySection = document.createElement("section");
    summarySection.classList.add("order-summary");

    const summaryTitle = document.createElement("h3");
    summaryTitle.textContent = "Order Summary";
    summarySection.appendChild(summaryTitle);

    const summaryList = document.createElement("ul");

    const summaryItems = [
        { label: "Subtotal", id: "subtotal" },
        { label: "Shipping Estimate", id: "shipping" },
        { label: "Tax", id: "tax" },
        { label: "Order Total", id: "total", strong: true },
    ];

    summaryItems.forEach(item => {
        const listItem = document.createElement("li");
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

function cardIsExpired(expiration) {
    let parts = expiration.split("/");

    if (parts.length === 2) {
        let enteredMonth = parseInt(parts[0], 10);
        let enteredYear  = parseInt(parts[1], 10);
        let currentDate  = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear  = currentDate.getFullYear() % 100;

        if (!isNaN(enteredMonth) && !isNaN(enteredYear)) {
            if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth <= currentMonth)) {
                return true;
            }
        }
    }

    return false;
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

        if (cardIsExpired(formJSON.expiration)) {
            alert("Your card is expired");

            return;
        }

        try {
            // Submit order
            const response = await checkout.checkout(form);
            if (response.ok) {
                alert("Order placed successfully!");
                // Clear cart
                setLocalStorage("so-cart", []);
                renderCartSuperScript();
                // Redirect to confirmation page or home
                window.location.href = "../index.html";
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while placing your order. Please try again later.");
        }
    } else {
        alert("Please fill out all required fields.");
    }
}
