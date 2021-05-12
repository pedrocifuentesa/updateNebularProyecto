import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../../model/contrato';
import { environment } from 'environments/environment';
import { Cargo } from '../../model/cargo';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor( private http : HttpClient) {
   }

   getContratos():Observable<Contrato[]>{
    //const token = localStorage.getItem('Authentication');
    
    //const headers = new Headers({ 'Content-Type': 'application/json', 'Authentication': token });
    //const options = new RequestOptions({ headers: headers });

    return this.http.get<Contrato[]>(environment.apiURL+'contrato');
  }
  save(contrato : any ):Observable <any>{
    
    let body = contrato;
    return this.http.post(environment.apiURL+'contrato/save',body);
  }

  obtenerContrato (contrato : any ):Observable <any>{
    
    let body = contrato;
    return this.http.post(environment.apiURL+'contrato/obtenerContrato',body);
  }
  empleadosfueradelcontrato(contrato : any ):Observable <any>{
    let body = contrato;
    return this.http.post(environment.apiURL+'empleado/empleadosfueradelcontrato',body);
  }
  getEmpleadosContrato(contrato : any ):Observable <any>{
    let body = contrato;
    return this.http.post(environment.apiURL+'contrato/getEmpleadosContrato',body);
  }
  contratosEmpresas(rutEmpresa : any ):Observable <any>{
   
    return this.http.get(environment.apiURL+'contrato/obtenerContratosEmpresa/'+rutEmpresa);
  }

  updateContrato(idContrato:string,contrato:Contrato):Observable<Contrato>{
    //let body = new Contrato;
    return this.http.put<Contrato>(environment.apiURL+'contrato/update/'+idContrato,contrato);
    
  
  }
  getAdminContrato(contrato:any):Observable<any>{
    let respueta = this.http.post(environment.apiURL+'contrato/getAdminContrato',contrato);
    return respueta;
  }
}
