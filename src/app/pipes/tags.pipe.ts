import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags',
  standalone: false
})
export class TagsPipe implements PipeTransform {
  // Método principal transform que detecta si es array o elemento individual
  transform(value: any): any {
    // Si es un array, transformar cada elemento
    if (Array.isArray(value)) {
      return value.map(item => this.processTags(item));
    }

    // Si es un solo elemento, transformar ese elemento
    return this.processTags(value);
  }

  // Método privado para procesar los tags de un elemento individual
  private processTags(meal: any): any {
    if (!meal) return meal;

    // Crear una copia para no modificar el original
    const mealWithTags = { ...meal };

    // Procesar los tags
    if (mealWithTags.strTags) {
      mealWithTags.strTags = mealWithTags.strTags.replaceAll(",", ", ");
    } else {
      mealWithTags.strTags = "None";
    }

    return mealWithTags;
  }
}
