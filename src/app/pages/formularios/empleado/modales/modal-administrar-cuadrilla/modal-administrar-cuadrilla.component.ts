import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';


import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../../@core/data/smart-table';
import { Dotacion } from '../../../../administracion/model/dotacion';

@Component({
  selector: 'ngx-modal-administrar-cuadrilla',
  templateUrl: './modal-administrar-cuadrilla.component.html',
  styleUrls: ['./modal-administrar-cuadrilla.component.scss']
})
export class ModalAdministrarCuadrillaComponent implements OnInit {
  listaDotacion: Dotacion[] = [];
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
      RUT_EMPRESA: {
        title: 'Rut_Empresa',
        type: 'string'
      },
      RUT_EMPLEADO: {
        title: 'Rut Empleado',
        type: 'string'
      },
      NUMERO_CONTRATO: {
        title: 'Numero Contrato',
        type: 'string'
      },
      ID_CUADRILLA: {
        title: 'Id Cuadrilla',
        type: 'string'
      },
      
      FECHA_INI_DOTACION: {
        title: 'Fecha inicio Dotacion',
        type: 'string'
      },
      FECHA_FIN_DOTACION: {
        title: 'Fecha Fin Dotacion',
        type: 'string'
      },
      VIGENCIA_DOTACION: {
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

  constructor(protected ref: NbDialogRef<ModalAdministrarCuadrillaComponent>,private fb:FormBuilder,private service: SmartTableData) { }

  ngOnInit(): void {
  }

  source: LocalDataSource = new LocalDataSource();

  cancel() {
    this.ref.close();
  }

  async submit(){
    await this.ref.close()
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Desea eliminar este Empleado?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 

    console.log('Se guardo');
    event.confirm.resolve();
    /* let cargo = new Cargo();
    cargo.NOMBRE_CARGO = event.newData.NOMBRE_CARGO;
    cargo.VIGENCIA_CARGO = event.newData.VIGENCIA_CARGO;
    this.cargoService.save(cargo).subscribe(
      response=>{
        this.getCargos();
        event.confirm.resolve();
      }
    ); */
  } 
 
  onSaveConfirm(event):void { 
    console.log('Se guardo')
    /* let idCargo = event.data.ID_CARGO;
    let cargo = new Cargo();
    cargo.ID_CARGO = event.data.ID_CARGO;
    cargo.NOMBRE_CARGO = event.newData.NOMBRE_CARGO;
    cargo.VIGENCIA_CARGO = 'S';
    this.cargoService.update(idCargo,cargo).subscribe(
      response => {
        this.getCargos();
      }
    ); */
  }



}
