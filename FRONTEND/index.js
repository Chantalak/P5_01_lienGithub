const affichageName = document.querySelector("#name");
const affichagePrice = document.querySelector("#price");
const affichageDescription = document.querySelector("#description");

console.log(affichagePrice)

fetch ("http://localhost:3000/api/cameras")

  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    console.log(value[0]);

    const cameraName = value[0].name;
    const cameraPrice = value[0].price;
    const cameraDescription = value[0].description;

    affichageName.innerHTML = cameraName;
    affichagePrice.innerHTML = cameraPrice;
    affichageDescription.innerHTML = cameraDescription;
    
    
  })
  .catch(function(err) {
    console.log(err) 
  });

