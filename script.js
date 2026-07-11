const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* One-time logo intro */
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
      window.setTimeout(() => logoIntro.remove(), 950);
    }, 3600);
  }
}

/* =========================================================
   Pricing
   ========================================================= */
const pricingBands = [
  { label: "100–500", rateQuantity: 500 },
  { label: "600", rateQuantity: 600 },
  { label: "700", rateQuantity: 700 },
  { label: "800", rateQuantity: 800 },
  { label: "900", rateQuantity: 900 },
  { label: "1,000", rateQuantity: 1000 }
];

function getPricePerCard(quantity, sides, material = "aluminum") {
  const aluminumBase = sides === "double" ? 4 : 3;
  const reduction =
    quantity <= 500 ? 0 : ((quantity - 500) / 100) * 0.20;
  const aluminumPrice = aluminumBase - reduction;

  return material === "stainless"
    ? aluminumPrice + 2
    : aluminumPrice;
}

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

const pricingRows = document.getElementById("pricingRows");

if (pricingRows) {
  pricingBands.forEach(band => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${band.label} cards</td>
      <td>${money(getPricePerCard(band.rateQuantity, "single", "aluminum"))}</td>
      <td>${money(getPricePerCard(band.rateQuantity, "double", "aluminum"))}</td>
      <td>${money(getPricePerCard(band.rateQuantity, "single", "stainless"))}</td>
      <td>${money(getPricePerCard(band.rateQuantity, "double", "stainless"))}</td>
    `;

    pricingRows.appendChild(row);
  });
}

/* =========================================================
   Live preview state
   ========================================================= */
const layoutKeys = {
  "Classic Executive": "classic",
  "Centered Minimal": "centered",
  "Modern Split": "split",
  "Bold Monogram": "monogram",
  "QR Contact": "qr"
};

const state = {
  layoutLabel: "Classic Executive",
  layoutKey: "classic",
  material: "aluminum",
  color: "black",
  colorLabel: "Black"
};

const colorPreviewCard = document.getElementById("colorPreviewCard");
const selectedLayoutName = document.getElementById("selectedLayoutName");
const selectedColorName = document.getElementById("selectedColorName");
const selectedMaterialName = document.getElementById("selectedMaterialName");

const orderLayout = document.getElementById("orderLayout");
const orderMaterial = document.getElementById("orderMaterial");
const orderColor = document.getElementById("orderColor");
const orderColorField = document.getElementById("orderColorField");

const aluminumOptions = document.getElementById("aluminumOptions");
const stainlessOptions = document.getElementById("stainlessOptions");
const engravingNoticeTitle = document.getElementById("engravingNoticeTitle");
const engravingNoticeText = document.getElementById("engravingNoticeText");

function identityMarkup() {
  return `
    <div class="live-preview-identity">
      <p class="live-preview-name">YOUR NAME</p>
      <p class="live-preview-title">TITLE / COMPANY</p>
    </div>
  `;
}

function contactMarkup() {
  return `
    <div class="live-preview-contact">
      <span>555.555.5555</span>
      <span>YOURWEBSITE.COM</span>
    </div>
  `;
}

function previewMarkup(layoutKey) {
  const sheen = '<div class="live-preview-sheen"></div>';
  const identity = identityMarkup();
  const contact = contactMarkup();

  switch (layoutKey) {
    case "centered":
      return `
        ${sheen}
        <span class="live-preview-logo">D</span>
        ${identity}
        ${contact}
      `;

    case "split":
      return `
        ${sheen}
        <div class="live-preview-brand-panel">
          <span class="live-preview-logo">D</span>
          <span class="live-preview-brand-label">YOUR COMPANY</span>
        </div>
        <div class="live-preview-info-panel">
          ${identity}
          ${contact}
        </div>
      `;

    case "monogram":
      return `
        ${sheen}
        <span class="live-preview-watermark">D</span>
        ${identity}
        ${contact}
      `;

    case "qr":
      return `
        ${sheen}
        <div class="live-preview-copy">
          <span class="live-preview-logo">D</span>
          ${identity}
          ${contact}
        </div>
        <span class="live-preview-qr" aria-hidden="true"></span>
      `;

    case "classic":
    default:
      return `
        ${sheen}
        <div class="live-preview-header">
          <span class="live-preview-logo">D</span>
          <span class="live-preview-company">DEFY DESIGN</span>
        </div>
        ${identity}
        ${contact}
      `;
  }
}

function renderPreview() {
  if (!colorPreviewCard) {
    return;
  }

  const finishClass = state.material === "stainless"
    ? "finish-stainless"
    : `finish-${state.color}`;

  const engravingClass = state.material === "stainless"
    ? "engraving-dark"
    : "engraving-silver";

  colorPreviewCard.className =
    `color-preview-card ${finishClass} ${engravingClass} live-layout-${state.layoutKey}`;

  colorPreviewCard.innerHTML = previewMarkup(state.layoutKey);

  if (selectedLayoutName) {
    selectedLayoutName.textContent = state.layoutLabel;
  }

  if (selectedMaterialName) {
    selectedMaterialName.textContent =
      state.material === "stainless"
        ? "Brushed Stainless Steel"
        : "Anodized Aluminum";
  }

  if (selectedColorName) {
    selectedColorName.textContent =
      state.material === "stainless"
        ? "Signature Series"
        : state.colorLabel;
  }
}

function activateLayout(label) {
  state.layoutLabel = label;
  state.layoutKey = layoutKeys[label] || "classic";

  document.querySelectorAll(".layout-option").forEach(option => {
    option.classList.toggle("active", option.dataset.label === label);
  });

  if (orderLayout) {
    orderLayout.value = label;
  }

  renderPreview();
}

document.querySelectorAll(".layout-option").forEach(option => {
  option.addEventListener("click", () => {
    activateLayout(option.dataset.label);
  });
});

if (orderLayout) {
  orderLayout.addEventListener("change", () => {
    activateLayout(orderLayout.value);
  });
}

function activateMaterial(material) {
  state.material = material;

  document.querySelectorAll(".material-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.material === material);
  });

  if (orderMaterial) {
    orderMaterial.value = material;
  }

  if (material === "stainless") {
    aluminumOptions?.classList.add("hidden");
    stainlessOptions?.classList.remove("hidden");
    orderColorField?.classList.add("hidden");

    if (engravingNoticeTitle) {
      engravingNoticeTitle.textContent =
        "Dark permanent marking on brushed stainless";
    }

    if (engravingNoticeText) {
      engravingNoticeText.textContent =
        "Stainless steel is not anodized. The laser creates a dark black or charcoal mark on the brushed metal surface.";
    }
  } else {
    aluminumOptions?.classList.remove("hidden");
    stainlessOptions?.classList.add("hidden");
    orderColorField?.classList.remove("hidden");

    if (engravingNoticeTitle) {
      engravingNoticeTitle.textContent =
        "Silver engraving on every aluminum color";
    }

    if (engravingNoticeText) {
      engravingNoticeText.textContent =
        "The laser removes the anodized coating and exposes the natural silver aluminum underneath. Text, logos, and graphics therefore appear silver.";
    }

    if (orderColor) {
      orderColor.value = state.colorLabel;
    }
  }

  renderPreview();
  updateOrderPrice();
}

document.querySelectorAll(".material-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    activateMaterial(tab.dataset.material);
  });
});

if (orderMaterial) {
  orderMaterial.addEventListener("change", () => {
    activateMaterial(orderMaterial.value);
  });
}

function activateColor(color, label) {
  state.material = "aluminum";
  state.color = color;
  state.colorLabel = label;

  document.querySelectorAll(".color-option").forEach(option => {
    option.classList.toggle("active", option.dataset.color === color);
  });

  if (orderColor) {
    orderColor.value = label;
  }

  renderPreview();
}

document.querySelectorAll(".color-option").forEach(button => {
  button.addEventListener("click", () => {
    activateColor(button.dataset.color, button.dataset.label);
  });
});

/* Initialize the preview immediately */
activateLayout(state.layoutLabel);
activateMaterial(state.material);
activateColor(state.color, state.colorLabel);

/* =========================================================
   Homepage rotating-card material toggle
   ========================================================= */
const hero3dCard = document.getElementById("hero3dCard");

document.querySelectorAll(".hero-material").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".hero-material").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    if (hero3dCard) {
      hero3dCard.className =
        button.dataset.heroMaterial === "stainless"
          ? "card-3d material-stainless"
          : "card-3d material-aluminum color-black";
    }
  });
});

/* =========================================================
   Order calculator
   ========================================================= */
const quantitySelect = document.getElementById("quantity");
const sidesSelect = document.getElementById("sides");
const priceEach = document.getElementById("priceEach");
const orderTotal = document.getElementById("orderTotal");

function updateOrderPrice() {
  if (
    !quantitySelect ||
    !sidesSelect ||
    !orderMaterial ||
    !priceEach ||
    !orderTotal
  ) {
    return;
  }

  const quantity = Number(quantitySelect.value);
  const sides = sidesSelect.value;
  const material = orderMaterial.value;
  const each = getPricePerCard(quantity, sides, material);

  priceEach.textContent = money(each);
  orderTotal.textContent = money(each * quantity);
}

quantitySelect?.addEventListener("change", updateOrderPrice);
sidesSelect?.addEventListener("change", updateOrderPrice);
orderMaterial?.addEventListener("change", updateOrderPrice);
updateOrderPrice();

/* =========================================================
   Order request email
   ========================================================= */
const orderForm = document.getElementById("orderForm");

orderForm?.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.target);
  const quantity = Number(data.get("quantity"));
  const sides = data.get("sides");
  const material = data.get("material");
  const each = getPricePerCard(quantity, sides, material);
  const subtotal = each * quantity;

  const materialLabel =
    material === "stainless"
      ? "Brushed Stainless Steel"
      : "Anodized Aluminum";

  const colorLabel =
    material === "stainless"
      ? "Brushed Stainless"
      : data.get("color");

  const subject = encodeURIComponent(
    `Metal Business Card Order Request - ${data.get("name")}`
  );

  const body = encodeURIComponent(
`DEFY DESIGN ORDER REQUEST

Name: ${data.get("name")}
Company: ${data.get("company")}
Email: ${data.get("email")}
Phone: ${data.get("phone")}

Starting layout: ${data.get("layout")}
Material: ${materialLabel}
Card color: ${colorLabel}
Quantity: ${quantity}
Engraving: ${sides === "double" ? "Double-sided" : "Single-sided"}
Price per card: ${money(each)}
Card subtotal: ${money(subtotal)}

Website / QR destination:
${data.get("website")}

Project details:
${data.get("details")}

Note: Final production approval, artwork, shipping, and applicable taxes are confirmed separately.`
  );

  window.location.href =
    `mailto:defydesigninc@gmail.com?subject=${subject}&body=${body}`;
});


/* =========================================================
   V3.8 UNIVERSAL PATCH
   ========================================================= */
document.documentElement.dataset.defyVersion = "3.8";

/* Add the design-services callout even when an older index.html is live. */
if (!document.querySelector(".design-services-callout")) {
  const heroActions = document.querySelector(".hero-actions");

  if (heroActions) {
    heroActions.insertAdjacentHTML(
      "afterend",
      `
      <div class="design-services-callout">
        <div>
          <span>PROFESSIONAL DESIGN SERVICES AVAILABLE</span>
          <strong>Have a logo but no finished card design? We can build it for you.</strong>
          <p>Send your logo, a rough sketch, or simply your contact information. Defy Design can create the production-ready front and back layout before engraving.</p>
        </div>
        <a href="#order">Request design help <b>↗</b></a>
      </div>
      `
    );
  }
}

/*
  Force layout/material controls through event delegation.
  This remains active even if GitHub serves an older HTML copy.
*/
document.addEventListener("click", event => {
  const layoutButton = event.target.closest(".layout-option");

  if (layoutButton && typeof activateLayout === "function") {
    activateLayout(layoutButton.dataset.label);
  }

  const materialButton = event.target.closest(".material-tab");

  if (materialButton && typeof activateMaterial === "function") {
    activateMaterial(materialButton.dataset.material);
  }

  const colorButton = event.target.closest(".color-option");

  if (colorButton && typeof activateColor === "function") {
    activateColor(colorButton.dataset.color, colorButton.dataset.label);
  }
});
