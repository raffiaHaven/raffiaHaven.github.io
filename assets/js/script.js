/* =======================
 GLOBAL CACHE
======================= */
let CATALOG = [];
let TYPES = [];

/* =======================
 NAVBAR
======================= */
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navElems = document.querySelectorAll(
  "[data-nav-open-btn],[data-nav-close-btn],[data-overlay]"
);

navElems.forEach(el => {
  el.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
});

/* =======================
 HEADER SCROLL
======================= */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", () => {
  const active = window.scrollY >= 80;
  header.classList.toggle("active", active);
  goTopBtn.classList.toggle("active", active);
});

/* =======================
 LOAD DATA ONCE
======================= */
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadCatalog(), loadTypes()]);
  renderProducts();
  renderMirrors();
  getshop();
});

/* =======================
 FETCH & CACHE
======================= */
async function loadCatalog() {
  const cached = sessionStorage.getItem("CATALOG");
  if (cached) {
    CATALOG = JSON.parse(cached);
    return;
  }

  const res = await fetch("./assets/json/Catalog.json");
  CATALOG = await res.json();
  sessionStorage.setItem("CATALOG", JSON.stringify(CATALOG));
}

async function loadTypes() {
  const res = await fetch("./assets/json/Types.json");
  TYPES = await res.json();

  const list = document.querySelector(".filter-list");
  list.innerHTML = TYPES.map(
    e => `<li><a href="/filter-list.html?${e.ID}" class="filter-btn">${e.NAME}</a></li>`
  ).join("");
}
/* =======================
 PRODUCT PAGE RENDER 
 ======================= */
function renderProductPage(ID) {
  fetch("./assets/json/Catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((CATALOG) => {
      const list = document.getElementById("theProduct");
      list.innerHTML = CATALOG
        .filter(e => e.ID == ID)
        .map(e => {
          const badge = e.BADGE === "new" ? "new" : `-${e.BADGE}%`;
          const dimSafe = e["DIMENTION W|D|H CM"].replace(/[^\w]/g, "");
          const Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;
          return `
<li class="product-item">
  <div class="container text-center">
    <div class="row">
      <div class="col-md-6">
        <div class="product-card" tabindex="0">
          <figure class="card-banner" style="height: 100%; aspect-ratio: 1 / 1; object-fit: cover;">
              <img data-src="./assets/resources/${e.ID}.jpg"
              class="image-contain lazy-img"
              width="312" height="350"
              alt="${e.DESCRIPTION}">
              <div class="card-badge">${badge}</div>
              <ul class="card-action-list">
                <li class="card-action-item" >
                  <div class="card-action-btn2" id="qty-${e.ID}-${dimSafe}">1</div>
                </li>
                <li class="card-action-item" >
                  <button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',1)"><ion-icon name="add-outline"></ion-icon></button>
                </li>
                <li class="card-action-item" >
                  <button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',-1)"><ion-icon name="remove-outline"></ion-icon></button>
                </li>
                <li class="card-action-item" >
                  <button class="card-action-btn" onclick="addToCart('${e.ID}','${e[" DIMENTION W|D|H CM"]}','qty-${e.ID}-${dimSafe}')">
                  <ion-icon name="cart-outline"></ion-icon>
                </button>
              </li>
            </ul>
          </figure>
        </div>
      </div>
      <div class="col-md-6">
        <div class="cta-card2">
          <div class="card-body">
            <div class="card-cat">
              <a href="../#" class="card-cat-link">${Thecat}</a>
            </div>
            <h1 >
              <a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
            </h1>
            <div class="card-body mt-5">
              <h1 class="card-price" value="${e.PRICE}"> ${e.PRICE} € </h1>
            </div>
            <div class="card-cat mt-5" >
                  <div class="card-body">
                    <div class="input-group">
                      <input type="number" class="form-control rounded-4 p3" id="qtyValue-${e.ID}-${dimSafe}" placeholder="QuantitY" value="1" min="1">
                        <div  onclick="addToCart2('${e.ID}','${e["DIMENTION W|D|H CM"]}','qtyValue-${e.ID}-${dimSafe}')">
                          <button class="card-action-btn" aria-labelledby="card-label-1">
                            <ion-icon name="cart-outline"></ion-icon>
                          </button>
                          <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
                        </div>
                    </div>
                  </div>
            </div>
            <div class="card-body">
              <div class="card-cat mt-1" >
                <div class="card rounded-5 p-3 d-block w-100">
                  <div class="card-body">
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        category
                      </span>
                      TYPE : ${e['TYPE']}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        brick
                      </span>
                      MATERIAL : ${e['MATERIAL']}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        colors
                      </span>
                      COLOR : ${e['COLOR']}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-cat mt-1" >
                <div class="card rounded-5 p-3 d-block w-100">
                  <div class="card-body">
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        width
                      </span>
                      DIMENTION W|D|H CM
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        square_foot
                      </span>
                      length : ${e['DIMENTION W|D|H CM'].split('|')[0]}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        width
                      </span>
                      width : ${e['DIMENTION W|D|H CM'].split('|')[1]}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        height
                      </span>
                      height : ${e['DIMENTION W|D|H CM'].split('|')[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-cat mt-1" >
                <div class="card rounded-5 p-3 d-block w-100">
                  <div class="card-body">
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        width
                      </span>
                      PACKING W|D|H CM
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        square_foot
                      </span>
                      length : ${e['PACKING W|D|H CM'].split('|')[0]}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        width
                      </span>
                      width : ${e['PACKING W|D|H CM'].split('|')[1]}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        height
                      </span>
                      height : ${e['PACKING W|D|H CM'].split('|')[2]}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-cat mt-1" >
                <div class="card rounded-5 p-3 d-block w-100">
                  <div class="card-body">
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        package_2
                      </span>
                      SIZE m³ : ${e['SIZE m³']}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        local_shipping
                      </span>
                      LOAD 20 DC : ${e['LOAD 20 DC']}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        local_shipping
                      </span>
                      LOAD 40 DC : ${e['LOAD 40 DC']}
                    </p>
                    <p class="card-text">
                      <span class="material-symbols-outlined"
                        style="font-size: 20px;top: 5px;position: relative;">
                        local_shipping
                      </span>
                      LOAD 40 HC : ${e['LOAD 40 HC']}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-cat mt-1" >
                <p class="card-text color-danger ">
                  <span class="material-symbols-outlined"
                    style="font-size: 20px;top: 5px;position: relative;">
                    report
                  </span>
                  REMARK : ${e['REMARK']}
                </p>
              </div>            
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</li > 
`;
        }).join("");

      observeImages();
    })
}


