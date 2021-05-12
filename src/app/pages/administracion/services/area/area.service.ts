import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Area } from '../../model/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {


  constructor(private http : HttpClient) { }
  getAreas():Observable<Area[]>{
    return this.http.get<Area[]>(environment.apiURL+'area');
  }
  save(tarea : Area ):Observable <any>{
    let body = tarea;
    return this.http.post(environment.apiURL+'area/save',body );
  }
  update(id :number , tarea:Area):Observable<any>{
    return  this.http.put<Area>(environment.apiURL+'area/update/'+id,tarea);
  }
}
