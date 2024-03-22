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

window.addEventListener('DOMContentLoaded', function () {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://eu-west-2.aws.data.mongodb-api.com/app/raffiahaven-lrlrn/endpoint/produt", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result)
      data.forEach((e, i) => {
        let TheBadge = e.badge == "new" ? "new" : `-${e.badge}%`;
        let realPrace = e.badge == "new" ? e['sizes'][0]['price'] : e['sizes'][0]['price'] - ((e['sizes'][0]['price'] * e.badge) / 100);
        let Thecat = ""
        e.cat.forEach((ca, index) => {
          if (e.cat.length == index + 1) {
            Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> `
          } else {
            Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> | `
          }
        });
        document.getElementById('product-list').innerHTML += `
        <li class="product-item">
        <div class="product-card" tabindex="0">
  
          <figure class="card-banner">
            <img src="${e.images[0]}" width="312" height="350" loading="lazy"
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
              <a href="#" class="card-cat-link">${Thecat}</a> 
            </div>
  
            <h3 class="h3 card-title">
              <a href="/product.html?${e['_id']}">${e.title}</a>
            </h3>
  
            <data class="card-price" value="170.85">$ ${realPrace} <del> $ ${e['sizes'][0]['price']}</del></data>
  
          </div>
  
        </div>
      </li>
        `

      });
    })
    .catch((error) => console.error(error));
})
window.addEventListener('DOMContentLoaded', function () {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "type": "mirror"
  });
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://eu-west-2.aws.data.mongodb-api.com/app/raffiahaven-lrlrn/endpoint/produt", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result)
      data.forEach((e, i) => {
        let TheBadge = e.badge == "new" ? "new" : `-${e.badge}%`;
        let realPrace = e.badge == "new" ? e.sizes[0].price : e.sizes[0].price - ((e.sizes[0].price * e.badge) / 100);
        let Thecat = ""
        e.cat.forEach((ca, index) => {
          if (e.cat.length == index + 1) {
            Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> `
          } else {
            Thecat += `<a href="./hash/${ca}" class="card-cat-link">${ca}</a> | `
          }
        });
        if (i < 4) {
          document.getElementById('special-scrollbar').innerHTML += `
          <li class="product-item">
            <div class="product-card" tabindex="0">

              <figure class="card-banner">
                <img src="${e.images[0]}" width="312" height="350" loading="lazy"
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
                  <a href="#" class="card-cat-link">${Thecat}</a>
                </div>

                <h3 class="h3 card-title">
                  <a href="/product.html?${e.title}">${e.title}</a>
                </h3>

                <data class="card-price" value="170.85">$ ${realPrace} <del> $ ${e.sizes[0]["price"]}</del></data>

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
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("https://eu-west-2.aws.data.mongodb-api.com/app/raffiahaven-lrlrn/endpoint/type", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result)
      data.forEach((e, i) => {
        document.getElementsByClassName('filter-list')[0].innerHTML += `
            <li>
                      <a href="/filter-list.html?${e._id}" class="filter-btn">${e.title}</a>
            </li>
        `
      });
    })
    .catch((error) => console.error(error));
})