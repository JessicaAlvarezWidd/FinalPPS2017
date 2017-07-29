import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the AltaUsuarios page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-alta-usuarios',
  templateUrl: 'alta-usuarios.html',
  providers: [ Vibration ]
})
export class AltaUsuarios {

  public GrupoRb;
  public materias;
  public divisiones;
  public tipo;
  public valuePass;
  public valuePassDos;
  public mostrarSeleccion:boolean;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  vpChanged: boolean = false;
  nombreChanged: boolean = false;
  apellidoChanged: boolean = false;
  calleChanged: boolean = false;
  alturaChanged: boolean = false;
  legajoChanged: boolean = false;
  descripcionChanged:boolean=false;
  public validarContra:boolean;
  public validarlegajo:boolean;
  public validarEmail:boolean;
  public validarMateria:boolean;
  public validarComision:boolean;
  public validarDivision:boolean;
  public mostrarFormAdministrativo:boolean;
  public mostrarFormProfesor:boolean;
  public mostrarFormAlumno:boolean;
  public mostrarFormComision:boolean;
  public mostrarFormMateria:boolean;
  public mostrarFormDivision:boolean;
  public UsuariosForm;
  public ComisionForm;  
  public MDForm;
  public DForm;     

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              public ARP:ApiRestProvider, public alertCtrl: AlertController, public vibration : Vibration) {

      let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              this.UsuariosForm = formBuilder.group({
                tipo: [''],
                email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
                password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                vp: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                nombre: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-Z\\s]*$'), Validators.required])],
                apellido: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-Z\\s]*$'), Validators.required])],
                calle: ['', Validators.compose([Validators.minLength(1), Validators.pattern('^[0-9a-zA-Z\\s]+$'),Validators.required])],
                altura: ['', Validators.compose([Validators.minLength(1),Validators.pattern('^[0-9]*$'),Validators.required])],
                legajo: ['', Validators.compose([Validators.minLength(3),Validators.pattern('^[0-9]*$'),Validators.required])]
              }); 

            this.MDForm = formBuilder.group({                
                descripcion: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-Z\\s]*$'), Validators.required])],
                cuatrimestre: ['', Validators.compose([Validators.required])]
              }); 

            this.DForm = formBuilder.group({                
                descripcion: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[0-9]+[a-zA-Z]$'), Validators.required])],
                cuatrimestre: ['', Validators.compose([Validators.required])]
              });   

            this.ComisionForm = formBuilder.group({                
                materia:['', Validators.compose([Validators.required])],
                division:['', Validators.compose([Validators.required])],
                aula: ['', Validators.compose([Validators.required])],
                dia: ['', Validators.compose([Validators.required])],
                turno:['', Validators.compose([Validators.required])]
              });  

              this.mostrarSeleccion=true;      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaUsuarios');
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  traerdivisiones(cuatrimestre:string){
      if(cuatrimestre!="Seleccionar"){
      
        this.ARP.traerDivisionesPorCuatrimestre(cuatrimestre).subscribe(datos=>{this.divisiones=datos})
      }
      else{this.divisiones=null;}
  }


  traermaterias(){
    this.ARP.traerTodasLasMaterias().subscribe(datos => { this.materias=datos;} )
  }

  verificarLegajo(numero){

    this.validarlegajo=false;
    console.log();
    this.ARP.traerLegajoUsuarios().subscribe(datos => { datos.forEach(dato => {

      if(dato.legajo==numero)
      {
        this.validarlegajo=true;
      }

      })} );

  }

  verificarEmail(emailIngresado){

    this.validarEmail=false;

    this.ARP.traerEmailUsuarios().subscribe(datos => { datos.forEach(dato => {
      
      if(dato.email==emailIngresado)
      {
        this.validarEmail=true;
      }

      })} );

  }

  verificarMateria(materia:string){
      this.validarMateria=false;

      if(materia!=null){
        this.ARP.traerTodasLasMaterias().subscribe(datos => { datos.forEach(dato => {

        if(dato.descripcion.toUpperCase() == materia.toUpperCase())
        {
        
          this.validarMateria=true;
        }

        })} );
      }
  }

  verificarDivision(descripcion:string){
   this.validarDivision=false;

      if(descripcion!=null){
        this.ARP.traerTodasLasDivisiones().subscribe(datos => { datos.forEach(dato => {

        if(dato.descripcion.toUpperCase() == descripcion.toUpperCase())
        {
        
          this.validarDivision=true;
        }

        })} );
      }
  }

  validarDatos(datos):boolean{
    let retorno=false;

    if(datos.aula==null || datos.aula=="Seleccionar" || datos.turno==null || datos.turno=="Seleccionar" || datos.dia==null || datos.dia=="Seleccionar" 
    || datos.division==null || datos.division=="Seleccionar" || datos.materia==null || datos.materia=="Seleccionar")
    {
      retorno=true;
    }

    return retorno;
  }

  compararPass(){

    this.validarContra=false;

    if(this.valuePass==this.valuePassDos && this.DForm.value.vp != "" && this.DForm.value.password!="" ){
      this.validarContra=true;
    }

  }
  
  mostrarForm(){   
    
    this.resetForms();
    this.mostrarSeleccion=false;

    switch(this.GrupoRb){

      case "Administrativo":
                            this.mostrarFormAdministrativo=true;
                            break;
      
      case "Profesor": 
                        this.mostrarFormProfesor=true;                           
                        break;
      
      case "Alumno":
                     this.mostrarFormAlumno=true;
                    break;
      
      case "Comision": 
                      this.mostrarFormComision=true;
                      this.traermaterias();
                      break;
      
      case "Materia": 
                      this.mostrarFormMateria=true;
                      break;
      case "Division": 
                      this.mostrarFormDivision=true;
                      break;                
    }
  }

 resetForms(){

    this.mostrarSeleccion=true;

    this.valuePass="";
    this.valuePassDos="";

    this.validarEmail=false;
    this.validarlegajo=false;
    this.validarMateria=false;
    this.validarComision=false;
    this.validarDivision=false;
    this.validarContra=false;
  

    this.mostrarFormAdministrativo=false;
    this.mostrarFormProfesor=false;
    this.mostrarFormAlumno=false;
    this.mostrarFormComision=false;
    this.mostrarFormDivision=false;
    this.mostrarFormMateria=false;
    
    this.emailChanged= false;
    this.passwordChanged= false;
    this.nombreChanged = false;
    this.apellidoChanged = false;
    this.calleChanged= false;
    this.alturaChanged= false;
    this.legajoChanged= false;
    this.descripcionChanged=false;
    this.vpChanged=false;

    this.UsuariosForm.reset();
    this.ComisionForm.reset();
    this.MDForm.reset();
    this.DForm.reset();
    
  }
