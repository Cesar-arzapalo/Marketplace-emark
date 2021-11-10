import { Component, OnInit, Input } from '@angular/core';
import {COLUMN_DATA, ELEMENT_DATA, Producto} from '../../utils';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() val:string[]=[];
  @Input() datos:any;
  displayedColumns: string[] = [];
  data:any=[];
  dataSource = new MatTableDataSource<Producto>(this.data);
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
    this.dataSource = new MatTableDataSource<Producto>(this.data);
  }
  ver(element:any){
    console.log('Viendo', element['Id'])
  }
  editar(element:any){
    console.log('Editando', element['Id'])
  }
  eliminar(element:any){
    //Se está recibiendo todo el array de columna, asi que no se olvide los campos
    //Tener en cuenta que se retorna el elemento completo del datasource
    //Ejemplo = console.log(element['Contenido1'])
    this.data.splice(element['Id'],1)
    this.dataSource = new MatTableDataSource<Producto>(this.data);
    console.log('Eliminando', element['Id']);

  }

}
