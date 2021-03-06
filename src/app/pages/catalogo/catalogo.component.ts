import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { ProductoService } from '../../services/produtos.service';
import { Producto } from '../../models/producto.model';
import { ProductoSolicitado } from '../../models/pedido.model';
import { CarroCompartidoService, responseProducto } from '../../services/carro.service';
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
    private carroService: CarroCompartidoService) 
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
    this.productosServices.getProductos().subscribe( (result: responseProducto) =>{
      var productos: Producto[]=result.mensaje;
      this.productos=productos;
    })
  }

  agregarProductoSoilicitado(product:ProductoSolicitado){
    CarroCompartidoService.getCarro().productos=CarroCompartidoService.getCarro().productos.filter( p => p.producto.nombre!= product.producto.nombre)
    CarroCompartidoService.getCarro().productos.push(product)
    CarroCompartidoService.actualizarMonto();
    console.log(CarroCompartidoService.getCarro());
  }


}
