import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogService } from '@nebular/theme';

import { ModalCrearContratoComponent } from '../admin-contrato/modales/modal-crear-contrato/modal-crear-contrato.component';
import { ModalActualizarContratoComponent } from '../admin-contrato/modales/modal-actualizar-contrato/modal-actualizar-contrato.component';
import { ModalEliminarContratoComponent } from '../admin-contrato/modales/modal-eliminar-contrato/modal-eliminar-contrato.component';
import { Router } from '@angular/router';
import { Empresa } from '../../administracion/model/empresa';
import { Contrato } from '../../administracion/model/contrato';
import { EmpresaService } from '../../administracion/services/empresa/empresa.service';
import { ContratoService } from '../../administracion/services/contratos/contrato.service';

@Component({
  selector: 'ngx-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  listaEmpresa: Empresa[] = [];
  listaContratos: Contrato[]=[]
  min: Date;
  formContrato: FormGroup;
  constructor(protected dateService: NbDateService<Date>
    ,private empresaService: EmpresaService
    ,private contratoService: ContratoService
    ,private fb:FormBuilder
    ,private dialogService: NbDialogService
    , private router: Router) { 
    this.min = this.dateService.addDay(this.dateService.today(), 0);
  }

  ngOnInit(): void {

    this.getEmpresas();
    this.inicializarFormContrato();
    this.obtenerContratos();
    //console.log(this.listaEmpresa)

  }
  inicializarFormContrato(){
    /* this.formContrato=this.fb.group({
      rutEmpresa:['',[Validators.required]]
      ,nroContrato:['',[Validators.required]]
      ,nombreContrato:['',[Validators.required]]
      ,descripcionContrato:['',[Validators.required]]
      ,fechaDesde:['',[Validators.required]]
      ,fechaHasta:['',[Validators.required]]
    }); */
    this.formContrato = this.fb.group({
      rutEmpresa:['',[Validators.required]]
      ,nroContrato:['',[Validators.required]]
      ,nombreContrato:['',[Validators.required]]
      ,descripcionContrato:['',[Validators.required]]
      ,fechaDesde:['',[]]
      ,fechaHasta:['',[]]
    });

  }

  async open() {
    await this.dialogService.open(ModalCrearContratoComponent, {
      context: {
      },
    }).onClose.subscribe(
      result => {
        this.obtenerContratos();
      }
      );
  }
  async modificarContrato(contrato){
    //console.log(contrato);
    await this.dialogService.open(ModalActualizarContratoComponent, {
      context: {
        contrato_FrmUpdate : contrato,
        //rutEmpresa: this.listaEmpleadosFueraContrato,
      },
    }).onClose.subscribe(
      result => {
        this.obtenerContratos();
        //console.log(name)
      }
      );
      //this.cargarEmpleado(this.contratofrm);

  }
  async borrarContrato(contrato){

    console.log(contrato);
    await this.dialogService.open(ModalEliminarContratoComponent, {

      context: {
        contrato_FrmDelete : contrato,
      
      },
    }).onClose.subscribe(
      result => {
        this.obtenerContratos();
      }
      )

  }
  
  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      response => {
        this.listaEmpresa = response;
      },
      error => {
       // console.log("Error ::" + error);
      }
    );
  }
  // obtener Contratos
  tablaContratos = [];
  async obtenerContratos(){
    this.tablaContratos = [];
    await this.contratoService.getContratos().subscribe(
      response => {
        let fechaini= new Date;
        let fechafin = new Date;
        response.forEach((value)=>{
          fechaini = new Date(value.FECHA_INI_CONTRATO);
          fechafin = new Date(value.FECHA_FIN_CONTRATO);
          console.log(fechafin);
          const found = this.listaEmpresa.find(element => element.RUT_EMPRESA == value.RUT_EMPRESA);     
          if(value.VIGENCIA_CONTRATO==='S'){
            if (fechafin > new Date()) {
              value.VIGENCIA_CONTRATO = 'Si';
            }else{
               value.VIGENCIA_CONTRATO = 'No';
            }
          }else{
            value.VIGENCIA_CONTRATO = 'No';
          }
          this.tablaContratos.push({value,found});
        })  
        this.listaContratos = response;
      }
    );
  }
  async save(contrato) {
      this.contratoService.save(contrato).subscribe(
        response => {
          this.obtenerContratos();
        },
        err=>{
        }
      );

}
checkButton(value) {
  if (value === 'Si') {
    return false;
  } else {
    return true;
  }
}

administrarAsistencia(contrato) {
  console.log(contrato);
  //found es la empresa y value es el contrato
  this.router.navigate(['pages/formularios/contratoArea/' + contrato.value.NUMERO_CONTRATO + '/' + contrato.value.RUT_EMPRESA]);
  /* sessionStorage.setItem('empresa',this.empresaSelectRut);
  sessionStorage.setItem('contrato',this.contratoPass.NUMERO_CONTRATO); */
 /*  if (this.contratoPass.NUMERO_CONTRATO !== undefined) {
    this.router.navigate(['pages/formularios/asistencia/asistencia/' + this.contratoPass.NUMERO_CONTRATO + '/' + this.empresaSelectRut]);
  } else {
    this.toastrService.show('Debe seleccionar un contrato', 'Alerta!', { status: 'warning' });
  } */

}
}
