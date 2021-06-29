//--- Récupération de la chaine de requete dans l'URL ---
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
  console.log(idProduct);
  displayProduct(idProduct);
});

// Afficher les caractéristiques du produit dans le DOM
function displayProduct(idProduct) {
  var image = document.querySelector(".image_loading");
  image.src = idProduct.imageUrl;

  var name = document.querySelector(".name");
  name.textContent = idProduct.name;

  var price = document.querySelector(".price");
  price.textContent = idProduct.price;

  var description = document.querySelector(".description");
  description.textContent = idProduct.description;

  //lentiles caméras 
  var lense1 = document.querySelector(".lense1");
  lense1.textContent = idProduct.lenses[0];

  var lense2 = document.querySelector(".lense2");
  lense2.textContent = idProduct.lenses[1];
}

//ajouter le produit au panier 
