import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../../@core/data/smart-table';

@Component({
  selector: 'ngx-cuadrilla',
  templateUrl: './cuadrilla.component.html',
  styleUrls: ['./cuadrilla.component.scss']
})
export class CuadrillaComponent implements OnInit {

  constructor(private service: SmartTableData,private toastrService: NbToastrService) { }




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
      VIGENCIA_JORNADA: {
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

  source: LocalDataSource = new LocalDataSource();

  
  ngOnInit(): void {
  }

}
