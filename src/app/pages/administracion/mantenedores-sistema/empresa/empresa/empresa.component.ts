import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empresa } from 'app/pages/administracion/model/empresa';
import { EmpresaService } from 'app/pages/administracion/services/empresa/empresa.service';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { SmartTableData } from 'app/@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { promises, resolve } from 'dns';


@Component({
  selector: 'ngx-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})

export class EmpresaComponent implements OnInit {
  statuses: NbComponentStatus = 'primary';
  formEmpresa: FormGroup;
  listaEmpresa: Empresa[] = [];
  //datos Tabla
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
        title: 'Rut Empresa',
        type: 'string',
        editable: false
      },
      RAZON_SOCIAL_EMPRESA: {
        title: 'Razon Empresa',
        type: 'string',
      },
      NOMBRE_FANTASIA_EMPRESA: {
        title: 'Nombre Fantasia Empresa',
        type: 'string',
      },
      DIRECCION_EMPRESA: {
        title: 'Direccion Empresa',
        type: 'string',
      },
      GENERA_PASE:{
        title: 'Genera Pase',
        type: 'text',
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'S', title: 'Si' },{ value: 'N', title: 'No' }],
          },
      },valuePrepareFunction: (cell, row) => {
        console.log(row);
        let rtn = '';
        if(cell==='S'){
          rtn = 'Si'
        }else{
          rtn= 'No'
        }
        return rtn
      },
    }
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private fb: FormBuilder, private empresaService: EmpresaService, private dialogService: NbDialogService, private service: SmartTableData, private toastrService: NbToastrService) {
  }
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
  makeToast(tipo, titulo, mensaje) {
    this.showToast(tipo, titulo, mensaje);
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
    this.inicializarFormulario();
    this.getEmpresas();
  }
  inicializarFormulario() {
    this.formEmpresa = this.fb.group({
      rutEmpresa: ["", [Validators.required]],
      razonSocial: ["", Validators.required],
      nombreEmpresa: [""],
      direcionEmpresa: [""],
    })
  };

  save(empresa: Empresa) {
    this.empresaService.save(empresa).subscribe(
      response => {
        console.log('Ingreso Correctamente:' + response);
        this.getEmpresas();
      },
      error => {
        console.log('Error:' + error);
      }
    );
  }
  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      response => {
        this.listaEmpresa = response;
        this.source.load(this.listaEmpresa);
      },
      error => {
        console.log("Error ::" + error);
      }
    );

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Desea eliminar este Perfil?')) {
      this.empresaService.deleteUpdate(event.data.RUT_EMPRESA).subscribe(
        response => {
          this.makeToast("success", "Empresa", response.message);
          event.confirm.resolve();
        }
      );
    } else {
      event.confirm.reject();
    }

  }
  async onCreateConfirm(event) {
    let empresa = new Empresa;
    let rs = 0;
    empresa.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    
    if (empresa.RUT_EMPRESA === "" || empresa.RUT_EMPRESA === undefined) {
      rs = 1;
      this.makeToast("warning", "Rut Empresa", "no puede ser vacio");
      return;
    }
    let existe = await new Promise((resolve) => {
      this.empresaService.findByRut(event.newData.RUT_EMPRESA).subscribe(
        response => {
          if (response.data === '' || response.data === undefined) {
            resolve(false);
          } else {
            empresa = response.data;
            resolve(true);
          }
        }
      )
    });

    if (existe === true) {

      console.log(empresa);
      if (empresa.VIGENCIA_EMPRESA.toUpperCase() === 'N') {
        // aqui Reactivo la empresa
        this.empresaService.reactivarEmpresa(empresa.RUT_EMPRESA).subscribe(
          response => {
            this.makeToast("success", "Empresa", response.message);
            this.getEmpresas();
            event.confirm.resolve();
            return;
          }
        )
      } else {
        this.makeToast("warning", "Empresa", "Empresa Existe");
        return;
      }
    } else {

      empresa.RUT_EMPRESA = event.newData.RUT_EMPRESA;
      empresa.RAZON_SOCIAL_EMPRESA = event.newData.RAZON_SOCIAL_EMPRESA;
      empresa.NOMBRE_FANTASIA_EMPRESA = event.newData.NOMBRE_FANTASIA_EMPRESA;
      empresa.DIRECCION_EMPRESA = event.newData.DIRECCION_EMPRESA;
      empresa.GENERA_PASE = event.newData.GENERA_PASE;
      // validaciones
      if (empresa.RUT_EMPRESA === "" || empresa.RUT_EMPRESA === undefined) {
        rs = 1;
        this.makeToast("warning", "Rut Empresa", "no puede ser vacio");
        return;
      }
      if (empresa.RAZON_SOCIAL_EMPRESA === "" || empresa.RAZON_SOCIAL_EMPRESA === undefined) {
        rs = 1;
        this.makeToast("warning", "Razon Social Empresa", "no puede ser vacio");
        return;
      }
      if (empresa.NOMBRE_FANTASIA_EMPRESA === "" || empresa.NOMBRE_FANTASIA_EMPRESA === undefined) {
        rs = 1;
        this.makeToast("warning", "Nombre Fantasia Empresa", "no puede ser vacio");
        return;
      }
      if (empresa.DIRECCION_EMPRESA === "" || empresa.DIRECCION_EMPRESA === undefined) {
        rs = 1;
        this.makeToast("warning", "Direccion Empresa", "no puede ser vacio");
        return;
      }
      if (rs === 0) {
        empresa.RAZON_SOCIAL_EMPRESA = empresa.RAZON_SOCIAL_EMPRESA.toUpperCase();
        empresa.NOMBRE_FANTASIA_EMPRESA = empresa.NOMBRE_FANTASIA_EMPRESA.toUpperCase();
        empresa.DIRECCION_EMPRESA = empresa.DIRECCION_EMPRESA.toUpperCase();
        empresa.VIGENCIA_EMPRESA = "S";
        this.empresaService.save(empresa).subscribe(
          response => {
            event.confirm.resolve();
            this.getEmpresas();
            this.makeToast("success", "Empresa", response.message);
          }
        );
      }
    }
  }
  onSaveConfirm(event): void {
    // update
    let empresa = new Empresa();

    empresa.RUT_EMPRESA = event.newData.RUT_EMPRESA;
    empresa.RAZON_SOCIAL_EMPRESA = event.newData.RAZON_SOCIAL_EMPRESA;
    empresa.NOMBRE_FANTASIA_EMPRESA = event.newData.NOMBRE_FANTASIA_EMPRESA;
    empresa.DIRECCION_EMPRESA = event.newData.DIRECCION_EMPRESA;
    empresa.GENERA_PASE = event.newData.GENERA_PASE;
    empresa.RAZON_SOCIAL_EMPRESA = empresa.RAZON_SOCIAL_EMPRESA.toUpperCase();
    empresa.NOMBRE_FANTASIA_EMPRESA = empresa.NOMBRE_FANTASIA_EMPRESA.toUpperCase();
    empresa.DIRECCION_EMPRESA = empresa.DIRECCION_EMPRESA.toUpperCase();

    this.empresaService.update(empresa).subscribe(
      response => {
        this.getEmpresas();
        event.confirm.resolve();
      }
    );


  }
}
