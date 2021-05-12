import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PerfilEmpresa } from '../../model/perfilEmpresa';
@Injectable({
  providedIn: 'root'
})
export class PerfilEmpresaService {

  constructor(private http : HttpClient) { }
  
  getPerfilEmpresa():Observable<PerfilEmpresa[]>{
    return this.http.get<PerfilEmpresa[]>(environment.apiURL+'perfilEmpresa');
  }
  getPerfilEmpresaDtl():Observable<any[]>{
    return this.http.get<PerfilEmpresa[]>(environment.apiURL+'perfilEmpresa/getPerfilEmpresa');
  }
  save(perfilEmpresa : PerfilEmpresa ):Observable <PerfilEmpresa>{
    return this.http.post<PerfilEmpresa>(environment.apiURL+'perfilEmpresa/save',perfilEmpresa );
  }
  update(rutEmpresa:string, perfilEmpresa:PerfilEmpresa):Observable<PerfilEmpresa>{
    return  this.http.put<PerfilEmpresa>(environment.apiURL+'perfilEmpresa/update/'+rutEmpresa,perfilEmpresa);
  }
  deletePerfilEmpresa(perfilEmpresa:PerfilEmpresa):Observable<PerfilEmpresa>{
   // perfilEmpresa.RUT_EMPRESA;
    return this.http.delete<PerfilEmpresa>(environment.apiURL+'perfilEmpresa/delete/'+ perfilEmpresa.RUT_EMPRESA);
  }
}
