
//Récupération des données du contact
let contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact)

//Récupération du prix total du panier 
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

//Récupération de orderId
let orderId = JSON.parse(localStorage.getItem("orderId"));

//Affichage du message de confimation
function displayThanksMessage() {
    var merci = document.querySelector(".merci");
    merci.textContent = "Bonjour " + contact.lastName + " " + contact.firstName + " nous vous remercions pour votre commande et espérons que vous avez apprécié votre shopping sur notre site.";

    var recap = document.querySelector(".recap");
    recap.textContent = "Vous recevrez un e-mail de confirmation pour votre commande " + orderId + " d'un montant total de " + prixTotal  + "€.";
}

//Appeler la fonction 
displayThanksMessage(); 

//Suppression du localstorage 
var accueil = document.querySelector("#btn-confirmation");
console.log(accueil)
accueil.addEventListener('click', (e) =>{
    e.preventDefault();
    localStorage.removeItem("element");
    localStorage.removeItem("contact");
    localStorage.removeItem("prixTotal");
    localStorage.removeItem("orderId");
    window.location.href = "index.html";
})