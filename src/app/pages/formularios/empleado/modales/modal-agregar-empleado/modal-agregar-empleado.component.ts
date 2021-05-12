import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Empleado } from '../../../../administracion/model/empleado';
import { Especialidad } from '../../../../administracion/model/especialidad';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpleadoService } from '../../../../administracion/services/empleado/empleado.service';

@Component({
  selector: 'ngx-modal-agregar-empleado',
  templateUrl: './modal-agregar-empleado.component.html',
  styleUrls: ['./modal-agregar-empleado.component.scss'],
})
export class ModalAgregarEmpleadoComponent implements OnInit {
  @Input() title: string;
  @Input() listaPersonas: Array<Object>;
  @Input() listaTE: any;
  @Input() listaCargo: any;
  @Input() listaJornada: any;
  @Input() listaTurno: any;
  @Input() listaEspecialidad : Especialidad[]=[]
  @Input() contrato_Frm: Contrato;
  @Input() empresa_Frm: any;
  ListaEmpleados: Empleado[] = [];
  lstPersonas = [];
  lista_personas: []=[];
  lista_TE: [] = [];
  lista_Cargo: [] = [];
  lista_Jornada: [] = [];
  lista_Turno: [] = [];
  contratoFrm: Contrato;
  empresaFrm: string;
  formPersonaContrato: FormGroup;
  
  max: Date;
  min: Date;
  constructor(protected ref: NbDialogRef<ModalAgregarEmpleadoComponent>
    , private fb: FormBuilder
    , private empleadoService: EmpleadoService
    , protected dateService: NbDateService<Date>
    , private contratoService: ContratoService
    , private toastrService: NbToastrService) {
    
  }
  ngOnInit(): void {
    console.log(this.contrato_Frm);
        let fechaini = new Date(this.contrato_Frm.FECHA_INI_CONTRATO);
        //fechaini = new Date(fechaini.setMonth(fechaini.getMonth() + 1));
        
        //console.log(fechaini);
        let fechafin = new Date(this.contrato_Frm.FECHA_FIN_CONTRATO);
        //fechafin = new Date(fechafin.setMonth(fechafin.getMonth() + 1));
       // console.log(fechafin);
        this.min = this.dateService.createDate(fechaini.getFullYear(),fechaini.getMonth(),fechaini.getDate());
        this.max = this.dateService.createDate(fechafin.getFullYear(),fechafin.getMonth(),fechafin.getDate());
    this.contratoFrm = this.contrato_Frm;
    this.empresaFrm = this.empresa_Frm;

    this.formPersonaContrato = this.fb.group({
      frmPerCotrato: ['', [ ]]
      , seltipoempleado: ['', [ ]]
      , selEspecialidad:['',[]]
      , selPersonas: ['', [ ]]
      , selcargo: ['', [ ]]
      , seljornada: ['', [ ]]
      , selturno: ['', [ ]]
      , finicio: ['', [ ]]
      , ftermino: ['', [ ]]
      , lugarTrabajo: ['', [ ]]
      , manoObra: ['', [ ]]
      /* , valorEmpleado: ['', [ ]], */
    });
  
    //empleados
    this.empleadosFueradelContrato(this.contratoFrm);
   
    //tipo Empleado
    this.lista_TE = this.listaTE;
    //cargo
    this.lista_Cargo = this.listaCargo;
    //Jornada
    this.lista_Jornada = this.listaJornada;
    //turno
    this.lista_Turno = this.listaTurno;
  }
  cancel (){
    this.ref.close();
  }
  async save(contrato) {
    await new Promise((resolve, reject) => {
      this.empleadoService.save(contrato).subscribe(
        response => {
          this.ref.close();
          return resolve(response);
        });
    });
  }
  async submit(name) {
    const formulario = this.formPersonaContrato.value;
    let formatoFecha = new Date(formulario.finicio);
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    const truncformatoFechaini = formatoFecha.getFullYear() + '-' + formatoFecha.getMonth() + '-' + formatoFecha.getDate();
    if (!this.validarFormatoFecha(truncformatoFechaini)) {
      this.toastrService.show('Fecha inicio es incorrecta', 'Alerta!', { status: 'warning' });
      return false;
    }

    let formatoFechater = new Date(formulario.ftermino);
    formatoFechater = new Date(formatoFechater.setMonth(formatoFechater.getMonth() + 1));
    let truncformatoFechafin = formatoFechater.getFullYear() + '-' + formatoFechater.getMonth() + '-' + formatoFechater.getDate();
    if (!this.validarFormatoFecha(truncformatoFechafin)) {
      const truncFechaContrato = new Date(this.contratoFrm['FECHA_FIN_CONTRATO'])
      truncformatoFechafin = truncFechaContrato.getFullYear() + '-' + truncFechaContrato.getMonth() + '-' + truncFechaContrato.getDate();;
    }

    //new Date(formulario.finicio).toLocaleString(['en-EN'],{ year: 'numeric', month: 'numeric', day: 'numeric' });
    const emp = this.empresaFrm;
    const empleado = new Empleado;

    empleado.RUT_EMPLEADO = formulario.selPersonas['RUT'];
    //empleado.RUT_EMPRESA = this.empresaFrm['RUT_EMPRESA'];
    empleado.RUT_EMPRESA = this.empresaFrm;
    empleado.NUMERO_CONTRATO = this.contratoFrm['NUMERO_CONTRATO'];
    empleado.ID_CARGO = formulario.selcargo['ID_CARGO'];
    empleado.ID_TE = formulario.seltipoempleado['ID_TE'];
    empleado.ID_JORNADA = formulario.seljornada['ID_JORNADA'];
    empleado.ID_TURNO = formulario.selturno['ID_TURNO'];
    empleado.ID_ESPECIALIDAD = formulario.selEspecialidad;

    empleado.FECHA_INI_EMPLEADO = truncformatoFechaini;
    empleado.FECHA_FIN_EMPLEADO = truncformatoFechafin;

    empleado.LUGAR_TRABAJO_EMPLEADO = formulario.lugarTrabajo.toUpperCase();
    empleado.MANO_OBRA_EMPLEADO = formulario.manoObra.toUpperCase();
    empleado.VALOR_EMPLEADO = 'TRAB';
    
    console.log(empleado);
    await this.save(empleado);
  }
  validarFormatoFecha(campo) {
    const RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo !== '')) {
      return true;
    } else {
      return false;
    }
  }
  async empleadosFueradelContrato(valor){
    await this.contratoService.empleadosfueradelcontrato(valor).subscribe((res) => {
      console.log(res['data']);
      this.lista_personas = res['data'];
    });
  }

}
