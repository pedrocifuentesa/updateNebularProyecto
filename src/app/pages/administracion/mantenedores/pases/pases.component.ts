import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LocalDataSource } from 'ng2-smart-table';

import { PaseService } from '../../services/pase/pase.service';
import { Pase } from '../../model/pase';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Empresa } from '../../model/empresa';
import { PersonaService } from '../../services/personas/persona.service';
import { Persona } from '../../model/persona';
import { SmartTableData } from '../../../../@core/data/smart-table';

@Component({
  selector: 'ngx-pases',
  templateUrl: './pases.component.html',
  styleUrls: ['./pases.component.scss']
})
export class PasesComponent implements OnInit {

  listaPase: Pase[] = [];

  statuses: NbComponentStatus = 'primary';
  


  listaEmpresas: Empresa[] = [];
  listaPersonas: Persona[]=[];
  listaper : Array<{value: string, title: string}> = [];
  //listoption: {value:string,title:string}[]=[];
  listaEmp : Array<{value: string, title: string}> = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
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
        title: 'Empleado',
        type: 'text',
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: this.listaper,
          },
        },
        valuePrepareFunction: (cell, row) => {
          return row.NOMBRE_FUNCIONARIO
        },
      },
     /*  RUT_EMPRESA: {
        title: 'Rut Empresa',
        type: 'string'
      }, */
      RUT_EMPRESA: {
        title: 'Empresa',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
        valuePrepareFunction: (cell, row) => {
          return row.NOMBRE_FANTASIA_EMPRESA
        },
       /*  editor: {
          type: 'custom',
          component: SelectEmpresaComponent,
        }, */
      },
      NUMERO_PASE: {
        title: 'Nro Pase',
        type: 'string'
      },
     
    },
  };

  constructor(private paseService: PaseService
    , private fb: FormBuilder
    ,private service: SmartTableData
    ,private empresaService:EmpresaService
    ,private personaService : PersonaService
    ,private toastService: NbToastrService) {
    
    this.empresaService.getEmpresas().subscribe(
       response => {
         response.forEach(valor=>{
          this.listaEmp.push({value: valor.RUT_EMPRESA , title : valor.NOMBRE_FANTASIA_EMPRESA});
        });
        this.settings.columns.RUT_EMPRESA.editor.config.list = this.listaEmp;
        this.settings = Object.assign({},this.settings);
      },
      error => {
        console.log("Error ::" + error);
      }
    )
      this.personaService.getPersonas().subscribe(per=>{
        this.listaPersonas = per ;
        per.forEach(val=>{
          this.listaper.push({value: val.RUT_EMPLEADO , title : val.NOMBRES_PERSONA+' '+val.APELLIDO_PATERNO_PERSONA+' '+val.APELLIDO_MATERNO_PERSONA})
        })
        this.settings.columns.RUT_EMPLEADO.editor.config.list = this.listaper;
        this.settings = Object.assign({},this.settings);
      },err=>{

      })

   }

  ngOnInit(): void {
    this.getpase();
  }
  source: LocalDataSource = new LocalDataSource();
  getpase() {
    this.paseService.getPaseDetalle().subscribe(ok=>{
      console.log(ok['data']);
      ok['data']=ok['data'].filter(pase=>pase.ESTADO_PASE.toUpperCase()==="S");
      this.source.load(ok['data']);
    },err=>{
      console.log(err);
    })
    /* this.paseService.getPase().subscribe(
      pase => { */
        /* pase.forEach(elemento => {
          if (elemento.ESTADO_PASE.toLowerCase() === 's') {
            elemento.ESTADO_PASE = 'Activo';
          }else{
            elemento.ESTADO_PASE = 'Inactivo';
          }
        }); */
        /* this.listaPase = pase;
        this.listaPase = this.listaPase.filter(pase => pase.ESTADO_PASE.toUpperCase() === 'S');
        this.source.load(this.listaPase);
      }
    ); */
  }


  onDeleteConfirm(event): void {
    let id_pase = event.data.RUT_EMPLEADO ;
    let pase = new Pase();
    pase.RUT_EMPLEADO = event.data.RUT_EMPLEADO;
    pase.RUT_EMPRESA = event.data.RUT_EMPRESA;
    pase.NUMERO_PASE = event.data.NUMERO_PASE;
    pase.ESTADO_PASE = 'N';

    if (window.confirm('Desea eliminar este Pase?')) {
      this.paseService.update(id_pase,event.data.RUT_EMPRESA,pase).subscribe(
        response => {
          this.getpase();
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    let pase = new Pase();
    pase.RUT_EMPLEADO = event.newData.RUT_EMPLEADO;
    pase.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    pase.NUMERO_PASE = event.newData.NUMERO_PASE;
    pase.ESTADO_PASE = 'S';

    this.paseService.save(pase).subscribe(
      response=>{
        this.getpase();
        event.confirm.resolve();
      }
    );
  } 
 
  /* onEdit(event):void { 
    console.log(event); */
    /* let pase = new Pase();
    pase.RUT_EMPLEADO = event.data.RUT_EMPLEADO;
    pase.RUT_EMPRESA = event.data.RUT_EMPRESA;
    pase.NUMERO_PASE = event.data.NUMERO_PASE;
    pase.ESTADO_PASE = event.data.ESTADO_PASE;
 */
    /* this.paseService.save(pase).subscribe(
      response=>{
        this.getpase();
        event.confirm.resolve();
      }
    ); */
 /*  }  */
  onSaveConfirm(event):void { 
    console.log(event);
    let id_pase = event.data.RUT_EMPLEADO;
    event.data.RUT_EMPRESA
    let pase = new Pase();
    pase.RUT_EMPLEADO = event.data.RUT_EMPLEADO;
    pase.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    pase.NUMERO_PASE = event.newData.NUMERO_PASE;
    pase.ESTADO_PASE = 'S';

    this.paseService.update(id_pase,event.data.RUT_EMPRESA,pase).subscribe(
      response => {
        this.getpase();
        event.confirm.resolve();
        //this.getTipoEmpleado();
      }
    );
  }
}
