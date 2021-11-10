import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {COLUMN_DATA, ELEMENT_DATA} from '../../utils';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() val:string[]=[];
  @Input() datos:any[] =[];
  @Output() onEliminar = new EventEmitter<any>();
  @Output() onEditar = new EventEmitter<any>();
  @Output() onVer = new EventEmitter<any>();

  displayedColumns: string[] = [];
  dataSource:any[] = [];
  nuevo:any;
  acciones=['Ver','Editar','Eliminar'];
  constructor() { }

  ngOnInit(): void {
    if(this.val.length>0){
      this.displayedColumns=this.val.concat(this.acciones);
      this.dataSource=this.datos;
       console.log(2,this.dataSource)
    }else{
      this.displayedColumns=COLUMN_DATA.concat(this.acciones);
      this.dataSource=ELEMENT_DATA;
    }
  }
  ver(element:any){
    console.log('Viendo', element['Id']);
    this.onVer.emit(element['Id']);
  }
  editar(element:any){
    console.log('Editando', element['Id']);
    this.onEditar.emit(element['Id']);
  }
  eliminar(element:any){
    //Se está recibiendo todo el array de columna, asi que no se olvide los campos
    //Tener en cuenta que se retorna el elemento completo del datasource
    //Ejemplo = console.log(element['Contenido1'])
    console.log('Eliminando', element['Id']);
    this.onEliminar.emit( element['Id'] );
  }

}
