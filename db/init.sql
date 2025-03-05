CREATE DATABASE IF NOT EXISTS eventos;

CREATE TABLE IF NOT EXISTS cliente (
    cedula_cliente VARCHAR(20) PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    edad_cliente INT CHECK (edad_cliente >= 0)
);

CREATE TABLE IF NOT EXISTS actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actividad VARCHAR(100) NOT NULL,
    cantidad_personas INT,
    fecha_actividad DATE NOT NULL,
    lugar_actividad VARCHAR(100),
    cedula_cliente VARCHAR(20) NOT NULL,
    FOREIGN KEY (cedula_cliente) REFERENCES cliente(cedula_cliente) ON DELETE CASCADE
);