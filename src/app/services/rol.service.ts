import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Rol {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root', 
})
export class RolService {
  private readonly ROLES_URL = 'http://localhost:3000/roles'; 

  constructor(private http: HttpClient) {}

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.ROLES_URL);
  }

  //crearRol(nombre: string): Observable<Rol> {
  //  return this.http.post<Rol>(this.ROLES_URL, { nombre });
  //}

  //crearRol(nombre: string): Observable<any> {
  //  return this.http.post(this.ROLES_URL, { nombre });
  //}
  crearRol(nombre: string): Observable<any> {
    return this.http.post(`${this.ROLES_URL}`, { nombre });
  }
}
