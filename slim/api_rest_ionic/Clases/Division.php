<?php
require_once"AccesoDatos.php";
class Division
{	
	public $id_division;
	public $descripcion;
	public $cuatrimestre; 

    public function SetId_division($valor)
	{
		$this->id_division = $valor;
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

	
	public function InsertarDivision()
	{ 
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into divisiones (descripcion,cuatrimestre)values(:des,:c)");
		$consulta->bindValue(':des', $this->descripcion, PDO::PARAM_STR);	
		$consulta->bindValue(':c', $this->cuatrimestre, PDO::PARAM_INT);
			
		$retorno=$consulta->execute()?true:false;

		return $retorno;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from divisiones WHERE id_division=:id");				
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		
        $retorno=$consulta->execute()?true:false;

        return $retorno;
	}


	public static function TraerDivisiones() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from divisiones");
		$consulta->execute();
		$divisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $divisiones;					
	}

    public static function TraerDivisionesPorCuatrimestre($cuatrimestre){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from divisiones WHERE cuatrimestre=:c");
        $consulta->bindValue(':c',$cuatrimestre, PDO::PARAM_INT);
		$consulta->execute();
		$divisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $divisiones;
    }

}