export const  ELEMENT_DATA= [
  {Id:0, Titulo1: '' , Contenido1: ''},
  {Id:1, Titulo1: '' , Contenido1: ''},
  {Id:2, Titulo1: '' , Contenido1: ''},
  {Id:3, Titulo1: '' , Contenido1: ''},
  {Id:4, Titulo1: '' , Contenido1: ''},
];
export interface Producto {
  Id: number;
  Titulo1: string;
  Contenido1: string;
}
export interface ProductoQuery {
  nombre?: String;
  descripcion?: String;
  caracteristicas?: Array<Object>;
  unidad?: String;
  precioUnidad?: Number;
  stock?: Number;
  valoracion?: Number;
  visitas?: Number;
  idCategoria?: String;
  idProveedor?: String;
  imagenes?: Array<String>;
};
export const COLUMN_DATA=['Id','Titulo1', 'Contenido1'];
