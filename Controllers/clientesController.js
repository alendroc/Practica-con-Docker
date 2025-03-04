const db = require('../db/db');

exports.getAll= (req, res) => {
    const query = 'SELECT * FROM cliente';
    db.query(query, (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({
              status: 404,
              error: 'Error en la consulta a la base de datos' });
        }
        if (!results || results.length === 0) {
          return res.status(404).json({
              status: 404,
              error: 'No hay clientes registrados' });
      }

      res.status(200).json(results);
    });
};

exports.buscarCliente = (req, res) => {
  const { cedula } = req.params;
  const query = 'SELECT * FROM cliente WHERE cedula_cliente = ?';

  db.query(query, [cedula], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error en la consulta');
    }
    if (results.length === 0) {
      return res.status(404).json({ 
              status: 404,
              error: 'Actividad no encontrada',
              message: `No existe ningun cliente con la cedula ${cedula}` });
     
  } res.json(results);
  });
};

exports.crearCliente = (req, res) => {
    const { cedula_cliente, nombre_cliente, edad_cliente} = req.body;

    // Validar que se envíen todos los campos requeridos
    if (!cedula_cliente || !nombre_cliente || !edad_cliente) {
      return res.status(400).json(
        {  status: 404,
          error: 'Error al crear el cliente',
          message: 'Todos los campos son requeridos: cedula_cliente, nombre_cliente, edad_cliente' });
    }

    const query = 'INSERT INTO cliente ( cedula_cliente, nombre_cliente, edad_cliente) VALUES (?, ?, ?)';

    db.query(query, [cedula_cliente, nombre_cliente, edad_cliente], (err, results) => {
      if (err) {
        console.error('Error al insertar el cliente:', err);
        return res.status(500).json({ message: 'Error al insertar el cliente', });
      }
      // Se retorna el ID generado junto con los datos insertados
      res.status(201).json({
        message: 'Cliente creada exitosamente',
        data: {cedula_cliente, nombre_cliente, edad_cliente}
      });
    });
  };

