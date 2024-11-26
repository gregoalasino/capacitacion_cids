import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DesarrolladorService } from '../services/desarrollador.service'; 
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-form-desarrollador',
  standalone: true,
  providers: [
    {
      provide: MatDialogRef,
      useValue: { close: () => {} }, 
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './form-desarrollador.component.html',
  styleUrls: ['./form-desarrollador.component.scss']
})
export class FormDesarrolladorComponent {
  registroForm: FormGroup;

  roles = [
    { id: 1, nombre: 'Desarrollador' },
    { id: 2, nombre: 'Tester' },
    { id: 3, nombre: 'Administrador de base de datos' },
    { id: 4, nombre: 'Analista funcional' }
  ];

  constructor(private fb: FormBuilder,
    private desarrolladorService: DesarrolladorService, 
    private dialogRef: MatDialogRef<FormDesarrolladorComponent> 
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      fechaContratacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const nuevoDesarrollador = this.registroForm.value;

      nuevoDesarrollador.fechaContratacion = new Date(nuevoDesarrollador.fechaContratacion).toISOString();
  
      // Enviar los datos al backend
      this.desarrolladorService.crearDesarrollador(nuevoDesarrollador).subscribe(
        (resultado) => {
          console.log('Desarrollador creado:', resultado);
          this.dialogRef.close(resultado); // Cierra el modal y devuelve el desarrollador al componente principal
        },
        (error) => {
          console.error('Error al crear el desarrollador:', error);
        }
      );
    }
  }
  

  resetForm() {
    this.registroForm.reset();
  }
}
