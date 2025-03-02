const db = require('../database/db');

exports.listarActividades = (req, res) => {
    const query = 'SELECT * FROM actividad';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);
    });
};

exports.buscarActividad = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM actividad WHERE id_actividad = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);
    });
};

exports.crearActividad = (req, res) => {
    const { nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad, cedula_cliente } = req.body;

    if (!nombre_actividad || !cantidad_personas || !fecha_actividad || !lugar_actividad || !cedula_cliente) {
        return res.status(400).json({ message: 'Todos los campos son requeridos: nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad y cedula_cliente' });
    }

    const query = 'INSERT INTO actividad (nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad, cedula_cliente) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad, cedula_cliente], (err, results) => {
        if (err) {
            console.error('Error al insertar la actividad:', err);
            return res.status(500).json({ message: 'Error al insertar la actividad' });
        }

        res.status(201).json({
            message: 'Actividad creada exitosamente',
            data: { id: results.insertId, nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad, cedula_cliente }
        });
    });
};