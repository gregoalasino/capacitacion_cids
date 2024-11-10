import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  standalone: true,
  styleUrls: ['./tareas.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule
    , MatDatepickerModule, MatNativeDateModule
  ]
})
export class TareasComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = []; // Array para almacenar las tareas

  constructor(private formService: FormService) {
    this.taskForm = this.formService.createTaskForm();
  }

  ngOnInit(): void {}

  // Método para crear una nueva tarea
  createTask(): void {
    if (this.taskForm.valid) {
      this.tasks.push(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  // Método para editar una tarea existente
  editTask(index: number): void {
    const task = this.tasks[index];
    this.taskForm.patchValue(task);
  }

  // Método para guardar los cambios de edición
  saveTask(index: number): void {
    if (this.taskForm.valid) {
      this.tasks[index] = this.taskForm.value;
      this.taskForm.reset();
    }
  }

  // Método para eliminar una tarea
  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
