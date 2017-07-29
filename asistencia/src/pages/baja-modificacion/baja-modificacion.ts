import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { FormBuilder, Validators } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-baja-modificacion',
  templateUrl: 'baja-modificacion.html',
  providers: [ Vibration ]
})
export class BajaModificacion {

  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  nombreChanged: boolean = false;
  vpChanged: boolean = false;
  apellidoChanged: boolean = false;
  calleChanged: boolean = false;
  alturaChanged: boolean = false;
  legajoChanged: boolean = false;
  public validarContra=null;
  public valuePass;
  public mailOriginal;
  public validarlegajo:boolean=true;
  public validarEmail=null;
  public mostrarDatos:boolean=false;  
  public mostrarFormModificar:boolean=false;
  public formBuscarUsuario;
  public modificarForm;  
  public datosUsuario:Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              public ARP:ApiRestProvider, public alertCtrl: AlertController, public vibration : Vibration) {

         let EMAIL_REGEXP =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              this.modificarForm = formBuilder.group({
                email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
                password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                vp: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                nombre: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-Z\\s]*$'), Validators.required])],
                apellido: ['', Validators.compose([Validators.minLength(2),Validators.pattern('^[a-zA-Z\\s]*$'), Validators.required])],
                calle: ['', Validators.compose([Validators.minLength(1), Validators.pattern('^[0-9a-zA-Z\\s]+$'),Validators.required])],
                altura: ['', Validators.compose([Validators.minLength(1),Validators.pattern('^[0-9]*$'),Validators.required])]
              }); 

          this.formBuscarUsuario = formBuilder.group({
                legajo: ['', Validators.compose([Validators.minLength(3),Validators.pattern('^[0-9]*$'),Validators.required])]
              }); 

          this.datosUsuario=new Usuario(null);      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BajaModificacion');
  }


  verificarLegajo(legajoingresado){

        this.mostrarDatos=false;
        this.validarlegajo=false;
        this.ARP.TraerUsuarios().subscribe(datos => {
          datos.forEach(dato => {
            if(dato.legajo==legajoingresado){
              this.validarlegajo=true;
              this.mostrarDatos=true;
              this.datosUsuario=new Usuario(dato);
              this.mailOriginal=this.datosUsuario.email;
              this.valuePass=this.datosUsuario.password;
            }
          });

        });
    }  

     elementChanged(input){
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }

    resetForms(){

    this.formBuscarUsuario.reset();
    this.modificarForm.reset();
    
    this.datosUsuario=new Usuario(null);
    this.mostrarDatos=false;
    this.validarEmail=false;
    this.mostrarFormModificar=false;
    
    this.legajoChanged=false;
    this.emailChanged= false;
    this.passwordChanged= false;
    this.nombreChanged = false;
    this.apellidoChanged = false;
    this.calleChanged= false;
    this.alturaChanged= false
    this.vpChanged=false;
  }

  compararPass(){

    this.validarContra=false;
    if(this.datosUsuario.password==this.valuePass && this.valuePass != "" && this.datosUsuario.password!="" ){
      this.validarContra=true;      
    }

  }

  verificarEmail(emailIngresado){

    this.validarEmail=false;

    this.ARP.traerEmailUsuarios().subscribe(datos => { datos.forEach(dato => {
      
      if(dato.email==emailIngresado && this.mailOriginal!=emailIngresado)
      {
        this.validarEmail=true;
      }

      })} );

  }

  Eliminar(idEliminar){

      let alert = this.alertCtrl.create({
        title: 'ELIMINAR',
        message: '¿Seguro que desea ELIMINAR al usuario?',
        buttons: [
          {
            text: 'Si',
            role: 'cancel',
            handler: () => {
                this.ARP.eliminarUsuario({id:idEliminar}).subscribe(res=>{
                    if(res){
                        this.vibration.vibrate(400);
                        let alert = this.alertCtrl.create({
                                    title: 'Exito',
                                    subTitle: 'Usuario Eliminado',
                                    buttons: ['ok']
                                  });
                                  alert.present();
                         this.resetForms();         
                    }
                    else{
                          this.vibration.vibrate(400);
                          let alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'No se pudo eliminar',
                                    buttons: ['ok']
                                  });
                                  alert.present();
                    }
                });
            }
          },
          {
            text: 'NO'
          }
        ]
      });
      alert.present();

    }
    
    Modificar(){
        if (!this.modificarForm.valid || (this.validarEmail && this.validarEmail!=null) || (!this.validarContra && this.validarContra!=null)){
            console.log(this.modificarForm.value);
            this.vibration.vibrate(400);
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
              buttons: ['Aceptar']
            });
            alert.present();            

        } 
        else {        
              let alert = this.alertCtrl.create({
              title: 'MODIFICAR',
              message: '¿Seguro que desea MODIFICAR al usuario?',
              buttons: [
                {
                  text: 'Si',
                  role: 'cancel',
                  handler: () => {
                      this.ARP.modificarUsuario(this.datosUsuario).subscribe(res=>{
                          if(res){
                              this.vibration.vibrate(400);
                              let alert = this.alertCtrl.create({
                                          title: 'Exito',
                                          subTitle: 'Usuario Modificado',
                                          buttons: ['ok']
                                        });
                                        alert.present();
                              this.resetForms();         
                          }
                          else{
                                this.vibration.vibrate(400);
                                let alert = this.alertCtrl.create({
                                          title: 'Error',
                                          subTitle: 'No se pudo modificar',
                                          buttons: ['ok']
                                        });
                                        alert.present();
                          }
                      });
                  }
                },
                {
                  text: 'NO'
                }
              ]
            });
            alert.present();
        }   

    }

}

  
class Usuario {
    id_usuario: number;
    legajo: number;
    nombre : string;
    apellido : string;
    calle : string;
    altura : number;
    email : string;
    password : string;
    
    constructor(datos) {
        if(datos!=null){
          this.id_usuario = datos.id_usuario;
          this.legajo = datos.legajo;
          this.nombre =datos.nombre;
          this.apellido = datos.apellido;
          this.calle =datos.calle;
          this.altura = datos.altura;
          this.email = datos.email;
          this.password = datos.password;
        }
        else{
           this.id_usuario = null;
            this.legajo = null;
            this.nombre =null;
            this.apellido = null;
            this.calle =null;
            this.altura = null;
            this.email = null;
            this.password = null;
        }
    }    
}