//--------------------------------------Alta Administrativo------------------------------------------//

    AltaAdmin(){
        
        if (!this.UsuariosForm.valid || this.validarEmail || this.validarlegajo || !this.validarContra){
          
            this.vibration.vibrate(400);
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
              buttons: ['Aceptar']
            });
            alert.present();            

        } 
        else {                  
          this.ARP.agregarAdministrativo(this.UsuariosForm.value).subscribe(res => { 

                if(res)
                {

                  this.vibration.vibrate(400);
                  let alert = this.alertCtrl.create({
                              title: 'Exito',
                              subTitle: 'Administrativo ingresado correctamente',
                              buttons: ['Aceptar']
                            });
                            alert.present();
                  this.resetForms();          
                }

            });
        }
    }
//--------------------------------------Alta Profesor------------------------------------------//

  AltaProfesor(){
          
          let datos=this.UsuariosForm.value;
          if (!this.UsuariosForm.valid || this.validarEmail || this.validarlegajo || !this.validarContra){
        
           this.vibration.vibrate(400);
           let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
            buttons: ['Aceptar']
          });
          alert.present();

      } 
      else {                  
        
         this.ARP.agregarProfesor(datos).subscribe(res => { 
              if(res)
              {

                this.vibration.vibrate(400);
                let alert = this.alertCtrl.create({
                            title: 'Exito',
                            subTitle: 'Profesor ingresado correctamente',
                            buttons: ['Aceptar']
                          });
                          alert.present();
                this.resetForms();          
              }
              else{                
                            this.vibration.vibrate(400);
                            let alert = this.alertCtrl.create({
                            title: 'Atención',
                            subTitle: 'Ocurrió un error al intentar ingresar el Profesor',
                            buttons: ['Aceptar']
                          });
                          alert.present();

              }

          });
      }
  }

