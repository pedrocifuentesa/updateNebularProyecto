import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo/cargo.service';
import { Cargo } from '../../model/cargo';
import { NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { async } from 'rxjs';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';


@Component({
  selector: 'ngx-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {

  listaCargos: Cargo[] = [];
  statuses: NbComponentStatus = 'primary';
  formCargo: FormGroup;
  
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
      NOMBRE_CARGO: {
        title: 'Nombre Cargo',
        type: 'string'
      },
      VIGENCIA_CARGO: {
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


  constructor(private cargoService: CargoService, private fb: FormBuilder,private service: SmartTableData) { }

  ngOnInit(): void {
    this.inicializarForm();
    this.getCargos();
  }
  source: LocalDataSource = new LocalDataSource();
  getCargos() {
    this.cargoService.getCargos().subscribe(
      cargos => {
        cargos.forEach(elemento => {
          if (elemento.VIGENCIA_CARGO.toLowerCase() === 's') {
            elemento.VIGENCIA_CARGO = 'Activo';
          }else{
            elemento.VIGENCIA_CARGO = 'Inactivo';
          }
        });
        this.listaCargos = cargos;
        this.listaCargos = this.listaCargos.filter(cargo => cargo.VIGENCIA_CARGO === 'Activo');
        console.log(this.listaCargos);
        this.source.load(this.listaCargos);
      }
    );
  }
  inicializarForm() {
    this.formCargo = this.fb.group({
      nombre: ['']
    })
  }
  async save() {
    let nombre: String;
    nombre = this.formCargo.controls['nombre'].value;
    let object_insert = {
      "NOMBRE_CARGO": nombre.toUpperCase()
    }
    await new Promise((resolve, reject) => {
      this.cargoService.save(object_insert).subscribe(
        response => {

          return resolve(response);
        }
      );
    });

    this.formCargo.reset();
    this.getCargos();
  }


  onDeleteConfirm(event): void {
    let idCargo = event.data.ID_CARGO;
    let cargo = new Cargo();
    cargo.ID_CARGO = event.data.ID_CARGO;
    cargo.NOMBRE_CARGO = event.data.NOMBRE_CARGO;
    cargo.VIGENCIA_CARGO = 'N';

    if (window.confirm('Desea eliminar este Perfil?')) {
      this.cargoService.update(idCargo,cargo).subscribe(
        response => {
          this.getCargos();
        }
      );
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    
  }
 
  onCreateConfirm(event):void { 
    let cargo = new Cargo();
    cargo.NOMBRE_CARGO = event.newData.NOMBRE_CARGO;
    cargo.VIGENCIA_CARGO = event.newData.VIGENCIA_CARGO;
    this.cargoService.save(cargo).subscribe(
      response=>{
        this.getCargos();
        event.confirm.resolve();
      }
    );
  } 
 
  onSaveConfirm(event):void { 
    let idCargo = event.data.ID_CARGO;
    let cargo = new Cargo();
    cargo.ID_CARGO = event.data.ID_CARGO;
    cargo.NOMBRE_CARGO = event.newData.NOMBRE_CARGO;
    cargo.VIGENCIA_CARGO = 'S';
    this.cargoService.update(idCargo,cargo).subscribe(
      response => {
        this.getCargos();
      }
    );
  }
}
