import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ActividadProgramada } from '../../model/actividadPrograma';
import { ActividadProgramaService } from '../../services/actividadPrograma/actividad-programa.service';
import { EspecialidadService } from '../../services/especialidad/especialidad.service';

@Component({
  selector: 'ngx-actividad-programa',
  templateUrl: './actividad-programa.component.html',
  styleUrls: ['./actividad-programa.component.scss']
})
export class ActividadProgramaComponent implements OnInit {
  //--------------//
  //---Variables--//
  //--------------//
  source: LocalDataSource = new LocalDataSource();
  listaActividadPrograma :ActividadProgramada[]=[];
  listEspecialidades : Array<{value: number, title: string}> = [];

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
      ID_ESPECIALIDAD :{
        title: 'Especialidad',
        type: 'text',
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: this.listEspecialidades,
          },
        },
        /* valuePrepareFunction: (cell, row) => {
          console.log(row);
          return row.NOMBRE_FUNCIONARIO
        }, */
      },
      NOMBRE_ACT_PROGRAMA:{
        title: 'Nombre Actividad',
        hide: false,
        type: 'text', 
        editable: true
      },
    },
  };
  constructor(private toastrService: NbToastrService,
    private actividadProgramaService: ActividadProgramaService,
    private especialidad: EspecialidadService) { 


      
    }

  ngOnInit(): void {
    this.especialidad.getEspecialidades().subscribe(res=>{
      res = res.filter(value=>value.VIGENCIA_ESPECIALIDAD.toUpperCase() ==='S');
      res.forEach(val=>{
        console.log(res);
        this.listEspecialidades.push({value: val.ID_ESPECIALIDAD , title : val.NOMBRE_ESPECIALIDAD})
      });
      this.settings.columns.ID_ESPECIALIDAD.editor.config.list = this.listEspecialidades;
      this.settings = Object.assign({},this.settings);

    },err=>{});
    this.getActividadesProgramadas();
  }
  getActividadesProgramadas(){
    this.actividadProgramaService.getActividadesProgramadas().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_ACT_PROGRAMA.toUpperCase() ==='S');
        this.listaActividadPrograma = response;
        this.source.load(this.listaActividadPrograma);
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }
  onCreateConfirm(event):void { 
    console.log(event);
      
    let newEspecialidadProgramada = new ActividadProgramada;
    newEspecialidadProgramada.ID_ESPECIALIDAD = event.newData.ID_ESPECIALIDAD.toUpperCase();
    newEspecialidadProgramada.NOMBRE_ACT_PROGRAMA = event.newData.NOMBRE_ACT_PROGRAMA.toUpperCase();
    newEspecialidadProgramada.VIGENCIA_ACT_PROGRAMA = 'S';
    if(newEspecialidadProgramada.NOMBRE_ACT_PROGRAMA.length===0){
      this.toastrService.show('Nombre no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }

    this.actividadProgramaService.save(newEspecialidadProgramada).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear hora!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    console.log(event);
     
    let updateActividadProgramada = new ActividadProgramada;
    updateActividadProgramada.ID_ACT_PROGRAMA = event.data.ID_ACT_PROGRAMA;
    updateActividadProgramada.ID_ESPECIALIDAD = event.data.ID_ESPECIALIDAD;
    updateActividadProgramada.NOMBRE_ACT_PROGRAMA = event.newData.NOMBRE_ACT_PROGRAMA.toUpperCase();
    updateActividadProgramada.VIGENCIA_ACT_PROGRAMA = event.data.VIGENCIA_ACT_PROGRAMA.toUpperCase();
    this.actividadProgramaService.update(updateActividadProgramada.ID_ACT_PROGRAMA,updateActividadProgramada).subscribe(res=>{
      this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
      this.getActividadesProgramadas();
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
    /* this.horaService.findbyid(updateHora.ID_HORA).subscribe(res=>{
      if(res===null){
      this.toastrService.show('Hora no existe!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
      }
      this.horaService.update(updateHora.ID_HORA,updateHora).subscribe(res=>{
        this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
        this.getHoras();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
    },err=>{
      this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }); */
  }

  onDeleteConfirm(event): void {
    let delteActividadProgramada = new ActividadProgramada;
    delteActividadProgramada.ID_ACT_PROGRAMA = event.data.ID_ACT_PROGRAMA;
    delteActividadProgramada.ID_ESPECIALIDAD = event.data.ID_ESPECIALIDAD;
    delteActividadProgramada.NOMBRE_ACT_PROGRAMA = event.data.NOMBRE_ACT_PROGRAMA;
    delteActividadProgramada.VIGENCIA_ACT_PROGRAMA = 'N';
    if (window.confirm('Desea eliminar este Perfil?')) {
      console.log(event);


      this.actividadProgramaService.update(delteActividadProgramada.ID_ACT_PROGRAMA,delteActividadProgramada).subscribe(res=>{
        this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
        this.getActividadesProgramadas();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
     
      /* this.horaService.findbyid(deleteHora.ID_HORA).subscribe(res=>{
        if(res===null){
        this.toastrService.show('Hora no existe!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
        }
        this.horaService.update(deleteHora.ID_HORA,deleteHora).subscribe(res=>{
          this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
          this.getHoras();
          return event.confirm.resolve();
        },err=>{
          this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
          return event.confirm.reject();
        });
      },err=>{
        this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      }); */
    } else {
      return event.confirm.reject();
    }
  }
}
