import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { isNumeric } from 'rxjs/internal-compatibility';
import { Hora } from '../../model/hora';
import { Tarea } from '../../model/tarea';
import { HoraService } from '../../services/hora/hora.service';
import { TareaService } from '../../services/tarea/tarea.service';

@Component({
  selector: 'ngx-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  //--------------//
  //---Variables--//
  //--------------//
  listaTarea :Tarea[]=[];
  listaHora :Hora[]=[];
  source: LocalDataSource = new LocalDataSource();
  listahor : Array<{value: number, title: string}> = [];
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
      ID_HORA  :{
        title: 'Hora',
        hide: false,
        type: 'text', 
        editor: {
          type: 'list',
          config: {
            list: this.listahor,
          },
        },
       /*  valuePrepareFunction: (cell, row) => {
          return row.DESCRIPCION_HORA
        }, */
      },
      DESCRIPCION_TAREA:{
        title: 'Descripcion Tarea',
        hide: false,
        type: 'text', 
      },
    },
  };
  constructor(private toastrService: NbToastrService
    ,private tareaService: TareaService
    ,private horaService: HoraService) { }

  ngOnInit(): void {
    this.getHoras();
    this.getTareas();
  }

  getHoras(){
    this.horaService.getHoras().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_HORA.toUpperCase() ==='S');
        response.forEach(value=>{
          this.listahor.push({value:value.ID_HORA,title:value.DESCRIPCION_HORA})
        })
        this.listaHora = response;
        this.settings.columns.ID_HORA.editor.config.list = this.listahor;
        this.settings = Object.assign({},this.settings);
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }


  getTareas(){
    this.tareaService.getTareas().subscribe(res=>{
      res = res.filter(value=> value.VIGENCIA_TAREA.toUpperCase() ==='S');
      this.listaTarea = res;
      this.source.load(this.listaTarea);
    },err=>{

    });    
  }
  onCreateConfirm(event):void { 
   
    let newTarea = new Tarea;
    newTarea.ID_HORA = event.newData.ID_HORA;
    newTarea.DESCRIPCION_TAREA = event.newData.DESCRIPCION_TAREA.toUpperCase();
    newTarea.VIGENCIA_TAREA = 'S';
    if( !isNumeric(newTarea.ID_HORA)){
      this.toastrService.show('Tarea no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    if(newTarea.DESCRIPCION_TAREA.length===0){
      this.toastrService.show('Descripción no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    this.tareaService.save(newTarea).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear Tarea!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    // validar que exista 
    
    let updateTarea = new Tarea;
    updateTarea.ID_TAREA = event.data.ID_TAREA;
    updateTarea.ID_HORA = event.newData.ID_HORA;
    updateTarea.DESCRIPCION_TAREA = event.newData.DESCRIPCION_TAREA.toUpperCase();
    updateTarea.VIGENCIA_TAREA = event.data.VIGENCIA_TAREA.toUpperCase();


      this.tareaService.update(updateTarea.ID_TAREA,updateTarea).subscribe(res=>{
        this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
        this.getTareas();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
  }

  onDeleteConfirm(event): void {
    
    let deleteTarea = new Tarea;
    deleteTarea.ID_TAREA = event.data.ID_TAREA;
    deleteTarea.ID_HORA = event.data.ID_HORA;
    deleteTarea.DESCRIPCION_TAREA = event.data.DESCRIPCION_TAREA.toUpperCase();
    deleteTarea.VIGENCIA_TAREA = 'N';

    if (window.confirm('Desea eliminar este Perfil?')) {
        this.tareaService.update(deleteTarea.ID_TAREA,deleteTarea).subscribe(res=>{
          this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
          this.getTareas();
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
