import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http : HttpClient) { }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(environment.apiURL+'persona');
  }
  save(persona : Persona ):Observable <any>{
    let body = persona;
    return this.http.post(environment.apiURL+'persona/save',body );
  }
  update(persona : Persona ):Observable <any>{
    let body = persona;
    return this.http.put(environment.apiURL+'persona/update/'+persona.RUT_EMPLEADO,body);
  }
  delete(persona : Persona ):Observable <any>{
    let body = persona;
    return this.http.post(environment.apiURL+'persona/delete',body);
  }
  // deleteUpdate(id : string ):Observable <any>{
  //   return this.http.put('http://localhost:8080/persona/deleteUpdate/'+id,{});
  // }
  // reactivarEmpresa(id : string ):Observable <any>{
  //   return this.http.put('http://localhost:8080/persona/reactivarEmpresa/'+id,{});
  // }
  // findByRut(id : string ):Observable <any>{
  //   return this.http.get('http://localhost:8080/persona/findByRut/'+id);
  // }
}
