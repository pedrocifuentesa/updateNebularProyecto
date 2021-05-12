import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tarea } from '../../model/tarea';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http : HttpClient) { }
  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(environment.apiURL+'tarea');
  }
  save(tarea : Tarea ):Observable <any>{
    let body = tarea;
    return this.http.post(environment.apiURL+'tarea/save',body );
  }
  update(idTarea :number , tarea:Tarea):Observable<any>{
    return  this.http.put<Tarea>(environment.apiURL+'tarea/update/'+idTarea,tarea);
  }
}
