const state = {
  layout: "classic",
  material: "aluminum",
  color: "black",
  colorLabel: "Black",
  sides: "single",
  quantity: 100,
  previewFace: "front",
  name: "YOUR NAME",
  company: "YOUR COMPANY",
  title: "TITLE / COMPANY",
  phone: "555.555.5555",
  website: "YOURWEBSITE.COM",
  pricingMaterial: "aluminum"
};

const layoutLabels = {
  classic: "Classic Executive",
  centered: "Centered Minimal",
  split: "Modern Split",
  monogram: "Bold Monogram",
  qr: "QR Contact"
};

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

/* One-time fade intro */
const logoIntro = document.getElementById("logoIntro");

if (logoIntro) {
  if (sessionStorage.getItem("defyIntroPlayed") === "1") {
    logoIntro.remove();
  } else {
    document.body.classList.add("intro-active");

    window.setTimeout(() => {
      logoIntro.classList.add("finished");
      document.body.classList.remove("intro-active");
      sessionStorage.setItem("defyIntroPlayed", "1");
      window.setTimeout(() => logoIntro.remove(), 900);
    }, 3500);
  }
}

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function getPricePerCard(quantity, sides, material) {
  const aluminumBase = sides === "double" ? 4 : 3;
  const reduction = quantity <= 500
    ? 0
    : ((quantity - 500) / 100) * 0.20;

  const aluminumPrice = aluminumBase - reduction;
  return material === "stainless"
    ? aluminumPrice + 2
    : aluminumPrice;
}

function contactMarkup() {
  return `
    <div class="preview-contact">
      <span>${escapeHtml(state.phone)}</span>
      <span>${escapeHtml(state.website)}</span>
    </div>
  `;
}

function identityMarkup() {
  return `
    <div class="preview-identity">
      <p class="preview-name">${escapeHtml(state.name)}</p>
      <p class="preview-title">${escapeHtml(state.title)}</p>
    </div>
  `;
}

function renderFrontMarkup() {
  const glint = '<div class="preview-glint"></div>';
  const identity = identityMarkup();
  const contact = contactMarkup();

  switch (state.layout) {
    case "centered":
      return `
        ${glint}
        <span class="preview-logo">D</span>
        ${identity}
        ${contact}
      `;

    case "split":
      return `
        ${glint}
        <div class="preview-brand-panel">
          <span class="preview-logo">D</span>
          <span class="preview-brand-label">${escapeHtml(state.company)}</span>
        </div>
        <div class="preview-info-panel">
          ${identity}
          ${contact}
        </div>
      `;

    case "monogram":
      return `
        ${glint}
        <span class="preview-watermark">D</span>
        ${identity}
        ${contact}
      `;

    case "qr":
      return `
        ${glint}
        <div class="preview-copy">
          <span class="preview-logo">D</span>
          ${identity}
          ${contact}
        </div>
        <span class="preview-qr" aria-hidden="true"></span>
      `;

    case "classic":
    default:
      return `
        ${glint}
        <div class="preview-header">
          <span class="preview-logo">D</span>
          <span class="preview-company">${escapeHtml(state.company)}</span>
        </div>
        ${identity}
        ${contact}
      `;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const configCard = document.getElementById("configCard");
const configFront = document.getElementById("configFront");
const colorControl = document.getElementById("colorControl");
const backPreviewButton = document.getElementById("backPreviewButton");

function renderConfigurator() {
  const finishClass = state.material === "stainless"
    ? "finish-stainless"
    : `finish-${state.color}`;

  const engravingClass = state.material === "stainless"
    ? "engraving-dark"
    : "engraving-silver";

  configCard.className =
    `config-card ${finishClass} ${engravingClass}` +
    (state.previewFace === "back" ? " show-back" : "");

  configFront.className = `config-face config-front layout-${state.layout}`;
  configFront.innerHTML = renderFrontMarkup();

  colorControl.classList.toggle("hidden", state.material === "stainless");

  document.querySelectorAll("[data-layout]").forEach(button => {
    button.classList.toggle("active", button.dataset.layout === state.layout);
  });

  document.querySelectorAll("[data-material]").forEach(button => {
    button.classList.toggle("active", button.dataset.material === state.material);
  });

  document.querySelectorAll(".color-option").forEach(button => {
    button.classList.toggle("active", button.dataset.color === state.color);
  });

  document.querySelectorAll("[data-preview-face]").forEach(button => {
    button.classList.toggle("active", button.dataset.previewFace === state.previewFace);
  });

  backPreviewButton.disabled = state.sides === "single";

  if (state.sides === "single" && state.previewFace === "back") {
    state.previewFace = "front";
    configCard.classList.remove("show-back");
  }

  document.getElementById("previewMaterialCaption").textContent =
    state.material === "stainless"
      ? "Brushed Stainless Steel"
      : "Anodized Aluminum";

  document.getElementById("previewFinishCaption").textContent =
    `${state.material === "stainless" ? "Dark marking" : state.colorLabel} / ${layoutLabels[state.layout]}`;

  updatePrice();
  updateOrderSummary();
}

document.querySelectorAll("[data-layout]").forEach(button => {
  button.addEventListener("click", () => {
    state.layout = button.dataset.layout;
    renderConfigurator();
  });
});

document.querySelectorAll("[data-material]").forEach(button => {
  button.addEventListener("click", () => {
    state.material = button.dataset.material;
    renderConfigurator();
  });
});

document.querySelectorAll(".color-option").forEach(button => {
  button.addEventListener("click", () => {
    state.material = "aluminum";
    state.color = button.dataset.color;
    state.colorLabel = button.dataset.label;
    renderConfigurator();
  });
});

document.querySelectorAll("[data-preview-face]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.previewFace === "back" && state.sides === "single") {
      return;
    }

    state.previewFace = button.dataset.previewFace;
    renderConfigurator();
  });
});

