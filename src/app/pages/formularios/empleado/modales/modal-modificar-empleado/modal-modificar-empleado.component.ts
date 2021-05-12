import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Empleado } from '../../../../administracion/model/empleado';
import { Especialidad } from '../../../../administracion/model/especialidad';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpleadoService } from '../../../../administracion/services/empleado/empleado.service';
import { EmpresaService } from '../../../../administracion/services/empresa/empresa.service';


@Component({
  selector: 'ngx-modal-modificar-empleado',
  templateUrl: './modal-modificar-empleado.component.html',
  styleUrls: ['./modal-modificar-empleado.component.scss'],
})
export class ModalModificarEmpleadoComponent implements OnInit {
  // variables Recividas
  @Input() empleadoModificar: any;
  @Input() listaTE: any;
  @Input() listaCargo: any;
  @Input() listaJornada: any;
  @Input() listaTurno: any;
  @Input() contratoPersona: any;
  @Input() listaEspecialidad: Especialidad[]=[];

  // variables vacias
  personaUpdate: Empleado;
  
  max: Date;
  min: Date;

  formUpdateEmpleado: FormGroup;
  constructor(
    protected ref: NbDialogRef<ModalModificarEmpleadoComponent>
    , protected dateService: NbDateService<Date>
    , private empresaService: EmpresaService
    , private contratoService: ContratoService
    , private empleadoService: EmpleadoService
    , private fb: FormBuilder
    , private toastrService: NbToastrService,
  ) {
    this.inicializarFormContrato();

  }

  ngOnInit() {
    this.obtenerEmpleadoContrato(this.empleadoModificar.RUT, this.contratoPersona);
  }


  inicializarFormContrato() {
    this.formUpdateEmpleado = this.fb.group({
      empleadoMod: ['', []]
      , tipoEmpleadoSel: ['', []]
      , selectEspecialidad: ['', []]
      , cargoSel: ['', []]
      , jornadaSel: ['', []]
      , turnoSel: ['', []]
      , lugarTrabajo: ['', []]
      , manoObra: ['', []]
      , valorEmpleado: ['', []]
      , fechaini: ['', []]
      , fechafin: ['', []],
    });
  }

  setValueFormControl(empleado: Empleado) {
    let fechaini = new Date(empleado.FECHA_INI_EMPLEADO)
    let fechafin = new Date(empleado.FECHA_FIN_EMPLEADO)
    this.formUpdateEmpleado.setValue(
      {
        empleadoMod: empleado.RUT_EMPLEADO,
        tipoEmpleadoSel: empleado.ID_TE,
        cargoSel: empleado.ID_CARGO,
        jornadaSel: empleado.ID_JORNADA,
        selectEspecialidad:empleado.ID_ESPECIALIDAD,
        turnoSel: empleado.ID_TURNO,
        lugarTrabajo: empleado.LUGAR_TRABAJO_EMPLEADO,
        manoObra: empleado.MANO_OBRA_EMPLEADO,
        valorEmpleado: empleado.VALOR_EMPLEADO,
        fechaini: this.dateService.createDate(fechaini.getFullYear(),fechaini.getMonth(),fechaini.getDate()),
        fechafin: this.dateService.createDate(fechafin.getFullYear(),fechafin.getMonth(),fechafin.getDate()),
      });
  }

  async obtenerContratoVal(empleado: Empleado) {
    await this.empleadoService.findByRut(empleado).subscribe((res) => {
      if (res.data.length > 0) {
        this.save(empleado);
      } else {
        this.toastrService.show('Empleado no existe', 'Alerta!', { status: 'warning' });
      }
    });
  }


  async obtenerEmpleadoContrato( rutEmpleado, contrato: Contrato) {
    const empleadoBusqueda = new Empleado;
    empleadoBusqueda.RUT_EMPLEADO = rutEmpleado;
    empleadoBusqueda.RUT_EMPRESA = contrato.RUT_EMPRESA;
    empleadoBusqueda.NUMERO_CONTRATO = contrato.NUMERO_CONTRATO;
    let valfechaini = new Date(contrato.FECHA_INI_CONTRATO);
     //valfechaini = new Date(valfechaini.setMonth(valfechaini.getMonth()));
    let valfechafin = new Date(contrato.FECHA_FIN_CONTRATO);
     //valfechafin = new Date(valfechafin.setMonth(valfechafin.getMonth()));
    await this.empleadoService.findByRut(empleadoBusqueda).subscribe(res => {
      this.personaUpdate = res.data;
      this.setValueFormControl(this.personaUpdate);
      this.min = this.dateService.createDate(valfechaini.getFullYear(),valfechaini.getMonth(),valfechaini.getDate());
      this.max = this.dateService.createDate(valfechafin.getFullYear(),valfechafin.getMonth(),valfechafin.getDate());
    });

  }
  async save(empleado) {
    this.empleadoService.update(empleado).subscribe(
      response => {
        this.toastrService.show('Actualizado Correctamente', 'Actualizar!', { status: 'success' });
        this.ref.close();
      });
  }
  cancel() {
    this.ref.close();
  }
  async submit() {
    await this.ref.close();
  }
  // validaciones Fechas
  validarFormatoFecha(campo) {
    const RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo !== '')) {
      return true;
    } else {
      return false;
    }
  }
  actualizarEmpleado (){

 
    const formulario = this.formUpdateEmpleado.value;
    console.log(formulario);
    let formatoFecha = new Date(formulario.fechaini);
    
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    const truncformatoFechaini = formatoFecha.getFullYear() + '-' + formatoFecha.getMonth() + '-' + formatoFecha.getDate();
    if (!this.validarFormatoFecha(truncformatoFechaini)) {
      this.toastrService.show('Fecha inicio es incorrecta', 'Alerta!', { status: 'warning' });
      return false;
    }

    let formatoFechater = new Date(formulario.fechafin);
    formatoFechater = new Date(formatoFechater.setMonth(formatoFechater.getMonth() + 1));
    let truncformatoFechafin = formatoFechater.getFullYear() + '-' + formatoFechater.getMonth() + '-' + formatoFechater.getDate();
    if (!this.validarFormatoFecha(truncformatoFechafin)) {
      const truncFechaContrato = new Date(this.contratoPersona['FECHA_FIN_CONTRATO'])
      truncformatoFechafin = truncFechaContrato.getFullYear() + '-' + truncFechaContrato.getMonth() + '-' + truncFechaContrato.getDate();;
    }

  
    
    const empleado = new Empleado;

    empleado.RUT_EMPLEADO = formulario.empleadoMod;
    empleado.RUT_EMPRESA = this.contratoPersona['RUT_EMPRESA'];
    empleado.NUMERO_CONTRATO = this.contratoPersona['NUMERO_CONTRATO'];
    empleado.ID_CARGO = formulario.cargoSel;
    empleado.ID_TE = formulario.tipoEmpleadoSel;
    empleado.ID_JORNADA = formulario.jornadaSel;
    empleado.ID_TURNO = formulario.turnoSel;
    empleado.ID_ESPECIALIDAD = formulario.selectEspecialidad;
    empleado.FECHA_INI_EMPLEADO = truncformatoFechaini;
    empleado.FECHA_FIN_EMPLEADO = truncformatoFechafin;

    empleado.LUGAR_TRABAJO_EMPLEADO = formulario.lugarTrabajo.toUpperCase();
    empleado.MANO_OBRA_EMPLEADO = formulario.manoObra.toUpperCase();
    empleado.VALOR_EMPLEADO = formulario.valorEmpleado.toUpperCase();
  
    this.save(empleado);
  
  }
}
