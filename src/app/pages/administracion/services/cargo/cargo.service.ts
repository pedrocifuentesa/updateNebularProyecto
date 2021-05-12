import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cargo } from '../../model/cargo';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor( private http : HttpClient) { }
get Token():String{
  return localStorage.getItem('Authentication')||'';
}
  getCargos():Observable<Cargo[]>{
  /*   const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.Token+""
      })
    }; */

    return this.http.get<Cargo[]>(environment.apiURL+'cargo');
  }
  save(cargo : any ):Observable <any>{
    let body = cargo;
    return this.http.post(environment.apiURL+'cargo/save',body );
  }
  update(idCargo:number , cargo:Cargo):Observable<Cargo>{
    return  this.http.put<Cargo>(environment.apiURL+'cargo/update/'+idCargo,cargo);
  }
}
