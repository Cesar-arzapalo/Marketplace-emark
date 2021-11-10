import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {COLUMN_DATA, ELEMENT_DATA, ProductoQuery} from '../../utils';
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
  data:any=[];
  dataSource = new MatTableDataSource<ProductoQuery>(this.data);
  acciones=['Ver','Editar','Eliminar'];
  constructor() { }

  ngOnInit(): void {
    if(this.val.length>0){
      this.displayedColumns=this.val.concat(this.acciones);
      this.data=this.datos;
    }else{
      this.displayedColumns=COLUMN_DATA.concat(this.acciones);
      this.data=ELEMENT_DATA;
    }
    this.dataSource = new MatTableDataSource<ProductoQuery>(this.data);
  }
  ver(element:any){
  }
  editar(element:any){
  }
  eliminar(element:any){
    //Se está recibiendo todo el array de columna, asi que no se olvide los campos
    //Tener en cuenta que se retorna el elemento completo del datasource
    //Ejemplo = console.log(element['Contenido1'])
    this.data.splice(element['nombre'],1)
    this.dataSource = new MatTableDataSource<ProductoQuery>(this.data);
    console.log('Eliminando', element['nombre']);
  }

}
