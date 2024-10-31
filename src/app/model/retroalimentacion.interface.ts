export interface Retroalimentacion {
	id_retroalimentacion : number,
	fk_id_usuario : number,
	fk_id_asesoria : number,
	puntaje :number,
	comentarios : string,
	fecha_retroalimentacion : string
}