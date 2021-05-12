import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Contrato } from '../../../../administracion/model/contrato';
import { Dotacion } from '../../../../administracion/model/dotacion';
import { DotacionService } from '../../../../administracion/services/dotacion/dotacion.service';


@Component({
  selector: 'app-mdl-delete-empleado-docacion',
  templateUrl: './mdl-delete-empleado-docacion.component.html',
  styleUrls: ['./mdl-delete-empleado-docacion.component.scss']
})
export class MdlDeleteEmpleadoDocacionComponent implements OnInit {

  @Input() titulo: string;
  @Input() perDotacion: any;
  @Input() contrato: Contrato;
  constructor(protected ref: NbDialogRef<MdlDeleteEmpleadoDocacionComponent>
    ,private fb:FormBuilder
    ,protected dateService: NbDateService<Date>
    ,private toastrService: NbToastrService
    , private serviceDotacion: DotacionService) { }

  ngOnInit() {
   /*  console.log(this.perDotacion);
    console.log(this.contrato);
 */
  }
  cancel() {
    this.ref.close();
  }

  validarFormatoFecha(campo) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
      return true;
    } else {
      return false;
    }
  }

  eliminar(){
    let dotacion = new Dotacion;


   /*  let formatoFecha = new Date(this.perDotacion.FECHA_INI_DOTACION);
    formatoFecha = new Date(formatoFecha.setMonth(formatoFecha.getMonth() + 1));
    let truncformatoFechaini = formatoFecha.getFullYear() + '-' + formatoFecha.getMonth() + '-' + formatoFecha.getDate();

    let formatoFechater = new Date(this.perDotacion.FECHA_FIN_DOTACION);
    formatoFechater = new Date(formatoFechater.setMonth(formatoFechater.getMonth() + 1));
    let truncformatoFechafin = formatoFechater.getFullYear() + '-' + formatoFechater.getMonth() + '-' + formatoFechater.getDate(); */

    /* dotacion.FECHA_FIN_DOTACION = truncformatoFechafin;
    dotacion.FECHA_INI_DOTACION = truncformatoFechaini; */
    dotacion.ID_CUADRILLA = this.perDotacion.ID_CUADRILLA;
    dotacion.NUMERO_CONTRATO = this.contrato.NUMERO_CONTRATO;
    dotacion.RUT_EMPLEADO = this.perDotacion.RUT_EMPLEADO;
    dotacion.RUT_EMPRESA = this.perDotacion.RUT_EMPRESA;
    dotacion.VIGENCIA_DOTACION = 'N';


    this.serviceDotacion.deleteEmpleadoDotacion(dotacion).subscribe(response => {  
      this.toastrService.show('Empleado Eliminado Correctamente', 'Eliminar!', { status: 'success' });
      this.ref.close();
    });

  }
}
