import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Especialidad } from '../../model/especialidad';
import { EspecialidadService } from '../../services/especialidad/especialidad.service';

@Component({
  selector: 'ngx-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {

  listaEspecialidad:Especialidad[]=[];
  especialidad:Especialidad;
  source: LocalDataSource = new LocalDataSource();

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
      NOMBRE_ESPECIALIDAD:{
        title: 'Especialidad',
        hide: false,
        type: 'text', 
        editable: true
      },
    },
  };

  constructor(private toastrService: NbToastrService
    ,private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_ESPECIALIDAD.toUpperCase() ==='S');
        this.listaEspecialidad = response;
        this.source.load(this.listaEspecialidad);
 
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }
  onCreateConfirm(event):void { 
    let newEspecialidad = new Especialidad;
    newEspecialidad.NOMBRE_ESPECIALIDAD = event.newData.NOMBRE_ESPECIALIDAD.toUpperCase();
    newEspecialidad.VIGENCIA_ESPECIALIDAD = 'S';
    if(newEspecialidad.NOMBRE_ESPECIALIDAD.length===0){
      this.toastrService.show('Descripción no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }

    this.especialidadService.save(newEspecialidad).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear hora!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    let updateEspecialidad = new Especialidad;
    updateEspecialidad.ID_ESPECIALIDAD = event.data.ID_ESPECIALIDAD;
    updateEspecialidad.NOMBRE_ESPECIALIDAD = event.newData.NOMBRE_ESPECIALIDAD.toUpperCase();
    updateEspecialidad.VIGENCIA_ESPECIALIDAD = event.data.VIGENCIA_ESPECIALIDAD.toUpperCase();


    this.especialidadService.update(updateEspecialidad.ID_ESPECIALIDAD,updateEspecialidad).subscribe(res=>{
      this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
      this.getEspecialidades();
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });

   /*  this.horaService.findbyid(updateHora.ID_HORA).subscribe(res=>{
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
    let deleteEspecialidad = new Especialidad;
    deleteEspecialidad.ID_ESPECIALIDAD = event.data.ID_ESPECIALIDAD;
    deleteEspecialidad.NOMBRE_ESPECIALIDAD = event.data.NOMBRE_ESPECIALIDAD;
    deleteEspecialidad.VIGENCIA_ESPECIALIDAD = 'N';
    if (window.confirm('Desea eliminar este Perfil?')) {
      this.especialidadService.update(deleteEspecialidad.ID_ESPECIALIDAD,deleteEspecialidad).subscribe(res=>{
        this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
        this.getEspecialidades();
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
