// db.js
const mysql = require('mysql2');

// Configuración utilizando variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db', // 'db' es el nombre del servicio en docker-compose
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;