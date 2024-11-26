import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa Material Form Field
import { MatInputModule } from '@angular/material/input'; // Importa Material Input
import { MatButtonModule } from '@angular/material/button'; // Botones de Material
import { Desarrollador } from '../../Models'; // Importa el modelo de Desarrollador
import { DesarrolladorService } from '../../services/desarrollador.service'; // Importa el servicio de Desarrollador

@Component({
  selector: 'app-editar-desarrollador',
  standalone: true, // Declarar como standalone
  templateUrl: './editar-desarrollador.component.html',
  //styleUrls: ['./editar-desarrollador.component.css'],
  imports: [
    FormsModule, // Import necesario para [(ngModel)]
    MatFormFieldModule, // Campo de formulario
    MatInputModule, // Input de Material
    MatButtonModule, // Botones
  ],
})
export class EditarDesarrolladorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public desarrollador: any, // Datos inyectados desde el dialog
    private dialogRef: MatDialogRef<EditarDesarrolladorComponent>, // Referencia del dialog
    private desarrolladorService: DesarrolladorService
  ) {}

  guardarCambios() {
    this.desarrolladorService
      .actualizarDesarrollador(this.desarrollador.id, this.desarrollador)
      .subscribe(
        (resultado: Desarrollador) => {
          console.log('Desarrollador actualizado:', resultado);
          this.dialogRef.close(resultado);
        },
        (error) => {
          console.error('Error al actualizar desarrollador:', error);
        }
      );
  }
}
