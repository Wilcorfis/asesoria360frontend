export interface Asesoria {
	id_asesoria : number,
	fk_id_horario : number,
	fk_id_usuariotut : number,
	fk_id_asignatura : number,
	fecha_creacion : string,
	fecha_asesoria : string,
	ubicacion : string,
	estado : string,/*cancelada,creadaportutor,realizada*/
    visibilidad : string,/*publico o privado*/
    capacidad : number/*numero de estudiantes*/
}