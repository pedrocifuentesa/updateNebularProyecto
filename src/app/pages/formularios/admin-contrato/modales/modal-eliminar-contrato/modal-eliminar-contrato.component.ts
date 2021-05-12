import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpresaService } from '../../../../administracion/services/empresa/empresa.service';


@Component({
  selector: 'app-modal-eliminar-contrato',
  templateUrl: './modal-eliminar-contrato.component.html',
  styleUrls: ['./modal-eliminar-contrato.component.scss']
})
export class ModalEliminarContratoComponent implements OnInit {
  @Input() contrato_FrmDelete: Contrato;
  constructor(protected ref: NbDialogRef<ModalEliminarContratoComponent>
    ,protected dateService: NbDateService<Date>
    ,private empresaService: EmpresaService
    ,private contratoService: ContratoService
    ,private fb:FormBuilder
    ,private toastrService: NbToastrService) { }

  ngOnInit() {


  }
  cancel() {
    this.ref.close();
  }

  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
}
/* async obtenerContratoVal(contrato){
  await this.contratoService.obtenerContrato(contrato).subscribe((res)=>{
    if (res.data.length <= 0 ) {
        this.eliminar(contrato);
    }else{
        this.toastrService.show('Contrato ya Existe','Alerta!',{status:'warning'});
    }
  });
}; */
async eliminar(contrato) {
  //console.log(contrato);
  contrato.VIGENCIA_CONTRATO = 'N';
  console.log(contrato.NUMERO_CONTRATO);
  let contratoID = String(contrato.NUMERO_CONTRATO);
  this.contratoService.updateContrato(contratoID,contrato).subscribe(
    response => {
      //console.log(response);
      /* if (response.error=== false) { */
        this.toastrService.show('Deshabilitado correctamente','OK!',{status:'success'});
        this.ref.close();
      /* }else{
        this.toastrService.show(response.message,'Error',{status:'danger'});
      } */
    }
  );
}
}
