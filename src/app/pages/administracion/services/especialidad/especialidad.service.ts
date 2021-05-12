import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Especialidad } from '../../model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http : HttpClient) { }
  getEspecialidades():Observable<Especialidad[]>{
    return this.http.get<Especialidad[]>(environment.apiURL+'especialidad');
  }
  save(tarea : Especialidad ):Observable <any>{
    let body = tarea;
    return this.http.post(environment.apiURL+'especialidad/save',body );
  }
  update(id :number , especialidad:Especialidad):Observable<any>{
    return  this.http.put<Especialidad>(environment.apiURL+'especialidad/update/'+id,especialidad);
  }
}
