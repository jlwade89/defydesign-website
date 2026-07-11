const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

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

/* Pricing */
const pricingBands = [
  { label: "100–500", quantity: 500, rateQuantity: 500 },
  { label: "600", quantity: 600, rateQuantity: 600 },
  { label: "700", quantity: 700, rateQuantity: 700 },
  { label: "800", quantity: 800, rateQuantity: 800 },
  { label: "900", quantity: 900, rateQuantity: 900 },
  { label: "1,000", quantity: 1000, rateQuantity: 1000 }
];

function getPricePerCard(quantity, sides, material = "aluminum") {
  const aluminumBase = sides === "double" ? 4 : 3;
  const reduction = quantity <= 500 ? 0 : ((quantity - 500) / 100) * 0.20;
  const aluminumPrice = aluminumBase - reduction;
  return material === "stainless" ? aluminumPrice + 2 : aluminumPrice;
}

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

const pricingRows = document.getElementById("pricingRows");

pricingBands.forEach(band => {
  const aluminumSingle = getPricePerCard(band.rateQuantity, "single", "aluminum");
  const aluminumDouble = getPricePerCard(band.rateQuantity, "double", "aluminum");
  const stainlessSingle = getPricePerCard(band.rateQuantity, "single", "stainless");
  const stainlessDouble = getPricePerCard(band.rateQuantity, "double", "stainless");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${band.label} cards</td>
    <td>${money(aluminumSingle)}</td>
    <td>${money(aluminumDouble)}</td>
    <td>${money(stainlessSingle)}</td>
    <td>${money(stainlessDouble)}</td>
  `;
  pricingRows.appendChild(row);
});

/* Layout selector + live material/color preview */
const orderLayout = document.getElementById("orderLayout");
const selectedLayoutName = document.getElementById("selectedLayoutName");

const colorPreviewCard = document.getElementById("colorPreviewCard");
const selectedColorName = document.getElementById("selectedColorName");
const selectedMaterialName = document.getElementById("selectedMaterialName");
const orderColor = document.getElementById("orderColor");
const orderMaterial = document.getElementById("orderMaterial");
const orderColorField = document.getElementById("orderColorField");
const aluminumOptions = document.getElementById("aluminumOptions");
const stainlessOptions = document.getElementById("stainlessOptions");
const engravingNoticeTitle = document.getElementById("engravingNoticeTitle");
const engravingNoticeText = document.getElementById("engravingNoticeText");

const layoutKeys = {
  "Classic Executive": "classic",
  "Centered Minimal": "centered",
  "Modern Split": "split",
  "Bold Monogram": "monogram",
  "QR Contact": "qr"
};

let selectedLayoutKey = "classic";
let previewFinishClass = "finish-black";
let previewEngravingClass = "engraving-silver";

function activeAluminumColor() {
  return document.querySelector(".color-option.active")
    || document.querySelector(".color-option");
}

function previewMarkup(layoutKey) {
  const sheen = '<div class="live-preview-sheen"></div>';

  const identity = `
    <div class="live-preview-identity">
      <p class="live-preview-name">YOUR NAME</p>
      <p class="live-preview-title">TITLE / COMPANY</p>
    </div>
  `;

  const contact = `
    <div class="live-preview-contact">
      <span>555.555.5555</span>
      <span>YOURWEBSITE.COM</span>
    </div>
  `;

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

function updatePreviewClasses() {
  colorPreviewCard.className =
    `color-preview-card ${previewFinishClass} ${previewEngravingClass} live-layout-${selectedLayoutKey}`;
}

function renderLivePreview() {
  colorPreviewCard.innerHTML = previewMarkup(selectedLayoutKey);
  updatePreviewClasses();
}

document.querySelectorAll(".layout-option").forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".layout-option").forEach(item => {
      item.classList.remove("active");
    });

    option.classList.add("active");

    const label = option.dataset.label;
    selectedLayoutKey = layoutKeys[label] || "classic";
    selectedLayoutName.textContent = label;
    orderLayout.value = label;

    /* Immediately updates the large customer preview. */
    renderLivePreview();
  });
});

function setMaterial(material) {
  document.querySelectorAll(".material-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.material === material);
  });

  orderMaterial.value = material;

  if (material === "stainless") {
    aluminumOptions.classList.add("hidden");
    stainlessOptions.classList.remove("hidden");
    orderColorField.classList.add("hidden");

    previewFinishClass = "finish-stainless";
    previewEngravingClass = "engraving-dark";

    selectedMaterialName.textContent = "Brushed Stainless Steel";
    selectedColorName.textContent = "Signature Series";
    engravingNoticeTitle.textContent =
      "Dark permanent marking on brushed stainless";
    engravingNoticeText.textContent =
      "Stainless steel is not anodized. The laser creates a dark black or charcoal mark on the brushed surface.";
  } else {
    aluminumOptions.classList.remove("hidden");
    stainlessOptions.classList.add("hidden");
    orderColorField.classList.remove("hidden");

    const active = activeAluminumColor();

    previewFinishClass = `finish-${active.dataset.color}`;
    previewEngravingClass = "engraving-silver";

    selectedMaterialName.textContent = "Anodized Aluminum";
    selectedColorName.textContent = active.dataset.label;
    orderColor.value = active.dataset.label;
    engravingNoticeTitle.textContent =
      "Silver engraving on every aluminum color";
    engravingNoticeText.textContent =
      "The laser removes the anodized coating and exposes the natural silver aluminum underneath. Text, logos, and graphics therefore appear silver.";
  }

  updatePreviewClasses();
  updateOrderPrice();
}

document.querySelectorAll(".material-tab").forEach(tab => {
  tab.addEventListener("click", () => setMaterial(tab.dataset.material));
});

orderMaterial.addEventListener("change", () => {
  setMaterial(orderMaterial.value);
});

document.querySelectorAll(".color-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".color-option").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    previewFinishClass = `finish-${button.dataset.color}`;
    previewEngravingClass = "engraving-silver";

    selectedColorName.textContent = button.dataset.label;
    orderColor.value = button.dataset.label;

    updatePreviewClasses();
  });
});

/* Initialize the large preview using the default layout. */
renderLivePreview();

/* Homepage 3D material toggle */
const hero3dCard = document.getElementById("hero3dCard");

document.querySelectorAll(".hero-material").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".hero-material").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    hero3dCard.className = button.dataset.heroMaterial === "stainless"
      ? "card-3d material-stainless"
      : "card-3d material-aluminum color-black";
  });
});

/* Order calculator */
const quantitySelect = document.getElementById("quantity");
const sidesSelect = document.getElementById("sides");
const priceEach = document.getElementById("priceEach");
const orderTotal = document.getElementById("orderTotal");

function updateOrderPrice() {
  const quantity = Number(quantitySelect.value);
  const sides = sidesSelect.value;
  const material = orderMaterial.value;
  const each = getPricePerCard(quantity, sides, material);

  priceEach.textContent = money(each);
  orderTotal.textContent = money(each * quantity);
}

quantitySelect.addEventListener("change", updateOrderPrice);
sidesSelect.addEventListener("change", updateOrderPrice);
orderMaterial.addEventListener("change", updateOrderPrice);
updateOrderPrice();

/* Order request email */
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.target);
  const quantity = Number(data.get("quantity"));
  const sides = data.get("sides");
  const material = data.get("material");
  const each = getPricePerCard(quantity, sides, material);
  const subtotal = each * quantity;

  const materialLabel = material === "stainless"
    ? "Brushed Stainless Steel"
    : "Anodized Aluminum";

  const colorLabel = material === "stainless"
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
