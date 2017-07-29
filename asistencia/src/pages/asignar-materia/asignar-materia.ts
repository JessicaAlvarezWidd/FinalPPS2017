import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest-provider';
import { FormBuilder, Validators } from '@angular/forms';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-asignar-materia',
  templateUrl: 'asignar-materia.html',
  providers: [ Vibration ]
})
export class AsignarMateria {

  public formasignacionProfesor;
  public validarlegajo:boolean=true;
  public legajoChanged;
  public nombreProfesor;
  public materias;
  public divisiones;
  private id_profesor;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
              public ARP:ApiRestProvider, public alertCtrl: AlertController, public vibration : Vibration) {

         this.formasignacionProfesor = formBuilder.group({
                legajo: ['', Validators.compose([Validators.minLength(3),Validators.pattern('^[0-9]*$'),Validators.required])],                
                materia:['', Validators.compose([Validators.required])],
                division:['', Validators.compose([Validators.required])]
              });       

           this.traerMaterias();      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignarMateria');
  }

   elementChanged(input){
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }

  verificarLegajo(legajoingresado){
   
      this.validarlegajo=false;
      this.ARP.TraerProfesores().subscribe(datos => {
        datos.forEach(dato => {
          if(dato.legajo==legajoingresado){
            this.validarlegajo=true;
            this.nombreProfesor=dato.apellido+" "+dato.nombre;
            this.id_profesor=dato.id_profesor;
          }
        });

      });
  }

  resetForms(){
    this.formasignacionProfesor.reset();
    this.legajoChanged=false;
    this.nombreProfesor=null;
    this.divisiones=null
    this.id_profesor=null;
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



  asignarMateria(){
        let dato={
        'id':this.id_profesor,
        'materia':this.formasignacionProfesor.value.materia,
        'division':this.formasignacionProfesor.value.division
      }

     if(!this.formasignacionProfesor.valid || dato.materia == "Seleccionar" || 
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
           this.ARP.asignarMateriaProfesor(dato).subscribe(res => { 

                  if(res.exito)
                  {

                    this.resetForms();

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
