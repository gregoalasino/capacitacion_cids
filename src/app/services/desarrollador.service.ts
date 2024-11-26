import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Desarrollador, Rol } from '../Models'; // Asegúrate de que estos modelos existan
import { CrearDesarrolladorDto, ActualizarDesarrolladorDto } from '../dto'; // Asegúrate de que estos DTOs existan

@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class DesarrolladorService {
  // URLs base para desarrolladores y roles
  private readonly DESARROLLADORES_URL = 'http://localhost:3000/desarrolladores';
  private readonly ROLES_URL = 'http://localhost:3000/roles';

  // Inyección del cliente HTTP
  private readonly http = inject(HttpClient);

  // Obtener todos los desarrolladores
  obtenerDesarrolladores(): Observable<Desarrollador[]> {
    return this.http.get<Desarrollador[]>(this.DESARROLLADORES_URL);
  }

  // Obtener un desarrollador por ID
  obtenerDesarrollador(id: number): Observable<Desarrollador> {
    return this.http.get<Desarrollador>(`${this.DESARROLLADORES_URL}/${id}`);
  }

  // Crear un nuevo desarrollador
  crearDesarrollador(payload: CrearDesarrolladorDto): Observable<Desarrollador> {
    return this.http.post<Desarrollador>(this.DESARROLLADORES_URL, payload);
  }

  // Actualizar un desarrollador existente
  actualizarDesarrollador(id: number, payload: ActualizarDesarrolladorDto): Observable<Desarrollador> {
    return this.http.put<Desarrollador>(`${this.DESARROLLADORES_URL}/${id}`, payload);
  }

  // Eliminar un desarrollador
  eliminarDesarrollador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.DESARROLLADORES_URL}/${id}`);
  }

  // Obtener todos los roles
  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.ROLES_URL);
  }
}
