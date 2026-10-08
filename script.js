// Mobile menu
var toggle = document.querySelector(".menu-toggle");
var menu = document.querySelector(".mobile-menu");
if (toggle && menu) {
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "Close" : "Menu";
  });
}

// Footer year
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Audit request form — sends to support@ecom-david.com via FormSubmit
var form = document.querySelector("#audit-form");
if (form) {
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";
    try {
      var res = await fetch("https://formsubmit.co/ajax/support@ecom-david.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({}, data, {
          _subject: "New Free Audit Request — ECOMDAVID LLC",
          _template: "table"
        }))
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      status.className = "form-status ok";
      status.textContent = "Thank you! We received your request and will reply within one business day.";
    } catch (err) {
      status.className = "form-status err";
      status.innerHTML = 'Something went wrong. Please email us at <a href="mailto:support@ecom-david.com">support@ecom-david.com</a> or call <a href="tel:+19255420501">(925) 542-0501</a>.';
    }
    button.disabled = false;
    button.textContent = "Request My Free Audit";
  });
}
