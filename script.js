const menuButton=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
menuButton.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const glow=document.getElementById("cursorGlow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const configCard=document.getElementById("configCard");
const quantity=document.getElementById("quantity");
const estimate=document.getElementById("estimate");
const unitPrice=document.getElementById("unitPrice");
const prices={50:129,100:189,250:389,500:679,1000:1199};

const bindings=[
  ["nameInput","namePreview"],
  ["companyInput","companyPreview"],
  ["titleInput","titlePreview"],
  ["phoneInput","phonePreview"],
  ["webInput","webPreview"]
];
bindings.forEach(([inputId,previewId])=>{
  document.getElementById(inputId).addEventListener("input",e=>{
    document.getElementById(previewId).textContent=e.target.value||" ";
  });
});

document.querySelectorAll('input[name="finish"]').forEach(radio=>{
  radio.addEventListener("change",e=>{
    configCard.className=`metal-card config-card finish-${e.target.value}`;
    updatePrice();
  });
});

["quantity","backSide","qrCode","rush"].forEach(id=>document.getElementById(id).addEventListener("change",updatePrice));
document.getElementById("qrCode").addEventListener("change",e=>document.getElementById("qrMark").classList.toggle("hidden",!e.target.checked));

function updatePrice(){
  let total=prices[quantity.value];
  if(document.getElementById("backSide").checked) total+=Number(quantity.value)*0.38;
  if(document.getElementById("qrCode").checked) total+=25;
  if(document.getElementById("rush").checked) total*=1.25;
  total=Math.round(total);
  estimate.textContent=`$${total.toLocaleString()}`;
  unitPrice.textContent=`$${(total/Number(quantity.value)).toFixed(2)} per card`;
}
updatePrice();

const upload=document.getElementById("logoUpload");
const logoText=document.getElementById("logoPreviewText");
const logoImage=document.getElementById("logoPreviewImage");
upload.addEventListener("change",()=>{
  const file=upload.files?.[0];
  if(!file) return;
  const url=URL.createObjectURL(file);
  logoImage.src=url;
  logoImage.style.display="block";
  logoText.style.display="none";
});

document.getElementById("useConfig").addEventListener("click",()=>{
  document.getElementById("orderQuantity").value=quantity.value;
  const finish=document.querySelector('input[name="finish"]:checked').value;
  document.getElementById("orderFinish").value=finish.charAt(0).toUpperCase()+finish.slice(1);
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
});

document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const subject=encodeURIComponent(`Metal Card Quote Request - ${d.get("name")}`);
  const body=encodeURIComponent(
`Name: ${d.get("name")}
Company: ${d.get("company")}
Email: ${d.get("email")}
Phone: ${d.get("phone")}
Quantity: ${d.get("quantity")}
Finish: ${d.get("finish")}

Project details:
${d.get("details")}`
  );
  window.location.href=`mailto:orders@defydesign.store?subject=${subject}&body=${body}`;
});