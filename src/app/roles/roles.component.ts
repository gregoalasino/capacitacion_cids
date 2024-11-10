import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule]
})
export class RolesComponent {
  roleForm: FormGroup;

  constructor(private formService: FormService) {
    this.roleForm = this.formService.createRoleForm();
  }

  onSubmit() {
    if (this.roleForm.valid) {
      console.log('Datos del formulario de roles:', this.roleForm.value);
      // aca van los datos para el back
    } else {
      console.log('Formulario de roles inválido');
    }
  }

  resetForm() {
    this.roleForm.reset();
  }
}
