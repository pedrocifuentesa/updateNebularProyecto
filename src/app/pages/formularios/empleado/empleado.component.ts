import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ModalAgregarEmpleadoComponent } from './modales/modal-agregar-empleado/modal-agregar-empleado.component';
import { ModalAdministrarCuadrillaComponent } from './modales/modal-administrar-cuadrilla/modal-administrar-cuadrilla.component';

import { ModalModificarEmpleadoComponent } from './modales/modal-modificar-empleado/modal-modificar-empleado.component';

import { ModalEliminarEmpleadoComponent } from './modales/modal-eliminar-empleado/modal-eliminar-empleado.component';
import { Empresa } from '../../administracion/model/empresa';
import { Contrato } from '../../administracion/model/contrato';
import { Especialidad } from '../../administracion/model/especialidad';
import { EmpresaService } from '../../administracion/services/empresa/empresa.service';
import { EmpleadoService } from '../../administracion/services/empleado/empleado.service';
import { ContratoService } from '../../administracion/services/contratos/contrato.service';
import { TipoEmpleadoService } from '../../administracion/services/tipoEmpleado/tipo-empleado.service';
import { CargoService } from '../../administracion/services/cargo/cargo.service';
import { JornadaService } from '../../administracion/services/jornada/jornada.service';
import { TurnoService } from '../../administracion/services/turno/turno.service';
import { EspecialidadService } from '../../administracion/services/especialidad/especialidad.service';
import { PersonaService } from '../../administracion/services/personas/persona.service';
import { Empleado } from '../../administracion/model/empleado';


