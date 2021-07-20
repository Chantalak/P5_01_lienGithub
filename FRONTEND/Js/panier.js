//////////////////////////////////////////////PANIER//////////////////////////////////////////

// array of product _id
let products = [];

//Array pour le prix total du panier
const totalPrice = [];

// Classe pour objet contact
class infoClients {
    constructor(lastName, firstName, address,  city, email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

/////////////////////////////////////////PANIER ET LOCALSTORAGE//////////////////////////////////
//Récupération des élements produit.html
let elementForm = JSON.parse(localStorage.getItem("element"));

//Option d'affichage des produits panier vie ou panier rempli 
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

CamerasStorage();

//Ajout des éléments du panier
function camerasDisplay(elementForm) {  
    var basket = document.querySelector(".panier_body");

    var tr = document.createElement("tr");
    tr.className = "contenu_panier form-row";
    basket.appendChild(tr);

    let row1 = document.createElement("td");
    row1.className = "col-2";
    tr.appendChild(row1);

    var img = document.createElement("img");
    img.className = "image_panier";
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
    row5.textContent = elementForm[i].prix + "€";
    tr.appendChild(row5); 
}

//Calcul du prix total du panier 
function CamerasPrice(elementform) {
    let priceCamera = elementForm[i].prix;
    totalPrice.push(priceCamera);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = totalPrice.reduce(reducer);

    //stockage du prix total pour la page confirmation
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
   
    let total = document.querySelector(".total")
    total.textContent = prixTotal + "€";
}

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
    city = document.querySelector("#city").value;
    email = document.querySelector("#email").value;
    contact = new infoClients(lastName, firstName, address, city, email);
};


function validateForm() {
    var form = document.querySelector("#formulaire");

    var lastName = form.lastName.value;
    var firstName = form.firstName.value;
    var address = form.address.value;
    var city = form.city.value;
    var email = form.email.value;
    console.log(lastName);
    console.log(firstName);
    console.log(address);
    console.log(city);
    console.log(email);
    if (lastName != "" && /^[a-z A-Z]$/.test(lastName), 
    firstName != "" && /^[a-z A-Z]$/.test(firstName), 
    address != "" && /^[a-z A-Z 0-9]$/.test(address),
    city != "" && /^[a-z A-Z]$/.test(city), 
    email != "" && /^[a-z 0-9._-]+@[a-z 0-9.-]{2,}[.][a-z]{2,3}$/.test(email)) {
        alert("Valide");
        return true;
    }else{
        alert("Invalide");
        return false;
    }
}

function dataButton() {
    
    //bouton envoyer formulaire 
    const bouton = document.querySelector(".btn-primary");

    bouton.addEventListener('click', (e) => {
        e.preventDefault();
        //Appelle de la fonction de validation 
        validateForm();

        //Appelle fonction contact pour données formulaire 
        DataContact();

        //Mettre objet dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
        
        //Mettre valeurs à envoyer sur le serveur 
            const update = {
            contact,
            products,
        }

        pushData = async () => {
            const location = window.location.hostname;
            //elements de la methode post
            const options = {
                method: "POST",
                headers: {
                "Content-Type" : "application/json",
                },
                body: JSON.stringify(update),
            }; 
            try {
                const res = await fetch("http://localhost:3000/api/cameras/order", options);
                if (res.ok) {
                    let value = await res.json();
                    const orderId = value.orderId;
                    
                    //stockage du prix total pour la page confirmation
                    localStorage.setItem("orderId", JSON.stringify(orderId));
                    
                    console.log(orderId);
                    console.log("données bien envoyées");
                    window.location.href = "confirmation.html";
                } else { 
                    console.error(err)
                }
            } catch (err) {
                console.log("err"); 
            }
        }

        //appelle de la fonction 
        pushData();
        }) 
}

dataButton();



