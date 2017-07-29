import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiRestProvider {

  path:string="http://pameladecima.esy.es/index.php/";
  //path:string="http://localhost/api_rest_ionic/index.php/";

  constructor(public http: Http) {
       
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
