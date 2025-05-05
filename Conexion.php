<?php
	
	$mysqli = new mysqli('localhost', 'root', '', 'personal');
	
	if($mysqli->connect_error){
		
		die('Error en la conexion' . $mysqli->connect_error);
		
	}
	printf ("Servidor Informacion: %s\n", $mysqli->server_info);
?>