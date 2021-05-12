import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'environments/environment';
import { Asistencia } from '../../model/asistencia';
@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http : HttpClient) { }

  getAsistencia():Observable<Asistencia[]>{
    return this.http.get<Asistencia[]>(environment.apiURL+'asistencia');
  }
  save(actividad : Asistencia ):Observable <any>{
    let body = actividad;
    return this.http.post(environment.apiURL+'asistencia/save',body );
  }
  verificarAsistenciaDia(actividad : Asistencia ):Observable <any>{
    let body = actividad;
    
    return this.http.post(environment.apiURL+'asistencia/verificarAsistencia',body );
  }

  // verificar
  updateAsistenciaEmpleado(rutEmpleado :String , asistencia:Asistencia):Observable<any>{
    return  this.http.put<Asistencia>(environment.apiURL+'asistencia/update/'+rutEmpleado,asistencia);
  }
}
