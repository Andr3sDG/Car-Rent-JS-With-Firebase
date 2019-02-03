var config = {
    apiKey: "AIzaSyBrle_XdA0OC5YqqGELN39mbg35IqA1MM0",
    authDomain: "sevenx-a6962.firebaseapp.com",
    databaseURL: "https://sevenx-a6962.firebaseio.com",
    projectId: "sevenx-a6962",
    storageBucket: "sevenx-a6962.appspot.com",
    messagingSenderId: "901029796656"
  };
  firebase.initializeApp(config);

///////////////////PRODUCTOS///////////////////////////////
var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("car").addEventListener("submit", (e)=>{
    var nombre = document.getElementById("nombre").value;
    var tipo = document.getElementById("tipo").value;
    var cantidad = document.getElementById("cantidad").value;
    var file = document.getElementById("fileButton").files[0].name;
    console.log(file);
    var descripcion = document.getElementById("descripcion").value;
    e.preventDefault();
    sendCar(nombre,tipo,cantidad,file,descripcion);
});

var fileButton = document.getElementById("fileButton");

fileButton.addEventListener("change", function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref("Car/"+file.name);
    storageRef.put(file);
});

function addImage(){
    var file = e.target.files[0];

    var storageRef = firebase.storage().ref("Car/"+file.name);
    var task = storageRef.put(file);
    task.on("state_changed",
        function progress(shapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err){

        },
        function complete(){

        }
    );
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

function sendCar(name,tipo,cantidad,file,descripcion){
    counter+=1;
    var product = {
        Id_product: counter, 
        Nombre: name,
        Tipo: tipo,
        Cantidad: cantidad,
        Imagen: file,
        Descripcion: descripcion
    }
    let db = firebase.database().ref("Product/"+counter);
    db.set(product);
    confirm("Producto registrado!");
}

function showProduct(){
    var product = firebase.database().ref("Product/");
    product.on("child_added", function(data){
        var productValue = data.val();
        document.getElementById("tableProduct").innerHTML+=`
            <tr>
                <td>${productValue.Id_product}</td>
                <td>${productValue.Nombre}</td>
                <td>${productValue.Tipo}</td>
                <td>${productValue.Cantidad}</td>
                <td>${productValue.Descripcion}</td>
                <td>
                    <button type="submit" style="color: white" class="btn btn-warning" onClick="updateProduct(${productValue.Id_product},'${productValue.Nombre}','${productValue.Tipo}','${productValue.Cantidad}','${productValue.Imagen}','${productValue.Descripcion}')">Editar producto</button>
                    <button style="color: white" class="btn btn-danger" onClick="deleteProduct(${productValue.Id_product})">Eliminar producto</button>
                </td>
            </tr>
        `
        });
    }

function reset(){
    document.getElementById("producto").innerHTML=`
        <div class="row">
            <div class="col-lg-10 m-auto">
                <div class="contact-form">
                    <form id="car">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="name-input">
                                    <input id="nombre" type="text" placeholder="Nombre del vehiculo">
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <label for="exampleSelect1">Tipo</label>
                                    <select id="tipo" class="name-input">
                                        <option>Camioneta</option>
                                        <option>Sedan</option>
                                        <option>Motocicleta</option>
                                    </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="website-input">
                                    <input id="cantidad" type="text" placeholder="cantidad">
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <label for="exampleInputFile">Agregar una imagen</label>
                                <input id="file" type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                            </div>
                        </div>

                        <div class="message-input">
                            <textarea id="descripcion" cols="30" rows="10" placeholder="Descripcion"></textarea>
                        </div>

                        <div class="input-submit">
                            <button type="submit">Agregar auto</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>

            <div class="row">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Imagen</th>       
                            <th>Descripcion</th> 
                            <th>Opciones</th>                             
                        </tr>
                    </thead>
                    <tbody id="tableProduct"> 
                                        
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById("car").addEventListener("submit", (e)=>{
        var nombre = document.getElementById("nombre").value;
        var tipo = document.getElementById("tipo").value;
        var cantidad = document.getElementById("cantidad").value;
        var file = document.getElementById("file").value;
        var descripcion = document.getElementById("descripcion").value;
        e.preventDefault();
        sendCar(nombre,tipo,cantidad,file,descripcion);
        document.getElementById("registrar").reset();
        showProduct();
    });
}

function updateProduct(id,nombre,tipo,cantidad,imagen,descripcion){
    document.getElementById("producto").innerHTML=`
        <div class="row">
            <div class="col-lg-10 m-auto">
                <div class="contact-form">
                    <form id="car2">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="name-input">
                                    <input id="nombre" type="text" placeholder="Nombre del vehiculo">
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <label for="exampleSelect1">Tipo</label>
                                    <select id="tipo" class="name-input">
                                        <option>Camioneta</option>
                                        <option>Sedan</option>
                                        <option>Motocicleta</option>
                                    </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <div class="website-input">
                                    <input id="cantidad" type="text" placeholder="cantidad">
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <label for="exampleInputFile">Agregar una imagen</label>
                                <input id="file" type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                            </div>
                        </div>

                        <div class="message-input">
                            <textarea id="descripcion" cols="30" rows="10" placeholder="Descripcion"></textarea>
                        </div>

                        <div class="input-submit">
                            <button style="display: none" type="submit">Agregar auto</button>
                            <button style="display: inline-block" type="submit" id="btn-update" class="btn btn-success">Modificar</button>
                            <button style="display: inline-block" type="click" id="btn-delete" class="btn btn-danger">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="row">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Imagen</th>       
                        <th>Descripcion</th> 
                        <th>Opciones</th>                             
                    </tr>
                </thead>
                <tbody id="tableProduct"> 
                                    
                </tbody>
            </table>
        </div>
    `;
    document.getElementById("car2").addEventListener("submit", (e)=>{
        e.preventDefault();
    });
    document.getElementById("btn-delete").addEventListener("click", (e)=>{
        reset();
    });
    document.getElementById("btn-update").addEventListener("click", (e)=>{
        updateCar(
            id,
            document.getElementById("nombre").value,
            document.getElementById("tipo").value,
            document.getElementById("cantidad").value,
            document.getElementById("file").value,
            document.getElementById("descripcion").value
        )
    });
    document.getElementById("nombre").value=nombre;
    document.getElementById("tipo").value=tipo;
    document.getElementById("cantidad").value=cantidad;
    document.getElementById("descripcion").value=descripcion;

}

function updateCar(id,nombre,tipo,cantidad,imagen,descripcion){
    var productoModificado = {
        Id_product: id, 
        Nombre: nombre,
        Tipo: tipo,
        Cantidad: cantidad,
        Imagen: imagen,
        Descripcion: descripcion
    }
    let db = firebase.database().ref("Product/"+id);
    db.set(productoModificado);

    document.getElementById("producto").innerHTML='';
    showProduct();
    reset();
    confirm("Producto registrado!");
}

function deleteProduct(id){
    var product = firebase.database().ref("Product/"+id);
    product.remove();
    document.getElementById("producto").innerHTML='';
    showProduct();
    reset();
    confirm("Producto eliminado!");
}

///////////////////PRODUCTOS///////////////////////////////