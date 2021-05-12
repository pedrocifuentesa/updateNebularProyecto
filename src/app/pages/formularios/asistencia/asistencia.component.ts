import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDateService, NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { FormControl } from '@angular/forms';

import { rejects } from 'assert';
import { EmpresaService } from '../../administracion/services/empresa/empresa.service';
import { EmpleadoService } from '../../administracion/services/empleado/empleado.service';
import { CuadrillaService } from '../../administracion/services/cuadrilla/cuadrilla.service';
import { ContratoService } from '../../administracion/services/contratos/contrato.service';
import { AsistenciaService } from '../../administracion/services/asistencia/asistencia.service';
import { Contrato } from '../../administracion/model/contrato';
import { Asistencia } from '../../administracion/model/asistencia';

@Component({
  selector: 'ngx-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  // ----------------------//
  // ------Variables-------//
  // ----------------------//
  max: Date;
  rutEmpresa: string;
  idContrato: string;
  fecha = new Date();
  arrayobjet:any[]=[]
  listaCuadrillas: Array<{ value: number, title: string }> = [];
  formControl = new FormControl();
  opciones = [{ value: 'T', title: 'TRABAJANDO' }
    , { value: 'A', title: 'AUSENTE' }
    , { value: 'D', title: 'DESCANSO' }
    , { value: 'C', title: 'CALAMA' }
    , { value: 'LM', title: 'LICENCIA MEDICA' }
    , { value: 'PG', title: 'PERMISO CON GOCE DE SUELDO' }
    , { value: 'PS', title: 'PERMISO SIN GOCE DE SUELDO' }
    , { value: 'V', title: 'VACACIONES' }
    , { value: 'F', title: 'FINIQUITADO' }];
  // ----------------------//
  // ------Configuracion Data Table -------//
  // ----------------------//
  settings = {
    /*  add: {
       addButtonContent: '<i class="nb-plus"></i>',
       createButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
       confirmCreate: true,
     }, */
    actions: { add: false, columnTitle: '' ,delete: false},
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      RUT_EMPLEADO: {
        title: 'RUT_EMPLEADO',
        type: 'text',
        editable: false
      },
      NOMBRE_PERSONA: {
        title: 'NOMBRE_PERSONA',
        type: 'text',
        editable: false
      },
      /*    ID_CARGO:  {
           title: 'ID_CARGO',
           type: 'text',
           editable: false
         }, */
      /*  NOMBRE_CARGO: {
         title: 'NOMBRE_CARGO',
         type: 'text',
         editable: false
       }, */
      /*     ID_JORNADA:  {
            title: 'ID_JORNADA',
            type: 'text',
            editable: false
          }, */
      NOMBRE_JORNADA: {
        title: 'NOMBRE_JORNADA',
        type: 'text',
        editable: false,
        filter: false
      },
      /*     ID_TURNO:  {
            title: 'ID_TURNO',
            type: 'text',
            editable: false
          }, */
      /* NOMBRE_TURNO: {
        title: 'NOMBRE_TURNO',
        type: 'text',
        editable: false,
        filter:false
      }, */
      /*  MANO_OBRA_EMPLEADO: {
         title: 'MANO DE OBRA',
         type: 'text',
         editable: false,
         filter:false,
       }, */
      VALOR_ASISTENCIA: {
        title: 'VALOR_ASISTENCIA',
        type: 'html',
        editable: true,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.opciones,
          },
        },
        valuePrepareFunction: (cell, row) => {
          /* console.log(cell);
            console.log(row); */
          return row.NOMBRE_ASISTENCIA;
        },
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private activatedRoute: ActivatedRoute
    , private toastService: NbToastrService
    , private empresaService: EmpresaService
    , private empleadoService: EmpleadoService
    , private cuadrillaService: CuadrillaService
    , private contratoService: ContratoService
    , private asistenciaService: AsistenciaService
    , protected dateService: NbDateService<Date>) {
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
    this.rutEmpresa = this.activatedRoute.snapshot.params['rutEmpContrato'];
    this.max = this.dateService.addMonth(this.dateService.today(), 0);

  }

  ngOnInit(): void {

    /* this.getCuadrillas(); */
  }


  async getListaAsistencia() {
    //console.log(this.formControl.value);
    if (this.formControl.value !== null) {
      //[0] Año
      //[1] mes
      //[2] dia
      //console.log(this.formControl.value._i);
      let formatoFecha =new Date(this.formControl.value)
      formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
      let truncformatoFechaini = formatoFecha.getFullYear() + '-' + ('0' + formatoFecha.getMonth()).slice(-2) + '-' + ('0' + formatoFecha.getDate()).slice(-2);
      /* let año = this.formControl.value._i[0];
      let mes = this.formControl.value._i[1];
      let dia = this.formControl.value._i[2];
      let formatoFecha = año + '-' + mes + '-' + dia + ' 00:00:00'; */

      //console.log(truncformatoFechaini);
      await this.getempleadosContratoCuadrilla(truncformatoFechaini);


    }

  }


  getempleadosContratoCuadrilla(fecha) {
    
    /* let formatoFecha=new Date(fecha)
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    console.log(formatoFecha); */
   
   
    let contratoFind = new Contrato;
    contratoFind.NUMERO_CONTRATO = this.idContrato;
    contratoFind.RUT_EMPRESA = this.rutEmpresa;
    
    let asistDia = new Asistencia;
    asistDia.FECHA_ASISTENCIA = fecha;
    asistDia.NUMERO_CONTRATO = this.idContrato;
    asistDia.RUT_EMPRESA = this.rutEmpresa;
    // Verifico si existe asistencia; para no registrar y deshabilitar boton
    // let btn = document.getElementById('registrarAsistencia');
    // btn.setAttribute('disabled','true');
    let btn = document.getElementById('registrarAsistencia');
    this.asistenciaService.verificarAsistenciaDia(asistDia).subscribe(res => {

      console.log(res.data.length);
      if(res.data.length > 0){


        btn.setAttribute('disabled', 'true');

        
        this.arrayobjet = res.data;
        this.source.load(this.arrayobjet);



      }else{
        btn.removeAttribute('disabled');
        this.empleadoService.perasistencia(this.rutEmpresa, Number(this.idContrato)).subscribe(res => {
          //console.log(res);
          this.arrayobjet = res.data;
          this.source.load(this.arrayobjet);
        }, err => {
          //console.log(err);
        });
      }
    }, err => {
      console.log(err);
    });

  }
  async registrarAsistencia() {
    let btn = document.getElementById('registrarAsistencia');
    btn.setAttribute('disabled', 'true');


    let formatoFecha=new Date(this.formControl.value);
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    let truncformatoFechaini = formatoFecha.getFullYear() + '-' + ('0' + formatoFecha.getMonth()).slice(-2) + '-' + ('0' + formatoFecha.getDate()).slice(-2);
    //console.log(truncformatoFechaini);
    
    
    //let fecha = this.formControl.value['_i'][0] + '-' + this.formControl.value['_i'][1] + '-' + this.formControl.value['_i'][2];
    

    
    let newAsistencia = new Asistencia;
    //console.log(fecha); 
    this.source['data'].forEach(val => {
      newAsistencia.RUT_EMPRESA = val.RUT_EMPRESA;
      newAsistencia.RUT_EMPLEADO = val.RUT_EMPLEADO;
      newAsistencia.FECHA_ASISTENCIA = truncformatoFechaini;
      newAsistencia.NUMERO_CONTRATO = val.NUMERO_CONTRATO;
      newAsistencia.VALOR_ASISTENCIA = val.VALOR_ASISTENCIA;
      this.asistenciaService.save(newAsistencia).subscribe(res => {
        //console.log(res);
      }, err => {
        //console.log(err);
      });
    });
    this.toastService.show('Se Registro correctamente!','Asistencia',{ status: 'success' });
    this.getListaAsistencia();
    btn.removeAttribute('disabled');
   
  }



  onEdit(event):void { 
  // crear objeto

  // validar info

  // update Seleccion

  this.arrayobjet.find(valores=>{

    if(valores['RUT_EMPLEADO'] === event.newData.RUT_EMPLEADO){
    console.log(valores['VALOR_ASISTENCIA'] );
      valores['VALOR_ASISTENCIA'] = event.newData.VALOR_ASISTENCIA;
    }
 });

  this.source.load(this.arrayobjet);

  return event.confirm.resolve();
  /* this.arrayobjet.find(valores=>{

     if(valores['RUT_EMPLEADO'] === event.newData.RUT_EMPLEADO){
      valores['VALOR_ASISTENCIA'] = event.newData.VALOR_ASISTENCIA;
     }
    
  });
  console.log(this.arrayobjet);
  
  this.source.load(this.arrayobjet); */

  return event.confirm.resolve();
 /*  let formatoFecha=new Date(this.formControl.value);
  formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
  let truncformatoFechaini = formatoFecha.getFullYear() + '-' + ('0' + formatoFecha.getMonth()).slice(-2) + '-' + ('0' + formatoFecha.getDate()).slice(-2);
  
  
  console.log(event);
  //event.data = event.newData;
  //this.source.update(event['data'],event['newData']);
  let asistenciaEmpleado = new Asistencia;
  asistenciaEmpleado.VALOR_ASISTENCIA = event.newData.VALOR_ASISTENCIA; // este cambia
  asistenciaEmpleado.FECHA_ASISTENCIA= truncformatoFechaini;
  asistenciaEmpleado.NUMERO_CONTRATO= event.data.NUMERO_CONTRATO;
  asistenciaEmpleado.RUT_EMPLEADO= event.data.RUT_EMPLEADO;
  asistenciaEmpleado.RUT_EMPRESA= event.data.RUT_EMPRESA;
  this.asistenciaService.updateAsistenciaEmpleado(asistenciaEmpleado.RUT_EMPLEADO,asistenciaEmpleado).subscribe(res=>{
      this.toastService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
      this.getListaAsistencia();
      this.source.refresh();
      return event.confirm.resolve();
  },err=>{
    this.toastService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
    return event.confirm.reject();
  }) */
  }
}
