import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pase } from '../../model/pase';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaseService {

  constructor(private http : HttpClient) { }

  getPase():Observable<Pase[]>{
    return this.http.get<Pase[]>(environment.apiURL+'pase');
  }
  getPaseDetalle():Observable<any[]>{
    let valor = this.http.get<Pase[]>(environment.apiURL+'pase/getpases');
    return valor;
  }
  save(pase : any ):Observable <any>{
    let body = pase;
    return this.http.post(environment.apiURL+'pase/save',body );
  }
  update(idPase:number ,rutEmp:string , pase:Pase):Observable<Pase>{
    return  this.http.put<Pase>(environment.apiURL+'pase/update/'+idPase+'/'+rutEmp,pase);
  }
}
