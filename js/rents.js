var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

  function showRents(){
    var rents = firebase.database().ref("Rentas/");
    rents.on("child_added", function(data){
        var rentValue = data.val();
        document.getElementById("tableRents").innerHTML+=`
            <tr>
                <td>${rentValue.Id_renta}</td>
                <td>${rentValue.Id_auto}</td>
                <td>${rentValue.Nombre}</td>
                <td>${rentValue.Salida}</td>
                <td>${rentValue.Entrega}</td>
                <td>${rentValue.Estado}</td>
                <td>
                    <button onClick="aceptRent(${rentValue.Id_renta},'${rentValue.Id_auto}','${rentValue.Nombre}','${rentValue.Salida}','${rentValue.Entrega}','${rentValue.Estado}')" style="color: white" class="btn btn-primary">Aceptar</button>
                    <button onClick="finishRent(${rentValue.Id_renta},'${rentValue.Id_auto}','${rentValue.Nombre}','${rentValue.Salida}','${rentValue.Entrega}','${rentValue.Estado}')" style="color: white" class="btn btn-warning">finalizar</button>
                    <button onClick="deleteRent(${rentValue.Id_renta})" style="color: white" class="btn btn-danger">Eliminar</button>
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

    function finishRent(id,id_auto,nombre,salida,entrega,estado){
        if(estado=="proceso"){
            var aceptado = {
                Id_renta: id,
                Id_auto: id_auto,
                Nombre: nombre,
                Salida: salida,
                Entrega: entrega,
                Estado: "finalizado"
            }
            let db = firebase.database().ref("Rentas/"+id);
            db.set(aceptado);
            reset();
            showProduct();
            confirm("Pedido aceptado!");
        } else if(estado=="renta") {
            confirm("No se puede finalizar un pedido no aceptado");
        } else {
            confirm("El pedido ya fue finalizado");
        }
    }     

    function aceptRent(id,id_auto,nombre,salida,entrega,estado){
        if(estado=="renta"){
            var aceptado = {
                Id_renta: id,
                Id_auto: id_auto,
                Nombre: nombre,
                Salida: salida,
                Entrega: entrega,
                Estado: "proceso"
            }
            let db = firebase.database().ref("Rentas/"+id);
            db.set(aceptado);
            reset();
            showProduct();
            confirm("Pedido aceptado!");
        } else if(estado=="finalizado") {
            confirm("El pedido ya fue finalizado");
        } else {
            confirm("El pedido ya esta en proceso");
        }
    }

    function reset(){
        document.getElementById("rents").innerHTML=`
            <div class="row">
                <h2>Solicitud de rentas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id renta</th>
                            <th>Id del auto</th>
                            <th>Nombre</th>
                            <th>Salida</th>
                            <th>Entrega</th>
                            <th>Estado</th>
                            <th>Opciones</th>                                    
                        </tr>
                    </thead>
                    <tbody id="tableRents"> 
                                        
                    </tbody>
                </table>
            </div>
        `;
        showRents();
    }

    function deleteRent(id){
        var product = firebase.database().ref("Rentas/"+id);
        product.remove();
        document.getElementById("rents").innerHTML=``;
        showRents();
        reset();
        confirm("Pedido eliminado!");
    }