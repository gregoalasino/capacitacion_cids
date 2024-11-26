import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';
import { FormDesarrolladorComponent } from './form-desarrollador/form-desarrollador.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'desarrolladores', component: DesarrolladoresComponent },
  { path: 'desarrolladores/registrar', component: FormDesarrolladorComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'tareas', component: TareasComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // este va siempre al ultimo ya que angular lee las rutas de manera secuencial
  
];

export default routes;
