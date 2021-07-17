//////////////////////////////////////////////PANIER//////////////////////////////////////////

////////////////Variables
let elementForm = JSON.parse(localStorage.getItem("element"));

// array of product _id
let products = [];

//Array pour le prix total du panier
const totalPrice = [];

// Classe pour objet contact
class infoClients {
    constructor(lastName, firstName, address, addressbis, city, zip, email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.address = address;
        this.addressbis = addressbis;
        this.city = city;
        this.zip = zip;
        this.email = email;
    }
}

/////////////////////////////////////////PANIER ET LOCALSTORAGE//////////////////////////////////
//Panier vide ou panier rempli 
function CamerasStorage() {
    if (elementForm === null) {
        //Si panier vide 
        console.log("le panier est vide");
        let vide = document.querySelector("#vide");
        vide.style.display = "none";

        //Affichage icône si panier vide 
        var emptyPanier = document.querySelector(".panier_vide");
        let i = document.createElement("i");
        i.className = "fas fa-shopping-basket";
        emptyPanier.appendChild(i);
        console.log(i);

    } else{
        // Afficher les produits du local storage 
        for (i = 0; i < elementForm.length; i++) {
            camerasDisplay(elementForm);    
            CamerasPrice(elementForm);
            products.push(elementForm[i].idProduit);
        }
    }   
}

//Ajout des éléments du panier
function camerasDisplay(elementForm) {  
    var basket = document.querySelector(".panier_body");

    var tr = document.createElement("tr");
    tr.className = "contenu_panier";
    basket.appendChild(tr);

    let row1 = document.createElement("td");
    row1.className = "col-4";
    tr.appendChild(row1);

    var img = document.createElement("img");
    img.className = "image";
    img.src = elementForm[i].imageProduit;
    img.alt = "appareil photo vintage";
    row1.appendChild(img);

    let row2 = document.createElement("td");
    row2.className = "name col-2";
    row2.textContent = elementForm[i].nomProduit;
    tr.appendChild(row2);
   
    let row3 = document.createElement("td");
    row3.className = "lense col-2";
    row3.textContent = elementForm[i].optionProduit;
    tr.appendChild(row3);

    let row4 = document.createElement("td");
    row4.className = "quantity col-2";
    row4.textContent = elementForm[i].quantité;
    tr.appendChild(row4);

    let row5 = document.createElement("td");
    row5.className = "price col-2";
    row5.textContent = elementForm[i].prix;
    tr.appendChild(row5); 
}

//Calcul du prix total du panier 
function CamerasPrice(elementform) {
    let priceCamera = elementForm[i].prix;
    totalPrice.push(priceCamera);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = totalPrice.reduce(reducer);
   
    let total = document.querySelector(".total")
    total.textContent = prixTotal;
}

//fonction asynchrone immédiatement appelée 
async function displayPanier() {
  try {
    let res = await fetch ("http://localhost:3000/api/cameras");
      if (res.ok) {
        let cameras = await res.json();
        //Prendre l'objet qu'on a sélectionné 
        let element = JSON.parse(localStorage.getItem("element")) || {};
        console.log(element);

        CamerasStorage();

      } else { 
        console.error(err)
      }
  } catch (e) {
    console.log("error"); 
  }
}

displayPanier();

//Rajouter option enlever caméra par caméra dans le panier//

//Vider le panier 
function viderPanier() {
    const vider = document.querySelector(".cart_button_clear");
    vider.addEventListener('click', (e)=>{
        e.preventDefault;

        //méthode removeItem pour vider le localStorage
        localStorage.removeItem("element");

        //recharge de la page html
        window.location.href = "panier.html";
    })
}

viderPanier();

///////////////////////////////////////FORMULAIRE/////////////////////////////////////////////////////

//Fonction contact pour données formulaire 
function DataContact () {
    lastName = document.querySelector("#lastName").value;
    firstName = document.querySelector("#firstName").value;
    address = document.querySelector("#address").value;
    addressbis = document.querySelector("#addressbis").value;
    city = document.querySelector("#city").value;
    zip = document.querySelector("#zip").value;
    email = document.querySelector("#email").value;
    contact = new infoClients(lastName, firstName, address, addressbis, city, zip, email);
};

//bouton envoyer formulaire 
const bouton = document.querySelector(".btn-primary");

//Addeventlistener sur bouton formulaire 
bouton.addEventListener('click', (e) => {
    e.preventDefault();    

    //Appelle fonction contact pour données formulaire 
    DataContact();
    
    //Mettre objet dans le localStorage
    localStorage.setItem("contact", JSON.stringify(contact));

    //Mettre valeurs à envoyer sur le serveur 
    const sendData = {
        elementForm,
        contact,
    }
    console.log(sendData)
}) 

//Garder les champs saisie
function getDataForm(input){
    //mettre contenu localStorage dans champ formulaire 
    const dataFormulaire = localStorage.getItem("contact");
    const dataFormulaireObjet = JSON.parse(dataFormulaire);

    //mettre valeurs localStorage dans les champs du formulaire 
    var input = document.querySelector(`#${input}`).value = dataFormulaireObjet[input];
}

getDataForm("lastName");
getDataForm("firstName");
getDataForm("address");
getDataForm("addressbis");
getDataForm("city");
getDataForm("zip");
getDataForm("email");


   





