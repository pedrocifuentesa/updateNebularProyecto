import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  constructor(protected dateService: NbDateService<Date>) { }

  ngOnInit(): void {
  }

}
