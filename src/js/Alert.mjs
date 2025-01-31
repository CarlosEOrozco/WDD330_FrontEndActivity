export default class Alert {
  async init() {
    const res    = await fetch("/json/alerts.json");
    const alerts = await res.json();

    if (alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  renderAlerts(alerts) {
    const main = document.querySelector("main");
    const html = `
      <section class="alert-list">
        ${alerts.map(alert => this.template(alert))}
      </section>
    `;

    main.insertAdjacentHTML("afterbegin", html)
  }

  template(alert) {
    return `<p class="alert" style="background-color: ${alert.background}; color: ${alert.color};">${alert.message}</p>`;
  }
}
