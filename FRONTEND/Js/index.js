//Titre h1 de la page 
const titleH1 = document.createElement("h1");
    titleH1.innerHTML = "Appareils Photo Vintage";
    const placeH1 = document.querySelector("#presentation").appendChild(titleH1);


//Récupérer données de l'API + afficher contenu de la page web 
fetch ("http://localhost:3000/api/cameras")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    console.log(value)
    var i;
    for (i = 0; i < value.length ; i++){ 
      document.querySelector("#box").innerHTML +=
      `<a href="FRONTEND/View/produit.html?id=${value[i]._id}" class="produit" >
          <img class="image" src="${value[i].imageUrl}" alt="appareil photo vintage">
          <div id="details">
            <h2 id="name">${value[i].name}</h2>
            <p id="price">${value[i].price}</p>
            <p id="description">${value[i].description}</p> 
            </div>
        </a>
        `;
    }
  })
  .catch(function(err) {
    console.log(err) 
  });

  





  


