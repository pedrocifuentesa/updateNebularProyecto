import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { Area } from '../../administracion/model/area';
import { ContratoArea } from '../../administracion/model/contratoArea';
import { AreaService } from '../../administracion/services/area/area.service';
import { ContratoAreaService } from '../../administracion/services/contratoArea/contrato-area.service';

@Component({
  selector: 'ngx-contrato-area',
  templateUrl: './contrato-area.component.html',
  styleUrls: ['./contrato-area.component.scss']
})
export class ContratoAreaComponent implements OnInit {
  //--------------//
  //---Variables--//
  //--------------//
  source: LocalDataSource = new LocalDataSource();
  listaContratoArea :ContratoArea[]=[];
  idContrato:number;
  rutIdContrato:string;
  areas:Area[]=[];
  listaAreas: Array<{ value: number, title: string }> = [];
  
  //--------------//
  //---Settings--//
  //--------------//
  settings = {
   
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
/*     edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    }, */
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions:{
      edit: false,
      
    },
    columns: {
      ID_AREA:{
        title: 'Area',
        type: 'html',
        editable: true,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.listaAreas,
          },
          
        },
       /*  valuePrepareFunction: (cell, row) => {
           let are = this.areas.filter(value=>value.ID_AREA === cell);
           return are[0]['NOMBRE_AREA'];
         }, */
      },
    },
  };

  /* 
  title: 'VALOR_ASISTENCIA',
        type: 'html',
        editable: true,
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.opciones,
          },
        },
        valuePrepareFunction: (cell, row) => {
           console.log(cell);
            console.log(row); 
            return row.NOMBRE_ASISTENCIA;
          },
  */
  constructor(
    private toastrService: NbToastrService,
    private contratoAreaService: ContratoAreaService,
    private areaService: AreaService,
    private activatedRoute: ActivatedRoute  
    ) { 

    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
    this.rutIdContrato = this.activatedRoute.snapshot.params['rutEmpContrato'];
    
  }

  ngOnInit(): void {
    this.getAreas();
    this.areaService.getAreas().subscribe(res=>{
      //console.log(res);
      res.forEach(resultado=>{
        this.areas = res;
        if(resultado.VIGENCIA_AREA ==='S'){     
           this.listaAreas.push({value:resultado.ID_AREA,title:resultado.NOMBRE_AREA});
        }
      });
      this.settings.columns.ID_AREA.editor.config.list = this.listaAreas;
      this.settings = Object.assign({},this.settings);
     
    },err=>{});
    
    
  }


  getAreas(){
    this.contratoAreaService.getContratoArea().subscribe(
      response=>{
        response = response.filter(value=>value.RUT_EMPRESA ===this.rutIdContrato);
        response = response.filter(value=>value.NUMERO_CONTRATO === this.idContrato.toString());
        this.listaContratoArea = response;
        this.source.load(this.listaContratoArea);
    }
    ,error=>{
      //console.log("Error ::" + error);
    });
  }
  onCreateConfirm(event):void { 
    //console.log(event);
     // return event.confirm.resolve();
      let contratoArea= new ContratoArea;
      contratoArea.ID_AREA = event.newData.ID_AREA;
      contratoArea.NUMERO_CONTRATO = this.idContrato.toString();
      contratoArea.RUT_EMPRESA = this.rutIdContrato

      this.contratoAreaService.save(contratoArea).subscribe(res=>{
          console.log(res);
          if(res.error === true){
            this.toastrService.show(res.message,'Alerta',{ status: 'warning' })
        return event.confirm.reject();
          }else{
            this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
        return event.confirm.resolve();
          }
        
      },err=>{
        console.log(err);
        this.toastrService.show('Error al Crear hora!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
   /*  let newHora = new Hora;
    newHora.DESCRIPCION_HORA = event.newData.DESCRIPCION_HORA.toUpperCase();
    newHora.VIGENCIA_HORA = 'S';
    if(newHora.DESCRIPCION_HORA.length===0){
      this.toastrService.show('Descripción no puede ser vacio!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }

    this.horaService.save(newHora).subscribe(res=>{
      this.toastrService.show('Se Creo correctamente!','Crear',{ status: 'success' });
      return event.confirm.resolve();
    },err=>{
      this.toastrService.show('Error al Crear hora!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }); */
  } 
   
  onSaveConfirm(event):void { 
    console.log(event);
      return event.confirm.resolve();
    /* let updateHora = new Hora;
    updateHora.ID_HORA = event.data.ID_HORA;
    updateHora.DESCRIPCION_HORA = event.newData.DESCRIPCION_HORA.toUpperCase();
    updateHora.VIGENCIA_HORA = event.data.VIGENCIA_HORA.toUpperCase();

    this.horaService.findbyid(updateHora.ID_HORA).subscribe(res=>{
      if(res===null){
      this.toastrService.show('Hora no existe!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
      }
      this.horaService.update(updateHora.ID_HORA,updateHora).subscribe(res=>{
        this.toastrService.show('Se Actualizo correctamente!','Actualizar',{ status: 'success' });
        this.getHoras();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });
    },err=>{
      this.toastrService.show('Error al tratar de actualizar!','Alerta',{ status: 'warning' })
      return event.confirm.reject();
    }); */
  }

  onDeleteConfirm(event): void {
    /* let deleteHora = new Hora;
    deleteHora.ID_HORA = event.data.ID_HORA;
    deleteHora.DESCRIPCION_HORA = event.data.DESCRIPCION_HORA;
    deleteHora.VIGENCIA_HORA = 'N'; */
    let contratoArea= new ContratoArea;
      contratoArea.ID_AREA = event.data.ID_AREA;
      contratoArea.NUMERO_CONTRATO = this.idContrato.toString();
      contratoArea.RUT_EMPRESA = this.rutIdContrato


    if (window.confirm('Desea eliminar este Perfil?')) {
      console.log(event);

      this.contratoAreaService.delete(contratoArea).subscribe(res=>{
        this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
        this.getAreas();
        return event.confirm.resolve();
      },err=>{
        this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      });

     /*  this.horaService.findbyid(deleteHora.ID_HORA).subscribe(res=>{
        if(res===null){
        this.toastrService.show('Hora no existe!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
        }
        this.horaService.update(deleteHora.ID_HORA,deleteHora).subscribe(res=>{
          this.toastrService.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
          this.getHoras();
          return event.confirm.resolve();
        },err=>{
          this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
          return event.confirm.reject();
        });
      },err=>{
        this.toastrService.show('Error al tratar de Eliminar!','Alerta',{ status: 'warning' })
        return event.confirm.reject();
      }); */
    } else {
      return event.confirm.reject();
    }
  }
}
