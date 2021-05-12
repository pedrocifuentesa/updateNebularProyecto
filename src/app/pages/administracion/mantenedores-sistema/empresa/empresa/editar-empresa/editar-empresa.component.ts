import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Empresa } from '../../../../model/empresa';
import { EmpresaService } from '../../../../services/empresa/empresa.service';


@Component({
  selector: 'ngx-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss'],
 

})
export class EditarEmpresaComponent implements OnInit {
  empresa:Empresa;
  empresaFormUpdate:FormGroup;
  constructor(protected ref: NbDialogRef<EditarEmpresaComponent>,private fb: FormBuilder,private empresaService:EmpresaService) { 
   
  }

  ngOnInit(): void {
    console.log(this.empresa);
    this.formUpdateEmpresa();
  }
  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
  formUpdateEmpresa(){
    this.empresaFormUpdate=this.fb.group({
      nombreEmpresa:[""],
      razonEmpresa:[""],
      direcionEmpresa:[""]
    });
    this.empresaFormUpdate.controls["nombreEmpresa"].setValue(this.empresa.NOMBRE_FANTASIA_EMPRESA);
    this.empresaFormUpdate.controls["razonEmpresa"].setValue(this.empresa.RAZON_SOCIAL_EMPRESA);
    this.empresaFormUpdate.controls["direcionEmpresa"].setValue(this.empresa.DIRECCION_EMPRESA);
  }
  async update(){
    this.empresa.NOMBRE_FANTASIA_EMPRESA=this.empresaFormUpdate.controls["nombreEmpresa"].value;
    this.empresa.RAZON_SOCIAL_EMPRESA=this.empresaFormUpdate.controls["razonEmpresa"].value;
    this.empresa.DIRECCION_EMPRESA=this.empresaFormUpdate.controls["direcionEmpresa"].value;
    await new Promise((resolve,reject)=>{
      this.empresaService.update(this.empresa).subscribe(
        response=>{
          this.ref.close();
          return resolve(response);
        },
        error=>{
          return reject(error);
        }
      )
      ;
    })
  }

}
