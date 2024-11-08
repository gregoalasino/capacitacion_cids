import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'desarrolladores', component: DesarrolladoresComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'tareas', component: TareasComponent },
];

export default routes;
