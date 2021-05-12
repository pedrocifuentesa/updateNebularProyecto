import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoEmpleado } from '../../model/tipoEmpleado';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {

  constructor(private http : HttpClient) { }

  getTipoEmpleado():Observable<TipoEmpleado[]>{
      return this.http.get<TipoEmpleado[]>(environment.apiURL+'tipoEmpleado');
    }
    save(tipoEmpleado : any ):Observable <any>{
      let body = tipoEmpleado;
      return this.http.post(environment.apiURL+'tipoEmpleado/save',body );
    }
    update(idTipoEmpleado:number , tipoEmpleado:TipoEmpleado):Observable<TipoEmpleado>{
      return  this.http.put<TipoEmpleado>(environment.apiURL+'tipoEmpleado/update/'+idTipoEmpleado,tipoEmpleado);
    }
}
