<?php

    $link = mysqli_connect("127.0.0.1","root","", "SevenX") or die("<h2>No se encuentra el servidor</h2>" .mysqli_connect_error());
    $db = mysqli_select_db($link, 'SevenX') or die("<h2>Error de conexion</h2>" .mysqli_error());

    $sql = "SELECT * FROM Autos";

    $consult = mysqli_query($link, $sql);

?>

<!DOCTYPE html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--=== Favicon ===-->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

    <title>SevenX</title>

    <!--=== Bootstrap CSS ===-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <!--=== Slicknav CSS ===-->
    <link href="assets/css/plugins/slicknav.min.css" rel="stylesheet">
    <!--=== Magnific Popup CSS ===-->
    <link href="assets/css/plugins/magnific-popup.css" rel="stylesheet">
    <!--=== Owl Carousel CSS ===-->
    <link href="assets/css/plugins/owl.carousel.min.css" rel="stylesheet">
    <!--=== Gijgo CSS ===-->
    <link href="assets/css/plugins/gijgo.css" rel="stylesheet">
    <!--=== FontAwesome CSS ===-->
    <link href="assets/css/font-awesome.css" rel="stylesheet">
    <!--=== Theme Reset CSS ===-->
    <link href="assets/css/reset.css" rel="stylesheet">
    <!--=== Main Style CSS ===-->
    <link href="style.css" rel="stylesheet">
    <!--=== Responsive CSS ===-->
    <link href="assets/css/responsive.css" rel="stylesheet">


    <!--[if lt IE 9]>
        <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            text-align: left;
            padding: 8px;
        }
    </style>
</head>

<body class="loader-active">

    <!--== Preloader Area Start ==-->
    <div class="preloader">
        <div class="preloader-spinner">
            <div class="loader-content">
                <img src="assets/img/preloader.gif" alt="JSOFT">
            </div>
        </div>
    </div>
    <!--== Preloader Area End ==-->

    <!--== Header Area Start ==-->
    <header id="header-area" class="fixed-top">
        <!--== Header Bottom Start ==-->
        <div id="header-bottom">
            <div class="container">
                <div class="row">
                    <!--== Logo Start ==-->
                    <div class="col-lg-4">
                        <a href="index.html" class="logo">
                            <img src="assets/img/logo.png" alt="JSOFT">
                        </a>
                    </div>
                    <!--== Logo End ==-->

                    <!--== Main Menu Start ==-->
                    <div class="col-lg-8 d-none d-xl-block">
                        <nav class="mainmenu alignright">
                            <ul>
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="about.html">Nosotros</a></li>
                                <li><a href="services.html">Servicios</a></li>
                                <li><a href="catalog.php">Autos</a></li>
                                <li><a href="login.html">Iniciar sesión</a>
                                    <ul>
                                        <li><a href="login.html">Iniciar sesión</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contacto</a></li>
                            </ul>
                        </nav>
                    </div>
                    <!--== Main Menu End ==-->
                </div>
            </div>
        </div>
        <!--== Header Bottom End ==-->
    </header>
    <!--== Header Area End ==-->

    <!--== Page Title Area Start ==-->
    <section id="page-title-area" class="section-padding overlay">
        <div class="container">
            <div class="row">
                <!-- Page Title Start -->
                <div class="col-lg-12">
                    <div class="section-title  text-center">
                        <h2>Catalogo</h2>
                        <span class="title-line"><i class="fa fa-car"></i></span>
                        <p>Aqui podras realizar tu pedido!</p>
                    </div>
                </div>
                <!-- Page Title End -->
            </div>
        </div>
    </section>
    <!--== Page Title Area End ==-->

    <!--== Login Page Content Start ==-->
    <div class="contact-page-wrao section-padding">
        <div class="container">
            <h2>Ingresa los datos para realizar un pedido</h2>
            <form action="hacerPedido.php" method="POST">
                <input placeholder="Nombre completo" type="text" name="nombre"/>
                <input placeholder="Ingresa el id del auto" style="margin-left: 100px;"  type="text" name="auto" value="<?php $auto['Id_auto'];?>"> <br/><br/>
                Salida:<input placeholder="dd/mm/aaaa" type="date" name="salida"/>
                Devolucion:<input placeholder="dd/mm/aaaa" style="margin-left: 100px;" type="date" name="devolucion"/><br/><br/>
                <button name="Hacer pedido" type="submit" class="btn btn-primary">Hacer pedido</button>
            </form>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th width="200">Id del auto</th>
                        <th width="200">Nombre</th>
                        <th width="200">Tipo</th>
                        <th width="200">Descripcion</th>
                        <th width="200">Imagen</th>

                    </tr>
                </thead>
                <tbody>
                    <?php
                    while($auto = $consult->fetch_assoc())
                    {
                    ?>
                    <tr>
                        <td><?php echo $auto['Id_auto'];?></td>
                        <td><?php echo $auto['Nombre'];?></td>
                        <td><?php echo $auto['Tipo'];?></td>
                        <td><?php echo $auto['Descripcion'];?></td>
                        <td><?php echo '<img src="data:image/jpeg;base64,'.base64_encode( $auto['Imagen'] ).'"/>' ?></td>
                    </tr>
                    <?php
                    }
                    ?>
                </tbody>
            </table
        </div>
    </div>
    <!--== Login Page Content End ==-->

    <!--== Footer Area Start ==-->
    <section id="footer-area">
        <!-- Footer Bottom Start -->
        <div class="footer-bottom-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <p>Copyright SevenX 2018</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Bottom End -->
    </section>
    <!--== Footer Area End ==-->

    <!--== Scroll Top Area Start ==-->
    <div class="scroll-top">
        <img src="assets/img/scroll-top.png" alt="JSOFT">
    </div>
    <!--== Scroll Top Area End ==-->

    <!--=======================Javascript============================-->
    <!--=== Jquery Min Js ===-->
    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <!--=== Jquery Migrate Min Js ===-->
    <script src="assets/js/jquery-migrate.min.js"></script>
    <!--=== Popper Min Js ===-->
    <script src="assets/js/popper.min.js"></script>
    <!--=== Bootstrap Min Js ===-->
    <script src="assets/js/bootstrap.min.js"></script>
    <!--=== Gijgo Min Js ===-->
    <script src="assets/js/plugins/gijgo.js"></script>
    <!--=== Vegas Min Js ===-->
    <script src="assets/js/plugins/vegas.min.js"></script>
    <!--=== Isotope Min Js ===-->
    <script src="assets/js/plugins/isotope.min.js"></script>
    <!--=== Owl Caousel Min Js ===-->
    <script src="assets/js/plugins/owl.carousel.min.js"></script>
    <!--=== Waypoint Min Js ===-->
    <script src="assets/js/plugins/waypoints.min.js"></script>
    <!--=== CounTotop Min Js ===-->
    <script src="assets/js/plugins/counterup.min.js"></script>
    <!--=== YtPlayer Min Js ===-->
    <script src="assets/js/plugins/mb.YTPlayer.js"></script>
    <!--=== Magnific Popup Min Js ===-->
    <script src="assets/js/plugins/magnific-popup.min.js"></script>
    <!--=== Slicknav Min Js ===-->
    <script src="assets/js/plugins/slicknav.min.js"></script>

    <!--=== Mian Js ===-->
    <script src="assets/js/main.js"></script>

</body>

</html>