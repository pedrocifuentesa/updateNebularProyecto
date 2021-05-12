import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ActividadProgramada } from '../../model/actividadPrograma';

@Injectable({
  providedIn: 'root'
})
export class ActividadProgramaService {

  constructor(private http : HttpClient) { }
  getActividadesProgramadas():Observable<ActividadProgramada[]>{
    return this.http.get<ActividadProgramada[]>(environment.apiURL+'actividadPrograma');
  }
  save(tarea : ActividadProgramada ):Observable <any>{
    let body = tarea;
    return this.http.post(environment.apiURL+'actividadPrograma/save',body );
  }
  update(id :number , tarea:ActividadProgramada):Observable<any>{
    return  this.http.put<ActividadProgramada>(environment.apiURL+'actividadPrograma/update/'+id,tarea);
  }
}
