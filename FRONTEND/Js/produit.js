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
  console.log(idProduct)
});

 // Afficher les caractéristiques du produit dans le DOM


