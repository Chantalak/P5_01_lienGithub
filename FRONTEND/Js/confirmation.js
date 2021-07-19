//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem("contact"));
console.log(contact)

// RECUPERATION DU PRIX TOTAL
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
console.log(prixTotal);

// RECUPERATION DE ORDERID
let orderId = JSON.parse(localStorage.getItem("orderId"));
console.log(orderId);

var merci = document.querySelector(".merci");
console.log(merci)
merci.textContent = "Bonjour " + contact.lastName + " " + contact.firstName + " nous vous remercions pour votre commande et espérons que vous avez apprécié votre shopping sur notre site.";

var recap = document.querySelector(".recap");
console.log(recap)
recap.textContent = "Vous recevrez un e-mail de confirmation de votre commande : " + orderId + " d'un montant total de " + prixTotal;
