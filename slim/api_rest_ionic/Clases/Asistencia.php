<?php
require_once"AccesoDatos.php";

class Asistencia
{

	public $id_alumno;
    public $id_comision;
    public $fecha;
    public $estado;
    

	public function __construct($datos)
	{			
		$this->id_alumno=$datos['id_alumno'];
        $this->id_comision=$datos['id_comision'];
        $this->fecha=$datos['fecha'];
        $this->estado=$datos['estado'];        
	}   
	
	public static function InsertarAsistencias($datos)
	{

		foreach($datos as $dato){
			$string.="(".$dato['id_alumno'].",".$dato['id_comision'].",'".$dato['fecha']."','".$dato['estado']."'),";
		}

		$string = trim($string, ',');
        $consulta="INSERT INTO asistencias (id_alumno, id_comision, fecha, estado) VALUES";
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta($consulta.$string);

        $retorno=$consulta->execute()?true:false;
        
        return $retorno;	
	}

    public static function TraerAsistenciasPorComisionyFecha($datos) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT `asistencias`.*,usuarios.legajo, usuarios.nombre, usuarios.apellido FROM asistencias inner join alumnos on asistencias.id_alumno=alumnos.id_alumno inner join usuarios on alumnos.id_usuario=usuarios.id_usuario WHERE `asistencias`.id_comision=:id AND `asistencias`.fecha=:fecha");
		$consulta->bindValue(':id',$datos['comision'], PDO::PARAM_INT);
        $consulta->bindValue(':fecha',$datos['fecha'], PDO::PARAM_INT);
		$consulta->execute();
		$asistencias= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $asistencias;
					
	}

}