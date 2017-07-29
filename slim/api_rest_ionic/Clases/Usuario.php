<?php
require_once"AccesoDatos.php";
class Usuario
{	
	public $id_usuario;
	public $legajo;
	public $nombre;
	public $apellido;
	public $calle;
	public $altura;
	public $email;
	public $password;   
	public $tipo; 

    public function SetId_usuario($valor)
	{
		$this->id_usuario = $valor;
	}
	public function SetLegajo($valor)
	{
		$this->legajo = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetCalle($valor)
	{
		$this->calle = $valor;
	}
	public function SetAltura($valor)
	{
		$this->altura = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}

	public function __construct($datos)
	{
		$this->legajo = $datos['legajo'];
		$this->nombre = $datos['nombre'];
        $this->apellido = $datos['apellido'];
		$this->calle = $datos['calle'];
        $this->altura = $datos['altura'];
        $this->email = $datos['email'];
        $this->password = $datos['password'];        
	}

	
	public function InsertarUsuario()
	{
		$retorno=false;

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (legajo,nombre,apellido,calle,altura,email,password,tipo)values(:leg,:nom,:ap,:calle,:alt,:em,:ps,:tipo)");
		$consulta->bindValue(':leg', $this->legajo, PDO::PARAM_INT);	
		$consulta->bindValue(':nom',$this->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':ap', $this->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':calle', $this->calle, PDO::PARAM_STR);
		$consulta->bindValue(':alt', $this->altura, PDO::PARAM_INT);	
		$consulta->bindValue(':em', $this->email, PDO::PARAM_STR);
		$consulta->bindValue(':ps', $this->password, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);
			
		
		if($consulta->execute())
		{
			$this->id_usuario=Null;
			
			$this->id_usuario=$objetoAccesoDato->RetornarUltimoIdInsertado();
			
			if($this->id_usuario!=Null){
				$retorno=true;
			}
		}	

		return $retorno;
	}

	public function ModificarUsuario()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta=$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET nombre=:nom,apellido=:ap,calle=:calle,altura=:alt,email=:em,password=:ps WHERE id_usuario=:idUser");
        $consulta->bindValue(':idUser',$this->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':nom',$this->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':ap', $this->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':calle', $this->calle, PDO::PARAM_STR);
		$consulta->bindValue(':alt', $this->altura, PDO::PARAM_INT);	
		$consulta->bindValue(':em', $this->email, PDO::PARAM_STR);
		$consulta->bindValue(':ps', $this->password, PDO::PARAM_STR);
		
		$retorno=$consulta->execute()?true:false;
		
		return $retorno;
	}
	
	public static function BorrarUsuario($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from usuarios WHERE id_usuario=:id");				
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);

		$retorno=$consulta->execute()?true:false;		
		
		return $retorno;
	}


	public static function TraerLegajos() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select legajo from usuarios");
		$consulta->execute();
		$legajos= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $legajos;
					
	}
	
	public static function TraerEmails() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select email from usuarios");
		$consulta->execute();
		$emails= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $emails;
					
	}

	public static function TraerUsuarioPorEmails($email) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email=:e");
		$consulta->bindValue(':e',$email, PDO::PARAM_INT);
		$consulta->execute();
		$usuario= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuario;
					
	}

	public static function TraerTodosLosUsuarios() 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
		$consulta->execute();
		$usuarios= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $usuarios;
					
	}

	public static function TraerUsuarioPorEmailyPass($dato) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email =:e AND password=:p");
		$consulta->bindValue(':e',$dato['email'], PDO::PARAM_STR);
		$consulta->bindValue(':p', $dato['password'], PDO::PARAM_STR);
		$consulta->execute();
		$persona= $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $persona;					
	}
}

