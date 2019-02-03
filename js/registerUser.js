var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

///////////////////USUARIOS///////////////////////////////
var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("registrar").addEventListener("submit", (e)=>{
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("contrasena").value;
    var usuario = document.getElementById("usuario").value;
    var telefono = document.getElementById("telefono").value;
    const auth = firebase.auth();
    e.preventDefault();
    console.log(nombre+email);
    sendUser(nombre,email,password,usuario,telefono);

    if(!email || !password || !nombre || !usuario || !telefono) {
        window.alert("Es necesario llenar todos los campos");
    } else {
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.catch( e => window.alert("Algun dato es incorrecto o el usuario no existe"));
    }

    document.getElementById("registrar").reset();
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

function sendUser(name,email,password,usuario,telefono){
    counter+=1;
    var user = {
        Id_user: counter, 
        Nombre: name,
        Email: email,
        Contraseña: password,
        Usuario: usuario,
        Telefono: telefono
    }
    let db = firebase.database().ref("User/"+counter);
    db.set(user);
    confirm("Usuario registrado!");
} 

function showUsers(){
    var user = firebase.database().ref("User/");
    user.on("child_added", function(data){
        var userValue = data.val();
        document.getElementById("tableUsers").innerHTML+=`
            <tr>
                <td>${userValue.Id_user}</td>
                <td>${userValue.Nombre}</td>
                <td>${userValue.Email}</td>
                <td>${userValue.Usuario}</td>
                <td>${userValue.Telefono}</td>
                <td>
                    <button style="color: white" class="btn btn-danger" onClick="deleteUser(${userValue.Id_user})">Eliminar usuario</button>
                </td>
            </tr>
        `
    });
}

function deleteUser(id){
    var user = firebase.database().ref("User/"+id);
    user.remove();
    reset();
    showUsers();
    confirm("Administrador eliminado!");
}

function reset(){
    document.getElementById("users").innerHTML=`
        <div class="row">
            <div class="col-lg-5 col-md-8 m-auto">
                <div class="login-page-content">
                    <div class="login-form">
                        <h3>Registrarse</h3>
                        <form id="registrar">
                            <div class="name">
                                <input id="nombre" type="text" placeholder="Nombre">
                            </div>
                            <div class="email">
                                <input id="email" type="email" placeholder="Correo">
                            </div>
                            <div class="password">
                                <input id="contrasena" type="password" placeholder="Contraseña">
                            </div>
                            <div class="username">
                                <input id="usuario" type="text" placeholder="Usuario">
                            </div>
                            <div class="phone">
                                <input id="telefono" type="phone" placeholder="Telefono">
                            </div> 
                            <div class="log-btn">
                                <button type="submit"><i class="fa fa-check-square"></i> Registrarse</button>
                            </div>
                        </form>
                    </div>
                    <div class="create-ac">
                        <p>
                            
                        </p>
                    </div>
                    <div class="login-menu">
                        <a href="about.html">Nosotros</a>
                        <span>|</span>
                        <a href="contact.html">Contacto</a>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Usuario</th>
                        <th>Telefono</th>
                        <th>Opciones</th>                                    
                    </tr>
                </thead>
                <tbody id="tableUsers"> 
                                    
                </tbody>
            </table>
        </div>
    `;
    document.getElementById("registrar").addEventListener("submit", (e)=>{
        var nombre = document.getElementById("nombre").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("contrasena").value;
        var usuario = document.getElementById("usuario").value;
        var telefono = document.getElementById("telefono").value;
        e.preventDefault();
        sendUser(nombre,email,password,usuario,telefono);
        document.getElementById("registrar").reset();
    });
}

///////////////////USUARIOS///////////////////////////////