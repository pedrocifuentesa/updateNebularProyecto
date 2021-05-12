import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { Plantilla } from '../../../model/plantilla';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { EspecialidadService } from '../../../services/especialidad/especialidad.service';
import { PlantillaService } from '../../../services/plantilla/plantilla.service';

@Component({
  selector: 'ngx-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss']
})
export class PlantillaComponent implements OnInit {
  // trabaja con la de la persona ?
  listaPlantillas: Plantilla[]=[];
  listaEmpresas: Array<{ value: string, title: string }> = [];
  listaActividades: Array<{ value: number, title: string }> = [];


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
      RUT_EMPRESA: {
        title: 'Empresa',
        type: 'html',
        editable: false,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.listaEmpresas,
          },
          
        },
        valuePrepareFunction: (cell, row) => {
      
           return row.NOMBRE_FANTASIA_EMPRESA;
         },
      },
     
      ID_ESPECIALIDAD: {
        title: 'Especialidad',
        type: 'html',
        editable: false,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.listaActividades,
          },
          
        },
        valuePrepareFunction: (cell, row) => {
           
           return row.NOMBRE_ESPECIALIDAD;
         },
      },
 
      NOMBRE_PLANTILLA: {
        title: 'Nombre',
        type: 'string'
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private plantillaService : PlantillaService,
    private empresaService: EmpresaService,
    private especialidadService: EspecialidadService,
    private toastService: NbToastrService
  ) { }

  ngOnInit(): void {

    this.getPlantillas();
this.getEmpresas();
this.getEspecialidades();
  }
  getPlantillas(){
    this.plantillaService.getPlantillasJOIN().subscribe(res=>{
      res = res.filter(value=>value.VIGENCIA_PLANTILLA ==='S');
        this.listaPlantillas = res;
        this.source.load(this.listaPlantillas);
      
    },err=>{
      
    })
  }
  getEmpresas(){
    this.empresaService.getEmpresas().subscribe(res=>{
      
      res.forEach(val=>{
        this.listaEmpresas.push({value:val.RUT_EMPRESA,title:val.NOMBRE_FANTASIA_EMPRESA});
      });
      
      this.settings.columns.RUT_EMPRESA.editor.config.list = this.listaEmpresas;
      this.settings = Object.assign({},this.settings);
    },err=>{
      
    })
  }
  getEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe(res=>{
      res.forEach(val=>{
        this.listaActividades.push({value:val.ID_ESPECIALIDAD,title:val.NOMBRE_ESPECIALIDAD});
      });
      this.settings.columns.ID_ESPECIALIDAD.editor.config.list = this.listaActividades;
      this.settings = Object.assign({},this.settings);
      
    },err=>{
      
    })
  }


  
  onDeleteConfirm(event): void {

    let editPlantila = new Plantilla;
    editPlantila.ID_PLANTILLA =event.data.ID_PLANTILLA;
    editPlantila.RUT_EMPRESA =event.data.RUT_EMPRESA;
    editPlantila.ID_ESPECIALIDAD =event.data.ID_ESPECIALIDAD;
    editPlantila.NOMBRE_PLANTILLA =event.data.NOMBRE_PLANTILLA;
    editPlantila.VIGENCIA_PLANTILLA = 'N';

    if (window.confirm('Desea eliminar esta Plantilla?')) {
      this.plantillaService.update(editPlantila.ID_PLANTILLA, editPlantila.RUT_EMPRESA, editPlantila.ID_ESPECIALIDAD,editPlantila).subscribe(
        response => {
          this.getPlantillas();
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    let createPlantila = new Plantilla;

    //createPlantila.ID_PLANTILLA = event.newData.

    //         this.toastrService.show(res.message,'Alerta',{ status: 'warning' })
//    return event.confirm.reject();
//    this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
    if(event.newData.RUT_EMPRESA==='' || event.newData.RUT_EMPRESA===null || event.newData.RUT_EMPRESA===undefined){
      this.toastService.show('Debe seleccionar una Empresa','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    }
    if(event.newData.ID_ESPECIALIDAD==='' || event.newData.ID_ESPECIALIDAD===null || event.newData.ID_ESPECIALIDAD===undefined){
      this.toastService.show('Debe seleccionar una Especialidad','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    }
    if(event.newData.NOMBRE_PLANTILLA==='' || event.newData.NOMBRE_PLANTILLA===null || event.newData.NOMBRE_PLANTILLA===undefined){
      this.toastService.show('Debe ingresar un nombre','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    }
    createPlantila.ID_ESPECIALIDAD = event.newData.ID_ESPECIALIDAD;
    createPlantila.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    createPlantila.NOMBRE_PLANTILLA = event.newData.NOMBRE_PLANTILLA;
    createPlantila.VIGENCIA_PLANTILLA = 'S';
    this.plantillaService.save(createPlantila).subscribe(res=>{
      
      this.toastService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      this.getPlantillas();
      event.confirm.resolve();
    },err=>{
      this.toastService.show('Error al crear plantilla','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    });

/*     let pase = new Pase();
    pase.RUT_EMPLEADO = event.newData.RUT_EMPLEADO;
    pase.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    pase.NUMERO_PASE = event.newData.NUMERO_PASE;
    pase.ESTADO_PASE = 'S'; */

    /* this.paseService.save(pase).subscribe(
      response=>{
        this.getpase(); */
       // event.confirm.resolve();
    /*   }
    ); */
  } 
 

  onSaveConfirm(event):void { 
   
    let editPlantila = new Plantilla;
    editPlantila.ID_PLANTILLA =event.data.ID_PLANTILLA;
    editPlantila.RUT_EMPRESA =event.data.RUT_EMPRESA;
    editPlantila.ID_ESPECIALIDAD =event.data.ID_ESPECIALIDAD;
    editPlantila.NOMBRE_PLANTILLA =event.newData.NOMBRE_PLANTILLA;
    editPlantila.VIGENCIA_PLANTILLA = event.data.VIGENCIA_PLANTILLA;

    if(event.newData.NOMBRE_PLANTILLA==='' || event.newData.NOMBRE_PLANTILLA===null || event.newData.NOMBRE_PLANTILLA===undefined){
      this.toastService.show('Debe ingresar un nombre','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    }

    this.plantillaService.update(editPlantila.ID_PLANTILLA,editPlantila.RUT_EMPRESA,editPlantila.ID_ESPECIALIDAD,editPlantila).subscribe(
      response => {
        this.getPlantillas();
        event.confirm.resolve();
        //this.getTipoEmpleado();
      }
    );
  }
}
