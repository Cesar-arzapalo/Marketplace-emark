import { Component, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { ProductoSolicitado } from '../../models/pedido/pedido.model';
import { CarroService} from '../../services/carro/carro.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService, User } from '../../services/user.service';

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
    private carroService: CarroService,
    private auth: AuthService) 
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
      var productos: Producto[]=result;
      this.productos=productos;
    })
  }

  agregarProductoSoilicitado(product:ProductoSolicitado){
    CarroService.getInstanceCarro().productos=CarroService.getInstanceCarro().productos.filter( p => p.producto.nombre!= product.producto.nombre)
    CarroService.getInstanceCarro().productos.push(product)
    CarroService.actualizarMonto();
    console.log(CarroService.getInstanceCarro());
  }


}
