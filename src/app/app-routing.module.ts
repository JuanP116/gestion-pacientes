import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPacientesComponent } from './components/inicio-pacientes/inicio-pacientes.component';
import { PacientesListComponent } from './components/pacientes-list/pacientes-list.component';
import { PacienteDetalleComponent } from './components/paciente-detalle/paciente-detalle.component';
import { BuscarPacienteComponent } from './components/buscar-paciente/buscar-paciente.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: InicioPacientesComponent },
  { path: 'pacientes', component: PacientesListComponent },
  { path: 'paciente/:id', component: PacienteDetalleComponent },
  { path: 'buscar', component: BuscarPacienteComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}