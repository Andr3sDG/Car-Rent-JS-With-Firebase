var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

  document.getElementById("login").addEventListener("submit", (e)=>{
    var email = document.getElementById("email").value;
    var password = document.getElementById("contrasena").value;
    const auth = firebase.auth();
    e.preventDefault();
    console.log(email+password);
    if(!email || !password) {
        window.alert("Correo y contraseña requeridos");
    } else {
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.then((signin) => window.location.replace("admin.html"));
        promise.catch( e => window.alert("Algun dato es incorrecto o el usuario no existe"));
    }

});

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