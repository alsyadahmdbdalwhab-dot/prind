const products = [

  {
    name: "Jouri Classic",
    price: "EGP 850",
    category: "classic",
    code: "JC"
  },

  {
    name: "Jouri Casual",
    price: "EGP 720",
    category: "casual",
    code: "JCA"
  },

  {
    name: "Jouri Trend",
    price: "EGP 980",
    category: "trendy",
    code: "JT"
  },

  {
    name: "Jouri Beach",
    price: "EGP 790",
    category: "beach",
    code: "JB"
  },

  {
    name: "Jouri Linen",
    price: "EGP 920",
    category: "classic",
    code: "JL"
  },

  {
    name: "Jouri Summer",
    price: "EGP 760",
    category: "casual",
    code: "JS"
  },

  {
    name: "Jouri Signature",
    price: "EGP 1,150",
    category: "trendy",
    code: "JSI"
  },

  {
    name: "Jouri Resort",
    price: "EGP 890",
    category: "beach",
    code: "JR"
  }

];


const productsEl =
  document.getElementById("products");


const searchInput =
  document.getElementById("searchInput");


const styleSelect =
  document.getElementById("styleSelect");


const suggestion =
  document.getElementById("styleSuggestion");


const photoInput =
  document.getElementById("photoInput");


const photoPreview =
  document.getElementById("photoPreview");


const orderForm =
  document.getElementById("orderForm");


const formMessage =
  document.getElementById("formMessage");


const beachInput =
  document.getElementById("beachInput");


const beachGallery =
  document.getElementById("beachGallery");



/* PRODUCTS */

function renderProducts(query = "") {

  const q =
    query.trim().toLowerCase();


  const filtered =
    products.filter(product =>

      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(q)

    );


  if (!filtered.length) {

    productsEl.innerHTML =
      "<p>No items found.</p>";

    return;

  }


  productsEl.innerHTML =
    filtered.map(product => `

      <article class="product">

        <div
          class="product-image"
          aria-label="${product.name}">

          ${product.code}

        </div>


        <div class="product-body">

          <div class="tag">
            ${product.category}
          </div>


          <h3>
            ${product.name}
          </h3>


          <div class="price">
            ${product.price}
          </div>


          <div class="tag">
            35% discount campaign
          </div>

        </div>

      </article>

    `).join("");

}


renderProducts();



/* SEARCH */

searchInput.addEventListener(
  "input",
  event => {

    renderProducts(
      event.target.value
    );

  }
);



/* STYLE SUGGESTIONS */

const suggestions = {

  classic:
    "Classic: look for clean cuts, neutral colors, and timeless pieces that are easy to combine.",

  casual:
    "Casual: try comfortable basics, relaxed silhouettes, and simple layers.",

  trendy:
    "Trendy: try statement pieces, current cuts, and stronger combinations while keeping your comfort in mind."

};


styleSelect.addEventListener(
  "change",
  () => {

    suggestion.textContent =
      suggestions[styleSelect.value] ||
      "Choose a style in the form to see a suggestion.";

  }
);



/* CUSTOMER PHOTO */

photoInput.addEventListener(
  "change",
  () => {

    const file =
      photoInput.files[0];


    if (!file) {

      photoPreview.hidden = true;

      photoPreview.removeAttribute("src");

      return;

    }


    const allowedTypes = [

      "image/jpeg",
      "image/png",
      "image/webp"

    ];


    const maxSize =
      5 * 1024 * 1024;


    if (
      !allowedTypes.includes(file.type) ||
      file.size > maxSize
    ) {

      formMessage.textContent =
        "Please choose a JPG, PNG, or WebP image up to 5 MB.";

      photoInput.value = "";

      photoPreview.hidden = true;

      return;

    }


    photoPreview.src =
      URL.createObjectURL(file);

    photoPreview.hidden = false;

  }
);



/* ORDER */

orderForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    if (!orderForm.checkValidity()) {

      orderForm.reportValidity();

      return;

    }


    /*
      IMPORTANT:

      This is only the FRONT-END.

      Do NOT store customer data
      directly in JavaScript.

      In the real website, send the
      order through HTTPS to your
      secure backend.
    */


    formMessage.textContent =
      "Order request prepared. Connect this form to your secure backend to actually submit it.";

  }
);



/* BEACH PHOTOS */

beachInput.addEventListener(
  "change",
  () => {

    const files =
      [...beachInput.files];


    if (!files.length) return;


    const placeholder =
      beachGallery.querySelector(
        ".gallery-placeholder"
      );


    if (placeholder) {

      placeholder.remove();

    }


    files.forEach(file => {

      const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp"

      ];


      const maxSize =
        8 * 1024 * 1024;


      if (
        !allowedTypes.includes(file.type) ||
        file.size > maxSize
      ) {

        return;

      }


      const image =
        document.createElement("img");


      image.className =
        "beach-img";


      image.alt =
        "Jouri beach collection preview";


      image.src =
        URL.createObjectURL(file);


      beachGallery.appendChild(image);

    });

  }
);



/* THEME BUTTON */

document
  .getElementById("themeToggle")
  .addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-preview"
      );

    }
  );



/* YEAR */

document.getElementById("year")
  .textContent =
  new Date().getFullYear();