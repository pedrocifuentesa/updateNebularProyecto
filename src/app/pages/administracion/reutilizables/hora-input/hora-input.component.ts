import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-hora-input',
  templateUrl: './hora-input.component.html',
  styleUrls: ['./hora-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HoraInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
