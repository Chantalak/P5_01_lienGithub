//Récupérer un objet par le biais de id
async function fetchIdJSON() {
  try {
    //--- Récupération de la chaine de requete dans l'URL ---
    const queryStringUrlId = window.location.search;

    // Récupérer ID
    const urlParams = new URLSearchParams(queryStringUrlId);
    const urlId = urlParams.get("id");

    const response = await fetch (`http://localhost:3000/api/cameras/${urlId}`);
    const idProduct = await response.json();
    return idProduct;
  } catch (error) {
    console.log("error"); 
  }
}

fetchIdJSON().then(idProduct => {
  idProduct; 
 
  displayProduct(idProduct);
  selectLenses(idProduct);
  exportLenses(idProduct);
});

//Afficher les caractéristiques du produit dans le DOM
function displayProduct(idProduct) {
  var image = document.querySelector(".image_loading");
  image.src = idProduct.imageUrl;

  var name = document.querySelector(".name");
  name.textContent = idProduct.name;

  var price = document.querySelector(".price");
  price.textContent = idProduct.price/100 + "€";

  var description = document.querySelector(".description");
  description.textContent = idProduct.description;
}

//Choix des lentilles 
function selectLenses(idProduct) {
  var lensesChoose = idProduct.lenses; 
  
  for (var i = 0; i < idProduct.lenses.length; i++){ 
    var lenses = document.querySelector(".lense");
    lenses = lensesChoose[i];

    var option = document.createElement('option');
    option.className = "lense";
    option.value = lensesChoose[i];
    option.textContent = lenses;
    cameras_lenses.appendChild(option);
  }
}

//---Récupération données sélectionnées par utilisateur et envoie panier---
function exportLenses(idProduct) {
  //Selection id formulaire 
  const idForm = document.querySelector("#cameras_lenses");
  const optionForm = idForm.value;

  //sélectionner bouton ajouter dans le panier 
  const sendPanier = document.querySelector("#btn_primary");

  //AddEventListener sur le bouton et envoyer le panier 
  sendPanier.addEventListener("click", (e)=>{
  e.preventDefault();

    //Récupérer valeur du formulaire 
    let lensesAdd = {
      imageProduit: idProduct.imageUrl,
      nomProduit: idProduct.name,
      idProduit: idProduct._id,
      optionProduit: idForm.value,
      quantité: 1,
      prix: idProduct.price / 100,
    }
    console.log(lensesAdd);

    //---Stockage des données--- 
    let elementForm = JSON.parse(localStorage.getItem("element"));
    
    //fonction pour ne pas répéter le code
    const camerasAdd = () => {
      elementForm.push(lensesAdd);
      localStorage.setItem("element", JSON.stringify(elementForm));
    };

    // Vérifie si la clé existe.
    if (elementForm){
      camerasAdd();
    
    //si clé n'existe pas 
    } else{
      elementForm = [];
      camerasAdd();
    }
  });
}
