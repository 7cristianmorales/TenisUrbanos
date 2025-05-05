<?php
	/*Creamos la conexion al db, llamando el archivo que tiene la conexion*/
	require 'Conexion.php';
	
    // Recibir datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $talla = $_POST['talla'];
    $archivo = $_FILES['archivo']['name']; // Nombre del archivo subido
    $observaciones = $_POST['observaciones'];
	
	// Query para insertar datos en la tabla personas
    $sql = "INSERT INTO personas (nombre, apellido, correo, direccion, telefono, talla, archivo, observaciones) 
            VALUES ('$nombre', '$apellido', '$correo', '$direccion', '$telefono', '$talla', '$archivo', '$observaciones')";

	/*con esta instruccion se ejecuta el query usando la variable de conexion que esta en el archivo conexion.php */
	$resultado = $mysqli->query($sql);

    // Mostrar mensaje
    if ($resultado) {
        echo "<h2>Registro exitoso</h2>";
        echo "<p><a href='Contacto.html'>Volver al formulario</a></p>";
    } else {
        echo "<h2>Error en el registro</h2>";
        echo "<p><a href='Contacto.html'>Intentar nuevamente</a></p>";
    }
    
    // Cerrar conexión
    $mysqli->close();
	
?>

