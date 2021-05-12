import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ModalCrearContratoComponent } from './modales/modal-crear-contrato/modal-crear-contrato.component';

@Component({
  selector: 'ngx-admin-contrato',
  templateUrl: './admin-contrato.component.html',
  styleUrls: ['./admin-contrato.component.scss']
})
export class AdminContratoComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }
  async modalCrearContrato() {
    await this.dialogService.open(ModalCrearContratoComponent, {
      context: {
        /* title: 'This is a title passed to the dialog component',
        listaPersonas: this.listaEmpleadosFueraContrato,
        listaTE : this.lista_TE,
        listaCargo : this.lista_Cargo,
        listaJornada : this.lista_Jornada,
        listaTurno : this.lista_Turno,
        contrato_Frm : this.contratofrm,
        empresa_Frm : this.empresafrm, */
      },
    }).onClose.subscribe(
         name => {
        //name && this.names.push(name);
        //this.cargarEmpleado(this.contratofrm);
         }
      );
      //this.cargarEmpleado(this.contratofrm);
      //console.log(this.names);
  }


}
