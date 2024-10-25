export interface Notificacion {
    id_notificacion : number,
    tipo_notificacion : string,
    mensaje :string ,
    fecha_envio : string,
    estado : string,/*leida , no leida */
    fk_id_usuario : number,
    fk_id_asesoria : number
}