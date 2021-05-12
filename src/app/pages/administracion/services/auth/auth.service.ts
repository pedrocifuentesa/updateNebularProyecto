import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
/*   getUsuarios():Observable<Cargo[]>{
    return this.http.get<Cargo[]>('http://localhost:8080/cargo');
  } */
  save(usuario : any ):Observable <any>{
    let body = usuario;
    return this.http.post(environment.apiURL+'auth/save',body, );
  }
  autentificar(usuario : any ):Observable <any>{
    let body = usuario;
    return this.http.post(environment.apiURL+'auth/autentificar',body);
  }
  
}
