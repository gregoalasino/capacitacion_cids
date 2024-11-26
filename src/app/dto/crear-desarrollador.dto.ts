import { Desarrollador } from '../Models/desarrollador.model';

export type CrearDesarrolladorDto = Pick<Desarrollador, 'nombre' | 'correo' | 'rol' | 'fechaContratacion'>;
