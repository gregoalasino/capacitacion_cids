import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-desarrollador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form-desarrollador.component.html',
  styleUrls: ['./form-desarrollador.component.scss']
})
export class FormDesarrolladorComponent {
  registroForm: FormGroup;

  roles: string[] = ['Desarrollador', 'Tester', 'Administrador de base de datos', 'Analista funcional']; // Lista de roles

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      fechaContratacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos del formulario:', this.registroForm.value);
      // Aquí puedes enviar los datos al backend o procesarlos como desees
    }
  }

  resetForm() {
    this.registroForm.reset();
  }
}
