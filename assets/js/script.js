/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});
// function
function addToList(ID, DIMENTION) {
  fetch("./assets/json/Catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((e, i) => {
        if (e.ID == ID) {
          if (e['DIMENTION W|D|H CM'] == DIMENTION) {
            let qty = document.getElementById(`qtyValue${e.ID}${e['DIMENTION W|D|H CM']}`).value || 1;
            let LocalData = JSON.parse(localStorage.getItem('ShopList')) || [];
            LocalData.push({
              'NUMBER': e['NUMBER'],
              'ID': e['ID'],
              'PICTURE': '',
              'BADGE': e['BADGE'],
              'TYPE': e['TYPE'],
              'DESCRIPTION': e['DESCRIPTION'],
              'MATERIAL': e['MATERIAL'],
              'COLOR': e['COLOR'],
              'DIMENTION W|D|H CM': e['DIMENTION W|D|H CM'],
              'PACKING W|D|H CM': e['PACKING W|D|H CM'],
              'SIZE m³': e['SIZE m³'],
              'TOTAL PACKING': e['TOTAL PACKING'],
              'LOAD 20DC': e['LOAD 20DC'],
              'LOAD 40 DC': e['LOAD 40 DC'],
              'LOAD 40 HC': e['LOAD 40 HC'],
              'CODE': e['CODE'],
              'PRICE': e['PRICE'],
              'PRICE THC': e['PRICE THC'],
              'REMARK': e['REMARK'],
              'QTY': qty
            });
            document.getElementById(`qtyValue${e.ID}${e['DIMENTION W|D|H CM']}`).value = 1;
            localStorage.setItem('ShopList', JSON.stringify(LocalData));
            getshop();
            const toastEl = document.getElementById('saveToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
          }

        }
      });
    })

}
// function
function addToList2(ID, DIMENTION) {
  fetch("./assets/json/Catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((e, i) => {
        if (e.ID == ID) {
          if (e['DIMENTION W|D|H CM'] == DIMENTION) {
            let qty = document.getElementById(`qtyValue${e.ID}${e['DIMENTION W|D|H CM']}`).innerHTML || 1;
            let LocalData = JSON.parse(localStorage.getItem('ShopList')) || [];
            LocalData.push({
              'NUMBER': e['NUMBER'],
              'ID': e['ID'],
              'PICTURE': '',
              'BADGE': e['BADGE'],
              'TYPE': e['TYPE'],
              'DESCRIPTION': e['DESCRIPTION'],
              'MATERIAL': e['MATERIAL'],
              'COLOR': e['COLOR'],
              'DIMENTION W|D|H CM': e['DIMENTION W|D|H CM'],
              'PACKING W|D|H CM': e['PACKING W|D|H CM'],
              'SIZE m³': e['SIZE m³'],
              'TOTAL PACKING': e['TOTAL PACKING'],
              'LOAD 20DC': e['LOAD 20DC'],
              'LOAD 40 DC': e['LOAD 40 DC'],
              'LOAD 40 HC': e['LOAD 40 HC'],
              'CODE': e['CODE'],
              'PRICE': e['PRICE'],
              'PRICE THC': e['PRICE THC'],
              'REMARK': e['REMARK'],
              'QTY': qty
            });
            document.getElementById(`qtyValue${e.ID}${e['DIMENTION W|D|H CM']}`).innerHTML = 1;
            localStorage.setItem('ShopList', JSON.stringify(LocalData));
            getshop();
            const toastEl = document.getElementById('saveToast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
          }

        }
      });
    })

}
// function
function printSection(id) {
  const content = document.getElementById(id).innerHTML;
  const original = document.body.innerHTML;
  document.body.innerHTML = content;
  window.print();
  document.body.innerHTML = original;
}
function clearAll() {
  localStorage.removeItem("ShopList");
  document.getElementById('shopingList').innerHTML = ``;
  document.getElementById('shopingListValue').nodeValue = 0;
  document.getElementById('shopingListValue').innerHTML = 0;
}
function removeById(ID) {
  let data = JSON.parse(localStorage.getItem("ShopList")) || [];

  data = data.filter(item => item.ID !== ID);

  localStorage.setItem("ShopList", JSON.stringify(data));
}

function getshop() {
  let data = JSON.parse(localStorage.getItem('ShopList')) || [];
  document.getElementById('shopingList').innerHTML = ``;
  document.getElementById('shopingListValue').nodeValue = data.length;
  document.getElementById('shopingListValue').innerHTML = data.length;
  data.forEach((e, i) => {
    let TheBadge = e.BADGE == "new" ? "new" : `-${e.BADGE}%`;
    let Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;
    // e.cat.forEach((ca, index) => {
    // if (e.cat.length == index + 1) {
    // Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> `
    // } else {
    // Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> | `
    // }
    // });
    document.getElementById('shopingList').innerHTML += `
 
<div class="product-card " tabindex="0">

<figure class="card-banner">
<img src="./assets/resources/${e.ID}.jpg" width="312" height="350" loading="lazy"
alt="Air Jordan 7 Retro " class="image-contain">

<div class="card-badge"> ${TheBadge}</div>
<ul class="card-action-list">
<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-1" onclick="
removeById('${e.ID}');\
getshop();
">
<ion-icon name="remove-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-1">remove form Cart</div>
</li>
</ul> 

<!-- <ul class="card-action-list">

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-1">
<ion-icon name="cart-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-2">
<ion-icon name="heart-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-2">Add to Whishlist</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-3">
<ion-icon name="eye-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-3">Quick View</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-4">
<ion-icon name="repeat-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-4">Compare</div>
</li>

</ul> -->
</figure>

<div class="card-content">

<div class="card-cat">
<a href="#" class="card-cat-link">${Thecat}</a> 
</div>

<h3 class="h3 card-title">
<a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
</h3>
<h4 class="h4 card-title">
<data class="card-price" value="${e.QTY}"> ${e.QTY} *${e.PRICE} € = ${e.QTY * e.PRICE} </data>
</h4>


</div>

</div>
`

  });

}
// function

