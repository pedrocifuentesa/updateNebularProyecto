import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Dotacion } from '../../model/dotacion';

@Injectable({
  providedIn: 'root'
})
export class DotacionService {

  constructor(private http : HttpClient) { }


  getDotacion():Observable<Dotacion[]>{
    return this.http.get<Dotacion[]>(environment.apiURL+'dotacion');
  }
  saveDotacion(dotacion : any ):Observable <any>{
    let body = dotacion;
    return this.http.post(environment.apiURL+'dotacion/save',body);
  }
  findbyRutEmpContDot(dotacion : any ):Observable <any>{
    let body = dotacion;
    return this.http.post(environment.apiURL+'dotacion/findbyRutEmpContDot',body);
  }
  modificarDotacion(idCuadrilla:number , dotacion:Dotacion):Observable <Dotacion>{
    // nodo que obtiene una cuadrilla por el id y contrat
    let body = dotacion;
    return this.http.put<Dotacion>(environment.apiURL+'dotacion/update/'+idCuadrilla,body);
  }
  updateEmpleado(idDotacion:string , dotacion:Dotacion):Observable <Dotacion>{
    // nodo que obtiene una cuadrilla por el id y contrat
    let body = dotacion;
    return this.http.put<Dotacion>(environment.apiURL+'dotacion/updateEmpleado/'+idDotacion,body);
  }
    deleteEmpleadoDotacion(dotacion:Dotacion){   
    console.log(dotacion);
    console.log(environment.apiURL+'dotacion/eliminarEmpleado/'+dotacion.RUT_EMPLEADO+'/'+dotacion.NUMERO_CONTRATO+'/'+dotacion.RUT_EMPRESA+'/'+dotacion.ID_CUADRILLA);
    return this.http.delete(environment.apiURL+'dotacion/eliminarEmpleado/'+dotacion.RUT_EMPLEADO+'/'+dotacion.NUMERO_CONTRATO+'/'+dotacion.RUT_EMPRESA+'/'+dotacion.ID_CUADRILLA);
  }
  /* findbyContratoEmpresa(contrato: any):Observable<any>{
    return this.http.post<Dotacion>(environment.apiURL+'dotacion/updateEmpleado',contrato);
  } */
  

}
