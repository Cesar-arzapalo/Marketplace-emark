import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { ProductoService } from '../../services/produtos.service';
import { Producto } from '../../models/producto.model';
import { ProductoSolicitado } from '../../models/pedido.model';
import { CarroService} from '../../services/carro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  categoriasHijas: Categoria[];
  @Input() categoriaActual: Categoria;
  productos:Producto[];
  opciones: string[];
  public filtradoTerminado = false;

  constructor(
    private productosServices: ProductoService, 
    private carroService: CarroService) 
    { 
    this.categoriaActual= new Categoria("Catalogo",[]);
    this.categoriasHijas = [];
    this.opciones = ["Marca","Presentacion","Contenido","Procedencia","Rango de precios"]
    this.productos = []
    this.obtenerProductos()
  }

  ngOnInit(): void {
  }

  obtenerProductos(){
    this.productosServices.obtenerProductos().subscribe( (result: Producto[]) =>{
      console.log(result);
      var productos: Producto[]=result;
      this.productos=productos;
      console.log(this.productos)
    })
  }

  agregarProductoSoilicitado(product:ProductoSolicitado){
    CarroService.getCarro().productos=CarroService.getCarro().productos.filter( p => p.producto.nombre!= product.producto.nombre)
    CarroService.getCarro().productos.push(product)
    CarroService.actualizarMonto();
    console.log(CarroService.getCarro());
  }


}
