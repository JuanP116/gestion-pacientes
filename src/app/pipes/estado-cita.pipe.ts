import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoCita'
})
export class EstadoCitaPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0: return 'Pendiente';
      case 1: return 'Confirmada';
      case 2: return 'Cancelada';
      case 3: return 'Completada';
      default: return 'Desconocido';
    }
  }
}