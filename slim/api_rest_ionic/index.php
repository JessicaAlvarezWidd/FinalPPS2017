<?php
    require_once "Clases/Alumno.php";
    require_once "Clases/Usuario.php";
    require_once "Clases/Administrativo.php";
    require_once "Clases/Profesor.php";
    require_once "Clases/Materia.php";
    require_once "Clases/Division.php";
    require_once "Clases/Comision.php";
    require_once "Clases/Asistencia.php";
    require 'vendor/autoload.php';

	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;


	$app = new Slim\App;
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    $app->add(function ($req, $res, $next) {
        $response = $next($req, $res);
        return $response
                ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8100')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    });

//-----------------------------------------Usuarios-----------------------------------------//

    $app->get('/usuarios/TraerLegajos', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::TraerLegajos()
                    )
                ); 
            });

     $app->get('/usuarios/TraerEmails', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::TraerEmails()
                    )
                ); 
            });       

      $app->post('/usuarioPorEmail', function (Request $request, Response $response) {

               $emailuser= $request->getParsedBody();

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::TraerUsuarioPorEmails($emailuser['email'])
                    )
                ); 
            });

      $app->get('/TraerUsuarios', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::TraerTodosLosUsuarios()
                    )
                ); 
            });             

    $app->post('/eliminarUsuario', function (Request $request, Response $response) {

               $dato= $request->getParsedBody();

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Usuario::BorrarUsuario($dato['id'])
                    )
                ); 
            });  

    $app->post('/modificarUsuario', function ($request,$res) {

                $dato= $request->getParsedBody();
                $nuevoUsuario=new Usuario($dato);
                $nuevoUsuario->SetId_usuario($dato['id_usuario']);

                $respuesta=false;

                if($nuevoUsuario->ModificarUsuario()){
                    $respuesta=true;
                }                    
            
            return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $respuesta
                )
            );
        });                    
//-----------------------------------------Alumnos-----------------------------------------//


    $app->post('/agregarAlumno', function ($request,$res) {

                $datosForm= $request->getParsedBody();

                $nuevoAlumno = new Alumno($datosForm);

                $respuesta=false;

                if($nuevoAlumno->InsertarAlumno()){
                    $respuesta=true;
                }                    
            
            return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $respuesta
                )
            );
        });


       $app->get('/alumnos/alumnosPorComision/{comision}', function (Request $request, Response $response) {

                $comision=$request->getAttribute('comision');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Alumno::TraerAlumnosporComision($comision)
                    )
                ); 
            }); 


        $app->get('/alumnos/TraerNombreYlegajoAlumno', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Alumno::TraerNombreYlegajoAlumno()
                    )
                ); 
            });                   


      $app->post('/inscribirAlumno', function ($request,$res) {

                $datosForm= $request->getParsedBody();

                $respuesta=false;

                if(Alumno::InscribirAlumno($datosForm)){
                    $respuesta=true;
                }                    
            
            return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $respuesta
                )
            );
        });      
//-----------------------------------------Administrativos-----------------------------------------//


    $app->post('/agregarAdministrativo', function ($request,$res) {

                    $datosForm= $request->getParsedBody();

                    $nuevoAdministrativo = new Administrativo($datosForm);

                    $respuesta=false;

                    if($nuevoAdministrativo->InsertarAdministrativo()){
                        $respuesta=true;
                    }                    
                return $res
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        $respuesta
                    )
                );
            });


//-----------------------------------------Materias-----------------------------------------//

    $app->get('/materias/TraerMaterias', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Materia::TraerMaterias()
                    )
                ); 
            });


     $app->post('/agregarMateria', function ($request,$res) {

                    $datosForm= $request->getParsedBody();

                    $nuevaMateria = new Materia($datosForm);

                    $respuesta=false;

                    if($nuevaMateria->InsertarMateria()){
                        $respuesta=true;
                    }                    
                return $res
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        $respuesta
                    )
                );
            }); 

//-----------------------------------------Divisiones-----------------------------------------//

     $app->get('/divisiones/TraerDivisiones', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Division::TraerDivisiones()
                    )
                ); 
            });

     $app->get('/divisiones/TraerDivisionesPorCuatrimestre/{cuatrimestre}', function (Request $request, Response $response) {

                $cuatrimestre=$request->getAttribute('cuatrimestre');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                       Division::TraerDivisionesPorCuatrimestre($cuatrimestre)
                    )
                ); 
            });       

     $app->post('/agregarDivision', function ($request,$res) {

                    $datosForm= $request->getParsedBody();

                    $nuevaDivision = new Division($datosForm);

                    $respuesta=false;

                    if($nuevaDivision->InsertarDivision()){
                        $respuesta=true;
                    }                    
                return $res
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        $respuesta
                    )
                );
            }); 

