import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-desarrollador',
  standalone: true,
  templateUrl: './ver-desarrollador.component.html',
  //styleUrls: ['./ver-desarrollador.component.css'],
})
export class VerDesarrolladorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public desarrollador: any, // Datos inyectados
    private dialogRef: MatDialogRef<VerDesarrolladorComponent> // Referencia al modal
  ) {}

  cerrar() {
    this.dialogRef.close(); // Cierra el modal
  }
}
