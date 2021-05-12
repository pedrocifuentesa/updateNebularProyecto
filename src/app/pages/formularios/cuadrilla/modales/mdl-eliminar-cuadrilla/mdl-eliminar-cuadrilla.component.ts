import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Cuadrilla } from '../../../../administracion/model/cuadrilla';
import { CuadrillaService } from '../../../../administracion/services/cuadrilla/cuadrilla.service';


@Component({
  selector: 'app-mdl-eliminar-cuadrilla',
  templateUrl: './mdl-eliminar-cuadrilla.component.html',
  styleUrls: ['./mdl-eliminar-cuadrilla.component.scss']
})
export class MdlEliminarCuadrillaComponent implements OnInit {
  @Input() titulo:string;
  @Input() cuadrilla:Cuadrilla;
  constructor(protected ref: NbDialogRef<MdlEliminarCuadrillaComponent>
    ,private fb:FormBuilder
    ,protected dateService: NbDateService<Date>
    ,private toastrService: NbToastrService
    ,private cuadrillaServise:CuadrillaService) { }

  ngOnInit() {
  }
  eliminarCuadrilla(){
    console.log(this.cuadrilla);

    let newCuadrilla = new Cuadrilla;
    let valueEstado='';
    if(this.cuadrilla.VIGENCIA_CUADRILLA==="Activo"){
      valueEstado='S'
    }else{
      valueEstado='N'
    }
    newCuadrilla.ID_CUADRILLA= this.cuadrilla.ID_CUADRILLA;
    newCuadrilla.NOMBRE_CUADRILLA=this.cuadrilla.NOMBRE_CUADRILLA;
    newCuadrilla.NUMERO_CONTRATO=this.cuadrilla.NUMERO_CONTRATO;
    newCuadrilla.RUT_EMPRESA=this.cuadrilla.RUT_EMPRESA;
    newCuadrilla.VIGENCIA_CUADRILLA='N';

    this.cuadrillaServise.modificarCuadrilla(this.cuadrilla.ID_CUADRILLA,newCuadrilla).subscribe(response => {
      this.ref.close();
    });
  }
  cancel() {
    this.ref.close();
  }

}
