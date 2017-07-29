<?php
require_once"AccesoDatos.php";
class Materia
{	
	public $id_materia;
	public $descripcion;
	public $cuatrimestre; 

    public function SetId_materia($valor)
	{
		$this->id_materia = $valor;
	}
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
	}
	public function SetCuatrimestre($valor)
	{
		$this->cuatrimestre = $valor;
	}

	public function __construct($datos)
	{
		$this->descripcion = $datos['descripcion'];
		$this->cuatrimestre = $datos['cuatrimestre'];      
	}

	
	public function InsertarMateria()
	{ 

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into materias (descripcion,cuatrimestre)values(:des,:c)");
		$consulta->bindValue(':des', $this->descripcion, PDO::PARAM_STR);	
		$consulta->bindValue(':c', $this->cuatrimestre, PDO::PARAM_INT);
			
		$retorno=$consulta->execute()?true:false;

		return $retorno;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from materias WHERE id_materia=:id");				
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
	}


	public static function TraerMaterias() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from materias");
		$consulta->execute();
		$materias= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $materias;
					
	}

}