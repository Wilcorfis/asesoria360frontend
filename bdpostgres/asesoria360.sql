create table usuario(
	id_usuario bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
	primer_nombre varchar(50) not null,
	segundo_nmbre varchar(50),
	primer_apellido varchar(50) not null,
	segundo_apellido varchar(50),
	rol varchar(50) not null,/*estudiante o tutor*/
        codigotutor varchar(50),/*codigo proporcionado por Poli para ser tutor*/
	correo varchar(50) not null,
	sexo varchar(30) not null,
	telefono int,
	fecha_nacimiento date,
	descripcion varchar(200) 
);


create table horario(
	id_horario bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
	hora_inicio time not null,
	hora_fin time not null
);
create table asignatura(
	id_asignatura bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
	nombre varchar(100) not null,
	organizacion varchar(200) not null	
);

create table asesoria(
	id_asesoria bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
	fk_id_horario bigint not null,
	fk_id_usuariotut bigint not null,
	fk_id_asignatura bigint not null,
	fecha_creacion date not null,
	fecha_asesoria date not null,
	ubicacion varchar(100) not null,
	estado varchar(30) not null,/*cancelada,creadaportutor,realizada*/
        visibilidad varchar(40) not null,/*publico o privado*/
        capacidad int not null,/*numero de estudiantes*/
		  CONSTRAINT fk_horario
      FOREIGN KEY(fk_id_horario) 
      REFERENCES horario(id_horario),
		  CONSTRAINT fk_usuario1
      FOREIGN KEY(fk_id_usuariotut) 
      REFERENCES usuario(id_usuario),
	  CONSTRAINT fk_asignatura
      FOREIGN KEY(fk_id_asignatura) 
      REFERENCES asignatura(id_asignatura)
);
create table suscripcionasesoria(
id_suscripcion bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
fk_id_asesoria bigint not null,
fk_id_estudiante bigint not null,
CONSTRAINT fk_asesoria6
      FOREIGN KEY(fk_id_asesoria) 
      REFERENCES asesoria(id_asesoria),
		  CONSTRAINT fk_usuario6
      FOREIGN KEY(fk_id_estudiante) 
      REFERENCES usuario(id_usuario)
);

create table retroalimentacion(
  id_retroalimentacion bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  fk_id_usuario bigint,
  fk_id_asesoria bigint not null,
  puntaje int not null,
  comentarios VARCHAR(255),
  fecha_retroalimentacion DATE not null,
  		  CONSTRAINT fk_asesoria2
      FOREIGN KEY(fk_id_asesoria) 
      REFERENCES asesoria(id_asesoria),
		  CONSTRAINT fk_usuario2
      FOREIGN KEY(fk_id_usuario) 
      REFERENCES usuario(id_usuario),
		  CONSTRAINT fk_usuario3
     		
);

CREATE TABLE notificacion (
    id_notificacion bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    tipo_notificacion VARCHAR(50) NOT NULL,
    mensaje varchar(200) NOT NULL,
    fecha_envio DATE NOT NULL,
    estado VARCHAR(50) not null,/*leida , no leida */
    fk_id_usuario bigint not null,
		  CONSTRAINT fk_usuario4
      FOREIGN KEY(fk_id_usuario) 
      REFERENCES usuario(id_usuario),	
		  CONSTRAINT fk_asesoria3
       
);
alter table suscripcionasesoria
add constraint unique_usuario_asesoria unique(fk_id_estudiante,fk_id_asesoria);
alter table asesoria
add constraint unique_horario_asesoria unique(fk_id_usuariotut, fecha_asesoria, fk_id_horario);
ALTER TABLE retroalimentacion
ADD CONSTRAINT unique_usuario_asesoria2 UNIQUE (fk_id_usuario, fk_id_asesoria);

CREATE OR REPLACE FUNCTION check_time_overlap() 
RETURNS TRIGGER AS $$
BEGIN
    IF 
    
EXISTS (
        SELECT 1
        
      
FROM asesoria
        WHERE fk_id_usuariotut = NEW.fk_id_usuariotut
          
        
AND fecha_asesoria = NEW.fecha_asesoria
          AND (
              (SELECT hora_inicio FROM horario WHERE id_horario = NEW.fk_id_horario) < (SELECT hora_fin FROM horario WHERE id_horario = OLD.fk_id_horario) 
              AND 
              (SELECT hora_fin FROM horario WHERE id_horario = NEW.fk_id_horario) > (SELECT hora_inicio FROM horario WHERE id_horario = OLD.fk_id_horario)
          )
    ) THEN
        RAISE EXCEPTION 'Overlapping advisory sessions for the same tutor on the same date';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_time_overlap
BEFORE INSERT OR UPDATE ON asesoria
FOR EACH ROW EXECUTE FUNCTION check_time_overlap();


CREATE OR REPLACE FUNCTION check_subscription_before_feedback()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica si el usuario está suscrito a la asesoría
    IF NOT EXISTS (
        SELECT 1
        FROM suscripcionasesoria
        WHERE fk_id_asesoria = NEW.fk_id_asesoria
          AND fk_id_estudiante = NEW.fk_id_usuario
    ) THEN
        RAISE EXCEPTION 'El usuario no está suscrito a la asesoría.';
    END IF;
    
    -- Verifica si ya ha dado retroalimentación para esta asesoría
    IF EXISTS (
        SELECT 1
        FROM retroalimentacion
        WHERE fk_id_usuario = NEW.fk_id_usuario
          AND fk_id_asesoria = NEW.fk_id_asesoria
    ) THEN
        RAISE EXCEPTION 'El usuario ya ha dado retroalimentación para esta asesoría.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_insert_retroalimentacion
BEFORE INSERT ON retroalimentacion
FOR EACH ROW
EXECUTE FUNCTION check_subscription_before_feedback();




api
https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios




