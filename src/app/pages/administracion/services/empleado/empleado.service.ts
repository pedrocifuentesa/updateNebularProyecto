import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../../model/empleado';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http : HttpClient) { }
  getEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(environment.apiURL+'empleado');
  }
  save(empleado : Empleado ):Observable <any>{
    let body = empleado;
    return this.http.post(environment.apiURL+'empleado/save',body );
  }
  update(empleado : Empleado ):Observable <any>{
    let body = empleado;
    return this.http.post(environment.apiURL+'empleado/update',body );
  }
  deleteUpdate(empleado : Empleado ):Observable <any>{
    let body = empleado;
    return this.http.post(environment.apiURL+'empleado/deleteUpdate',body );
  }
  findByRut(empleado : Empleado ):Observable <any>{
    let body = empleado;
    return this.http.post(environment.apiURL+'empleado/findByRut',body );
  }
  perasistencia(rutEmpresa:string,idContrato:number):Observable<any>{
    return this.http.get(environment.apiURL+'empleado/perasistencia/'+rutEmpresa+'/'+idContrato);
  }
  /* update(empresa : Empresa ):Observable <any>{
    let body = empresa;
    return this.http.put('http://localhost:8080/empresa/update/'+empresa.RUT_EMPRESA,body );
  }
  deleteUpdate(id : string ):Observable <any>{
    return this.http.put('http://localhost:8080/empresa/deleteUpdate/'+id,{});
  }
  reactivarEmpresa(id : string ):Observable <any>{
    return this.http.put('http://localhost:8080/empresa/reactivarEmpresa/'+id,{});
  }
  findByRut(id : string ):Observable <any>{
    return this.http.get('http://localhost:8080/empresa/findByRut/'+id);
  } */
}
