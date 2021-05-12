import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Empresa } from '../../../../administracion/model/empresa';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpresaService } from '../../../../administracion/services/empresa/empresa.service';


@Component({
  selector: 'app-modal-actualizar-contrato',
  templateUrl: './modal-actualizar-contrato.component.html',
  styleUrls: ['./modal-actualizar-contrato.component.scss']
})
export class ModalActualizarContratoComponent implements OnInit {
  // si recive variables en este caso el contrato. 
  @Input() contrato_FrmUpdate: Contrato;

  formContrato: FormGroup;
  obtContrato: Contrato;
  infoEmpresa: Empresa[] = [];


  constructor(protected ref: NbDialogRef<ModalActualizarContratoComponent>
    , protected dateService: NbDateService<Date>
    , private empresaService: EmpresaService
    , private contratoService: ContratoService
    , private fb: FormBuilder
    , private toastrService: NbToastrService) {


  }

  ngOnInit() {
    this.inicializarFormContrato(this.contrato_FrmUpdate);
    this.cargarInfoEmpresa(this.contrato_FrmUpdate.RUT_EMPRESA);
    //console.log(new Date(this.contrato_FrmUpdate.FECHA_INI_CONTRATO));
    console.log(new Date(this.contrato_FrmUpdate.FECHA_FIN_CONTRATO));
  }



  /*   setFormContrato(contrato){
      this.formContrato.patchValue({
      rutEmpresa:[contrato.RUT_EMPRESA]
      ,nroContrato:[contrato.NUMERO_CONTRATO]
      ,nombreContrato:[contrato.NOMBRE_CONTRATO ]
      ,descripcionContrato:[contrato.DESCRIPCION_CONTRATO ]
      ,fechaDesde:[new Date() ]
      ,fechaHasta:[new Date(contrato.FECHA_FIN_CONTRATO) ]
      });
  } */

  inicializarFormContrato(contrato: Contrato) {
    let fechaini =new Date(contrato.FECHA_INI_CONTRATO)
    let fechafin =new Date(contrato.FECHA_FIN_CONTRATO)

    
  
    this.formContrato = this.fb.group({
      rutEmpresa: [contrato.RUT_EMPRESA, []]
      , nroContrato: [contrato.NUMERO_CONTRATO, []]
      , nombreContrato: [contrato.NOMBRE_CONTRATO, []]
      , descripcionContrato: [contrato.DESCRIPCION_CONTRATO, []]
      , fechaDesde: [this.dateService.createDate(fechaini.getFullYear(),fechaini.getMonth(),fechaini.getDate()), []]
      , fechaHasta: [  this.dateService.createDate(fechafin.getFullYear(),fechafin.getMonth(),fechafin.getDate()), []]
    });
    //this.formContrato.controls['nroContrato'].disable();
  }
  async save(contrato) {

    this.contratoService.updateContrato(contrato.NUMERO_CONTRATO, contrato).subscribe(
      response => {
        //console.log(response);
        this.ref.close();
        /* 
        if (response.error === false) {
          this.toastrService.show(response.message,'OK!',{status:'success'});
          this.ref.close();
        }else{
          this.toastrService.show(response.message,'Error',{status:'danger'});
        } */
      }
    );
  }

  async obtenerContratoVal(contrato) {
    await this.contratoService.obtenerContrato(contrato).subscribe((res) => {
      if (res.data.length > 0) {
        this.save(contrato);
      } else {
        this.toastrService.show('Contrato no existe', 'Alerta!', { status: 'warning' });
      }
    });
  };
  async cargarInfoEmpresa(rutEmpresa) {
    await this.empresaService.findByRut(rutEmpresa).subscribe(res => {
      this.infoEmpresa = [...this.infoEmpresa, res.data];
      this.formContrato.controls['rutEmpresa'].setValue(rutEmpresa);

    });
  }

  async actualizarContrato() {
    let formulario = this.formContrato.value;

    let contrato = new Contrato;
    var options = { year: 'numeric', month: 'short', day: 'numeric' };

    let formatoFecha = new Date(formulario.fechaDesde);
    let formatoFecha1 = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    let truncformatoFechaini = formatoFecha1.getFullYear() + '-' + formatoFecha1.getMonth() + '-' + formatoFecha1.getDate();

    let formatoFechafin = new Date(formulario.fechaHasta);
    let formatoFechafin1 = new Date(formatoFechafin.setMonth(formatoFechafin.getMonth() + 1));
    let truncformatoFechafin = formatoFechafin1.getFullYear() + '-' + formatoFechafin1.getMonth() + '-' + formatoFechafin1.getDate();


    if (!this.validarFormatoFecha(truncformatoFechaini)) {
      this.toastrService.show('Error en fecha incicio', 'Alerta!', { status: 'warning' });
      return false;
    }
    if (!this.validarFormatoFecha(truncformatoFechafin)) {
      this.toastrService.show('Error en fecha termino', 'Alerta!', { status: 'warning' });
      return false;
    }
    if (formatoFecha > formatoFechafin) {
      this.toastrService.show('Fecha inicio no puede ser mayor a fecha fin', 'Alerta!', { status: 'warning' });
      return false;

    }

    contrato.RUT_EMPRESA = formulario.rutEmpresa;
    contrato.NUMERO_CONTRATO = formulario.nroContrato;
    contrato.NOMBRE_CONTRATO = formulario.nombreContrato.toUpperCase();
    contrato.DESCRIPCION_CONTRATO = formulario.descripcionContrato.toUpperCase();
    contrato.FECHA_INI_CONTRATO = truncformatoFechaini;
    contrato.FECHA_FIN_CONTRATO = truncformatoFechafin;
    contrato.VIGENCIA_CONTRATO = 'S';
   
    this.obtenerContratoVal(contrato);
  }
  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
      return true;
    } else {
      return false;
    }
  }
  cancel() {
    this.ref.close();
  }
  async submit() {
    await this.ref.close();
  }

}
