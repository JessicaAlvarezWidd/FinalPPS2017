<?php
require_once"AccesoDatos.php";
require_once"Usuario.php";

class Administrativo extends Usuario
{

	public $id_administrativo;

    public function Set_idAdministrativo($valor)
	{
		$this->id_administrativo = $valor;
	}	

	public function SetIdUsuario($valor)
	{
		$this->id_usuario = $valor;
	}	

	public function __construct($datos)
	{	
		parent::__construct($datos);
		$this->tipo="Administrativo";        
	}   
	
	public function InsertarAdministrativo()
	{
        $retorno=false;

        if($this->InsertarUsuario()){

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into administrativos (id_usuario)values(:id_us)");
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

	
}
