import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hora } from '../../model/hora';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoraService {

  constructor(private http : HttpClient) { }
  getHoras():Observable<Hora[]>{
    return this.http.get<Hora[]>(environment.apiURL+'hora');
  }
  findbyid(idHora:Number){
    return this.http.get<Hora>(environment.apiURL+'hora/findbyid/'+idHora);
  }
  save(hora : Hora ):Observable <any>{
    let body = hora;
    return this.http.post(environment.apiURL+'hora/save',body );
  }
  update(idHora :number , hora:Hora):Observable<any>{
    return  this.http.put<Hora>(environment.apiURL+'hora/update/'+idHora,hora);
  }
}
