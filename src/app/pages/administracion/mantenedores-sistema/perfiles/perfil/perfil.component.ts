import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { SmartTableData } from 'app/@core/data/smart-table';
import { Perfil } from 'app/pages/administracion/model/perfil';
import { PerfilService } from 'app/pages/administracion/services/peril/perfil.service';
import {  LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  listaPerfil: Perfil[] = [];
  
  statuses: NbComponentStatus = 'primary';
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
      NOMBRE_PERFIL: {
        title: 'Nombre Perfil',
        type: 'string',
      },
    },
};
  source: LocalDataSource = new LocalDataSource();

  constructor(private perfilService:PerfilService,private service: SmartTableData,private toastrService: NbToastrService) { 
    //let data = this.perfilService.getPerfiles();
    //this.source.load(data);
  }
// configuracion troars
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
status: NbComponentStatus = 'primary';

title = 'HI there!';
content = `I'm cool toaster!`;

types: NbComponentStatus[] = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
];
positions: string[] = [
  NbGlobalPhysicalPosition.TOP_RIGHT,
  NbGlobalPhysicalPosition.TOP_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_LEFT,
  NbGlobalPhysicalPosition.BOTTOM_RIGHT,
  NbGlobalLogicalPosition.TOP_END,
  NbGlobalLogicalPosition.TOP_START,
  NbGlobalLogicalPosition.BOTTOM_END,
  NbGlobalLogicalPosition.BOTTOM_START,
];
makeToast(tipo,titulo,mensaje) {
  this.showToast(tipo,titulo,mensaje);
}
private showToast(type: NbComponentStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `${title}` : '';

  this.index += 1;
  this.toastrService.show(
    body,
    `${titleContent}`,
    config);
}
  ngOnInit(): void {
    this.getPerfil();
    
  }
  getPerfil() {
    this.perfilService.getPerfiles().subscribe(
      perfiles => {
        perfiles.forEach(elemento => {
          if (elemento.VIGENCIA_PERFIL.toLowerCase() === 's') {
            elemento.VIGENCIA_PERFIL = 'Activo';
          }else{
            elemento.VIGENCIA_PERFIL = 'Inactivo';
          }
        });
        this.listaPerfil = perfiles.filter(perfil=>perfil.VIGENCIA_PERFIL.toLowerCase() ==='activo');
        this.source.load(this.listaPerfil);
      }
    );
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Desea eliminar este Perfil?')) {
      //console.log(event.data.ID_PERFIL);
      this.perfilService.deleteUpdate(event.data.ID_PERFIL).subscribe(
        response => {
          this.toastrService.show('Eliminado Correctamente!', 'Ok!', { status: 'success' });
          this.getPerfil();
          event.confirm.resolve();
        }, error => {
          this.toastrService.show('Error al Eliminar', 'Alerta!', { status: 'warning' });
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
    
  }
  save(perfil:Perfil){
    this.perfilService.save(perfil).subscribe(
      response=>{
        //console.log('Ingreso Correctamente:'+response);
        this.toastrService.show('Credo Correctamente!', 'Ok!', { status: 'success' });
        this.getPerfil();
      },
      error=>{
        this.toastrService.show('Error al Crear', 'Alerta!', { status: 'warning' });
        //console.log('Error:'+error);
      }

    );
  }

  onCreateConfirm(event):void { 
    let perfil = new Perfil();
    perfil.NOMBRE_PERFIL=event.newData.NOMBRE_PERFIL.toUpperCase();
    perfil.VIGENCIA_PERFIL="S";
     this.save(perfil);
     event.confirm.resolve();
   // console.log(event);
  } 
 
  onSaveConfirm(event):void { 
    let perfil = new Perfil();
    perfil = event.newData;
    perfil.NOMBRE_PERFIL= perfil.NOMBRE_PERFIL.toUpperCase();
    //console.log(event);
    this.perfilService.update(perfil.ID_PERFIL,perfil).subscribe(response => {
      this.toastrService.show('Actualizado Correctamente!', 'Ok!', { status: 'success' });
      this.getPerfil();
      event.confirm.resolve();
    }, error => {
      this.toastrService.show('Error al Actualizar', 'Alerta!', { status: 'warning' });
      event.confirm.reject();
    });
  }
  
  
}
