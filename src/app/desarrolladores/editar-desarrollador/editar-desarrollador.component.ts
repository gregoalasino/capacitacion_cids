import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-desarrollador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './editar-desarrollador.component.html',
  //styleUrls: ['./editar-desarrollador.component.scss']
})
export class EditarDesarrolladorComponent implements OnInit {
  developerForm!: FormGroup;
  roles = [
    { id: 1, nombre: 'Desarrollador' },
    { id: 2, nombre: 'Tester' },
    { id: 3, nombre: 'Administrador de base de datos' },
    { id: 4, nombre: 'Analista funcional' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarDesarrolladorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.developerForm = this.fb.group({
      id: [this.data.id],
      nombre: [this.data.nombre, Validators.required],
      correo: [this.data.correo, [Validators.required, Validators.email]],
      rol: [this.data.rol.id, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.developerForm.valid) {
      const resultado = {
        ...this.developerForm.value,
        rol: this.roles.find((rol) => rol.id === this.developerForm.value.rol)
      };
      this.dialogRef.close(resultado); // Cerrar el diálogo y enviar los datos
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Cerrar el diálogo sin enviar datos
  }
}
