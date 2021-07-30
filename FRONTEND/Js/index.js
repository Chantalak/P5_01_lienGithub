//Sélection de l'élement dans lequel va s'afficher les produits
var box = document.querySelector(".box");

//fonction avec une boucle for pour aafficher toutes les caméras de l'API
function addCameras(value) {

  for (var i = 0; i < value.length; i++){ 

    //linksCameras
    var a = document.createElement("a");
    a.className = "produit col-auto";
    a.href = `/FRONTEND/View/produit.html?id=${value[i]._id}`;
    box.appendChild(a);
    console.log(a)

    //ImagesCameras
    var img = document.createElement("img");
    img.className = "image";
    img.src = value[i].imageUrl;
    img.alt = "appareil photo vintage";
    a.appendChild(img);

    //details : name + price + description
    //DivDetails 
    var div = document.createElement("div");
    div.className = "details";
    a.appendChild(div);

    //name
    let h2 = document.createElement("h2");
    h2.className = "name";
    h2.textContent = value[i].name;
    div.appendChild(h2);

    //price
    let p1 = document.createElement("p");
    p1.className ="price";
    p1.textContent = value[i].price /100 + "€" ;
    div.appendChild(p1);
  }
}

//Récupérer données de l'API + afficher contenu de la page web 
//fonction asynchrone immédiatement appelée 
async function displayCameras() {
  try {
    let res = await fetch ("http://localhost:3000/api/cameras");
      if (res.ok) {
        let value = await res.json();
        addCameras(value);
        console.log(value);
      } else { 
        console.error(err)
      }
  } catch (e) {
    console.log("error"); 
  }
}

displayCameras();