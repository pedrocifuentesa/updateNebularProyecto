import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../administracion/services/auth/auth.service';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
 //loginForm:FormGroup;
 rut;
 password;
 Error=null;
  constructor(private fb : FormBuilder,private router : Router,private authService : AuthService) { }
 
  ngOnInit(): void {
   //this.loginForm = this.fb.group({});
  }
  async login(){
    //console.log(this.rut);
    //console.log(this.password);
    if(this.rut===''||this.rut===undefined){
      this.Error = "Rut no puede ser Vacio";
      return false;
    }
    if(this.password===''||this.password===undefined){
      this.Error = "Password no puede ser Vacio";
      return false;
    }
    let user = {RUT : this.rut,
      PASSWORD : this.password};
      //console.log(user);
    // creo la variable en el local storage

await this.authService.autentificar(user).subscribe(
  usuario => {
    //console.log(usuario);
    if(usuario.error===true){
      // notifico que no existe
      this.Error = usuario.message;
    }
    if(usuario.error===false){
      //redirecciono
      let user = usuario.data[0];
      //console.log(user);
      localStorage.setItem("Authentication" , usuario.token);
      localStorage.setItem("rutEmpresa" , user.RUT_EMPRESA);
      localStorage.setItem("correoUsuario" , user.CORREO_USUARIO);
      localStorage.setItem("idPerfil" , user.ID_PERFIL);
      localStorage.setItem("rutEmpleado" , user.RUT_EMPLEADO);
      
      this.router.navigate(['pages/dashboard']);
    }
    /* usuario.forEach(elemento => {
     console.log(elemento)
    }); */
    
  }
)

    //
    //this.router.navigate(['pages/dashboard']);
  }

 /*  async login() {
    //console.log(this.rut);
    //console.log(this.password);
    let user = {RUT : this.rut,
      PASSWORD : this.password};
      console.log(user);
    await new Promise((resolve, reject) => {
      this.authService.autentificar(user).subscribe(
        response => {
          return resolve(response);
        }
      );
    });
  } */
}

