import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Cuadrilla } from '../../../../administracion/model/cuadrilla';
import { CuadrillaService } from '../../../../administracion/services/cuadrilla/cuadrilla.service';

@Component({
  selector: 'app-mdl-crear-cuadrilla',
  templateUrl: './mdl-crear-cuadrilla.component.html',
  styleUrls: ['./mdl-crear-cuadrilla.component.scss']
})
export class MdlCrearCuadrillaComponent implements OnInit {
  @Input() titulo : string;
  @Input() contrato : Contrato;
  formCuadrilla: FormGroup;

  constructor(protected ref: NbDialogRef<MdlCrearCuadrillaComponent>
    ,private fb:FormBuilder
    ,protected dateService: NbDateService<Date>
    ,private toastrService: NbToastrService
    ,private cuadrillaServise:CuadrillaService) { }

  ngOnInit():void {
    this.formCuadrilla = this.fb.group({
      inpNombre:['',[]]
     /*  ,selVigencia:['',[]] */
      });
  }
  crearCuadrilla(){
    console.log(this.contrato);
    let newCuadrilla = new Cuadrilla;
    let formulario = this.formCuadrilla.value;
    
    newCuadrilla.NOMBRE_CUADRILLA=formulario.inpNombre.toUpperCase();
    newCuadrilla.NUMERO_CONTRATO=this.contrato.NUMERO_CONTRATO;
    newCuadrilla.RUT_EMPRESA=this.contrato.RUT_EMPRESA;
    newCuadrilla.VIGENCIA_CUADRILLA="S";
    this.cuadrillaServise.saveCuadrilla(newCuadrilla).subscribe( response => {
      this.ref.close();
    })
  }
  cancel() {
    this.ref.close();
  }
}
