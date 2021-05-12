import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Empleado } from '../../../../administracion/model/empleado';
import { ContratoService } from '../../../../administracion/services/contratos/contrato.service';
import { EmpleadoService } from '../../../../administracion/services/empleado/empleado.service';
import { EmpresaService } from '../../../../administracion/services/empresa/empresa.service';


@Component({
  selector: 'ngx-modal-eliminar-empleado',
  templateUrl: './modal-eliminar-empleado.component.html',
  styleUrls: ['./modal-eliminar-empleado.component.scss']
})
export class ModalEliminarEmpleadoComponent implements OnInit {
  @Input() title: string;
@Input() empleadoEliminar: any;
@Input() contratoPersona: any;
personaDelete: Empleado;
  constructor(
    protected ref: NbDialogRef<ModalEliminarEmpleadoComponent>
    , protected dateService: NbDateService<Date>
    , private empresaService: EmpresaService
    , private contratoService: ContratoService
    , private empleadoService: EmpleadoService
    , private fb: FormBuilder
    , private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.obtenerEmpleadoContrato(this.empleadoEliminar.RUT, this.contratoPersona);
  }
  cancel() {
    this.ref.close();
  }
  async submit() {
    let empleadoDelete = new Empleado 
    let dateNow =  new Date();
    dateNow = new Date(dateNow.setMonth(dateNow.getMonth() + 1));
    const truncformatoFechafin = dateNow.getFullYear() + '-' + dateNow.getMonth() + '-' + dateNow.getDate();
    empleadoDelete = this.personaDelete;
    empleadoDelete.FECHA_FIN_EMPLEADO = truncformatoFechafin;

   
    this.empleadoService.update(empleadoDelete).subscribe(
      response => {
        this.toastrService.show('Eliminado Correctamente', 'Actualizar!', { status: 'success' });
        this.ref.close();
      });
    
  }
  async obtenerEmpleadoContrato( rutEmpleado, contrato: Contrato) {
    const empleadoBusqueda = new Empleado;
    empleadoBusqueda.RUT_EMPLEADO = rutEmpleado;
    empleadoBusqueda.RUT_EMPRESA = contrato.RUT_EMPRESA;
    empleadoBusqueda.NUMERO_CONTRATO = contrato.NUMERO_CONTRATO;
    await this.empleadoService.findByRut(empleadoBusqueda).subscribe(res => {
      this.personaDelete = res.data;
     
    });
  }
  

}
