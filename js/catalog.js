var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

var d = new Date();
var t = d.getTime();
var counter = t;

var storageRef = firebase.storage().ref();

document.getElementById("request").addEventListener("submit", (e)=>{
    var id_auto = document.getElementById("auto_id").value;
    var nombre = document.getElementById("nombre").value;
    var salida = document.getElementById("salida").value;
    var entrega = document.getElementById("entrega").value;
    var estado = "renta";
    e.preventDefault();
    if(!id_auto || !nombre || !salida || !entrega) {
        window.alert("Ingresa todos los campos");
    } else {
        sendRequest(id_auto,nombre,salida,entrega,estado);
    }
});

function sendRequest(id_auto,nombre,salida,entrega,estado){
    counter+=1;
    var product = {
        Id_renta: counter, 
        Id_auto: id_auto,
        Nombre: nombre,
        Salida: salida,
        Entrega: entrega,
        Estado: estado
    }
    let db = firebase.database().ref("Rentas/"+counter);
    db.set(product);
    confirm("Solicitud enviada!");
}

  function showCatalog(){
    var car = firebase.database().ref("Product/");
    car.on("child_added", function(data){
        var carValue = data.val();
        var img = firebase.storage().ref().child("Car/"+carValue.Imagen);
        img.getDownloadURL().then(function(url){
            document.querySelector('img').src = url;
            document.getElementById("tableCatalog").innerHTML+=`
                <tr>
                    <td>${carValue.Id_product}</td>
                    <td>${carValue.Nombre}</td>
                    <td>${carValue.Tipo}</td>
                    <td><img src="${url}" alt="auto"></td>
                    <td>${carValue.Descripcion}</td>
                </tr>
            `
            })
        }).catch(function(error){
            console.error(error);
        });
    }

    function logout(){
        firebase.auth().signOut();
      }
    
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
          console.log(firebaseUser);
      } else {
          console.log("not logged in");
      }
    });