import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DetrallePlantilla } from '../../model/detallePlantilla';

@Injectable({
  providedIn: 'root'
})
export class DetallePlantillaService {

  constructor(private http : HttpClient) { }

  getPlantillas():Observable<DetrallePlantilla[]>{
    return this.http.get<DetrallePlantilla[]>(environment.apiURL+'detallePlantilla');
  }

  getPlantillasJOIN():Observable<DetrallePlantilla[]>{
    return this.http.get<DetrallePlantilla[]>(environment.apiURL+'detallePlantilla/joinPlAct');
  }
  /* findbyid(idPlantilla:Number,rutEmpresa:string){
    return this.http.get<Plantilla>(environment.apiURL+'plantilla/findbyid/'+idPlantilla+'/'+rutEmpresa);
  } */
  save(dPlantilla : DetrallePlantilla ):Observable <any>{
    let body = dPlantilla;
    return this.http.post(environment.apiURL+'detallePlantilla/save',body );
  }
  update(idPlantilla :number,idActividad:number, dPlantilla:DetrallePlantilla):Observable<any>{
    return  this.http.put<DetrallePlantilla>(environment.apiURL+'detallePlantilla/update/'+idPlantilla+'/'+idActividad ,dPlantilla);
  }

}
