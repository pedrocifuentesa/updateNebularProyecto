import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Cuadrilla } from '../../../../administracion/model/cuadrilla';
import { Dotacion } from '../../../../administracion/model/dotacion';
import { CuadrillaService } from '../../../../administracion/services/cuadrilla/cuadrilla.service';
import { DotacionService } from '../../../../administracion/services/dotacion/dotacion.service';


@Component({
  selector: 'app-mdl-crear-empleado-docacion',
  templateUrl: './mdl-crear-empleado-docacion.component.html',
  styleUrls: ['./mdl-crear-empleado-docacion.component.scss']
})
export class MdlCrearEmpleadoDocacionComponent implements OnInit {
  //RUT_EMPRESA	
  //RUT_EMPLEADO	// lista de los empleados que existan en el contrato y no se encuentren en otra cuadrilla 
  //NUMERO_CONTRATO	
  //ID_CUADRILLA	
  //FECHA_INI_DOTACION
  //FECHA_FIN_DOTACION	
  //VIGENCIA_DOTACION
  @Input() titulo: string;
  @Input() cuadrilla: Cuadrilla;
  @Input() contrato: Contrato;
/*   min: Date;
  max: Date; */
  formEmpleadoCuadrilla: FormGroup;
  personasFueraCuadrilla: Dotacion[] = [];

  constructor(protected ref: NbDialogRef<MdlCrearEmpleadoDocacionComponent>
    , private fb: FormBuilder
    , protected dateService: NbDateService<Date>
    , private toastrService: NbToastrService
    , private cuadrillaService: CuadrillaService
    , private dotacionServise: DotacionService) { }

  ngOnInit() {
    // debo obtener a las personas que estan fuera de la cuadrilla pero dentro del contrato
    this.formEmpleadoCuadrilla = this.fb.group({
      empleadoSel: ["", []]
     /*  , fechaini: ["", []]
      , fechafin: ["", []] */
      /* ,selVigencia : ["S",[]] */
    });
    this.personasFueraDeCuadrilla();

    /* let fechaValidacionInicio = new Date(this.contrato.FECHA_INI_CONTRATO);
    fechaValidacionInicio = new Date(fechaValidacionInicio.setMonth(fechaValidacionInicio.getMonth() - 1));
    fechaValidacionInicio = this.dateService.createDate(fechaValidacionInicio.getFullYear(),fechaValidacionInicio.getMonth(),fechaValidacionInicio.getDate());
    let fechaValidacionFin = new Date(this.contrato.FECHA_FIN_CONTRATO);
    fechaValidacionFin = new Date(fechaValidacionFin.setMonth(fechaValidacionFin.getMonth() - 1));
    fechaValidacionFin = this.dateService.createDate(fechaValidacionFin.getFullYear(),fechaValidacionFin.getMonth(),fechaValidacionFin.getDate());
    this.min = fechaValidacionInicio;
    this.max = fechaValidacionFin; */

  
  }
  cancel() {
    this.ref.close();
  }
  insertarEmpleadoAdotacion() {
    let dotacion = new Dotacion;
    let formulario = this.formEmpleadoCuadrilla.value;
   /*  console.log(formulario);
    let formatoFecha = new Date(formulario.fechaini);
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

    /* dotacion.FECHA_FIN_DOTACION = truncformatoFechafin;
    dotacion.FECHA_INI_DOTACION = truncformatoFechaini; */
    dotacion.ID_CUADRILLA = this.cuadrilla.ID_CUADRILLA.toString();
    dotacion.NUMERO_CONTRATO = this.contrato.NUMERO_CONTRATO;
    dotacion.RUT_EMPLEADO = formulario.empleadoSel;
    dotacion.RUT_EMPRESA = this.cuadrilla.RUT_EMPRESA;
    dotacion.VIGENCIA_DOTACION = 'S';

    this.dotacionServise.saveDotacion(dotacion).subscribe(response => {
      this.ref.close();
    });
    //console.log(dotacion);

  }
  personasFueraDeCuadrilla() {
    this.cuadrillaService.findEmpleadosFueraCuadrillaIdCuadrillaRutEmpresa(this.cuadrilla).subscribe(response => {
      console.log(response.data);
      this.personasFueraCuadrilla = response.data;
    })
  }
  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
      return true;
    } else {
      return false;
    }
  }
}
