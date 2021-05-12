import { Component, OnInit } from '@angular/core';
import { JornadaService } from '../../services/jornada/jornada.service';
import { Jornada } from '../../model/jornada';
import { NbComponentStatus, NbToastrService ,NbToastrConfig, NbGlobalPhysicalPosition, NbGlobalLogicalPosition, NbGlobalPosition} from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';



@Component({
  selector: 'ngx-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  // variables
  listaJornada: Jornada[] = [];
  jornadaBusqueda: Jornada[] = [];
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
      NOMBRE_JORNADA: {
        title: 'Nombre Jornada',
        type: 'string'
      },
      SIGLA_JORNADA: {
        title: 'Sigla Jornada',
        type: 'string'
      },
      /* VIGENCIA_JORNADA: {
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'S', title: 'Activo'},
            { value: 'N', title: 'Inactivo' },],
          },
        }, */
        /* title: 'Vigencia',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'S', title: 'Activo'},
              { value: 'N', title: 'Inactivo' },
            ],
          },
        },
        type: 'string', */
     /*  }, */
      // VIGENCIA_JORNADA: {
      //   title: 'Vigencia',
      //   type: 'string'
      // },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  // constructor
  constructor(private jornadaService: JornadaService, private service: SmartTableData,private toastrService: NbToastrService) {}
  // llamada metodos
  // configuracion troars
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 4000;
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
    this.getJornadas();
  }
  // metodos
  getBsqJornada(jornada:Jornada) {
    this.jornadaService.fltNombre(jornada).subscribe(
      jornadas => {
        this.jornadaBusqueda = jornadas;
      }
      );
  }
  getJornadas() {
    this.jornadaService.getJornada().subscribe(

      jornadas => {
        jornadas.forEach(elemento => {
          if (elemento.VIGENCIA_JORNADA.toLowerCase() === 's') {
            elemento.VIGENCIA_JORNADA = 'Activo';
          }else{
            elemento.VIGENCIA_JORNADA = 'Inactivo';
          }
        });
        this.listaJornada = jornadas.filter(perfil=>perfil.VIGENCIA_JORNADA.toLowerCase() ==='activo');
        this.source.load(this.listaJornada);
      }
     
      // jornadas => {
      //   console.log(jornadas);
      //   this.listaJornada = jornadas;

      //   this.source.load(this.listaJornada);
      // }
    )

  }
  onDeleteConfirm(event): void {
    if (window.confirm('Desea eliminar este Perfil?')) {
      //console.log(event.data);
      let jornadaDelete = new Jornada;
      jornadaDelete = event.data;
      this.jornadaService.dejeteJornada(jornadaDelete).subscribe(
        response=>{
          //console.log('Ingreso Correctamente:'+response);
          this.makeToast('primary','Eliminar','Eliminado Correctamente');
          this.getJornadas();
          event.confirm.resolve();
        },
        error=>{
          //console.log('Error:'+error);
          this.makeToast('warning','Eliminar','No se pudo eliminar');
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    let jornada = new Jornada();
    //let nombreJornada = event.newData.NOMBRE_JORNADA;
   // nombreJornada.toUpperCase()
    jornada.NOMBRE_JORNADA = event.newData.NOMBRE_JORNADA.toUpperCase();
    jornada.SIGLA_JORNADA = event.newData.SIGLA_JORNADA.toUpperCase();
    jornada.VIGENCIA_JORNADA = 'S';
    this.save(jornada);
  } 
 
  onSaveConfirm(event):void { 
    let jornadaUpdate = new  Jornada;
    jornadaUpdate = event.newData;
    jornadaUpdate.NOMBRE_JORNADA = jornadaUpdate.NOMBRE_JORNADA.toUpperCase();
    jornadaUpdate.SIGLA_JORNADA = jornadaUpdate.SIGLA_JORNADA.toUpperCase();

    this.jornadaService.update(jornadaUpdate.ID_JORNADA,jornadaUpdate).subscribe(
      response=>{
        console.log('Ingreso Correctamente:'+response);
        this.makeToast('primary','Actualizar','Se actualizo correctamente!');
        this.getJornadas();
      },
      error=>{
        this.makeToast('warning','Actualizar','Jornada no se actualizó');
        
      }

    );

  }
  save(jornada:Jornada){
    this.getBsqJornada(jornada);
    //let nombreJornada= jornada.NOMBRE_JORNADA.toUpperCase();
    if(this.jornadaBusqueda.length>0){
      this.makeToast('warning','Ingreso','Jornada Existe');
      return false;
    }else{
      this.jornadaService.save(jornada).subscribe(
            response=>{
              console.log('Ingreso Correctamente:'+response);
              this.makeToast('primary','Ingreso','Se ingreso correctamente!');
              this.getJornadas();
            },
            error=>{
              console.log('Error:'+error);
            }
    
          );
    }
    //console.log(this.jornadaBusqueda);
    //  this.jornadaService.save(jornada).subscribe(
    //    response=>{
    //      console.log('Ingreso Correctamente:'+response);
    //      this.makeToast('primary','Ingreso','Se ingreso correctamente!');
    //      this.getJornadas();
    //    },
    //    error=>{
    //      console.log('Error:'+error);
    //    }

    //  );
  }
  deleteJornada(jornada:Jornada){
     this.getBsqJornada(jornada);
    //let nombreJornada= jornada.NOMBRE_JORNADA.toUpperCase();
    if(this.jornadaBusqueda.length == 0){
      this.makeToast('warning','Elimnar','Jornada no Existe');
      return false;
    }else{
      this.jornadaService.dejeteJornada(jornada).subscribe(
            response=>{
              console.log('Ingreso Correctamente:'+response);
              this.makeToast('primary','Eliminar','Eliminado Correctamente');
              this.getJornadas();
            },
            error=>{
              console.log('Error:'+error);
            }
          );
    }
  }
}
