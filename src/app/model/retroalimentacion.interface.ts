export interface Retroalimentacion {
	id_retroalimentacion : number,
	fk_id_usuarioest : number,
	fk_id_usuariotut : number,
	fk_id_asesoria : number,
	enviadopara : string,/*tutor o estudiante*/
	puntaje :number,
	comentarios : string,
	fecha_retroalimentacion : string
}