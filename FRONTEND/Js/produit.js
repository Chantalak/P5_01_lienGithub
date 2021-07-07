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
  selectLenses(idProduct);
});

// Afficher les caractéristiques du produit dans le DOM
function displayProduct(idProduct) {
  var image = document.querySelector(".image_loading");
  image.src = idProduct.imageUrl;

  var name = document.querySelector(".name");
  name.textContent = idProduct.name;

  var price = document.querySelector(".price");
  price.textContent = idProduct.price/100;

  var description = document.querySelector(".description");
  description.textContent = idProduct.description;
}

//choix des lentilles 
function selectLenses(idProduct) {
  var lensesChoose = idProduct.lenses; 
  console.log(lensesChoose)

  for (var i = 0; i < lensesChoose.length; i++){ 
    var lenses = document.querySelector(".lense");
    lenses.textContent = lensesChoose[i];
    console.log(lenses);
  }
 
}

//ajout produit au panier
const idlenses = document.querySelector("#cameras_lenses")

