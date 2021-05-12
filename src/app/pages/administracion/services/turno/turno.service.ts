import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Turno } from '../../model/turno';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http : HttpClient) { }
  getTurno():Observable<Turno[]>{
    return this.http.get<Turno[]>(environment.apiURL+'turno');
  }
  save(turno : any ):Observable <any>{
    let body = turno;
    return this.http.post(environment.apiURL+'turno/save',body );
  }
  update(idTurno:number , turno:Turno):Observable<Turno>{
    return  this.http.put<Turno>(environment.apiURL+'turno/update/'+idTurno,turno);
  }
}
