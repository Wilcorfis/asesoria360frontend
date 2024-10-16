export interface Usuario {
	id_usuario : number,
	primer_nombre : string,
	segundo_nmbre : string,
	primer_apellido : string,
	segundo_apellido : string,
	rol : string,/*estudiante o tutor*/
	codigotutor : string,
	correo : string,
	clave : string,
	sexo : string,
	telefono : string,
	fecha_nacimiento : string,
	descripcion : string 
}