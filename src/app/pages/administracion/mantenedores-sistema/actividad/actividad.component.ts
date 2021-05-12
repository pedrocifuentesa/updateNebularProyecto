import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { isNumeric } from 'rxjs/internal-compatibility';
import { Actividad } from '../../model/actividad';

import { Tarea } from '../../model/tarea';
import { ActividadService } from '../../services/activdad/actividad.service';
import { HoraService } from '../../services/hora/hora.service';
import { TareaService } from '../../services/tarea/tarea.service';

@Component({
  selector: 'ngx-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  //--------------//
  //---Variables--//
  //--------------//
  listaActividad :Actividad[]=[];
  listaTarea :Tarea[]=[];
  source: LocalDataSource = new LocalDataSource();
  listaTar : Array<{value: number, title: string}> = [];

 //--------------//
  //---Settings--//
  //--------------//
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
      ID_TAREA :{
        title: 'Tareas',
        hide: false,
        type: 'text', 
        editor: {
          type: 'list',
          config: {
            list: this.listaTar,
          },
        },
      /*   valuePrepareFunction: (cell, row) => {
          console.log(cell);
          return row.DESCRIPCION_TAREA
        }, */
      },
      DESCRIPCION_ACTIVIDAD:{
        title: 'Descripcion Actividad',
        hide: false,
        type: 'text', 
      },
    },
  };
  constructor(private toastrService: NbToastrService
    ,private actividadService:ActividadService
    ,private tareaService:TareaService) { }

  ngOnInit(): void {
    this.getTareas();
    this.getActividades();
  }

  getTareas(){
    this.tareaService.getTareas().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_TAREA.toUpperCase() ==='S');
        response.forEach(value=>{
          this.listaTar.push({value:value.ID_TAREA,title:value.DESCRIPCION_TAREA});
        });
        
        this.settings.columns.ID_TAREA.editor.config.list = this.listaTar;
        this.settings = Object.assign({},this.settings);
        this.listaTarea = response;
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  };
  getActividades(){
    this.actividadService.getActividades().subscribe(res=>{
      
      res = res.filter(value => value.VIGENCIA_ACTIVIDAD === 'S');
      this.listaActividad = res;
      this.source.load(this.listaActividad);
    });
  }



  onCreateConfirm(event):void { 
   
    let newActividad = new Actividad;
    newActividad.ID_TAREA = event.newData.ID_TAREA;
    newActividad.DESCRIPCION_ACTIVIDAD = event.newData.DESCRIPCION_ACTIVIDAD.toUpperCase();
    newActividad.VIGENCIA_ACTIVIDAD = 'S';
    if( !isNumeric(newActividad.ID_TAREA)){
      this.toastrService.show('Tarea no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    if(newActividad.DESCRIPCION_ACTIVIDAD.length===0){
      this.toastrService.show('Descripción no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    this.actividadService.save(newActividad).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear Actividad!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    // validar que exista 
    let updateActividad = new Actividad;
    updateActividad.ID_ACTIVIDAD = event.data.ID_ACTIVIDAD;
    updateActividad.ID_TAREA = event.newData.ID_TAREA;
    updateActividad.DESCRIPCION_ACTIVIDAD = event.newData.DESCRIPCION_ACTIVIDAD.toUpperCase();
    updateActividad.VIGENCIA_ACTIVIDAD = event.data.VIGENCIA_ACTIVIDAD.toUpperCase();


      this.actividadService.update(updateActividad.ID_ACTIVIDAD,updateActividad).subscribe(res=>{
        this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
        this.getActividades();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
  }

  onDeleteConfirm(event): void {
    let updateActividad = new Actividad;
    updateActividad.ID_ACTIVIDAD = event.data.ID_ACTIVIDAD;
    updateActividad.ID_TAREA = event.data.ID_TAREA;
    updateActividad.DESCRIPCION_ACTIVIDAD = event.data.DESCRIPCION_ACTIVIDAD.toUpperCase();
    updateActividad.VIGENCIA_ACTIVIDAD = 'N';

    if (window.confirm('Desea eliminar este Perfil?')) {
        this.actividadService.update(updateActividad.ID_ACTIVIDAD,updateActividad).subscribe(res=>{
          this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
          this.getActividades();
          return event.confirm.resolve();
        },err=>{
          this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
          return event.confirm.reject();
        });
    } else {
      return event.confirm.reject();
    }
  }

}
