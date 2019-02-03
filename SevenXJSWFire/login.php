<?php
    //Conexion con la bd y el server
    $link = mysqli_connect("127.0.0.1","root","", "SevenX") or die("<h2>No se encuentra el servidor</h2>" .mysqli_connect_error());
    $db = mysqli_select_db($link, 'SevenX') or die("<h2>Error de conexion</h2>" .mysqli_error());

    if(isset($_POST['iniciar'])){
        if($_POST['email'] != "" && $_POST['contrasena'] != "") {
            $email = $_POST['email'];
            $pw = $_POST['contrasena'];

            $consulta = "SELECT * FROM Usuarios WHERE Correo='$email' AND Contrasena='$pw' ";
            $result = mysqli_query($link,$consulta);

            $rows = mysqli_num_rows($result);

            if($rows>0){
                echo '
                    <h2>Bienvenido</h2>
                    <a href="admin.html">Entrar</a>
                ';

            } else {
                echo '
                    <h2>Correo o contraseña incorrecta</h2>
                    <a href="login.html">Volver</a>
                ';
            }
        } else {
            echo '
                    <h2>Favor de llenar los campos vacios</h2>
                    <a href="login.html">Volver</a>
                ';
        }

    }

?>