/* =======================
 RENDER PRODUCTS
======================= */
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  const shuffled = [...CATALOG].sort(() => Math.random() - 0.5);

  list.innerHTML = shuffled.map((e, i) => {
    const badge = e.BADGE === "new" ? "new" : `-${e.BADGE}%`;
    const dimSafe = e["DIMENTION W|D|H CM"].replace(/[^\w]/g, "");
    const Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;
    return `
<li class="product-item">
<div class="product-card" tabindex="${i}">
<figure class="card-banner" style="height: 100%; aspect-ratio: 1 / 1; object-fit: cover;">
<img data-src="./assets/resources/${e.ID}.jpg"
 class="image-contain lazy-img"
 width="312" height="350"
 alt="${e.DESCRIPTION}">

<div class="card-badge">${badge}</div>

<ul class="card-action-list">
<li class="card-action-item" > 
<div class="card-action-btn2" id="qty-${e.ID}-${dimSafe}">1</div>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',1)"><ion-icon name="add-outline"></ion-icon></button>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',-1)"><ion-icon name="remove-outline"></ion-icon></button>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="addToCart('${e.ID}','${e["DIMENTION W|D|H CM"]}','qty-${e.ID}-${dimSafe}')">
<ion-icon name="cart-outline"></ion-icon>
</button>
</li> 
</ul>
</figure>
<div class="card-content">
<div class="card-cat">
<a href="#" class="card-cat-link">${Thecat}</a>
</div>
<h3 class="h3 card-title">
<a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
</h3>
<data class="card-price" value="${e.PRICE}"> ${e.PRICE} € </data>
</div>
</div>
</li>`;
  }).join("");

  observeImages();
}

/* =======================
 MIRRORS
======================= */
function renderMirrors() {
  const list = document.getElementById("special-scrollbar");
  list.innerHTML = CATALOG
    .filter(e => e.TYPE === "mirror")
    .map(e => {
      const badge = e.BADGE === "new" ? "new" : `-${e.BADGE}%`;
      const dimSafe = e["DIMENTION W|D|H CM"].replace(/[^\w]/g, "");
      const Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;
      return `
<li class="product-item">
<div class="product-card">
<figure class="card-banner">
<img data-src="./assets/resources/${e.ID}.jpg"
 class="image-contain lazy-img"
 width="312" height="350"
 alt="${e.DESCRIPTION}">

<div class="card-badge">${badge}</div>

<ul class="card-action-list">
<li class="card-action-item" > 
<div class="card-action-btn2" id="qty-${e.ID}-${dimSafe}">1</div>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',1)"><ion-icon name="add-outline"></ion-icon></button>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="changeQty('qty-${e.ID}-${dimSafe}',-1)"><ion-icon name="remove-outline"></ion-icon></button>
</li> 
<li class="card-action-item" > 
<button class="card-action-btn" onclick="addToCart('${e.ID}','${e["DIMENTION W|D|H CM"]}','qty-${e.ID}-${dimSafe}')">
<ion-icon name="cart-outline"></ion-icon>
</button>
</li> 
</ul>
</figure>
<div class="card-content">
<div class="card-cat">
<a href="#" class="card-cat-link">${Thecat}</a>
</div>
<h3 class="h3 card-title">
<a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
</h3>
<data class="card-price" value="${e.PRICE}"> ${e.PRICE} € </data>
</div>
</div>
</li>`;
    }).join("");

  observeImages();
}

