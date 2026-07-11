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

const quantities = [100,200,300,400,500,600,700,800,900,1000];

function getPricePerCard(quantity, sides) {
  const basePrice = sides === "double" ? 4 : 3;

  if (quantity <= 500) {
    return basePrice;
  }

  const reductionSteps = (quantity - 500) / 100;
  return basePrice - (reductionSteps * 0.20);
}

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

const pricingRows = document.getElementById("pricingRows");

quantities.forEach(quantity => {
  const single = getPricePerCard(quantity, "single");
  const double = getPricePerCard(quantity, "double");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${quantity.toLocaleString()} cards</td>
    <td>
      <span class="price-per">${money(single)} each</span>
      <span class="total-note">${money(single * quantity)} subtotal</span>
    </td>
    <td>
      <span class="price-per">${money(double)} each</span>
      <span class="total-note">${money(double * quantity)} subtotal</span>
    </td>
  `;
  pricingRows.appendChild(row);
});

const quantitySelect = document.getElementById("quantity");
const sidesSelect = document.getElementById("sides");
const priceEach = document.getElementById("priceEach");
const orderTotal = document.getElementById("orderTotal");

function updateOrderPrice() {
  const quantity = Number(quantitySelect.value);
  const sides = sidesSelect.value;
  const each = getPricePerCard(quantity, sides);

  priceEach.textContent = money(each);
  orderTotal.textContent = money(each * quantity);
}

quantitySelect.addEventListener("change", updateOrderPrice);
sidesSelect.addEventListener("change", updateOrderPrice);
updateOrderPrice();

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.target);
  const quantity = Number(data.get("quantity"));
  const sides = data.get("sides");
  const material = data.get("material");
  const each = getPricePerCard(quantity, sides);
  const subtotal = each * quantity;

  const subject = encodeURIComponent(
    `Metal Business Card Order Request - ${data.get("name")}`
  );

  const body = encodeURIComponent(
`DEFY DESIGN ORDER REQUEST

Name: ${data.get("name")}
Company: ${data.get("company")}
Email: ${data.get("email")}
Phone: ${data.get("phone")}

Quantity: ${quantity}
Engraving: ${sides === "double" ? "Double-sided" : "Single-sided"}
Price per card: ${material === "stainless" ? "Custom quote" : money(each)}
Card subtotal: ${material === "stainless" ? "Custom quote" : money(subtotal)}

Website / QR destination:
${data.get("website")}

Project details:
${data.get("details")}

Note: Final production approval, artwork, shipping, and applicable taxes are confirmed separately.`
  );

  window.location.href =
    `mailto:defydesigninc@gmail.com?subject=${subject}&body=${body}`;
});


// Play the fiber-laser intro once per browser session, then remove it.
const laserIntro = document.getElementById("laserIntro");
if (laserIntro) {
  if (sessionStorage.getItem("defyIntroPlayed") === "1") {
    laserIntro.remove();
  } else {
    document.body.classList.add("intro-active");
    window.setTimeout(() => {
      laserIntro.classList.add("finished");
      document.body.classList.remove("intro-active");
      sessionStorage.setItem("defyIntroPlayed", "1");
      window.setTimeout(() => laserIntro.remove(), 800);
    }, 5200);
  }
}

// Nine-color anodized preview. All engraving remains silver.
const colorPreviewCard = document.getElementById("colorPreviewCard");
const selectedColorName = document.getElementById("selectedColorName");
const orderColor = document.getElementById("orderColor");

document.querySelectorAll(".color-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".color-option").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const color = button.dataset.color;
    const label = button.dataset.label;

    colorPreviewCard.className = `color-preview-card finish-${color}`;
    selectedColorName.textContent = label;

    if (orderColor) {
      orderColor.value = label;
    }
  });
});


// Material selector and realistic engraving behavior.
const materialTabs = document.querySelectorAll(".material-tab");
const aluminumOptions = document.getElementById("aluminumOptions");
const stainlessOptions = document.getElementById("stainlessOptions");
const selectedMaterialName = document.getElementById("selectedMaterialName");
const engravingNoticeTitle = document.getElementById("engravingNoticeTitle");
const engravingNoticeText = document.getElementById("engravingNoticeText");
const orderMaterial = document.getElementById("orderMaterial");
const orderColorField = document.getElementById("orderColorField");
const priceSummary = document.getElementById("priceSummary");
const stainlessQuote = document.getElementById("stainlessQuote");

function setMaterial(material) {
  materialTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.material === material));

  if (material === "stainless") {
    aluminumOptions.classList.add("hidden");
    stainlessOptions.classList.remove("hidden");
    colorPreviewCard.className = "color-preview-card finish-stainless engraving-dark";
    selectedMaterialName.textContent = "Brushed Stainless Steel";
    selectedColorName.textContent = "Signature Series";
    engravingNoticeTitle.textContent = "Dark permanent marking on brushed stainless";
    engravingNoticeText.textContent = "Stainless steel is not anodized. The laser creates a dark black or charcoal mark on the brushed metal surface.";
    orderMaterial.value = "stainless";
    orderColorField.classList.add("hidden");
    priceSummary.classList.add("hidden");
    stainlessQuote.classList.remove("hidden");
  } else {
    aluminumOptions.classList.remove("hidden");
    stainlessOptions.classList.add("hidden");
    const activeColor = document.querySelector(".color-option.active") || document.querySelector(".color-option");
    const color = activeColor.dataset.color;
    const label = activeColor.dataset.label;
    colorPreviewCard.className = `color-preview-card finish-${color} engraving-silver`;
    selectedMaterialName.textContent = "Anodized Aluminum";
    selectedColorName.textContent = label;
    engravingNoticeTitle.textContent = "Silver engraving on every aluminum color";
    engravingNoticeText.textContent = "The laser removes the anodized coating and exposes the natural silver aluminum underneath. Text, logos, and graphics therefore appear silver.";
    orderMaterial.value = "aluminum";
    orderColorField.classList.remove("hidden");
    priceSummary.classList.remove("hidden");
    stainlessQuote.classList.add("hidden");
  }
}

materialTabs.forEach(tab => tab.addEventListener("click", () => setMaterial(tab.dataset.material)));
orderMaterial.addEventListener("change", () => setMaterial(orderMaterial.value));

// Keep the homepage 3D card in sync with the selected material.
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

// Update color click behavior so aluminum engraving always remains silver.
document.querySelectorAll(".color-option").forEach(button => {
  button.addEventListener("click", () => {
    if (orderMaterial.value !== "aluminum") return;
    colorPreviewCard.className = `color-preview-card finish-${button.dataset.color} engraving-silver`;
  });
});
