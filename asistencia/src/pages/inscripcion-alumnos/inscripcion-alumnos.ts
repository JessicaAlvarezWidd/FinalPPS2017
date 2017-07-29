import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { FormBuilder, Validators } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-inscripcion-alumnos',
  templateUrl: 'inscripcion-alumnos.html',
  providers: [ Vibration ]
})
export class InscripcionAlumnos {

  public formInscripcionAlumno;
  public validarlegajo:boolean=true;
  public legajoChanged;
  public nombreAlumno;
  public materias;
  public divisiones;
  private id_alumno;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ARP:ApiRestProvider,public formBuilder: FormBuilder,
              public alertCtrl: AlertController, public vibration : Vibration) {

       this.traerMaterias();           
       this.formInscripcionAlumno = formBuilder.group({
                legajo: ['', Validators.compose([Validators.minLength(3),Validators.pattern('^[0-9]*$'),Validators.required])],
                materia: ['', Validators.compose([Validators.required])],
                division: ['', Validators.compose([Validators.required])]
              });     
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscripcionAlumnos');
  }


  elementChanged(input){
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }

  verificarLegajo(legajoingresado){
   
      this.validarlegajo=false;
      this.ARP.TraerNombreYlegajoAlumno().subscribe(datos => {
        datos.forEach(dato => {
          if(dato.legajo==legajoingresado){
            this.validarlegajo=true;
            this.nombreAlumno=dato.apellido+" "+dato.nombre;
            this.id_alumno=dato.id_alumno;
          }
        });

      });
}

  resetForms(){
    this.formInscripcionAlumno.reset();
    this.legajoChanged=false;
    this.nombreAlumno=null;
    this.divisiones=null
    this.id_alumno=null;
  }

  traerMaterias(){
      this.ARP.traerTodasLasMaterias().subscribe(datos => {this.materias=datos});
  }

  traerdivisiones(cuatrimestre:string){
      if(cuatrimestre!="Seleccionar"){
      
        this.ARP.traerDivisionesPorCuatrimestre(cuatrimestre).subscribe(datos=>{this.divisiones=datos})
      }
      else{this.divisiones=null;}
  }

  InscribirAlumno(){
      let dato={
        'id':this.id_alumno,
        'materia':this.formInscripcionAlumno.value.materia,
        'division':this.formInscripcionAlumno.value.division
      }
      console.log(dato);
      if(!this.formInscripcionAlumno.valid || dato.materia == "Seleccionar" || 
      dato.division == "Seleccionar" || dato.materia == null || dato.division == null || !this.validarlegajo){
            
            this.vibration.vibrate(400); 
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Algunos datos son INCORRECTOS, por favor verifique',
                buttons: ['Aceptar']
              });
              alert.present();
      }
      else
      {
           this.ARP.inscribirAlumno(dato).subscribe(res => { 

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
                  }
                  else{

                      this.vibration.vibrate(400);
                      let alert = this.alertCtrl.create({
                                title: 'Alerta',
                                subTitle: res.mensaje,
                                buttons: ['Aceptar']
                              });
                              alert.present();
                  }
                  
              });
      } 

       
  }


}
