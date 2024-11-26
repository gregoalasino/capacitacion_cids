import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; 
import { Router, RouterModule } from '@angular/router';
import { DesarrolladorService } from '../services/desarrollador.service'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Rol } from '../Models';
import { VerDesarrolladorComponent } from './ver-desarrollador/ver-desarrollador.component';
import { EditarDesarrolladorComponent } from './editar-desarrollador/editar-desarrollador.component';
import { FormDesarrolladorComponent } from '../form-desarrollador/form-desarrollador.component';


interface Desarrollador {
  id: number; 
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
  private desarrolladorService = inject(DesarrolladorService); 
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'fechaContratacion', 'acciones'];
  desarrolladores = new MatTableDataSource<Desarrollador>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarDesarrolladores(); 
  }

  ngAfterViewInit(): void {
    this.desarrolladores.paginator = this.paginator;
  }

  cargarDesarrolladores(): void {
    this.desarrolladorService.obtenerDesarrolladores().subscribe(
      (data: Desarrollador[]) => {
        console.log('Datos recibidos:', data); 
        this.desarrolladores.data = data; 
      },
      (error) => {
        console.error('Error al cargar desarrolladores:', error);
        this.mostrarMensaje('Error al cargar los desarrolladores');
      }
    );
  }
  

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

  constructor(private dialog: MatDialog) {}
  
  verDesarrollador(desarrollador: any) {
    this.dialog.open(VerDesarrolladorComponent, {
      data: desarrollador, 
    });
  }

  registrarDesarrollador() {
    const dialogRef = this.dialog.open(FormDesarrolladorComponent);
  
    dialogRef.afterClosed().subscribe((nuevoDesarrollador: Desarrollador) => {
      if (nuevoDesarrollador) {
        // agregar y actualizar la tabla
        this.desarrolladores.data = [...this.desarrolladores.data, nuevoDesarrollador];
      }
    });
  }

  editarDesarrollador(desarrollador: any) {
    const dialogRef = this.dialog.open(EditarDesarrolladorComponent, {
      data: { ...desarrollador }, // Pasa una copia del desarrollador al modal
    });
  
    dialogRef.afterClosed().subscribe((resultado: any) => {
      if (resultado) {
        const index = this.desarrolladores.data.findIndex((d: Desarrollador) => d.id === resultado.id);

        if (index !== -1) {
        this.desarrolladores.data[index] = resultado;

        this.desarrolladores.data = [...this.desarrolladores.data];
      } else {
        console.warn('No se encontró el desarrollador actualizado en la lista.');
      }
    }
  });
  }
  

  
  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
