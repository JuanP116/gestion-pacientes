import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etiquetasPaciente'
})
export class EtiquetasPacientePipe implements PipeTransform {
  transform(tags: string[]): string {
    return tags && tags.length ? tags.join(', ') : 'Sin etiquetas';
  }
}