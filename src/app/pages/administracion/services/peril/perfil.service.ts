import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Perfil } from '../../model/perfil';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {

  constructor(private http : HttpClient) { }
  getPerfiles():Observable<Perfil[]>{
    return this.http.get<Perfil[]>(environment.apiURL+'perfil');
  }
  save(perfil:Perfil):Observable<Perfil>{
    return  this.http.post<Perfil>(environment.apiURL+'perfil/save',perfil);
  }
  deleteUpdate(idPerfil:number):Observable<any>{
    return  this.http.put<any>(environment.apiURL+'perfil/deleteUpdate/'+idPerfil,{});
  }
  update(idPerfil:number , perfil:Perfil):Observable<Perfil>{
    return  this.http.put<Perfil>(environment.apiURL+'perfil/update/'+idPerfil,perfil);
  }
}
