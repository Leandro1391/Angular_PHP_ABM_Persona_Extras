
var app = angular.module('ABMangularPHP', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/Menu");
  //
  // Now set up the states
  $stateProvider
    .state('Menu', {
      url: "/Menu",
      templateUrl: "TemplateMenu.html",
      controller: 'controlMenu'
    })
    .state('Grilla', {
      url: "/Grilla",
      templateUrl: "TemplateGrilla.html",
      controller: 'controlGrilla'
    })
    .state('Alta', {
      url: "/Alta",
      templateUrl: "TemplateUsuario.html",
      controller: 'controlAlta'
    })
    .state('Modificar', {
      url: "/Modificar/{:id}?:nombre:apellido:dni:foto",
      templateUrl: "TemplateUsuario.html",
      controller: 'controlModificar'
      });
});



app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});

app.controller('controlModificar', function($scope, $http, $stateParams){
  $scope.DatoTest="**Modificar**";


  //muestra los atributos en la consola del navegador
  console.log($stateParams);


  //inicio las variables
  $scope.persona={};

  $scope.persona.id= $stateParams.id;
  $scope.persona.nombre=  $stateParams.nombre;
  $scope.persona.dni=  $stateParams.dni;
  $scope.persona.apellido= $stateParams.apellido;
  $scope.persona.foto= $stateParams.foto;


  $scope.Guardar=function(){


    console.log("persona a guardar:");
    console.log($scope.persona);
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})//funcion de ajax $http o con .then
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

  

  }


});


app.controller('controlAlta', function($scope, $http) {
  $scope.DatoTest="**alta**";

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";


  $scope.Guardar=function(){


    console.log("persona a guardar:");
    console.log($scope.persona);
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})//funcion de ajax $http o con .then
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

  

  }
});


app.controller('controlGrilla', function($scope, $http) {
    $scope.DatoTest="**grilla**";
  //http.get obtiene una lista
  $http.get('PHP/nexo.php', { params: {accion :"traer"}})  //La accion le paso todo el objeto(carga la lista)
  .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data.listado; //guarda en listadoPersona lo que devuelve GET
         console.log(respuesta.data);

    },function errorCallback(response) {
         $scope.ListadoPersonas= []; //si da error me da una lista vacia
        console.log( response);
          /*

          https://docs.angularjs.org/api/ng/service/$http

          the response object has these properties:

        data â€“ {string|Object} â€“ The response body transformed with the transform functions.
        status â€“ {number} â€“ HTTP status code of the response.
        headers â€“ {function([headerName])} â€“ Header getter function.
        config â€“ {Object} â€“ The configuration object that was used to generate the request.
        statusText â€“ {string} â€“ HTTP status text of the response.
            A response status code between 200 and 299 is considered a success
             status and will result in the success callback being called. 
             Note that if the response is a redirect, XMLHttpRequest will 
             transparently follow it, meaning that 
             the error callback will not be called for such responses.
   */
   });



  $scope.Borrar=function(persona){
    console.log("borrar"+persona);



$http.post("PHP/nexo.php",{datos :{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores
         $http.get('PHP/nexo.php', { params: {accion :"traer"}})  //La accion le paso todo el objeto
         .then(function(respuesta) {       

               $scope.ListadoPersonas = respuesta.data.listado; //guarda en listadoPersona lo que devuelve GET
               console.log(respuesta.data);

    },function errorCallback(response) {
         $scope.ListadoPersonas= []; //si da error me da una lista vacia
        console.log( response);
});        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

/*
     $http.post('PHP/nexo.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
  }




  $scope.Modificar=function(id){
    
    console.log("Modificar"+id);
  }



});
