import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Producto } from './interfaces/producto.interfaces';


@Component({
  selector: 'app-products',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  //listProductos:Producto[]=[]

  constructor(private _productoService: ProdutosService) { 
    this.getproductos()
  }

  

  getproductos() {
    return this._productoService.getProductos().subscribe(r => console.log(r));
  }


}
