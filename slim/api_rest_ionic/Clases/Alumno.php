<?php
require_once"AccesoDatos.php";
require_once"Usuario.php";

class Alumno extends Usuario
{

	public $id_alumno;
    public $id_usuario;

    public function Set_idAlumno($valor)
	{
		$this->id_alumno = $valor;
	}	

	public function SetIdUsuario($valor)
	{
		$this->id_usuario = $valor;
	}	

	public function __construct($datos)
	{	
		parent::__construct($datos);
		$this->tipo="Alumno";   
	}


	public static function TraerNombreYlegajoAlumno() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT alumnos.id_alumno, usuarios.nombre, usuarios.apellido, usuarios.legajo FROM usuarios inner join alumnos on usuarios.id_usuario = alumnos.id_usuario");
		$consulta->execute();
		$alumnos= $consulta->fetchAll(PDO::FETCH_ASSOC);	
		return $alumnos;	
	}


    public static function TraerAlumnosporComision($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT alumnos.id_alumno, usuarios.*,materias.*,comisiones.* FROM `alumnos-materias` inner join alumnos on `alumnos-materias`.id_alumno = alumnos.id_alumno inner join usuarios on usuarios.id_usuario=alumnos.id_usuario inner join materias on `alumnos-materias`.id_materia = materias.id_materia inner join comisiones on `alumnos-materias`.id_comision = comisiones.id_comision where comisiones.id_comision=:idcom");
		$consulta->bindValue(':idcom', $id, PDO::PARAM_INT);
		$consulta->execute();
		$alumnos= $consulta->fetchAll(PDO::FETCH_ASSOC);	
		return $alumnos;	
	}

	public static function TraerAlumno($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT usuarios.*,alumnos.* FROM usuarios inner join alumnos on usuarios.id_usuario=alumnos.id_usuario where alumnos.id_usuario =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$alumno= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $alumno;
					
	}
	
	public function InsertarAlumno()
	{
        $retorno=false;

        if($this->InsertarUsuario()){

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into alumnos (id_usuario)values(:id_us)");
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


	public static function InscribirAlumno($datos)
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
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into `alumnos-materias` (id_alumno,id_materia,id_division,id_comision,estado)values(:a,:m,:d,:c,'Regular')");
            $consulta->bindValue(':a', $datos['id'], PDO::PARAM_INT);
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