document.getElementById("configSides").addEventListener("change", event => {
  state.sides = event.target.value;
  renderConfigurator();
});

document.getElementById("configQuantity").addEventListener("change", event => {
  state.quantity = Number(event.target.value);
  renderConfigurator();
});

const inputBindings = {
  configName: "name",
  configCompany: "company",
  configTitle: "title",
  configPhone: "phone",
  configWebsite: "website"
};

Object.entries(inputBindings).forEach(([inputId, stateKey]) => {
  document.getElementById(inputId).addEventListener("input", event => {
    state[stateKey] = event.target.value || " ";
    renderConfigurator();
  });
});

function updatePrice() {
  const each = getPricePerCard(state.quantity, state.sides, state.material);
  const subtotal = each * state.quantity;

  document.getElementById("configPriceEach").textContent = money(each);
  document.getElementById("configSubtotal").textContent = money(subtotal);
}

document.getElementById("useConfiguration").addEventListener("click", () => {
  updateOrderSummary();
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
});

/* Hero material switch */
const heroCard = document.getElementById("heroCard");

document.querySelectorAll("[data-hero-material]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-hero-material]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    heroCard.className = button.dataset.heroMaterial === "stainless"
      ? "hero-card material-stainless"
      : "hero-card material-aluminum finish-black";
  });
});

/* Pricing table */
const pricingBands = [
  { label: "100–500", quantity: 500 },
  { label: "600", quantity: 600 },
  { label: "700", quantity: 700 },
  { label: "800", quantity: 800 },
  { label: "900", quantity: 900 },
  { label: "1,000", quantity: 1000 }
];

function renderPricing() {
  const container = document.getElementById("pricingRows");

  container.innerHTML = pricingBands.map(band => {
    const single = getPricePerCard(band.quantity, "single", state.pricingMaterial);
    const double = getPricePerCard(band.quantity, "double", state.pricingMaterial);

    return `
      <div class="pricing-row">
        <span>${band.label} cards</span>
        <span>${money(single)}</span>
        <span>${money(double)}</span>
      </div>
    `;
  }).join("");

  document.querySelectorAll("[data-price-material]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.priceMaterial === state.pricingMaterial
    );
  });

  document.getElementById("pricingNote").textContent =
    state.pricingMaterial === "stainless"
      ? "Brushed stainless pricing shown. Each stainless card is exactly $2.00 more than the matching aluminum option."
      : "Anodized aluminum pricing shown. Stainless is exactly $2.00 more per card.";
}

document.querySelectorAll("[data-price-material]").forEach(button => {
  button.addEventListener("click", () => {
    state.pricingMaterial = button.dataset.priceMaterial;
    renderPricing();
  });
});

function updateOrderSummary() {
  const each = getPricePerCard(state.quantity, state.sides, state.material);
  const subtotal = each * state.quantity;

  const materialText = state.material === "stainless"
    ? "Brushed Stainless"
    : `${state.colorLabel} Aluminum`;

  document.getElementById("orderConfigSummary").textContent =
    `${layoutLabels[state.layout]} · ${materialText} · ${state.sides === "double" ? "Double-sided" : "Single-sided"} · ${state.quantity.toLocaleString()} cards`;

  document.getElementById("orderConfigPrice").textContent =
    `${money(subtotal)} card subtotal`;

  document.getElementById("orderLayout").value = layoutLabels[state.layout];
  document.getElementById("orderMaterial").value =
    state.material === "stainless" ? "Brushed Stainless Steel" : "Anodized Aluminum";
  document.getElementById("orderColor").value =
    state.material === "stainless" ? "Brushed Stainless" : state.colorLabel;
  document.getElementById("orderSides").value =
    state.sides === "double" ? "Double-sided" : "Single-sided";
  document.getElementById("orderQuantity").value = String(state.quantity);
}

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = new FormData(event.target);
  const each = getPricePerCard(state.quantity, state.sides, state.material);
  const subtotal = each * state.quantity;

  const subject = encodeURIComponent(
    `Metal Business Card Order Request - ${form.get("name")}`
  );

  const body = encodeURIComponent(
`DEFY DESIGN ORDER REQUEST

CUSTOMER
Name: ${form.get("name")}
Company: ${form.get("company")}
Email: ${form.get("email")}
Phone: ${form.get("phone")}

CONFIGURATION
Layout: ${layoutLabels[state.layout]}
Material: ${state.material === "stainless" ? "Brushed Stainless Steel" : "Anodized Aluminum"}
Color: ${state.material === "stainless" ? "Brushed Stainless" : state.colorLabel}
Engraving: ${state.sides === "double" ? "Double-sided" : "Single-sided"}
Quantity: ${state.quantity}
Price per card: ${money(each)}
Card subtotal: ${money(subtotal)}

CARD INFORMATION
Name: ${state.name}
Company: ${state.company}
Title: ${state.title}
Phone: ${state.phone}
Website: ${state.website}

DESIGN SERVICES
${form.get("designServices")}

PROJECT DETAILS
${form.get("details")}

Note: Final artwork, shipping, applicable taxes, and optional design-service charges are confirmed before production.`
  );

  window.location.href =
    `mailto:defydesigninc@gmail.com?subject=${subject}&body=${body}`;
});

renderConfigurator();
renderPricing();
updateOrderSummary();
