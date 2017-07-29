<?php
require_once"AccesoDatos.php";
require_once"Usuario.php";

class Profesor extends Usuario
{
	public $id_profesor;

    public function Set_idprofesor($valor)
	{
		$this->id_profesor = $valor;
	}		

    public function __construct($datos)
	{	
		parent::__construct($datos);
        $this->tipo="Profesor"; 
	}


	public function InsertarProfesor()
	{
        $retorno=false;

        if($this->InsertarUsuario()){

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into profesores (id_usuario)values(:id_us)");
            $consulta->bindValue(':id_us', $this->id_usuario, PDO::PARAM_INT);

           if( !($consulta->execute()) ){
                Usuario::Borrar($this->id_usuario);
            }
            else{
                $retorno=true;
            }
        }

        return $retorno;
	}


    public static function TraerProfesores() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT profesores.id_profesor, usuarios.nombre, usuarios.apellido, usuarios.legajo FROM usuarios inner join profesores on usuarios.id_usuario = profesores.id_usuario");
		$consulta->execute();
		$alumnos= $consulta->fetchAll(PDO::FETCH_ASSOC);	
		return $alumnos;	
	}
	

    public static function AsignarMateria($datos)
	{
        $retorno=false;

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id_comision FROM comisiones WHERE id_materia=:m AND id_division=:d");
        $consulta->bindValue(':m', $datos['materia'], PDO::PARAM_INT);
		$consulta->bindValue(':d', $datos['division'], PDO::PARAM_INT);
		$consulta->execute();
		
		$dato=$consulta->fetchAll(PDO::FETCH_ASSOC);
		

        if($dato[0]['id_comision']!=null){

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into `profesores-materias` (id_profesor,id_materia,id_division,id_comision)values(:id,:m,:d,:c)");
            $consulta->bindValue(':id', $datos['id'], PDO::PARAM_INT);
			$consulta->bindValue(':m', $datos['materia'], PDO::PARAM_INT);
			$consulta->bindValue(':d', $datos['division'], PDO::PARAM_INT);
			$consulta->bindValue(':c', $dato[0]['id_comision'], PDO::PARAM_INT);

           if( !($consulta->execute()) ){
                $retorno=false;
            }
            else{
                $retorno=true;
            }
        }

        return $retorno;	
	}
}