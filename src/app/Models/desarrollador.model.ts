import { Rol } from './rol.model';

export type Desarrollador = {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol; // Relación con el modelo Rol
  fechaContratacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  // proyectosResponsable?: Proyecto[];
  // proyectos?: Proyecto[];
  // tareas?: Tarea[];
};
