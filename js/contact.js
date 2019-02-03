var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

///////////////////MENSAJES///////////////////////////////
  var d = new Date();
  var t = d.getTime();
  var counter = t;

  document.getElementById("message").addEventListener("submit", (e)=>{
      var nombre = document.getElementById("nombre").value;
      var email = document.getElementById("email").value;
      var web = document.getElementById("web").value;
      var asunto = document.getElementById("asunto").value;
      var descripcion = document.getElementById("descripcion").value;
      e.preventDefault();
      sendMessage(nombre,email,web,asunto,descripcion);
      document.getElementById("message").reset();
  })

  function sendMessage(name,email,web,asunto,descripcion){
      counter+=1;
      var message = {
          Id_mensaje: counter, 
          Nombre: name,
          Email: email,
          SitioWeb: web,
          Asunto: asunto,
          Descripcion: descripcion
      }
      let db = firebase.database().ref("Messages/"+counter);
      db.set(message);
      confirm("Mensaje enviado!");
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
///////////////////MENSAJES///////////////////////////////