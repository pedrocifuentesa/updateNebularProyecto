import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Actividad } from '../../model/actividad';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http : HttpClient) { }
  getActividades():Observable<Actividad[]>{
    return this.http.get<Actividad[]>(environment.apiURL+'actividad');
  }
  save(actividad : Actividad ):Observable <any>{
    let body = actividad;
    return this.http.post(environment.apiURL+'actividad/save',body );
  }
  update(idActividad :number , actividad:Actividad):Observable<any>{
    return  this.http.put<Actividad>(environment.apiURL+'actividad/update/'+idActividad,actividad);
  }
}
