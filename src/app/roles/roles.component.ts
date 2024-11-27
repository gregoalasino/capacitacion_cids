import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { RolService, Rol } from '../services/rol.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule, // Para la tabla de roles
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roleForm: FormGroup;
  roles: Rol[] = []; // Lista de roles

  constructor(
    private formService: FormService,
    private rolService: RolService, // Inyección del servicio de roles
    private snackBar: MatSnackBar // Para mostrar mensajes
  ) {
    this.roleForm = this.formService.createRoleForm();
  }

  ngOnInit(): void {
    this.cargarRoles(); // Cargar roles al inicializar
  }

  cargarRoles(): void {
    this.rolService.obtenerRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
        this.snackBar.open('Error al cargar roles', 'Cerrar', { duration: 3000 });
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const { nombre } = this.roleForm.value;

      this.rolService.crearRol(nombre).subscribe(
        (nuevoRol) => {
          this.roles.push(nuevoRol); // Agregar el nuevo rol a la lista
          this.snackBar.open('Rol creado exitosamente', 'Cerrar', { duration: 3000 });
          this.roleForm.reset(); // Resetear el formulario
        },
        (error) => {
          console.error('Error al crear rol:', error);
          this.snackBar.open('Error al crear el rol', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      console.log('Formulario de roles inválido');
    }
  }

  resetForm(): void {
    this.roleForm.reset();
  }
}
