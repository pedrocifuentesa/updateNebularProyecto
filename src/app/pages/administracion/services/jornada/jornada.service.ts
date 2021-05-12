import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jornada } from '../../model/jornada';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor( private http : HttpClient) { }
  getJornada():Observable<Jornada[]>{
    return this.http.get<Jornada[]>(environment.apiURL+'jornada');
  }
save(jornada : any ):Observable <any>{
    let body = jornada;
    return this.http.post(environment.apiURL+'jornada/save',body );
  }

  fltNombre(jornada : Jornada ):Observable <Jornada[]>{
    let body = jornada;
    //console.log(jornada);
    return this.http.get<Jornada[]>(environment.apiURL+'jornada/'+body.NOMBRE_JORNADA.toUpperCase());
  }
  dejeteJornada(jornada : Jornada ):Observable <Jornada[]>{
    let body = jornada;
    //console.log(jornada);
    return this.http.get<Jornada[]>(environment.apiURL+'jornada/delete/'+body.ID_JORNADA);
  }
  update(idJornada:number , jornada:Jornada):Observable<Jornada>{
    return  this.http.put<Jornada>(environment.apiURL+'jornada/update/'+idJornada,jornada);
  }
}
