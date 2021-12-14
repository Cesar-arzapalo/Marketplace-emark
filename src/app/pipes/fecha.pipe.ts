import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date, retorno: string): string {
    const fechaTratada = new Date(fecha);
    switch(retorno){
        case 'fecha_completa':{
          return `${this.formato('fecha especial',fechaTratada)}
                  ${this.formato('hora:minuto',fechaTratada)} - 
                  ${this.formato('fecha',fechaTratada)}`;
        }
        case 'fecha_compresa':{
          return `${this.formato('fecha especial',fechaTratada)}
                  ${this.formato('hora:minuto',fechaTratada)} 
                  ${this.formato('fecha reducida',fechaTratada)}`;
        }
        default:{
          return 'tipo de transformacion desconocida';
        }
    }
  }

  private initialZeros = (numero:number,cant: number): string => (numero  +'').padStart(cant,'0');


  private formato(id:string, fecha: Date): string{
    switch(id){
      case 'fecha': return this.fechaCompleta(fecha);
      case 'fecha especial': return this.fechaEspecial(this.diffDate(fecha,new Date(),'dias'),fecha);
      case 'fecha reducida': return this.fechaReducida(fecha);
      case 'mes': return this.obtenerMes(fecha.getMonth());
      case 'hora:minuto': return `${this.initialZeros(fecha.getHours(),2)}:${this.initialZeros(fecha.getMinutes(),2)}`;
      case 'hora y minutos': return `${fecha.getHours()}h  ${fecha.getMinutes()}m`;
      default: return `formato desconocido (${id})`;
    }
  }

  private diffDate = (fecha_analizar:Date,fecha_base:Date, analisis: string):number =>{
    const diff = this.diffTime(fecha_analizar,fecha_base);
    switch(analisis){
      case 'dias': return diff/86400000;
      case 'horas': return diff/3600000;
      case 'segundos': return diff/60000;
      default: return -1;
    }
  }

  private diffTime= (fecha_analizar:Date,fecha_base:Date) => (fecha_base.getTime() - fecha_analizar.getTime())

  

  private fechaEspecial(diff: number, fecha:Date): string{
    switch (diff){
      case 1: return 'Ayer ';
      case 0: return 'Hoy ';
      default: return '';
    }
  }

  private fechaCompleta = (fecha: Date) => `${this.initialZeros(fecha.getDay(),2)} de ${this.formato('mes',fecha)} del ${fecha.getFullYear()}`;

  private fechaReducida = (fecha: Date) => `${this.initialZeros(fecha.getDay(),2)}/${this.initialZeros(fecha.getMonth()+1,2)}/${fecha.getFullYear()}`;

  private obtenerMes(id:number): string{
    switch(id){
      case 0: return 'enero';
      case 1: return 'febrero';
      case 2: return 'marzo';
      case 3: return 'abril';
      case 4: return 'mayo';
      case 5: return 'junio';
      case 6: return 'julio';
      case 7: return 'agosto';
      case 8: return 'setiembre';
      case 9: return 'octubre';
      case 10: return 'noviembre';
      case 11: return 'diciembre';
      default: return 'no existe un mes con el nro' + id;
    }
  }

}
