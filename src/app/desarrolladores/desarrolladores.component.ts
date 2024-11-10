import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';


interface Desarrollador {
  nombre: string;
  correo: string;
  rol: string;
  fechaContratacion: Date;
}

@Component({
  selector: 'app-desarrolladores',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginator, CommonModule, RouterModule],
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.scss']
})
export class DesarrolladoresComponent implements AfterViewInit{
  private router = inject(Router);
  displayedColumns: string[] = ['nombre', 'correo', 'rol', 'fechaContratacion', 'acciones'];

  today(): Date {
    return new Date();
  }
  
  // Definimos la data como una fuente de datos para la tabla
  desarrolladores = new MatTableDataSource<Desarrollador>([
    { nombre: 'Francisco', correo: 'merlinifrancisco@gmail.com', rol: 'Desarrollador', fechaContratacion: new Date() },
    { nombre: 'Valentina', correo: 'valenperalta@mail.com', rol: 'Tester', fechaContratacion: new Date('2022-06-14') },
    { nombre: 'Franco', correo: 'francoramirez@mail.com', rol: 'Administrador de base de datos', fechaContratacion: new Date() },
    { nombre: 'Ana', correo: 'anitavelez@mail.com', rol: 'Analista funcional', fechaContratacion: new Date() },
    { nombre: 'Pedro', correo: 'pedrogonzalez@gmail.com', rol: 'Desarrollador', fechaContratacion: new Date() },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //esta referencia al Matpaginator se vincula al paginator una vez renderizada la tabla

  ngAfterViewInit() {
    this.desarrolladores.paginator = this.paginator;
  }


  verDesarrollador(desarrollador: Desarrollador) {
    console.log('Ver desarrollador:', desarrollador);
  }

  editarDesarrollador(desarrollador: Desarrollador) {
    console.log('Editar desarrollador:', desarrollador);
  }

  eliminarDesarrollador(desarrollador: Desarrollador) {
    console.log('Eliminar desarrollador:', desarrollador);
  }
}