@Component({
  selector: 'ngx-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  listaEmpresa: Empresa[] = [];
  empresaFuncionario: Empresa[] = [];
  gtEmpresa: Empresa;
  empresafrm = new Empresa;
  empresaSelectRut:string;
  contratofrm:Contrato;
  contratoPass = new Contrato;
  listaDeContratosPorEmpresa = [];
  listaDeEmpleadosEnContrato = [];
  listaEmpleadosFueraContrato = [];
  lista_TE = [];
  lista_Cargo = [];
  lista_Jornada = [];
  lista_Turno = [];
  lista_Especialidad: Especialidad[]=[];

  names: string[] = [];
  nombre_Contrato: string;
  descripcion_Contrato: String;
  formAddPersona: FormGroup;
  linkidContrato:string;
  linkrutempresa:string;


  constructor(private empresaService: EmpresaService
    , private empleadoServise: EmpleadoService
    , private contratoService: ContratoService
    , private tipoEmpleadoService: TipoEmpleadoService
    , private cargoService: CargoService
    , private jornadaService: JornadaService
    , private turnoService: TurnoService
    , private especialidadService: EspecialidadService
    , private fb: FormBuilder
    , private personasServices: PersonaService
    , private dialogService: NbDialogService
    , private router: Router
    , private toastrService: NbToastrService
    ,private activatedRoute: ActivatedRoute

  ) {
    
    
  }

  ngOnInit(): void {
    this.getEmpresas();

    this.inicializarFormContrato();

    this.getTipoEmpleado();
    this.getCargos();
    this.getJornada();
    this.getTurno();
    this.getEspecialidades();
    if(sessionStorage.getItem('empresa')!== undefined){
      this.linkrutempresa =  sessionStorage.getItem('empresa');
    
      this.capturar(this.linkrutempresa);
    }else{
      this.linkrutempresa =''
    }
    if(sessionStorage.getItem('contrato')!== undefined){
      this.linkidContrato =  sessionStorage.getItem('contrato');
 
    }else{
       this.linkidContrato =''
    }
   /*  this.tipoEmpleadoService.getTipoEmpleado().subscribe((res) => {
      this.lista_TE = res;
    });
    this.cargoService.getCargos().subscribe((res) => {
      this.lista_Cargo = res;
    });
    this.jornadaService.getJornada().subscribe((res) => {
      this.lista_Jornada = res;
    });
    this.turnoService.getTurno().subscribe((res) => {
      this.lista_Turno = res;
    }); */
  }


  getTipoEmpleado() {
    this.tipoEmpleadoService.getTipoEmpleado().subscribe((res) => {
      this.lista_TE = res;
    });
  };
  getCargos() {
    this.cargoService.getCargos().subscribe((res) => {
      this.lista_Cargo = res;
    });
  };
  getJornada() {
    this.jornadaService.getJornada().subscribe((res) => {
      this.lista_Jornada = res;
    });
  };
  getTurno() {
    this.turnoService.getTurno().subscribe((res) => {
      this.lista_Turno = res;
    });
  };
  getEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe((res) => {
    console.log(res);
      res = res.filter(value=>value.VIGENCIA_ESPECIALIDAD ==='S');
      this.lista_Especialidad = res;
    });
  };
  eventoSelect(event){
    console.log(event);
  }
  /* async administrarCuadrilla() {
    await this.dialogService.open(ModalAdministrarCuadrillaComponent, {}).onClose.subscribe(
      // devuelve una variable 
      cuadrillaNueva => {
      }

    );
  } */
  async open() {
    if(this.empresaSelectRut ===''){
      this.toastrService.show('Debe seleccionar un una empresa', 'Alerta!', { status: 'warning' });
      return false;
    }

    if(this.contratofrm=== undefined){
      this.toastrService.show('Debe seleccionar un contrato', 'Alerta!', { status: 'warning' });
      return false;
    }

    
    await this.dialogService.open(ModalAgregarEmpleadoComponent, {
      context: {
        title: 'Ingresar Empleado',
        listaPersonas: this.listaEmpleadosFueraContrato,
        listaTE: this.lista_TE,
        listaCargo: this.lista_Cargo,
        listaJornada: this.lista_Jornada,
        listaTurno: this.lista_Turno,
        listaEspecialidad:this.lista_Especialidad,
        contrato_Frm: this.contratofrm,
        empresa_Frm: this.empresaSelectRut,
        
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.cargarEmpleado(this.contratofrm);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  async actualizarEmpleado(empleado: Empleado) {

    await this.dialogService.open(ModalModificarEmpleadoComponent, {
      context: {
        empleadoModificar: empleado
        , listaTE: this.lista_TE
        , listaCargo: this.lista_Cargo
        , listaJornada: this.lista_Jornada
        , listaEspecialidad: this.lista_Especialidad
        , listaTurno: this.lista_Turno
        , contratoPersona: this.contratofrm
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.cargarEmpleado(this.contratofrm);
      }
    );
    //this.cargarEmpleado(this.contratofrm);

  }
  getEmpresas() {
    /* let rutEmp = localStorage.getItem("rutEmpresa");

    this.empresaService.findByRut(rutEmp).subscribe(
      response => {
        //console.log(response);
        this.empresaFuncionario = response.data;
        this.capturar(this.empresaFuncionario);

      }
    ) */


    this.empresaService.getEmpresas().subscribe(
      response => {
        this.listaEmpresa = response;
        //console.log(this.listaEmpresa);
      },
      error => {

      }
    );
  }

  capturar(valor) {
    
    this.empresaSelectRut = valor
    this.contratoService.contratosEmpresas(valor).subscribe((res) => {
      this.listaDeContratosPorEmpresa = res.data;
    });
  }


  async cargarEmpleado(valor) {
    this.contratofrm = valor;
    this.contratoPass = valor;
    this.nombre_Contrato = valor.NOMBRE_CONTRATO;
    this.descripcion_Contrato = valor.DESCRIPCION_CONTRATO;

    await this.contratoService.getEmpleadosContrato(valor).subscribe((res) => {
      let objt = res.data;
      console.log(res.data);
      objt.forEach(valores => {
        valores.FECHA_INICIO = new Date(valores.FECHA_INICIO).toLocaleString(['es-CL'], { year: 'numeric', month: 'numeric', day: 'numeric' });
        valores.FECHA_FIN = new Date(valores.FECHA_FIN).toLocaleString(['es-CL'], { year: 'numeric', month: 'numeric', day: 'numeric' });
      });
      this.listaDeEmpleadosEnContrato = res.data;

    });
    await this.empleadosFueradelContrato(valor);

    this.contratoService.getAdminContrato(valor).subscribe((res) => {
    });
  }

  async empleadosFueradelContrato(valor){
    await this.contratoService.empleadosfueradelcontrato(valor).subscribe((res) => {
      this.listaEmpleadosFueraContrato = res.data;
    });
  }
  inicializarFormContrato() {
    this.formAddPersona = this.fb.group({
      personas: ['', [Validators.required]]
    });
  }
  administrarCuadrilla() {
    sessionStorage.setItem('empresa',this.empresaSelectRut);
    sessionStorage.setItem('contrato',this.contratoPass.NUMERO_CONTRATO);
    if (this.contratoPass.NUMERO_CONTRATO !== undefined) {
      this.router.navigate(['pages/formularios/cuadrilla/cuadrilla/' + this.contratoPass.NUMERO_CONTRATO + '/' + this.empresaSelectRut]);
    } else {
      this.toastrService.show('Debe seleccionar un contrato', 'Alerta!', { status: 'warning' });
    }

  }
  administrarAsistencia() {
    sessionStorage.setItem('empresa',this.empresaSelectRut);
    sessionStorage.setItem('contrato',this.contratoPass.NUMERO_CONTRATO);
    if (this.contratoPass.NUMERO_CONTRATO !== undefined) {
      this.router.navigate(['pages/formularios/asistencia/asistencia/' + this.contratoPass.NUMERO_CONTRATO + '/' + this.empresaSelectRut]);
    } else {
      this.toastrService.show('Debe seleccionar un contrato', 'Alerta!', { status: 'warning' });
    }

  }
  async eliminarEmpleado(deleteEmpleado:any){
    await this.dialogService.open(ModalEliminarEmpleadoComponent, {
      context: {
        title:'Eliminar Empleado',
        empleadoEliminar: deleteEmpleado
        , contratoPersona: this.contratofrm
      },
    }).onClose.subscribe(
      name => {
        //name && this.names.push(name);
        this.cargarEmpleado(this.contratofrm);
      }
    );

  }

}