//-----------------------------------------Comisiones-----------------------------------------//            
    $app->post('/agregarComision', function ($request,$res) {

                $datosForm= $request->getParsedBody();

                $nuevaComision = new Comision($datosForm);

                $respuesta=false;

                if($nuevaComision->InsertarComision()){
                        $respuesta=true;
                } 

                return $res
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        $respuesta
                    )
                );
            }); 


            $app->get('/comisiones/comisionPorDia/{dia}', function (Request $request, Response $response) {

                $dia=$request->getAttribute('dia');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Comision::TraerComisionesPorDia($dia)
                    )
                ); 
            });

             $app->get('/comisiones/comisionPorAula/{aula}', function (Request $request, Response $response) {

                $aula=$request->getAttribute('aula');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Comision::TraerComisionesPorAula($aula)
                    )
                ); 
            });


            $app->get('/comisiones/comisionPorMateria/{materia}', function (Request $request, Response $response) {

                $materia=$request->getAttribute('materia');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Comision::TraerComisionesPorMateria($materia)
                    )
                ); 
            }); 

           $app->get('/comisiones/comisionPorProfesor/{profesor}', function (Request $request, Response $response) {

                $profesor=$request->getAttribute('profesor');

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Comision::TraerComisionesPorProfesor($profesor)
                    )
                ); 
            });

          $app->get('/comisiones/TraerComisiones', function (Request $request, Response $response) {
                 
                 return $response
                 ->withHeader('Content-type', 'application/json')
                 ->getBody()
                 ->write(
                     json_encode(
                         Comision::TraerComisiones()
                     )
                ); 
             });        
//-----------------------------------------Profesores-----------------------------------------//    
    $app->post('/agregarProfesor', function ($request,$res) {

                    $datosForm= $request->getParsedBody();

                    $nuevoProfesor = new Profesor($datosForm);

                    $respuesta=false;
                   
                    if($nuevoProfesor->InsertarProfesor()){
                        $respuesta=true;
                    }              
                return $res
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        $respuesta
                    )
                );
            });


      $app->get('/TraerProfesores', function (Request $request, Response $response) {

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                        Profesor::TraerProfesores()
                    )
                ); 
            });  

      $app->post('/profesor/asignarMateria', function ($request,$res) {

                $datosForm= $request->getParsedBody();

                $respuesta=false;

                if(Profesor::AsignarMateria($datosForm)){
                    $respuesta=true;
                }                    
            
            return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $respuesta
                )
            );
        }); 

 //-----------------------------------------Asistencia-----------------------------------------//                       
      
      $app->post('/guardarAsistencias', function ($request,$res) {

                $datosForm= $request->getParsedBody();

                $respuesta=false;

              if(Asistencia::InsertarAsistencias($datosForm)){
                    $respuesta=true;
                }                
            
            return $res
            ->withHeader('Content-type', 'application/json')
            ->getBody()
            ->write(
                json_encode(
                    $respuesta
                )
            );
        });          


     $app->post('/VerAsistenciaPorComisionyFecha', function (Request $request, Response $response) {

               $datos= $request->getParsedBody();

                return $response
                ->withHeader('Content-type', 'application/json')
                ->getBody()
                ->write(
                    json_encode(
                       Asistencia::TraerAsistenciasPorComisionyFecha($datos)
                    )
                ); 
            }); 




 //-----------------------------------------TOKEN-----------------------------------------//   

    $app->post('/crearToken', function ($request,$res) {

        $datosForm= $request->getParsedBody();          
        $userObtenido= Usuario::TraerUsuarioPorEmailyPass($datosForm);

        $respuesta = new stdClass();
        $respuesta->exito = false;

        if ($userObtenido == false)
            $respuesta->mensaje = "Error verifique sus datos";
        else
        {
            $respuesta->exito = true;

            $key = "example_key";
            $token = array(
                "iss" => "http://example.org",
                "aud" => "http://example.com",
                "iat" => 1356999524,
                "nbf" => 1357000000,
                "usuario" => $userObtenido
            );
            $respuesta->tokenGenerado = JWT::encode($token, $key);
        }

		return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
               $respuesta
            )
        );
	});


    $app->get('/obtenerToken', function (Request $request, Response $response) {

        $headers = apache_request_headers();
        $key = "example_key";

        $respuesta = new stdClass();
        $respuesta->exito = false;
        $respuesta->header=$headers;
        $respuesta->mensaje="llegoo";

        $tk = explode(' ', $headers['Authorization']);
        
        try 
        {
            $decoded = JWT::decode($tk[1], $key, array('HS256'));
        } 
        catch (Exception $e)            
        {
        }
        if ($decoded)
        {
            $respuesta->exito = true;
            $respuesta->tokenDecode = $decoded;
        }
        
		return $response
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
                $respuesta
            )
		  ); 
	});		                       
////////////////////////////////////////////////////////////////////
	$app->run();

?>


