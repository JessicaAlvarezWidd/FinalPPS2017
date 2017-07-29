<?php
require_once"AccesoDatos.php";
class Comision
{	
	public $id_comision;
	public $id_materia;
	public $id_division;
    public $aula;
    public $dia;
    public $turno; 

	public function __construct($datos)
	{
		$this->id_materia = $datos['materia'];
		$this->id_division = $datos['division'];   
        $this->aula = $datos['aula'];
        $this->dia = $datos['dia'];
        $this->turno = $datos['turno'];      
	}

	
	public function InsertarComision()
	{ 
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into comisiones (id_materia,id_division,aula,dia,turno)values(:m,:d,:a,:dia,:t)");
		$consulta->bindValue(':m', $this->id_materia, PDO::PARAM_INT);	
		$consulta->bindValue(':d', $this->id_division, PDO::PARAM_STR);
        $consulta->bindValue(':a', $this->aula, PDO::PARAM_INT);
        $consulta->bindValue(':dia', $this->dia, PDO::PARAM_STR);
        $consulta->bindValue(':t', $this->turno, PDO::PARAM_INT);
			
		$retorno=$consulta->execute()?true:false;

		return $retorno;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from comisiones WHERE id_comision=:id");				
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		
        $retorno=$consulta->execute()?true:false;

        return $retorno;
	}


	public static function TraerComisiones() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from comisiones");
		$consulta->execute();
		$comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $comisiones;
					
	}
	
	public static function TraerComisionesConDivision() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT comisiones.*,divisiones.descripcion,divisiones.cuatrimestre from comisiones inner join divisiones on divisiones.id_division=comisiones.id_division");
		$consulta->execute();
		$comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $comisiones;
					
	}

    public static function TraerComisionesPorDia($dia) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT materias.descripcion as nombreMateria ,divisiones.descripcion,comisiones.* from comisiones inner join materias on comisiones.id_materia=materias.id_materia inner join divisiones on comisiones.id_division=divisiones.id_division WHERE comisiones.dia=:dia");				
		$consulta->bindValue(':dia',$dia, PDO::PARAM_STR);	
		$consulta->execute();
        $comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);

        return $comisiones;		
	}

     public static function TraerComisionesPorAula($aula) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT materias.descripcion as nombreMateria ,divisiones.descripcion,comisiones.* from comisiones inner join materias on comisiones.id_materia=materias.id_materia inner join divisiones on comisiones.id_division=divisiones.id_division WHERE comisiones.aula=:aula");				
		$consulta->bindValue(':aula',$aula, PDO::PARAM_INT);	
		$consulta->execute();
        $comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);

        return $comisiones;
					
	}


    public static function TraerComisionesPorMateria($idmateria) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT materias.descripcion as nombreMateria ,divisiones.descripcion,comisiones.* from comisiones inner join materias on comisiones.id_materia=materias.id_materia inner join divisiones on comisiones.id_division=divisiones.id_division WHERE comisiones.id_materia=:m");				
		$consulta->bindValue(':m',$idmateria, PDO::PARAM_INT);	
		$consulta->execute();
        $comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);

        return $comisiones;
					
	}

	 public static function TraerComisionesPorProfesor($id_profesor) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT materias.descripcion as nombreMateria ,divisiones.descripcion,comisiones.aula,comisiones.turno,comisiones.dia,comisiones.id_comision from `profesores-materias`inner join comisiones on `profesores-materias`.id_comision=comisiones.id_comision inner join materias on comisiones.id_materia=materias.id_materia inner join divisiones on comisiones.id_division=divisiones.id_division WHERE `profesores-materias`.id_profesor=:id");
		$consulta->bindValue(':id',$id_profesor, PDO::PARAM_INT);	
		$consulta->execute();
        $comisiones= $consulta->fetchAll(PDO::FETCH_ASSOC);

        return $comisiones;
	}

}