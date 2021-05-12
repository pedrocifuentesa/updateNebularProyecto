
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NbThemeService,NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';

import { Contrato } from '../../../../administracion/model/contrato';
import { Empresa } from '../../../../administracion/model/empresa';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpresaService } from '../../../../administracion/services/empresa/empresa.service';


@Component({
  selector: 'ngx-modal-crear-contrato',
  templateUrl: './modal-crear-contrato.component.html',
  styleUrls: ['./modal-crear-contrato.component.scss']
})
export class ModalCrearContratoComponent implements OnInit {

  formContrato: FormGroup;
  obtContrato :  Contrato;
  constructor(protected ref: NbDialogRef<ModalCrearContratoComponent>
    ,protected dateService: NbDateService<Date>
    ,private empresaService: EmpresaService
    ,private contratoService: ContratoService
    ,private fb:FormBuilder
    ,private toastrService: NbToastrService) {

   }
  listaEmpresa: Empresa[] = [];
  ngOnInit(): void {
    this.getEmpresas();
    this.inicializarFormContrato();
  }

inicializarFormContrato(){
    this.formContrato = this.fb.group({
      rutEmpresa:['',[]]
      ,nroContrato:['',[]]
      ,nombreContrato:['',[]]
      ,descripcionContrato:['',[]]
      ,fechaDesde:['',[]]
      ,fechaHasta:['',[]]
    });

    //Validators.required

  }
  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      response => {
        //console.log(response);
        this.listaEmpresa = response;
      },
      /* error => {
       
      } */
    );

  }

  async save(contrato) {
      this.contratoService.save(contrato).subscribe(
        response => {
          console.log(response);
          if (response.error=== false) {
            this.toastrService.show(response.message,'OK!',{status:'success'});
            this.ref.close();
          }else{
            this.toastrService.show(response.message,'Error',{status:'danger'});
          }
        }
      );
  }
  async crearContrato(){
    let formulario = this.formContrato.value;
    let contrato = new Contrato;
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    let formatoFecha = new Date(formulario.fechaDesde) ;
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth()+1));
    let truncformatoFechaini = formatoFecha.getFullYear() + '-' + formatoFecha.getMonth() + '-' + formatoFecha.getDate();
    let formatoFechafin = new Date(formulario.fechaHasta);
    formatoFechafin = new Date(formatoFechafin.setMonth(formatoFechafin.getMonth()+1));
    let truncformatoFechafin = formatoFechafin.getFullYear() + '-' + formatoFechafin.getMonth() + '-' + formatoFechafin.getDate();
   

    console.log(formulario.rutEmpresa.RUT_EMPRESA.length);
    console.log(formulario.nroContrato);
    console.log(formulario.nombreContrato);
     if(formulario.rutEmpresa.RUT_EMPRESA.length < 9){
      this.toastrService.show('Debe seleccionar una empresa!','Alerta',{ status: 'warning' })
       return false;
     }
     if(formulario.nroContrato.length < 1){
      this.toastrService.show('Debe ingresar Nro Contrato','Alerta',{ status: 'warning' })
       return false;
     }
     if(formulario.nombreContrato.length < 1){
      this.toastrService.show('Debe ingresar un Nombre al contrato!','Alerta',{ status: 'warning' })
       return false;
     }

     if (!this.validarFormatoFecha(truncformatoFechaini)) {
      this.toastrService.show('Fecha Inicio incorrecta!','Alerta',{ status: 'warning' })
      return false;
    }
   if (!this.validarFormatoFecha(truncformatoFechafin)) {
     this.toastrService.show('Fecha fin incorrecta!','Alerta',{ status: 'warning' })
      return false;
    }

    contrato.RUT_EMPRESA = formulario.rutEmpresa.RUT_EMPRESA ;
    contrato.NUMERO_CONTRATO = formulario.nroContrato ;
    contrato.NOMBRE_CONTRATO = formulario.nombreContrato .toUpperCase();
    contrato.DESCRIPCION_CONTRATO = formulario.descripcionContrato.toUpperCase();
    contrato.FECHA_INI_CONTRATO = truncformatoFechaini;  
    contrato.FECHA_FIN_CONTRATO =  truncformatoFechafin;
    contrato.VIGENCIA_CONTRATO = 'S';
    this.obtenerContratoVal(contrato);
  }
  
async obtenerContratoVal(contrato){
  await this.contratoService.obtenerContrato(contrato).subscribe((res)=>{
    if (res.data.length <= 0 ) {
        this.save(contrato);
    }else{
        this.toastrService.show('Contrato ya Existe','Alerta!',{status:'warning'});
    }
  });
};

  cancel() {
    this.ref.close();
  }
async submit(){
    await this.ref.close();
  }



  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
}


}