/* =======================
 CART
======================= */
function addToCart2(ID, DIM, qtyId) {
  console.log(ID);
  console.log(DIM);
  console.log(qtyId);
  const item = CATALOG.find(
    e => e.ID === ID && e["DIMENTION W|D|H CM"] === DIM
  );
  if (!item) return;

  const qty = document.getElementById(qtyId).value || 1;
  console.log(qty);

  const cart = JSON.parse(localStorage.getItem("ShopList")) || [];
  cart.push({ ...item, QTY: qty });

  localStorage.setItem("ShopList", JSON.stringify(cart));
  getshop();
  msg(`${qty} x ${item.DESCRIPTION} added to cart ✅ `);
}
function addToCart(ID, DIM, qtyId) {
  const item = CATALOG.find(
    e => e.ID === ID && e["DIMENTION W|D|H CM"] === DIM
  );
  if (!item) return;

  const qty = parseInt(document.getElementById(qtyId).innerText, 10);

  const cart = JSON.parse(localStorage.getItem("ShopList")) || [];
  cart.push({ ...item, QTY: qty });

  localStorage.setItem("ShopList", JSON.stringify(cart));
  getshop();
  msg(`${qty} x ${item.DESCRIPTION} added to cart ✅ `);
}

/* =======================
 CART UI
======================= */
function getshop() {
  const list = document.getElementById("shopingList");
  const value = document.getElementById("shopingListValue");

  const data = JSON.parse(localStorage.getItem("ShopList")) || [];
  value.innerText = data.length;

  list.innerHTML = data.map(e => {
    const badge = e.BADGE === "new" ? "new" : `-${e.BADGE}%`;
    const Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;

    return `
<li class="product-item">
<div class="product-card">
<figure class="card-banner">
<img data-src="./assets/resources/${e.ID}.jpg"
 class="image-contain lazy-img"
 width="312" height="350"
 alt="${e.DESCRIPTION}">

<div class="card-badge">${badge}</div>

<ul class="card-action-list">
<li class="card-action-item" > 
<button class="card-action-btn" onclick="removeById('${e.ID}')"><ion-icon name="remove-outline"></ion-icon></button>
</li> 
</ul>
</figure>
<div class="card-content">
<div class="card-cat">
<a href="#" class="card-cat-link">${Thecat}</a>
</div>
<h3 class="h3 card-title">
<a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
</h3>
<data class="card-price" value="${e.PRICE}">  ${e.QTY} * ${e.PRICE} €  = ${e.PRICE * e.QTY} €</data>
</div>
</div>
</li>`;
  }).join("");
  observeImages();
}

function removeById(ID) {
  let data = JSON.parse(localStorage.getItem("ShopList")) || [];
  const item = data.filter(e => e.ID === ID);
  data = data.filter(e => e.ID !== ID);
  localStorage.setItem("ShopList", JSON.stringify(data));
  getshop();
  msg(`${item.QTY} x ${item.DESCRIPTION} removed from cart ✅ `);
}

/* =======================
 QTY
======================= */
function changeQty(id, delta) {
  const el = document.getElementById(id);
  let val = parseInt(el.innerText, 10);
  el.innerText = Math.max(1, val + delta);
}

/* =======================
 LAZY IMAGES
======================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const img = e.target;
    img.src = img.dataset.src;
    observer.unobserve(img);
  });
}, { rootMargin: "200px" });

function observeImages() {
  document.querySelectorAll(".lazy-img").forEach(img => observer.observe(img));
}
function msg(MESSAGE) {
  const toastEl = document.getElementById('saveToast');
  toastEl.innerHTML = `
<div class="d-flex">
<div class="toast-body">
 ${MESSAGE || "Data added successfully ✅"} 
</div>
<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
</div>
`
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// PRODUCT PAGE RENDER
function clearAll() {
  localStorage.removeItem("ShopList");
  document.getElementById('shopingList').innerHTML = ``;
  document.getElementById('shopingListValue').nodeValue = 0;
  document.getElementById('shopingListValue').innerHTML = 0;
}