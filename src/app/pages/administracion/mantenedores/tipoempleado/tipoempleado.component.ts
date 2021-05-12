import { Component, OnInit } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LocalDataSource } from 'ng2-smart-table';

import { TipoEmpleadoService } from '../../services/tipoEmpleado/tipo-empleado.service';
import { TipoEmpleado } from '../../model/tipoEmpleado';
import { SmartTableData } from '../../../../@core/data/smart-table';
@Component({
  selector: 'ngx-tipoempleado',
  templateUrl: './tipoempleado.component.html',
  styleUrls: ['./tipoempleado.component.scss']
})
export class TipoempleadoComponent implements OnInit {

  listaTipoEmpleado: TipoEmpleado[] = [];

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
      NOMBRE_TIPO_TE: {
        title: 'Nombre Tipo Empleado',
        type: 'string'
      },
      VIGENCIA_TIPO_TE: {
        title: 'Vigencia',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'S', title: 'Activo' },
              { value: 'N', title: 'Inactivo' },
            ],
          },
        },
        type: 'string',
      },
    },
  };
  constructor(private tipoEmpleadoService: TipoEmpleadoService, private fb: FormBuilder,private service: SmartTableData) { }

  ngOnInit(): void {
    this.getTipoEmpleado();
  }
  source: LocalDataSource = new LocalDataSource();
  getTipoEmpleado() {
    this.tipoEmpleadoService.getTipoEmpleado().subscribe(
      tipoEmpleado => {
        tipoEmpleado.forEach(elemento => {
          if (elemento.VIGENCIA_TIPO_TE.toLowerCase() === 's') {
            elemento.VIGENCIA_TIPO_TE = 'Activo';
          }else{
            elemento.VIGENCIA_TIPO_TE = 'Inactivo';
          }
        });
        this.listaTipoEmpleado = tipoEmpleado;
        this.listaTipoEmpleado = this.listaTipoEmpleado.filter(tipoEmpleado => tipoEmpleado.VIGENCIA_TIPO_TE === 'Activo');
        //console.log(this.listaCargos);
        this.source.load(this.listaTipoEmpleado);
      }
    );
  }


  onDeleteConfirm(event): void {
    let id_TE = event.data.ID_TE ;
    let tipoEmpleado = new TipoEmpleado();
    tipoEmpleado.ID_TE = event.data.ID_TE;
    tipoEmpleado.NOMBRE_TIPO_TE = event.data.NOMBRE_TIPO_TE;
    tipoEmpleado.VIGENCIA_TIPO_TE = 'N';

    if (window.confirm('Desea eliminar este Tipo de Empleado?')) {
      this.tipoEmpleadoService.update(id_TE,tipoEmpleado).subscribe(
        response => {
          this.getTipoEmpleado();
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    let tipoEmpleado = new TipoEmpleado();
    tipoEmpleado.NOMBRE_TIPO_TE = event.newData.NOMBRE_TIPO_TE;
    tipoEmpleado.VIGENCIA_TIPO_TE = event.newData.VIGENCIA_TIPO_TE;
    this.tipoEmpleadoService.save(tipoEmpleado).subscribe(
      response=>{
        this.getTipoEmpleado();
        event.confirm.resolve();
      }
    );
  } 
 
  onSaveConfirm(event):void { 
    let id_TE = event.data.ID_CARGO;
    let tipoEmpleado = new TipoEmpleado();
    tipoEmpleado.ID_TE = event.data.ID_TE;
    tipoEmpleado.NOMBRE_TIPO_TE = event.newData.NOMBRE_TIPO_TE.toUpperCase();
    tipoEmpleado.VIGENCIA_TIPO_TE = 'S';
    this.tipoEmpleadoService.update(id_TE,tipoEmpleado).subscribe(
      response => {
        this.getTipoEmpleado();
      }
    );
  }
}
