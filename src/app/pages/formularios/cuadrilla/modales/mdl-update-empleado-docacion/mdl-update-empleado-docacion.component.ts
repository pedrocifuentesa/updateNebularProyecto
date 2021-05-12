import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Dotacion } from '../../../../administracion/model/dotacion';
import { DotacionService } from '../../../../administracion/services/dotacion/dotacion.service';


@Component({
  selector: 'app-mdl-update-empleado-docacion',
  templateUrl: './mdl-update-empleado-docacion.component.html',
  styleUrls: ['./mdl-update-empleado-docacion.component.scss']
})
export class MdlUpdateEmpleadoDocacionComponent implements OnInit {
  @Input() titulo: string;
  @Input() perDotacion: any;
  @Input() contrato: Contrato;
  perModificar = new Dotacion;
  infoDetallar: Object[] = []
  formEmpleadoCuadrilla: FormGroup;
/*   ngModelDateini;
  ngModelDatefin; */
/*   min: Date;
  max: Date; */
  constructor(protected ref: NbDialogRef<MdlUpdateEmpleadoDocacionComponent>
    , private fb: FormBuilder
    , protected dateService: NbDateService<Date>
    , private toastrService: NbToastrService
    , private serviceDotacion: DotacionService) {

  }

  ngOnInit() {
    this.formEmpleadoCuadrilla = this.fb.group({
      empleadoSel: ["", []]

      /* ,selVigencia : ["",[]] */
    });
/* 
       let fechaValidacionInicio = new Date(this.contrato.FECHA_INI_CONTRATO);
       fechaValidacionInicio = new Date(fechaValidacionInicio.setMonth(fechaValidacionInicio.getMonth() - 1));
       fechaValidacionInicio = this.dateService.createDate(fechaValidacionInicio.getFullYear(),fechaValidacionInicio.getMonth(),fechaValidacionInicio.getDate());
       let fechaValidacionFin = new Date(this.contrato.FECHA_FIN_CONTRATO);
       fechaValidacionFin = new Date(fechaValidacionFin.setMonth(fechaValidacionFin.getMonth() - 1));
       fechaValidacionFin = this.dateService.createDate(fechaValidacionFin.getFullYear(),fechaValidacionFin.getMonth(),fechaValidacionFin.getDate());
       this.min = fechaValidacionInicio;
       this.max = fechaValidacionFin;
     */
       //console.log(this.perDotacion) ;
       this.infoDetallar = [this.perDotacion]
      this.setValueFormControl(this.perDotacion);
  }
  cancel() {
    this.ref.close();
  }
  setValueFormControl(perCuadrilla: any) {
  /* 
    let fchini = new Date(perCuadrilla.FECHA_INI_DOTACION);
    //fchini = new Date(fchini.setMonth(fchini.getMonth() - 1));
     fchini = this.dateService.createDate(fchini.getFullYear(),fchini.getMonth(),fchini.getDate());
    let fchfin = new Date(perCuadrilla.FECHA_FIN_DOTACION);
    //fchfin = new Date(fchfin.setMonth(fchfin.getMonth() - 1));
     fchfin = this.dateService.createDate(fchfin.getFullYear(),fchfin.getMonth(),fchfin.getDate()); */
    this.formEmpleadoCuadrilla.setValue({
      empleadoSel: perCuadrilla.RUT_EMPLEADO
/*       , fechaini: fchini
      , fechafin: fchfin */

    });
  }
  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
      return true;
    } else {
      return false;
    }
  }
  actualizar(){
    let dotacion = new Dotacion;
    let formulario = this.formEmpleadoCuadrilla.value;
    
   /*  let formatoFecha = new Date(formulario.fechaini);
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    let truncformatoFechaini = formatoFecha.getFullYear() + '-' + formatoFecha.getMonth() + '-' + formatoFecha.getDate();

    if (!this.validarFormatoFecha(truncformatoFechaini)) {
      this.toastrService.show('Fecha inicio es incorrecta', 'Alerta!', { status: 'warning' });
      return false;
    }

    let formatoFechater = new Date(formulario.fechafin);
    formatoFechater = new Date(formatoFechater.setMonth(formatoFechater.getMonth() + 1));
    let truncformatoFechafin = formatoFechater.getFullYear() + '-' + formatoFechater.getMonth() + '-' + formatoFechater.getDate();

    if (!this.validarFormatoFecha(truncformatoFechafin)) {
      this.toastrService.show('Fecha Fin es incorrecta', 'Alerta!', { status: 'warning' });
      return false;
    } */

    if (formulario.empleadoSel === "") {
      this.toastrService.show('Debe seleccionar un Empleado', 'Alerta!', { status: 'warning' });
      return false;
    }

  /*   dotacion.FECHA_FIN_DOTACION = truncformatoFechafin;
    dotacion.FECHA_INI_DOTACION = truncformatoFechaini; */
    dotacion.ID_CUADRILLA = this.perDotacion.ID_CUADRILLA;
    dotacion.NUMERO_CONTRATO = this.contrato.NUMERO_CONTRATO;
    dotacion.RUT_EMPLEADO = formulario.empleadoSel;
    dotacion.RUT_EMPRESA = this.perDotacion.RUT_EMPRESA;
    dotacion.VIGENCIA_DOTACION = 'S';

    this.serviceDotacion.updateEmpleado(dotacion.RUT_EMPLEADO,dotacion).subscribe(response => {
      
      this.toastrService.show('Empleado Actualizado Correctamente', 'Actualizar!', { status: 'success' });
      this.ref.close();
    }
    );

  } 
}
