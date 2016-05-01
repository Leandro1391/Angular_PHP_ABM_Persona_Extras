<?php 

include "clases/Personas.php"; //inlcuimos la clase persona
// $_GET['accion'];
if(isset($_GET['accion']))// si el GET accion existe
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();  //se crea un array
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Persona::TraerTodasLasPersonas();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}


	

}
else{
//var_dump($_REQUEST);


	/*esto es para cuando se configura el headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	POR EJEMPLO 
	$http.post("PHP/nexo.php",{accion :"borrar",persona:persona},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
	*/

	//echo "<br> Datos pasados por POST"; //Forma para inspeccionar
	//var_dump($_POST); //instruccion de programacion III tiene que devolver algo





	
	/*
	esto es para cuando se pasan los datos por json
	por ejemplo
	$http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	  .then(function(respuesta) {     	
 		     //aca se ejetuca si retorno sin errores      	
      	 console.log(respuesta.data);

    },function errorCallback(response) {     		
     		//aca se ejecuta cuando hay errores
     		console.log( response);     			
 	  });*/

	$DatosPorPost = file_get_contents("php://input");  //siempre se usan para pasar datos por POST
	$respuesta = json_decode($DatosPorPost);
	var_dump($respuesta); //sirve para inspeccionar en la consola los niveles de datos que estoy pasando

	switch ($respuesta->datos->accion) {
		case 'borrar':
			Persona::BorrarPersona($respuesta->datos->persona);
			break;
		case 'insertar':
			echo "voy a guardar"; //para saber si pasa por este caso en la consola
			Persona::InsertarPersona($respuesta->datos->persona);
			break;

		case 'modificar':
			echo "voy a modificar";
			//Persona::ModificarPersona();
			break;
		default:
			echo "no ingresó en ninguno";
			break;
	}




	//echo $respuesta->datos->persona->nombre;

	//Persona::InsertarPersona($respuesta->datos->persona); //Llama al método estático InsertarPersona de la Clase Persona 
	//para que los datos queden registrados en la BD


}



 ?>