document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for subscribing!");
    this.reset();
  });
  
