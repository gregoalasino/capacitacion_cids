import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ProyectosComponent {
  projectForm: FormGroup;

  constructor(private formService: FormService) {
    this.projectForm = this.formService.createProjectForm();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Datos del formulario de proyecto:', this.projectForm.value);
    } else {
      console.log('Formulario de proyecto inválido');
    }
  }

  resetForm() {
    this.projectForm.reset();
  }
}
