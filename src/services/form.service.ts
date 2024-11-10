import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  // metodos para crear el formulario respectivo de cada component
  createDeveloperForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      fechaContratacion: ['', Validators.required]
    });
  }

  createRoleForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)]
    });
  }

  createProjectForm(): FormGroup{
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(30)],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaAct: ['', Validators.required],
    })
  }

  createTaskForm(): FormGroup{
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)],
      fechaLimite: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaAct: ['', Validators.required],
    })
  }

}
