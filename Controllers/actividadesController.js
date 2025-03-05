const db = require('../db/db');

exports.listarActividades = (req, res) => {
    const query = 'SELECT * FROM actividad';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({
                error: 'Error en la consulta a la base de datos' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'No hay actividades registradas' });
        }

        res.status(200).json(results);
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
        if (results.length === 0) {
        return res.status(404).json({ 
                status: 404,
                error: 'Actividad no encontrada',
                message: `No existe ninguna actividad con el id ${id}` });
       
    } res.json(results);
    });
    
    
};

exports.crearActividad = (req, res) => {
    const { nombre_actividad, cantidad_personas, fecha_actividad, lugar_actividad, cedula_cliente } = req.body;

    if (!nombre_actividad || !cantidad_personas || !fecha_actividad || !cedula_cliente) {
        return res.status(400).json({
             status: 404,
             error: 'Error al crear la actividad',
             message: 'los campos requeridos son: nombre_actividad, cantidad_personas, fecha_actividad y cedula_cliente' });
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