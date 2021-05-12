import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDateService, NbDialogService, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../administracion/model/contrato';
import { Cuadrilla } from '../../administracion/model/cuadrilla';
import { ContratoService } from '../../administracion/services/contratos/contrato.service';
import { CuadrillaService } from '../../administracion/services/cuadrilla/cuadrilla.service';
import { DotacionService } from '../../administracion/services/dotacion/dotacion.service';
import { EmpleadoService } from '../../administracion/services/empleado/empleado.service';
import { EmpresaService } from '../../administracion/services/empresa/empresa.service';

import { MdlCrearCuadrillaComponent } from './modales/mdl-crear-cuadrilla/mdl-crear-cuadrilla.component';
import { MdlCrearEmpleadoDocacionComponent } from './modales/mdl-crear-empleado-docacion/mdl-crear-empleado-docacion.component';
import { MdlDeleteEmpleadoDocacionComponent } from './modales/mdl-delete-empleado-docacion/mdl-delete-empleado-docacion.component';
import { MdlEliminarCuadrillaComponent } from './modales/mdl-eliminar-cuadrilla/mdl-eliminar-cuadrilla.component';
import { MdlModificarCuadrillaComponent } from './modales/mdl-modificar-cuadrilla/mdl-modificar-cuadrilla.component';
import { MdlUpdateEmpleadoDocacionComponent } from './modales/mdl-update-empleado-docacion/mdl-update-empleado-docacion.component';


@Component({
  selector: 'ngx-cuadrilla',
  templateUrl: './cuadrilla.component.html',
  styleUrls: ['./cuadrilla.component.scss']
})
export class CuadrillaComponent implements OnInit {
  idContrato: any;
  rutIdContrato: any;
  contrato: Contrato;
  //empresaStorage: string;
  cuadrillaSelected: Cuadrilla;
  cuadrillas: Cuadrilla[] = [];
  dotacionCuadrilla: [] = [];
  nombreCuadrilla: string;
  estadoCuadrilla: string;
  /*   selectNG; */
  constructor(private activatedRoute: ActivatedRoute
    , protected dateService: NbDateService<Date>
    , private empresaService: EmpresaService
    , private contratoService: ContratoService
    , private empleadoService: EmpleadoService
    , private cuadrillaService: CuadrillaService
    , private dotacionServise: DotacionService
    , private fb: FormBuilder
    , private toastrService: NbToastrService
    , private dialogService: NbDialogService
  ) {
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
    this.rutIdContrato = this.activatedRoute.snapshot.params['rutEmpContrato'];
    //this.empresaStorage = localStorage.getItem("rutEmpresa");
  }

  ngOnInit(): void {
    this.cargarContrato();
  }


  // esta funcion obtiene la info del contrato 
  async cargarContrato() {
    let contratoFind = new Contrato;
    contratoFind.NUMERO_CONTRATO = this.idContrato;
    contratoFind.RUT_EMPRESA = this.rutIdContrato;
    await this.contratoService.obtenerContrato(contratoFind).subscribe(res => {
      // contrato  
      this.contrato = res.data[0]; undefined
      //console.log(this.contrato);
      this.obtenerCuadrillas(this.contrato);

      /*  this.selectNG.reset(); */
      //ahora debo cargar la info tanto de la cuadrilla como las personas de la cuadrilla 
    });

  }
  // esta funcion obtiene a los empleados de la cuadrilla
  async cargarCuadrilla(cuadrilla: Cuadrilla) {
    //console.log('Creo el modal');
  }
  // esta funcion obtiene a las cuadrillas que pertenecen al contrato
  async obtenerCuadrillas(contrato: Contrato) {
    await this.cuadrillaService.findbyContratoEmpresa(contrato).subscribe(res => {
      this.cuadrillas = res.data;
      //console.log(this.cuadrillas);

    })
  }
  async obtenerCuadrillaDotacion(cuadrilla: Cuadrilla) {
    this.cuadrillaService.findDotacionIdCuadrillaRutEmpresa(cuadrilla).subscribe(response => {
      this.dotacionCuadrilla = response.data;
      /* this.dotacionCuadrilla.forEach(valor=>{
        //console.log(valor);
      }) */
      //console.log(this.dotacionCuadrilla);
    });
  }
  async cuadrillaSeleccionada(cuadrilla: Cuadrilla) {
    this.cuadrillaSelected = cuadrilla;
    if (this.cuadrillaSelected.VIGENCIA_CUADRILLA === "S") {
      this.cuadrillaSelected.VIGENCIA_CUADRILLA = "Activo"
    } else {
      this.cuadrillaSelected.VIGENCIA_CUADRILLA = "Inactivo"
    }
    this.nombreCuadrilla = this.cuadrillaSelected.NOMBRE_CUADRILLA;
    this.estadoCuadrilla = this.cuadrillaSelected.VIGENCIA_CUADRILLA;
    this.obtenerCuadrillaDotacion(cuadrilla);
  }
  //////////////////////// MODALES /////////////////////
  async mdlCrearCuadrilla() {
    await this.dialogService.open(MdlCrearCuadrillaComponent, {
      context: {
        titulo: 'Crear Cuadrilla'
        , contrato: this.contrato
        ,

      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.obtenerCuadrillas(this.contrato);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  async mdlUpdateCuadrilla() {
    await this.dialogService.open(MdlModificarCuadrillaComponent, {
      context: {
        titulo: 'Modificar Cuadrilla'
        , cuadrilla: this.cuadrillaSelected
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.obtenerCuadrillas(this.contrato);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  async mdlDeleteCuadrilla() {
    await this.dialogService.open(MdlEliminarCuadrillaComponent, {
      context: {
        titulo: 'Eliminar Cuadrilla'
        , cuadrilla: this.cuadrillaSelected
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.obtenerCuadrillas(this.contrato);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  async mdlCrearEmpleadoDotacion() {
    await this.dialogService.open(MdlCrearEmpleadoDocacionComponent, {
      context: {
        titulo: "Crear Empleado Cuadrilla"
        , cuadrilla: this.cuadrillaSelected
        , contrato: this.contrato
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        //this.cargarCuadrilla(this.cuadrillaSelected);
        this.obtenerCuadrillaDotacion(this.cuadrillaSelected);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  async mdlUpdateEmpleadoDotacion(personaDotacion: any) {

    await this.dialogService.open(MdlUpdateEmpleadoDocacionComponent, {
      context: {
        titulo: "Modificar Empleado Cuadrilla"
        , perDotacion: personaDotacion
        , contrato: this.contrato
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        /* this.cargarCuadrilla(this.cuadrillaSelected); */
        this.obtenerCuadrillaDotacion(this.cuadrillaSelected);
      }
    );
    //this.cargarEmpleado(this.contratofrm);
  }
  async mdlDeleteEmpleadoDotacion(personaDotacion: any) {
    //console.log(personaDotacion.EMPLEADO);
    await this.dialogService.open(MdlDeleteEmpleadoDocacionComponent, {
      context: {
        titulo: "Eliminar Empleado Cuadrilla"
        ,perDotacion:personaDotacion
        ,contrato:this.contrato
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        /* this.cargarCuadrilla(this.cuadrillaSelected); */
        this.obtenerCuadrillaDotacion(this.cuadrillaSelected);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  //////////////////////// FIN /////////////////////////
}
