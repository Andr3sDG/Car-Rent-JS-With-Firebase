var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

    function showMessages(){
        var message = firebase.database().ref("Messages/");
        message.on("child_added", function(data){
            var messageValue = data.val();
            document.getElementById("tableMessages").innerHTML+=`
                <tr>
                    <td>${messageValue.Id_mensaje}</td>
                    <td>${messageValue.Nombre}</td>
                    <td>${messageValue.Asunto}</td>
                    <td>${messageValue.Email}</td>
                    <td>${messageValue.Web}</td>
                    <td>${messageValue.Descripcion}</td>
                    <td>
                        <button style="color: white" class="btn btn-danger" onClick="deleteMessage(${messageValue.Id_mensaje})">Eliminar mensaje</button>
                    </td>
                </tr>
            `
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

    function deleteMessage(id){
        var message = firebase.database().ref("Messages/"+id);
        message.remove();
        reset();
        showMessages();
        confirm("Mensaje eliminado!");
    }

    function reset(){
        document.getElementById("Mensajes").innerHTML=`
            <div class="row">
                <table>
                    <thead>
                        <tr>
                            <th>Id Mensaje</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Usuario</th>
                            <th>Telefono</th>
                            <th>Opciones</th>                                    
                        </tr>
                    </thead>
                    <tbody id="tableMessages"> 
                                        
                    </tbody>
                </table>
            </div>
        `;
    }