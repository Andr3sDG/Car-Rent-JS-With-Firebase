<?php
   //Conexion con la bd y el server
   $link = mysqli_connect("127.0.0.1","root","", "SevenX") or die("<h2>No se encuentra el servidor</h2>" .mysqli_connect_error());
   $db = mysqli_select_db($link, 'SevenX') or die("<h2>Error de conexion</h2>" .mysqli_error());

   //Obtener valores
   $nombre = $_POST['nombre'];
   $auto = $_POST['auto'];
   $salida = $_POST['salida'];
   $devolucion = $_POST['devolucion'];
   $estado = "renta";

   //Obtener longitud 
   $req = (strlen($nombre)*strlen($auto)*strlen($salida)*strlen($devolucion)*strlen($estado)) or die('<h2>Error al insertar datos</h2><a href="catalog.php">Volver</a>'.mysqli_error());

   //Encriptacion de contraseña
   //$pw = md5($pw);

   //Ingresar informacion a la tabla
   mysqli_query($link, "INSERT INTO Pedidos VALUES ('','$nombre','$auto','$salida','$devolucion','$estado')") or die('<h2>Error al insertar datos</h2><a href="catalog.php">Volver</a>'.mysqli_error());

   echo '
      <h2>Pedido realizado</h2>
      <a href="catalog.php">Tu pedido ha sido enviado, pasa a las oficinas para terminar el proceso</a>
      ';
?>