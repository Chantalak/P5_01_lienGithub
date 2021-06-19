/*--- Récupération de la chaine de requete dans l'URL ---*/
const queryStringUrlId = window.location.search;

// Récupérer ID
const urlParams = new URLSearchParams(queryStringUrlId);
const urlId = urlParams.get("id");

// Récupérer un objet par le biais de id
async function fetchIdJSON() {
  const response = await fetch (`http://localhost:3000/api/cameras/${urlId}`);
  const idProduct = await response.json();
  return idProduct;
}

fetchIdJSON().then(idProduct => {
  idProduct; 
  console.log(idProduct)
});

 // Afficher les caractéristiques du produit dans le DOM
document.querySelector(".main").innerHTML += `
  <div class="main_image">
      <img class="image-loading" src="${idProduct.imageUrl}" alt="appareil photo vintage">
  </div>
  <div class="main_description">
      <div>
          <h1 class="name">Nom</h1>
          <p class="price">Prix</p>
      </div>
      <div class="product_lense">
          <div class="1">lense 1</div>
          <div class="2">lense 2</div>
      </div>
      <button class="button"><a href="/FRONTEND/View/panier.html"> AJOUTER AU PANIER</a></button>
      <div>
          <p class="description">Description</p> 
      </div>
  </div>`;

