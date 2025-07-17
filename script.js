let cartIcons = document.querySelectorAll('.add-to-cart');
let cards = document.querySelectorAll('.card');
let navbarNav = document.getElementById('navbarNav');
let totalPriceElement = document.getElementById('totalPrice');
let data = [];

cartIcons.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    let title = cards[idx].querySelector(".card-title").innerText;
    let price = cards[idx].querySelector(".price").innerText;
    let img = cards[idx].querySelector(".card-img").src;

    let cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    let existingItem = data.find(item => item.title === title);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      data.push({ title, price: cleanPrice, img, quantity: 1 });
    }

    updateCartDisplay();
  });
});

function updateCartDisplay() {
  navbarNav.innerHTML = "";
  let total = 0;

  data.forEach((item, idx) => {
    total += item.price * item.quantity;

    let li = document.createElement("li");
    li.className = "nav-item mb-3";
    li.innerHTML = `
      <div class="cart-item d-flex align-items-center border p-2 rounded">
        <img src="${item.img}" alt="${item.title}" class="rounded me-2" style="width: 60px; height: 60px;">
        <div class="flex-grow-1">
          <p class="mb-0 fw-bold">${item.title}</p>
          <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
        </div>
        <div class="btn-group ms-2">
          <button class="btn btn-sm btn-success" onclick="changeQty(-1, ${idx})">-</button>
          <span class="btn btn-sm btn-light">${item.quantity}</span>
          <button class="btn btn-sm btn-success" onclick="changeQty(1, ${idx})">+</button>
        </div>
      </div>
    `;
    navbarNav.appendChild(li);
  });

  totalPriceElement.innerText = total.toFixed(2);
}

function changeQty(change, idx) {
  data[idx].quantity += change;
  if (data[idx].quantity <= 0) data.splice(idx, 1);
  updateCartDisplay();
}
