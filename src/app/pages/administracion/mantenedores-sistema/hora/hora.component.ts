import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Hora } from '../../model/hora';
import { HoraService } from '../../services/hora/hora.service';

@Component({
  selector: 'ngx-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss']
})
export class HoraComponent implements OnInit {
  //--------------//
  //---Variables--//
  //--------------//
  source: LocalDataSource = new LocalDataSource();
  listaHora :Hora[]=[];

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
      DESCRIPCION_HORA:{
        title: 'Descripcion Hora',
        hide: false,
        type: 'text', 
        editable: true
      },
    },
  };
  constructor(private toastrService: NbToastrService
    ,private horaService: HoraService) { }

  ngOnInit(): void {
    this.getHoras();
  }
  getHoras(){
    this.horaService.getHoras().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_HORA.toUpperCase() ==='S');
        this.listaHora = response;
        this.source.load(this.listaHora);
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }
  onCreateConfirm(event):void { 
    let newHora = new Hora;
    newHora.DESCRIPCION_HORA = event.newData.DESCRIPCION_HORA.toUpperCase();
    newHora.VIGENCIA_HORA = 'S';
    if(newHora.DESCRIPCION_HORA.length===0){
      this.toastrService.show('Descripción no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }

    this.horaService.save(newHora).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear hora!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    let updateHora = new Hora;
    updateHora.ID_HORA = event.data.ID_HORA;
    updateHora.DESCRIPCION_HORA = event.newData.DESCRIPCION_HORA.toUpperCase();
    updateHora.VIGENCIA_HORA = event.data.VIGENCIA_HORA.toUpperCase();

    this.horaService.findbyid(updateHora.ID_HORA).subscribe(res=>{
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
    });
  }

  onDeleteConfirm(event): void {
    let deleteHora = new Hora;
    deleteHora.ID_HORA = event.data.ID_HORA;
    deleteHora.DESCRIPCION_HORA = event.data.DESCRIPCION_HORA;
    deleteHora.VIGENCIA_HORA = 'N';
    if (window.confirm('Desea eliminar este Perfil?')) {
      this.horaService.findbyid(deleteHora.ID_HORA).subscribe(res=>{
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
      });
    } else {
      return event.confirm.reject();
    }
  }
}
