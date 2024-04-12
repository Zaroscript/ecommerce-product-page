// Select the elements

let shopping = document.getElementById("shopping");
let basket = document.querySelector(".basket");
let menuIcon = document.querySelector("i.menu-icon");
let sideMenu = document.querySelector(".side-menu");
let closeIcon = document.getElementById("close");
let previewImage = document.getElementById("product-view");
let thumpnaisBox = document.querySelectorAll(".box");
let amount = document.querySelector("span.amount");
let plus = document.querySelector("img.plus");
let minus = document.querySelector("img.minus");
let addBtn = document.getElementById("addToCard");
let cartCount = document.querySelector(".shopping-icon .count");
let cardBody = document.querySelector(".card .body");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");

//? global scoop variables

let imgArray = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

//? mobile slider functions

let index = 1;

nextBtn.onclick = () => {
  if (index < 3) {
    index++;
    previewImage.src = `${imgArray[index]}`;
    update(index);
  }
};

previousBtn.onclick = () => {
  update();
  if (index > 0) {
    index--;
    previewImage.src = `${imgArray[index]}`;
    update(index);
  }
};

let count;

if (localStorage.getItem("count")) {
  count = localStorage.getItem("count");
} else {
  count = 0;
}

//? handling basket menu toggle

shopping.onclick = () => {
  basket.classList.toggle("active");
};

//? Handling side menu toggle
menuIcon.onclick = () => {
  sideMenu.style.left = "0";
  generateOverlay();
};

// Close the side menu when click on close icon
closeIcon.onclick = () => {
  sideMenu.style.left = "";

  removeOverlay();
};

//? function onclick on preview image

previewImage.onclick = () => {
  if (document.querySelector(".overlay")) {
    removeOverlay();
  }
  generateOverlay();
  generateimageSlider();

  let overlayBox = document.querySelectorAll(".overlay .box");
  let overlayPreview = document.querySelector(".overlay #product-view");
  overlayBox.forEach((box) => {
    box.addEventListener("click", (e) => {
      overlayBox.forEach((box) => {
        box.classList.remove("active");
      });
      e.target.classList.add("active");
      console.log(e.target.dataset)
      overlayPreview.src = e.target.dataset.src;
    });
  });

  //? Remove overlay when click on close btn
  document
    .querySelector(".overlay .product-view img#close")
    .addEventListener("click", removeOverlay);

  // Next and previous
  let index = 1;
  document.querySelector(".overlay #next").addEventListener("click", () => {
    if (index < 3) {
      index++;
      overlayPreview.src = `${imgArray[index]}`;
      update(index);
    }
  });

  document.querySelector(".overlay #previous").addEventListener("click", () => {
    update();
    if (index > 0) {
      index--;
      overlayPreview.src = `${imgArray[index]}`;
      update(index);
    }
  });
};

// ? Handling product preview img

function handlingThumbnails() {
  thumpnaisBox.forEach((box) => {
    box.addEventListener("click", (e) => {
      removeActive();
      e.target.classList.add("active");
      previewImage.src = e.target.dataset.src;
    });
  });
}

handlingThumbnails();

// remove class name active from all boxes function

function removeActive() {
  thumpnaisBox.forEach((box) => {
    box.classList.remove("active");
  });
}

//?  Plus and minus functions

plus.onclick = () => {
  count++;
  update();
};

minus.onclick = () => {
  if (amount.innerHTML > 0) {
    count--;
  }
  update();
};

//? Add to cart function

cartCount.innerHTML = count;

addBtn.onclick = () => {
  cartCount.innerHTML = count;
  update();
  generateCardItems();
};

//? generate card items function

function generateCardItems() {
  if (count > 0) {
    cardBody.classList.remove("empty");
    cardBody.innerHTML = `
    <div class="info">
      <img src="images/image-product-1.jpg" alt="" />
      <div class="text">
        <p>Fall Limited Edition Sneakers</p>
        <div>
          $125.00 x <span class="count">${count}</span>
          <span class="total">$${count * 125.0}</span>
        </div>
      </div>
    </div>
    <i onclick="removeProduct()" class="fa-solid fa-trash-can trash"></i>
    <button class="main-btn">Checkout</button>
    `;
  } else {
    cardBody.classList.add("empty");
    cardBody.innerHTML = `
    <p>Your Card Is Empty</p>
    `;
  }
}

generateCardItems();

//? remove product function on clicking on trash icon

function removeProduct() {
  count = 0;
  cartCount.innerHTML = count;
  update();
  generateCardItems();
}

//? Update function

function update(index) {
  localStorage.setItem("count", count);
  amount.innerHTML = count;
}

update();

//? Generate overlay function

function generateOverlay() {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  document.querySelector("header").before(overlay);
}

//? Remove Overlay function

function removeOverlay() {
  let overlay = document.querySelector(".overlay");
  overlay.remove();
}

//? Image slider function

function generateimageSlider() {
  document.querySelector(".overlay").innerHTML = `
  <div class="product-view">
    <img src="images/icon-close.svg" alt="" id="close" />
    <div class="product-img">
      <img src="images/icon-previous.svg" alt="" id="previous" />
      <img src="images/image-product-1.jpg" alt="" id="product-view" />
      <img src="images/icon-next.svg" alt="" id="next" />
    </div>
    <div class="image-slider">
      <div class="box active" data-src="images/image-product-1.jpg">
        <img src="images/image-product-1-thumbnail.jpg" alt="" />
      </div>
      <div class="box" data-src="images/image-product-2.jpg">
        <img src="images/image-product-2-thumbnail.jpg" alt="" />
      </div>
      <div class="box" data-src="images/image-product-3.jpg">
        <img src="images/image-product-3-thumbnail.jpg" alt="" />
      </div>
      <div class="box" data-src="images/image-product-4.jpg">
        <img src="images/image-product-4-thumbnail.jpg" alt="" />
      </div>
    </div>
  </div>
  `;
}
