import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuadrilla } from '../../model/cuadrilla';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuadrillaService {

  constructor(private http : HttpClient) { }

  getCuadrilla():Observable<Cuadrilla[]>{
    return this.http.get<Cuadrilla[]>(environment.apiURL+'cuadrilla');
  }
  saveCuadrilla(cuadrilla : any ):Observable <any>{
    let body = cuadrilla;
    return this.http.post(environment.apiURL+'cuadrilla/save',body);
  }
  modificarCuadrilla(idCuadrilla:number , cuadrilla:Cuadrilla):Observable <Cuadrilla>{
    // nodo que obtiene una cuadrilla por el id y contrat
    let body = cuadrilla;
    return this.http.put<Cuadrilla>(environment.apiURL+'cuadrilla/update/'+idCuadrilla,body);
  }
  findbyContratoEmpresa(contrato: any):Observable<any>{
    return this.http.post<Cuadrilla>(environment.apiURL+'cuadrilla/findbyContratoEmpresa',contrato);
  }
  
  findDotacionIdCuadrillaRutEmpresa(contrato: any):Observable<any>{
    // personas dentro del contrato y la cuadrilla
    return this.http.post<Cuadrilla>(environment.apiURL+'cuadrilla/findDotacionIdCuadrillaRutEmpresa',contrato);
  }
  findEmpleadosFueraCuadrillaIdCuadrillaRutEmpresa(contrato: any):Observable<any>{
    // personas del contrato  que aun no registran en cuadrillas 
    return this.http.post<Cuadrilla>(environment.apiURL+'cuadrilla/findEmpleadosFueraCuadrillaIdCuadrillaRutEmpresa',contrato);
  }
  findbyid(rutempresa:string,nroContrato:Number):Observable<any>{
  
    return this.http.get<Cuadrilla>(environment.apiURL+'cuadrilla/findById/'+rutempresa+'/'+nroContrato);
  }
}
