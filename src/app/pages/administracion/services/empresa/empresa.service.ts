import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../model/empresa';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http : HttpClient) { 
    
  }
  getEmpresas():Observable<Empresa[]>{
    return this.http.get<Empresa[]>(environment.apiURL+'empresa');
  }
  save(empresa : Empresa ):Observable <any>{
    let body = empresa;
    return this.http.post(environment.apiURL+'empresa/save',body );
  }
  update(empresa : Empresa ):Observable <any>{
    let body = empresa;
    return this.http.put(environment.apiURL+'empresa/update/'+empresa.RUT_EMPRESA,body );
  }
  deleteUpdate(id : string ):Observable <any>{
    return this.http.put(environment.apiURL+'empresa/deleteUpdate/'+id,{});
  }
  reactivarEmpresa(id : string ):Observable <any>{
    return this.http.put(environment.apiURL+'empresa/reactivarEmpresa/'+id,{});
  }
  findByRut(id : string ):Observable <any>{
    return this.http.get(environment.apiURL+'empresa/findByRut/'+id);
  }
}
