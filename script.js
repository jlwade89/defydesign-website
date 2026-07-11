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
