//---Récupérer toutes les données du localstorage 
let elementForm = JSON.parse(localStorage.getItem("element"));
//console.log(elementForm)

const panier = document.querySelector(".panier_body");
console.log(panier)

//panier vide l'afficher 
if (elementForm === null) {
    console.log("le panier est vide");
} else{
    // afficher les produits du local storage 
    let arrayForm = [];
    for (i = 0; i < elementForm.length; i++) {
        arrayForm[i] = camerasDisplay(elementForm);
    }
}   

function camerasDisplay(elementForm) {
    var tr = document.createElement("tr");
    tr.className = "contenu_panier";
    panier.appendChild(tr);
    console.log(tr);

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