window.addEventListener('DOMContentLoaded', function () {
  fetch("./assets/json/Catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((data) => {
      data.sort(() => Math.random() - 0.5);
      data.forEach((e, i) => {
        let TheBadge = e.BADGE == "new" ? "new" : `-${e.BADGE}%`;
        let Thecat = `<a href="/filter-list.html?${e.TYPE}" class="card-cat-link">${e.TYPE}</a>`;
        // e.cat.forEach((ca, index) => {
        // if (e.cat.length == index + 1) {
        // Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> `
        // } else {
        // Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> | `
        // }
        // });
        document.getElementById('product-list').innerHTML += `
<li class="product-item">
<div class="product-card" tabindex="0">

<figure class="card-banner">
<img src="./assets/resources/${e.ID}.jpg" width="312" height="350" loading="lazy" alt="Air Jordan 7 Retro "
class="image-contain">

<div class="card-badge"> ${TheBadge}</div>

<ul class="card-action-list">
<li class="card-action-item" > 
<div style="
    height: 38px;
    width: 38px;
    padding: 10px;
    background: var(--white);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--rich-black-fogra-29);
" id="qtyValue${e.ID}${e['DIMENTION W|D|H CM']}">1</div>
</li>
<li class="card-action-item" onclick="document.getElementById('qtyValue${e.ID}${e['DIMENTION W|D|H CM']}').innerHTML = parseInt(document.getElementById('qtyValue${e.ID}${e['DIMENTION W|D|H CM']}').innerHTML) + 1;">
<button class="card-action-btn" aria-labelledby="card-label-1">
<ion-icon name="add-outline"></ion-icon>
</button>
<div class="card-action-tooltip" id="card-label-1"> + </div>
</li>
<li class="card-action-item" onclick="document.getElementById('qtyValue${e.ID}${e['DIMENTION W|D|H CM']}').innerHTML = parseInt(document.getElementById('qtyValue${e.ID}${e['DIMENTION W|D|H CM']}').innerHTML) - 1;">
<button class="card-action-btn" aria-labelledby="card-label-1">
<ion-icon name="remove-outline"></ion-icon>
</button>
<div class="card-action-tooltip" id="card-label-1"> - </div>
</li>
<li class="card-action-item" onclick="addToList2('${e.ID}', '${e['DIMENTION W|D|H CM']}')">
<button class="card-action-btn" aria-labelledby="card-label-1">
<ion-icon name="cart-outline"></ion-icon>
</button>
<div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
</li>
</ul>
<!-- <ul class="card-action-list">


<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-2">
<ion-icon name="heart-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-2">Add to Whishlist</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-3">
<ion-icon name="eye-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-3">Quick View</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-4">
<ion-icon name="repeat-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-4">Compare</div>
</li>

</ul> -->
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
</li>
`

      });
    })
    .catch((error) => console.error(error));
})
window.addEventListener('DOMContentLoaded', function () {
  fetch("./assets/json/Catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((e, i) => {
        if (e.TYPE == "mirror") {
          let TheBadge = e.CODE == "new" ? "new" : `-${e.CODE}%`;
          document.getElementById('special-scrollbar').innerHTML += `
<li class="product-item">
<div class="product-card" tabindex="0">

<figure class="card-banner">
<img src="./assets/resources/${e.ID}.jpg" width="312" height="350" loading="lazy"
alt="Air Jordan 7 Retro " class="image-contain">

<div class="card-badge"> ${TheBadge}</div>

<!-- <ul class="card-action-list">

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-1">
<ion-icon name="cart-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-2">
<ion-icon name="heart-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-2">Add to Whishlist</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-3">
<ion-icon name="eye-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-3">Quick View</div>
</li>

<li class="card-action-item">
<button class="card-action-btn" aria-labelledby="card-label-4">
<ion-icon name="repeat-outline"></ion-icon>
</button>

<div class="card-action-tooltip" id="card-label-4">Compare</div>
</li>

</ul> -->
</figure>

<div class="card-content">

<div class="card-cat">
<a href="#" class="card-cat-link">${e.COLOR}</a>
</div>

<h3 class="h3 card-title">
<a href="/product.html?${e.ID}">${e.DESCRIPTION} ${e['DIMENTION W|D|H CM'].replace(/\|/g, " | ")}</a>
</h3>

<data class="card-price" value="${e.PRICE}">$ ${e.PRICE} € </data>

</div>

</div>
</li>


`
        }

      });
    }
    )
    .catch((error) => console.error(error));
})
window.addEventListener('DOMContentLoaded', function () {
  fetch("./assets/json/Types.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON not found");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((e, i) => {
        document.getElementsByClassName('filter-list')[0].innerHTML += `
<li>
<a href="/filter-list.html?${e.ID}" class="filter-btn">${e.NAME}</a>
</li>
`
      });
    })
    .catch((error) => console.error(error));
})
// tester
window.addEventListener('DOMContentLoaded', function () {
  getshop();

})