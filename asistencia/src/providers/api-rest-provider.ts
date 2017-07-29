import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiRestProvider {

  path:string="http://pameladecima.esy.es/index.php/";
  //path:string="http://localhost/api_rest_ionic/index.php/";

  constructor(public http: Http, private authHttp:AuthHttp) {
       
}


//----------------------------Usuarios----------------------------//

    traerLegajoUsuarios():Observable<any>{
          return this.http.get(this.path + "usuarios/TraerLegajos")
                          .map(response => response.json());
    }

    traerEmailUsuarios():Observable<any>{
          return this.http.get(this.path + "usuarios/TraerEmails")
                          .map(response =>  response.json())
    }

    traerUsuarioPorMail(email):Observable<any>{
        
        let jsondatos=JSON.stringify(email);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "usuarioPorEmail", jsondatos, options)
                        .map(res => res.json())
    }

    TraerUsuarios():Observable<any>{
         return this.http.get(this.path + "TraerUsuarios")
                          .map(response => response.json());
    }

    eliminarUsuario(id):Observable<any>{
        
        let jsondatos=JSON.stringify(id);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "eliminarUsuario", jsondatos, options)
                        .map(res => res.json())
    }

    modificarUsuario(usuario):Observable<any>{
        
        let jsondatos=JSON.stringify(usuario);
        console.log(jsondatos);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "modificarUsuario", jsondatos, options)
                        .map(res => res.json())
    }
          
//----------------------------Profesores----------------------------//

    agregarProfesor(datos):Observable<any>{
        
        let jsondatos=JSON.stringify(datos);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "agregarProfesor", jsondatos, options)
                        .map(res => res.json())
    }

    TraerProfesores():Observable<any>{
        return this.http.get(this.path + "TraerProfesores")
                        .map(response =>  response.json());                    
    }


    asignarMateriaProfesor(datos):Observable<any>{
        
        let jsondatos=JSON.stringify(datos);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "profesor/asignarMateria", jsondatos, options)
                        .map(res => res.json())
    }

//----------------------------Alumnos----------------------------//

  traerAlumnos():Observable<any>{
        return this.http.get(this.path + "alumnos/TraerTodosLosAlumnos")
                        .map(response =>  response.json());
                      
  }

  agregarAlumno(datos):Observable<any>{
        
        let jsondatos=JSON.stringify(datos);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "agregarAlumno", jsondatos, options)
                        .map(res => res.json())
    }


    TraerNombreYlegajoAlumno():Observable<any>{
        return this.http.get(this.path + "alumnos/TraerNombreYlegajoAlumno")
                        .map(response =>  response.json());                    
    }

    inscribirAlumno(datos):Observable<any>{
        
        let jsondatos=JSON.stringify(datos);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.path + "inscribirAlumno", jsondatos, options)
                        .map(res => res.json())
    }

    traerAlumnosPorComision(comisionAula):Observable<any>{
            return this.http.get(this.path + "alumnos/alumnosPorComision/" + comisionAula)
                            .map(response => response.json());
   }

   traerComisionesdelAlumno(idAlumno):Observable<any>{

            return this.http.get(this.path + "alumnos/comisiones/" + idAlumno)
                            .map(response =>  response.json());
   } 
//----------------------------Administrativos----------------------------//

    agregarAdministrativo(datos):Observable<any>
    {     
          let jsondatos=JSON.stringify(datos);            
          
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
          return this.http.post(this.path + "agregarAdministrativo", jsondatos, options)
                    .map(res => res.json())
                  
    }


//----------------------------Materias----------------------------//

    traerTodasLasMaterias():Observable<any>{
       return this.http.get(this.path + "materias/TraerMaterias")
                          .map(response => response.json());    
    }

    agregarMateria(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);            
          
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "agregarMateria", jsondatos, options)
                    .map(res => res.json())
      }    
//----------------------------Divisiones----------------------------//
   
    traerTodasLasDivisiones():Observable<any>{

       return this.http.get(this.path + "divisiones/TraerDivisiones")
                          .map(response => response.json());    
    }

    traerDivisionesPorCuatrimestre(cuatrimestre):Observable<any>{

        return this.http.get(this.path + "divisiones/TraerDivisionesPorCuatrimestre/"+cuatrimestre)
                        .map(response => response.json());     
    }

    agregarDivision(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);            
          
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "agregarDivision", jsondatos, options)
                    .map(res => res.json())
      }

//----------------------------Comisiones----------------------------//

   traerTodasLasComisiones():Observable<any>{
            return this.http.get(this.path + "comisiones/TraerComisiones")
                            .map(response => response.json());
   }
  
    agregarComision(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);            
          
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "agregarComision", jsondatos, options)
                    .map(res => res.json())
      }

    traerComisionPorDia(dia):Observable<any>{
            return this.http.get(this.path + "comisiones/comisionPorDia/" + dia)
                            .map(response => response.json());
   }  

   traerComisionPorAula(aula):Observable<any>{
            return this.http.get(this.path + "comisiones/comisionPorAula/" + aula)
                            .map(response => response.json());
   } 

   traerComisionPorMateria(materia):Observable<any>{
            return this.http.get(this.path + "comisiones/comisionPorMateria/" + materia)
                            .map(response => response.json());
   } 

   traerComisionPorProfesor(profesor):Observable<any>{
            return this.http.get(this.path + "comisiones/comisionPorProfesor/" + profesor)
                            .map(response => response.json());
   }
   

   //----------------------------Asistencia----------------------------//
    
    traerAsistenciasporComisionyFecha(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);        

          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "VerAsistenciaPorComisionyFecha", jsondatos, options)
                    .map(res => res.json());
      }

     traerAsistenciasporComisionyAlumno(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);        
          console.log(jsondatos);
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "VerAsistenciaPorComisionyAlumno", jsondatos, options)
                    .map(res => res.json());
      }

    traerAsistenciasporComision(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);        
          console.log(jsondatos);
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "VerAsistenciaPorComision", jsondatos, options)
                    .map(res => res.json());
      }    

    guardarAsistencias(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);     
          console.log(jsondatos);
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "guardarAsistencias", jsondatos, options)
                         .map(res => res.json());
      }

 //----------------------------Token----------------------------//

    crearToken(datos):Observable<any>{
          
          let jsondatos=JSON.stringify(datos);     
          console.log(jsondatos);
          let headers = new Headers({
              'Content-Type': 'application/json' });
          
          let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.path + "crearToken", jsondatos, options)
                         .map(res => res.json());
    }

    decodeToken():Observable<any>
    {   
        return this.authHttp.get(this.path + "obtenerToken")        
                            .map(response => response.json());
    }


    //---------------------------------POSICION GLOBAL----------------------------//
    getDireccion(lat, lng)
    {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng)
        .toPromise()
        .then( this.extractData );
        //.catch( this.handleError );
    }

    private extractData(res: Response) {
    let body = res.json();    
    
    return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error( errMsg );
        console.error( 'CATCH' );
        return Observable.throw(errMsg);
    }
}
