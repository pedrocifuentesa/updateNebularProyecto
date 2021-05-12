import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ContratoArea } from '../../model/contratoArea';

@Injectable({
  providedIn: 'root'
})
export class ContratoAreaService {

  constructor(private http : HttpClient) { }
  getContratoArea():Observable<ContratoArea[]>{
    return this.http.get<ContratoArea[]>(environment.apiURL+'contratoArea');
  }
  save(tarea : ContratoArea ):Observable <any>{
    let body = tarea;
    return this.http.post(environment.apiURL+'contratoArea/save',body );
  }
  update(id :number , tarea:ContratoArea):Observable<any>{
    return  this.http.put<ContratoArea>(environment.apiURL+'contratoArea/update/'+id,tarea);
  }
  delete(contratoArea:ContratoArea){
    return  this.http.delete<ContratoArea>(environment.apiURL+'contratoArea/delete/'+contratoArea.RUT_EMPRESA+'/'+contratoArea.NUMERO_CONTRATO+'/'+contratoArea.ID_AREA);
  }

}
