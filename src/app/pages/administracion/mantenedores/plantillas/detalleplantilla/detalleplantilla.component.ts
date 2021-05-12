import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { ActividadService } from '../../../services/activdad/actividad.service';
import { DetallePlantillaService } from '../../../services/detallePlantilla/detalle-plantilla.service';
import { PlantillaService } from '../../../services/plantilla/plantilla.service';

@Component({
  selector: 'ngx-detalleplantilla',
  templateUrl: './detalleplantilla.component.html',
  styleUrls: ['./detalleplantilla.component.scss']
})
export class DetalleplantillaComponent implements OnInit {


//   ID_PLANTILLA lista
//   ID_ACTIVIDAD lista
//   ORDEN_PLANTILLA numero
//   DURACION_PLANTILLA numero : minutos
//   HORA_INICIO_PLANTILLA hora:minutos
listaPlantillas = [];
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
      ID_PLANTILLA: {
        title: 'Empresa',
        type: 'html',
        editable: false,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [],
          },
          
        },
       /*  valuePrepareFunction: (cell, row) => {
      
           return row.NOMBRE_FANTASIA_EMPRESA;
         }, */
      },
     
      ID_ACTIVIDAD: {
        title: 'Especialidad',
        type: 'html',
        editable: false,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [],
          },
          
        },
      /*   valuePrepareFunction: (cell, row) => {
           
           return row.NOMBRE_ESPECIALIDAD;
         }, */
      },
 
      ORDEN_PLANTILLA: {
        title: 'Orden',
        type: 'string'
      },
      DURACION_PLANTILLA: {
        title: 'Duracion',
        type: 'string'
      },
      HORA_INICIO_PLANTILLA: {
        title: 'Hora de inicio',
        type: 'string'
      },
      // improvisar un custom 
      /* HORA_INICIO_PLANTILLA: {
        title: 'Hora de inicio',
        type: 'custom',
        renderComponent: HoraInputComponent,
      }, */
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private detallePlantillaService : DetallePlantillaService,
    private plantillaService: PlantillaService,
    private actividadService: ActividadService,
    private toastService: NbToastrService
  ) { }

  ngOnInit(): void {

    this.getPlantillas();
  }
  getPlantillas(){
    this.plantillaService.getPlantillasJOIN().subscribe(res=>{
      res = res.filter(value=>value.VIGENCIA_PLANTILLA.toUpperCase() ==='S');
        this.listaPlantillas = res;
        console.log(this.listaPlantillas);
        //.source.load(this.listaPlantillas);
      
    },err=>{
      
    })
  }
  getDetllaPlantilla(plantilla){
    console.log(plantilla);
        // busco la plantilla 
    //Despliego la tabla 
      this.detallePlantillaService.getPlantillas().subscribe(res=>{

        console.log(res);
      })

  
      }
  onDeleteConfirm(event): void {
    console.log(event);

   /*  let editPlantila = new Plantilla;
    editPlantila.ID_PLANTILLA =event.data.ID_PLANTILLA;
    editPlantila.RUT_EMPRESA =event.data.RUT_EMPRESA;
    editPlantila.ID_ESPECIALIDAD =event.data.ID_ESPECIALIDAD;
    editPlantila.NOMBRE_PLANTILLA =event.data.NOMBRE_PLANTILLA;
    editPlantila.VIGENCIA_PLANTILLA = 'N'; */

    if (window.confirm('Desea eliminar esta Plantilla?')) {
     /*  this.plantillaService.update(editPlantila.ID_PLANTILLA, editPlantila.RUT_EMPRESA, editPlantila.ID_ESPECIALIDAD,editPlantila).subscribe(
        response => {
          this.getPlantillas();
        }
      ); */
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    console.log(event);
    event.confirm.resolve();
    /* let createPlantila = new Plantilla;

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
    }); */

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
    console.log(event);
    event.confirm.resolve();
   /*  let editPlantila = new Plantilla;
    editPlantila.ID_PLANTILLA =event.data.ID_PLANTILLA;
    editPlantila.RUT_EMPRESA =event.data.RUT_EMPRESA;
    editPlantila.ID_ESPECIALIDAD =event.data.ID_ESPECIALIDAD;
    editPlantila.NOMBRE_PLANTILLA =event.newData.NOMBRE_PLANTILLA;
    editPlantila.VIGENCIA_PLANTILLA = event.data.VIGENCIA_PLANTILLA; */

   /*  if(event.newData.NOMBRE_PLANTILLA==='' || event.newData.NOMBRE_PLANTILLA===null || event.newData.NOMBRE_PLANTILLA===undefined){
      this.toastService.show('Debe ingresar un nombre','Alerta',{ status: 'warning' });
      return event.confirm.reject();
    } */

    /* this.plantillaService.update(editPlantila.ID_PLANTILLA,editPlantila.RUT_EMPRESA,editPlantila.ID_ESPECIALIDAD,editPlantila).subscribe(
      response => {
        this.getPlantillas();
        event.confirm.resolve();
        //this.getTipoEmpleado();
      }
    ); */
  }
}
