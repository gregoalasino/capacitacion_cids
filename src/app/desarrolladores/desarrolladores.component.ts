import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { DesarrolladorService } from '../services/desarrollador.service'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Rol } from '../Models';

interface Desarrollador {
  id: number; // Asegúrate de que los objetos tengan un ID
  nombre: string;
  correo: string;
  rol: Rol;
  fechaContratacion: Date;
}

@Component({
  selector: 'app-desarrolladores',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.scss'],
})
export class DesarrolladoresComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private desarrolladorService = inject(DesarrolladorService); // Inyectar el servicio
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'fechaContratacion', 'acciones'];
  desarrolladores = new MatTableDataSource<Desarrollador>(); // Cambiamos los datos estáticos por un MatTableDataSource vacío

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarDesarrolladores(); // Llamar al backend para cargar datos
  }

  ngAfterViewInit(): void {
    this.desarrolladores.paginator = this.paginator;
  }

  // Cargar desarrolladores desde el backend
  cargarDesarrolladores(): void {
    this.desarrolladorService.obtenerDesarrolladores().subscribe(
      (data: Desarrollador[]) => {
        console.log('Datos recibidos:', data); // Opcional: verificar en consola los datos
        this.desarrolladores.data = data; // Asigna los datos obtenidos a la tabla
      },
      (error) => {
        console.error('Error al cargar desarrolladores:', error);
        this.mostrarMensaje('Error al cargar los desarrolladores');
      }
    );
  }
  

  // Eliminar un desarrollador
  eliminarDesarrollador(desarrollador: Desarrollador): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${desarrollador.nombre}?`)) {
      this.desarrolladorService.eliminarDesarrollador(desarrollador.id).subscribe(
        () => {
          this.mostrarMensaje('Desarrollador eliminado correctamente');
          this.cargarDesarrolladores(); // Recargar los datos
        },
        (error) => {
          console.error('Error al eliminar desarrollador:', error);
          this.mostrarMensaje('Error al eliminar el desarrollador');
        }
      );
    }
  }

  // Métodos para futuras funcionalidades
  verDesarrollador(desarrollador: Desarrollador): void {
    console.log('Ver desarrollador:', desarrollador);
  }

  editarDesarrollador(desarrollador: Desarrollador): void {
    console.log('Editar desarrollador:', desarrollador);
  }

  // Mostrar mensajes con SnackBar
  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
