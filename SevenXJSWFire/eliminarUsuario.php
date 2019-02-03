<?php
   //Conexion con la bd y el server
   $link = mysqli_connect("127.0.0.1","root","", "SevenX") or die("<h2>No se encuentra el servidor</h2>" .mysqli_connect_error());
   $db = mysqli_select_db($link, 'SevenX') or die("<h2>Error de conexion</h2>" .mysqli_error());

   //Obtener valores
   $id = $_POST['id'];

   mysqli_query($link,"DELETE FROM Usuarios WHERE Id_usuario='$id'") or die ('<h2>Error al eliminar datos</h2> <a href="registerUser.php">Aceptar</a>');

   echo '
        <h2>Administrador eliminado</h2>
        <a href="registerUser.php">Aceptar</a>
      ';
   
?>