//--------------------------------------Alta Alumno------------------------------------------//
  
  AltaAlumno(){
          
          let datos=this.UsuariosForm.value;
          if (!this.UsuariosForm.valid || this.validarEmail || this.validarlegajo || !this.validarContra){
        
           this.vibration.vibrate(400);
           let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
            buttons: ['Aceptar']
          });
          alert.present();

      } 
      else {                  
        
         this.ARP.agregarAlumno(datos).subscribe(res => { 
              if(res)
              {
                this.vibration.vibrate(400);
                let alert = this.alertCtrl.create({
                            title: 'Exito',
                            subTitle: 'Alumno ingresado correctamente',
                            buttons: ['Aceptar']
                          });
                          alert.present();
                 this.resetForms();         
              }
              else{

                            this.vibration.vibrate(400);
                            let alert = this.alertCtrl.create({
                            title: 'Atención',
                            subTitle: 'Ocurrió un error al intentar ingresar el alumno',
                            buttons: ['Aceptar']
                          });
                          alert.present();

              }

          });
      }

  }


//--------------------------------------Alta Materia------------------------------------------//
  
  AltaMateria(){

      let datos=this.MDForm.value;
      if (!this.MDForm.valid || this.validarMateria || datos.cuatrimestre==null || datos.cuatrimestre=="Seleccionar"){
        
           this.vibration.vibrate(400);
           let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
            buttons: ['Aceptar']
          });
          alert.present();

      } 
      else{         
         this.ARP.agregarMateria(datos).subscribe(res => { 

              if(res)
              {

                

                this.vibration.vibrate(400);
                let alert = this.alertCtrl.create({
                            title: 'Exito',
                            subTitle: 'Materia ingresada correctamente',
                            buttons: ['Aceptar']
                          });
                          alert.present();
                 this.resetForms();         
              }

          });
      }
  }

//--------------------------------------Alta Division------------------------------------------//

    AltaDivision(){

          let datos=this.DForm.value;
          if (!this.DForm.valid || this.validarDivision || datos.cuatrimestre==null || datos.cuatrimestre=="Seleccionar"){
            
              this.vibration.vibrate(400);
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
                buttons: ['Aceptar']
              });
              alert.present();

          } 
          else{         
            this.ARP.agregarDivision(datos).subscribe(res => { 

                  if(res)
                  {                  

                    this.vibration.vibrate(400);
                    let alert = this.alertCtrl.create({
                                title: 'Exito',
                                subTitle: 'Division ingresada correctamente',
                                buttons: ['Aceptar']
                              });
                              alert.present();

                     this.resetForms();          
                  }

              });
          }
      }

//--------------------------------------Alta Comision------------------------------------------//
  
    AltaComision(){

          let datos=this.ComisionForm.value;

          if (!this.ComisionForm.valid || this.validarDatos(datos)){
            
              this.vibration.vibrate(400);
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
                buttons: ['Aceptar']
              });
              alert.present();

          } 
          else{      

            this.ARP.agregarComision(datos).subscribe(res => { 
                    
                  if(res.exito)
                  {
                    this.vibration.vibrate(400);
                    let alert = this.alertCtrl.create({
                                title: 'Exito',
                                subTitle: res.mensaje,
                                buttons: ['Aceptar']
                              });
                              alert.present();

                    this.resetForms();          

                  }else{

                        this.vibration.vibrate(400);
                        let alert = this.alertCtrl.create({
                                title: 'Error',
                                subTitle: res.mensaje,
                                buttons: ['Aceptar']
                              });
                              alert.present();                    
                  }

              });
          }
      }

}
