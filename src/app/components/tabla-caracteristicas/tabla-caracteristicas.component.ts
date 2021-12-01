import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-caracteristicas',
  templateUrl: './tabla-caracteristicas.component.html',
  styleUrls: ['./tabla-caracteristicas.component.scss']
})
export class TablaCaracteristicasComponent implements OnInit {

  @Input() caracteristicas!: any;
  campos: string[] = [];
  constructor() {
    
   }

  ngOnInit(): void {
    this.campos = Object.keys(this.caracteristicas);

  }

}