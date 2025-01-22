// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL search param by key
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams   = new URLSearchParams(queryString);

  return urlParams.get(param);
}

// render list
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const itemsHTML = list.map(templateFn)

  if (clear) parentElement.innerHTML = "";

  parentElement.insertAdjacentHTML(position, itemsHTML.join(""));
}

// render template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  
  if (callback) {
    callback(data);
  }
}


// load template
async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');

  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}