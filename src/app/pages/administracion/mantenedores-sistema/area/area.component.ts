import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Area } from '../../model/area';
import { AreaService } from '../../services/area/area.service';

@Component({
  selector: 'ngx-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

//--------------//
  //---Variables--//
  //--------------//
  source: LocalDataSource = new LocalDataSource();
  listaAreas :Area[]=[];

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
      NOMBRE_AREA:{
        title: 'Nombre Area',
        hide: false,
        type: 'text', 
        editable: true
      },
    },
  };

  constructor(private toastrService: NbToastrService
    ,private areaService: AreaService) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(){
    this.areaService.getAreas().subscribe(
      response=>{
        response = response.filter(value=>value.VIGENCIA_AREA.toUpperCase() ==='S');
        this.listaAreas = response;
        this.source.load(this.listaAreas);
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }
  onCreateConfirm(event):void { 
    console.log(event);
    let newArea = new Area;
    newArea.NOMBRE_AREA = event.newData.NOMBRE_AREA.toUpperCase();
    newArea.VIGENCIA_AREA = 'S';


    if(newArea.NOMBRE_AREA.length===0){
      this.toastrService.show('Nombre no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }

    this.areaService.save(newArea).subscribe(res=>{
      console.log(res);
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    let updateArea = new Area;
    updateArea.ID_AREA = event.data.ID_AREA;
    updateArea.NOMBRE_AREA = event.newData.NOMBRE_AREA.toUpperCase();
    updateArea.VIGENCIA_AREA = event.data.VIGENCIA_AREA.toUpperCase();


    this.areaService.update(updateArea.ID_AREA,updateArea).subscribe(res=>{
      this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
      this.getAreas();
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });

  /*   this.horaService.findbyid(updateHora.ID_HORA).subscribe(res=>{
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
    let deleteArea = new Area;
    deleteArea.ID_AREA = event.data.ID_AREA;
    deleteArea.NOMBRE_AREA = event.data.NOMBRE_AREA;
    deleteArea.VIGENCIA_AREA = 'N';
    if (window.confirm('Desea eliminar este Perfil?')) {

      this.areaService.update(deleteArea.ID_AREA,deleteArea).subscribe(res=>{
        this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
        this.getAreas();
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
