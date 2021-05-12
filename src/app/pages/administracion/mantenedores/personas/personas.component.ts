
//import { FormatWidth, getLocaleDateFormat } from '@angular/common';

import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnChanges, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { parse } from 'path';
import { Persona } from '../../model/persona';
import { DtpComponentComponent } from '../../reutilizables/dtp-component/dtp-component.component';
import { PersonaService } from '../../services/personas/persona.service';


@Component({
  selector: 'ngx-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  listaPersonas=[];
  settings = {
    //actions:{delete:false},
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
      RUT_EMPLEADO: {
        title: 'Rut',
        type: 'string',
        editable: false
      },
      NOMBRES_PERSONA: {
        title: 'Nombres',
        type: 'string'
      },
      APELLIDO_PATERNO_PERSONA: {
        title: 'Apellido Paterno',
        type: 'string'
      },
      APELLIDO_MATERNO_PERSONA: {
        title: 'Apellido Materno',
        type: 'string'
      },
     
      FECHA_NAC_PERSONA: {
        title: 'FECHA NAC',
        type: 'html',
        editor: {
          type: 'custom',
          component: DtpComponentComponent,
        },
        /* type: 'string', */
      },
      SEXO_PERSONA: {
        title: 'Sexo',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'M', title: 'Masculino' },
              { value: 'F', title: 'Femenino' },
            ],
          },
        },
       
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private personasServices:PersonaService,private makeToast: NbToastrService) { }

  ngOnInit(): void {
    this.getListaPersonas();
  }

 save(persona:Persona){
    //this.getBsqJornada(persona);
    //let nombreJornada= jornada.NOMBRE_JORNADA.toUpperCase();
    /* if(this.jornadaBusqueda.length>0){
      this.makeToast('warning','Ingreso','Persona Existe');
      return false;
    }else{ */
      console.log(persona);
      this.personasServices.save(persona).subscribe(
            response=>{
              //console.log('Ingreso Correctamente:'+response);
              //this.makeToast('primary','Ingreso','Se ingreso correctamente!');
              this.makeToast.show('Se Ingreso correctamente!','Ingresar',{ status: 'success' });
              this.getListaPersonas();
            },
            error=>{
              //console.log('Error:'+error);
              this.makeToast.show('No se pudo Ingresar!','Ingresar',{ status: 'warning' });
            }
          );
   /*  } */
  }
  getListaPersonas() {
    //console.log(this.personasServices.getPersonas().subscribe())
    let dateString = '1968-11-16T00:00:00' 
    let newDate = new Date();
    let format = 'dd-MM-yyyy';
    let locale = 'es-Cl';
  
    this.personasServices.getPersonas().subscribe(
      
      personas => {
         personas.forEach(elemento => {
          
          
           if (elemento.ESTADO_PERSONA.toLowerCase() === 's') {
             elemento.ESTADO_PERSONA = 'Activo';
           }else{
             elemento.ESTADO_PERSONA = 'Inactivo';
           }
           if (elemento.SEXO_PERSONA.toLowerCase() === 'm') {
            elemento.SEXO_PERSONA = 'Masculino';
          }else{
            elemento.SEXO_PERSONA = 'Femenino';
          }
          newDate = new Date(elemento.FECHA_NAC_PERSONA);
          
          elemento.FECHA_NAC_PERSONA = formatDate(newDate, format, locale);
         // elemento.FECHA_NAC_PERSONA = //formatDate(newDate, format, locale);
          
         });
         this.listaPersonas = personas.filter(persona=>persona.ESTADO_PERSONA.toLowerCase() ==='activo');
        this.source.load(this.listaPersonas);
      }
    
    )

  }

  onDeleteConfirm(event): void {
    let deletePersona = new Persona;
    deletePersona.RUT_EMPLEADO=event.data.RUT_EMPLEADO;
    deletePersona.ESTADO_PERSONA='N';
  

    if (window.confirm('Desea eliminar este Perfil?')) {
      //console.log(deletePersona);

      this.personasServices.delete(deletePersona).subscribe(response=>{
        //console.log('delete Correctamente:'+response);
        //this.makeToast('primary','Ingreso','Se ingreso correctamente!');
        this.makeToast.show('Se Elimino correctamente!','Eliminar',{ status: 'success' });
        this.getListaPersonas();
        event.confirm.resolve();
      },
      error=>{
        //console.log('Error:'+error);
        this.makeToast.show('No se pudo Eliminar!','Eliminar',{ status: 'warning' });
        event.confirm.reject();
      });

      
    } else {
      event.confirm.reject();
    }
    
  }
 
   onCreateConfirm(event):void { 
    let persona = new Persona();
    let fechaNac = event.newData.FECHA_NAC_PERSONA.split('-');

    //console.log(event);
  
    persona.RUT_EMPLEADO= event.newData.RUT_EMPLEADO;
    persona.APELLIDO_PATERNO_PERSONA=event.newData.APELLIDO_PATERNO_PERSONA.toUpperCase()
    persona.APELLIDO_MATERNO_PERSONA=event.newData.APELLIDO_MATERNO_PERSONA.toUpperCase()
    persona.NOMBRES_PERSONA=event.newData.NOMBRES_PERSONA.toUpperCase()
    persona.ESTADO_PERSONA= 'S';
    persona.FECHA_NAC_PERSONA= fechaNac[2]+'-'+fechaNac[1]+'-'+fechaNac[0];
    persona.SEXO_PERSONA= event.newData.SEXO_PERSONA;

   this.save(persona);
   event.confirm.resolve();
  
  } 
 
  onSaveConfirm(event):void { 
    //console.log(event);
    let persona = new Persona;
    let fechaNac = event.newData.FECHA_NAC_PERSONA.split('-');
    persona.RUT_EMPLEADO = event.data.RUT_EMPLEADO;
    persona.APELLIDO_PATERNO_PERSONA=event.newData.APELLIDO_PATERNO_PERSONA.toUpperCase()
    persona.APELLIDO_MATERNO_PERSONA=event.newData.APELLIDO_MATERNO_PERSONA.toUpperCase()
    persona.NOMBRES_PERSONA=event.newData.NOMBRES_PERSONA.toUpperCase()
    persona.ESTADO_PERSONA= 'S';
    persona.FECHA_NAC_PERSONA= fechaNac[2]+'-'+fechaNac[1]+'-'+fechaNac[0];
    persona.SEXO_PERSONA = event.newData.SEXO_PERSONA;
    if(persona.SEXO_PERSONA==="Femenino"){
      persona.SEXO_PERSONA = 'F'
    }
    if(persona.SEXO_PERSONA==="Masculino"){
      persona.SEXO_PERSONA = 'M'
    }
    //{ status: 'warning' }
    //{ status: 'success' }
    this.makeToast.show('Se actualizo correctamente!','Actualización',{ status: 'success' });
    //console.log('hola');
    this.personasServices.update(persona).subscribe(
      response=>{
        //console.log('Ingreso Correctamente:'+response);
        //this.makeToast('primary','Ingreso','Se ingreso correctamente!');
        this.getListaPersonas();
        event.confirm.resolve();
      },
      error=>{
        //console.log('Error:'+error);
        this.makeToast.show('No se pudo Actualizar!','Actualización',{ status: 'warning' });
        event.confirm.reject();

      }

    );

  }
}
