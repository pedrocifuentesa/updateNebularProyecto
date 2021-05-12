import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Cuadrilla } from '../../../../administracion/model/cuadrilla';
import { CuadrillaService } from '../../../../administracion/services/cuadrilla/cuadrilla.service';


@Component({
  selector: 'app-mdl-modificar-cuadrilla',
  templateUrl: './mdl-modificar-cuadrilla.component.html',
  styleUrls: ['./mdl-modificar-cuadrilla.component.scss']
})
export class MdlModificarCuadrillaComponent implements OnInit {

    @Input() titulo : string;
    @Input() cuadrilla : Cuadrilla;

  formCuadrilla: FormGroup;
  constructor(protected ref: NbDialogRef<MdlModificarCuadrillaComponent>
    ,private fb:FormBuilder
    ,protected dateService: NbDateService<Date>
    ,private toastrService: NbToastrService
    ,private cuadrillaServise: CuadrillaService) { }

  ngOnInit():void {
    this.formCuadrilla = this.fb.group({
      inpNombre:['',[]]
     /*  ,selVigencia:['',[]] */
      });

      this.setValueFormControl(this.cuadrilla);
  }
  modificarCuadrilla() {
    let newCuadrilla = new Cuadrilla;
    let formulario = this.formCuadrilla.value;
    let idCuadrilla = Number.parseInt( this.cuadrilla.ID_CUADRILLA.toString(),10);
    let valueEstado='';
    if(this.cuadrilla.VIGENCIA_CUADRILLA==="Activo"){
      valueEstado='S'
    }else{
      valueEstado='N'
    }
    newCuadrilla.ID_CUADRILLA= this.cuadrilla.ID_CUADRILLA;
    newCuadrilla.NOMBRE_CUADRILLA=formulario.inpNombre.toUpperCase();
    newCuadrilla.NUMERO_CONTRATO=this.cuadrilla.NUMERO_CONTRATO;
    newCuadrilla.RUT_EMPRESA=this.cuadrilla.RUT_EMPRESA;
    newCuadrilla.VIGENCIA_CUADRILLA=valueEstado;

    this.cuadrillaServise.modificarCuadrilla(idCuadrilla,newCuadrilla).subscribe(response => {
      this.ref.close();
    });

  }
  setValueFormControl(cuadrilla:Cuadrilla){
   /*  let valueEstado = ''; */
   /*  if(cuadrilla.VIGENCIA_CUADRILLA==="Activo"){
      valueEstado='S'
    }else{
      valueEstado='N'
    } */
    this.formCuadrilla.setValue({
      inpNombre: cuadrilla.NOMBRE_CUADRILLA
      /* ,selVigencia: valueEstado */
    });
  }
  cancel() {
    this.ref.close();
  }

}
