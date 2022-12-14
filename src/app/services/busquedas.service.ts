import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(  private http : HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers(){
    return {
      headers : {
        'x-token': this.token
      }
    }
};

buscar (
        tipo : 'usuarios' | 'medicos' | 'hospitales',
        termino : string
       ){
        // endpoint
        const url = `${base_url}/todo/coleccion/${tipo}/${termino}`; //la busquedad en el backend
        return this.http.get<any[]>(url, this.headers)
                   .pipe(
                    map( (resp : any ) => resp.resultado)
                   )

}

}
