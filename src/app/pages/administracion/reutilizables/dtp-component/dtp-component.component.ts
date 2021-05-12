import { Component, ViewChild, ElementRef, AfterViewInit, SimpleChanges} from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'ngx-dtp-component',
  templateUrl: './dtp-component.component.html',
  styleUrls: ['./dtp-component.component.scss']
})
export class DtpComponentComponent extends DefaultEditor implements AfterViewInit {
  @ViewChild('fechaCumple') fechaCumple: ElementRef;
  dtpfn = new Date();
  //@ViewChild('htmlValue') htmlValue: ElementRef;
  constructor() {
    super();
   }
  ngAfterViewInit(): void {
    if (this.cell.newValue !== '') {
      this.dtpfn = new Date(this.cell.newValue);
      this.fechaCumple.nativeElement.value = this.cell.newValue;
      //this.fechaCumple.nativeElement.value = new Date(this.cell.newValue).toLocaleString(['es-CL'], { year: 'numeric', month: 'numeric', day: 'numeric' });

      //console.log(this.cell.newValue);
      //console.log(this.fechaCumple.nativeElement.value);
     
      //this.fechaCumple.nativeElement.value = this.getUrlName();
      //this.url.nativeElement.value = this.getUrlHref();
    }
  }
  ngOnChanges(changes: SimpleChanges){
    
//console.log(this.fechaCumple.nativeElement.value);
  }
 
  updateValue(value) {
    console.log(value);
    console.log(this.fechaCumple.nativeElement.value);
    this.cell.newValue = this.fechaCumple.nativeElement.value.toLocaleString(['es-CL'], { year: 'numeric', month: 'numeric', day: 'numeric' });
    //console.log();
    /* const href = this.fechaCumple.nativeElement.value;
    const name = this.name.nativeElement.value;
    this.cell.newValue = `<a href='${href}'>${name}</a>`; */
  }

  ngOnInit(): void { 
   
    //console.log(this.fechaCumple);
    
  }

}
