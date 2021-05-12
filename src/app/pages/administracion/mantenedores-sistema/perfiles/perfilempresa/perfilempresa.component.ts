import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SmartTableData } from 'app/@core/data/smart-table';
import { Empresa } from 'app/pages/administracion/model/empresa';
import { PerfilEmpresa } from 'app/pages/administracion/model/perfilEmpresa';
import { Perfil } from 'app/pages/administracion/model/perfil';
import { EmpresaService } from 'app/pages/administracion/services/empresa/empresa.service';
import { PerfilEmpresaService } from 'app/pages/administracion/services/perfilEmpresa/perfil-empresa.service';
import { PerfilService } from 'app/pages/administracion/services/peril/perfil.service';

import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-perfilempresa',
  templateUrl: './perfilempresa.component.html',
  styleUrls: ['./perfilempresa.component.scss']
})
export class PerfilempresaComponent implements OnInit {
  //-----------------//
  //-----Variables---//
  //-----------------//

  listaPerfilEmpresa: PerfilEmpresa[] = [];
  listaEmpresas: Empresa[] = [];
  listaPerfiles: Perfil[]=[];
  listaEmpEny: Array<{ID_PERFIL:number,NOMBRE_FANTASIA_EMPRESA:string,NOMBRE_PERFIL:string,RUT_EMPRESA:string}>=[];
  listaEmp : Array<{value: string, title: string}> = [];
  listaper : Array<{value: number, title: string}> = [];

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
      ID_PERFIL:{
        title: 'Id Perfil',
        hide: false,
        type: 'text', 
        editor: {
          type: 'list',
          config: {
            list: this.listaper,
          },
        },
        valuePrepareFunction: (cell, row) => {
          return row.NOMBRE_PERFIL
        },
      },
      RUT_EMPRESA:{
        title: 'Empresa',
        type: 'html',
        editable:false,
        editor: {
          type: 'list',
          config: {
            list: this.listaEmp,
          },
        },
        valuePrepareFunction: (cell, row) => {
          return row.NOMBRE_FANTASIA_EMPRESA
        },
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private perfilEmpresaService: PerfilEmpresaService
    , private empresaService: EmpresaService
    , private perfilService: PerfilService
    , private toastrService: NbToastrService) { }

    //this.toastrService.show('Se actualizo correctamente!','Actualización',{ status: 'success' });
    //this.toastrService.show('No se pudo Actualizar!','Actualización',{ status: 'warning' });
  ngOnInit(): void {
    
    this.getPerfilEmpresas();
    this.getEmpresas();
    this.getPerfiles()

  }

  getPerfilEmpresas(){
    this.perfilEmpresaService.getPerfilEmpresaDtl().subscribe(
      response=>{
        this.listaEmpEny= response['data'];
        this.source.load(this.listaEmpEny);
    }
    ,error=>{
      console.log("Error ::" + error);
    });
    this.perfilEmpresaService.getPerfilEmpresa().subscribe(
      response=>{
        this.listaPerfilEmpresa= response;
        //this.source.load(this.listaEmpEny);
    }
    ,error=>{
      console.log("Error ::" + error);
    });
  }

  getEmpresas(){
    this.empresaService.getEmpresas().subscribe(response=>{
      this.listaEmpresas= response;
      response.forEach(valor=>{
        this.listaEmp.push({value: valor.RUT_EMPRESA , title : valor.NOMBRE_FANTASIA_EMPRESA});
      });
      this.settings.columns.RUT_EMPRESA.editor.config.list = this.listaEmp;
      this.settings = Object.assign({},this.settings);
    },error=>{
      console.log("Error ::" + error);
    })
  }
  getPerfiles(){
    this.perfilService.getPerfiles().subscribe(response=>{
      this.listaPerfiles = response;
      response.forEach(valor=>{
        this.listaper.push({value: valor.ID_PERFIL , title : valor.NOMBRE_PERFIL});
      });
      this.settings.columns.ID_PERFIL.editor.config.list = this.listaper;
      this.settings = Object.assign({},this.settings);
    },error=>{

    });
  }

  onCreateConfirm(event):void { 
    if(Number(event.newData.ID_PERFIL)===0){
      this.toastrService.show('Debe seleccionar un Perfil!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    if(event.newData.RUT_EMPRESA===''){
      this.toastrService.show('Debe seleccionar una Empresa!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }
    // reviso si existe en la db 
    //this.perfilEmpresaService.

    /* let busqueda = this.listaPerfilEmpresa.find(valor => valor.RUT_EMPRESA === event.newData.RUT_EMPRESA);
    if (busqueda!==undefined){
      this.toastrService.show('Empresa ya cuenta con perfil!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    } */

    let newPerfilEmpresa = new PerfilEmpresa;
    newPerfilEmpresa.ID_PERFIL = Number(event.newData.ID_PERFIL);
    newPerfilEmpresa.RUT_EMPRESA = event.newData.RUT_EMPRESA;

    this.perfilEmpresaService.save(newPerfilEmpresa).subscribe(response=>{
      console.log(response);
      this.toastrService.show('Se Creo correctamente!','Creación',{ status: 'success' });
      this.getPerfilEmpresas();
      return event.confirm.resolve();
    },error=>{
      this.toastrService.show('Error al Crear Perfil!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  } 
   
  onSaveConfirm(event):void { 
    let updatePerfilEmpresa = new PerfilEmpresa;
    updatePerfilEmpresa.ID_PERFIL = event.newData.ID_PERFIL;
    updatePerfilEmpresa.RUT_EMPRESA = event.data.RUT_EMPRESA;
    this.perfilEmpresaService.update(event.data.RUT_EMPRESA,updatePerfilEmpresa).subscribe(ok=>{
      this.toastrService.show('Se Actualizo correctamente!','Actualización',{ status: 'success' });
      this.getPerfilEmpresas();
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Desea eliminar este Perfil?')) {
      let deletePerfilEmp = new PerfilEmpresa;
      deletePerfilEmp.ID_PERFIL = event.data.ID_PERFIL;
      deletePerfilEmp.RUT_EMPRESA = event.data.RUT_EMPRESA;
      this.perfilEmpresaService.deletePerfilEmpresa(deletePerfilEmp).subscribe(ok=>{
        this.toastrService.show('Se Eliminado correctamente!','Eliminar',{ status: 'success' });
        this.getPerfilEmpresas();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al Eliminar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
    } else {
      return event.confirm.reject();
    }
  }

}
