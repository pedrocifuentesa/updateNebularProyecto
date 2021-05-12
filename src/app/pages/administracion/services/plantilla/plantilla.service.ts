import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Plantilla } from '../../model/plantilla';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  constructor(private http : HttpClient) { }
  getPlantillas():Observable<Plantilla[]>{
    return this.http.get<Plantilla[]>(environment.apiURL+'plantilla');
  }

  getPlantillasJOIN():Observable<Plantilla[]>{
    return this.http.get<Plantilla[]>(environment.apiURL+'plantilla/joinEmpEsp');
  }
  /* findbyid(idPlantilla:Number,rutEmpresa:string){
    return this.http.get<Plantilla>(environment.apiURL+'plantilla/findbyid/'+idPlantilla+'/'+rutEmpresa);
  } */
  save(plantilla : Plantilla ):Observable <any>{
    let body = plantilla;
    return this.http.post(environment.apiURL+'plantilla/save',body );
  }
  update(idPlantilla :number,rutEmpresa:string,idEspecialidad:number , plantilla:Plantilla):Observable<any>{
    return  this.http.put<Plantilla>(environment.apiURL+'plantilla/update/'+idPlantilla+'/'+rutEmpresa+'/'+idEspecialidad ,plantilla);
  }
}
