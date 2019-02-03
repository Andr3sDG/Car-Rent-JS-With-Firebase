<?php
   //Conexion con la bd y el server
   $link = mysqli_connect("127.0.0.1","root","", "SevenX") or die("<h2>No se encuentra el servidor</h2>" .mysqli_connect_error());
   $db = mysqli_select_db($link, 'SevenX') or die("<h2>Error de conexion</h2>" .mysqli_error());

   //Obtener valores
   $id = $_POST['id'];
   $nombre = $_POST['nombre'];
   $tipo = $_POST['tipo'];
   $cantidad = $_POST['cantidad'];
   $file = $_POST['file'];
   $descripcion = $_POST['descripcion'];

   //Obtener longitud 
   $req = (strlen($id)*strlen($nombre)*strlen($tipo)*strlen($cantidad)*strlen($file)*strlen($descripcion)) or die("No se han llenado todos los campos");

   //Encriptacion de contraseña
   //$pw = md5($pw);

   //Ingresar informacion a la tabla
   mysqli_query($link, "UPDATE Autos SET Nombre='$nombre', Tipo='$tipo', Cantidad='$cantidad', Descripcion='$descripcion', Imagen='$file' WHERE Id_auto='$id'") or die('<h2>Error al insertar datos</h2> <a href="product.php">Aceptar</a>'.mysqli_error());

   echo '
      <h2>Producto modificado</h2>
      <a href="product.php">Aceptar</a>
      ';
?>