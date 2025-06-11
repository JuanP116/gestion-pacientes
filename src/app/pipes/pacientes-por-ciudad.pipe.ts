import { Pipe, PipeTransform } from '@angular/core';
import { Paciente } from '../interfaces/paciente';

@Pipe({
  name: 'pacientesPorCiudad'
})
export class PacientesPorCiudadPipe implements PipeTransform {
  transform(pacientes: Paciente[], ciudad: string): Paciente[] {
    return pacientes.filter(p => p.direccion.toLowerCase().includes(ciudad.toLowerCase()));
  }
}