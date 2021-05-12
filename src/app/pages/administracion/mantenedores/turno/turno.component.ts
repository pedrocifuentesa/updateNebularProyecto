import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { Turno } from '../../model/turno';
import { TurnoService } from '../../services/turno/turno.service';
@Component({
  selector: 'ngx-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {
  listaTurnos: Turno[] = [];
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
      NOMBRE_TURNO: {
        title: 'Nombre Turno',
        type: 'text',
        editable: true
      },
      SIGLA_TURNO: {
        title: 'Sigla Turno',
        type: 'text',
        editable: true
      },
    },
  };
  constructor(private turnoService: TurnoService
    , private service: SmartTableData
    , private toastrService: NbToastrService) { }
  // Ejemplo Toastr
  //this.toastrService.show('Fecha inicio es incorrecta', 'Alerta!', { status: 'warning' });

  ngOnInit(): void {
    this.getListaTurnos();
  }

  source: LocalDataSource = new LocalDataSource();

  async getListaTurnos() {
    await this.turnoService.getTurno().subscribe(
      response => {
        this.listaTurnos = response.filter(turno => turno.VIGENCIA_TURNO.toLowerCase() === 's');
        this.source.load(this.listaTurnos);
      },
      error => {
        this.toastrService.show('Error al cargar información', 'Alerta!', { status: 'warning' });
      }
    );
  }


  onCreateConfirm(event): void {
    console.log(event);
    let newTurno = new Turno;
    newTurno.NOMBRE_TURNO = event.newData.NOMBRE_TURNO.toUpperCase();
    newTurno.SIGLA_TURNO = event.newData.SIGLA_TURNO.toUpperCase();
    newTurno.VIGENCIA_TURNO = "S";
    console.log(newTurno);
    this.turnoService.save(newTurno).subscribe(
      response => {
        console.log(response);
        this.toastrService.show(response.message, 'Ok!', { status: 'success' });
        event.confirm.resolve();
      },
      error => {
        console.log(error);
        this.toastrService.show('Error al Crear Turno', 'Alerta!', { status: 'warning' });
        event.confirm.reject();
      }
    )
    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Desea eliminar este Pase?')) {
      let turnoUpdate = new Turno;
      turnoUpdate.ID_TURNO = event.data.ID_TURNO;
      turnoUpdate.NOMBRE_TURNO = event.data.NOMBRE_TURNO.toUpperCase();
      turnoUpdate.SIGLA_TURNO = event.data.SIGLA_TURNO.toUpperCase();
      turnoUpdate.VIGENCIA_TURNO = "N";

      this.turnoService.update(event.data.ID_TURNO, turnoUpdate).subscribe(
        response => {
          this.toastrService.show('Eliminado Correctamente!', 'Ok!', { status: 'success' });
          this.getListaTurnos();
          event.confirm.resolve();
        }, error => {
          this.toastrService.show('Error al Eliminar Turno', 'Alerta!', { status: 'warning' });
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    console.log(event);
    let turnoUpdate = new Turno;
    turnoUpdate.ID_TURNO = event.data.ID_TURNO;
    turnoUpdate.NOMBRE_TURNO = event.newData.NOMBRE_TURNO.toUpperCase();
    turnoUpdate.SIGLA_TURNO = event.newData.SIGLA_TURNO.toUpperCase();
    turnoUpdate.VIGENCIA_TURNO = event.data.VIGENCIA_TURNO.toUpperCase();

    this.turnoService.update(event.data.ID_TURNO, turnoUpdate).subscribe(
      response => {
        this.toastrService.show('Actualizado Correctamente!', 'Ok!', { status: 'success' });
        this.getListaTurnos();
        event.confirm.resolve();
      }, error => {
        this.toastrService.show('Error al Actualizar Turno', 'Alerta!', { status: 'warning' });
        event.confirm.reject();
      }
    );
  }

}
