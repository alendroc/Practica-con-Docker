const db = require('../db/db');

exports.getAll= (req, res) => {
    const query = 'SELECT * FROM cliente';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);
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
    res.json(results);
  });
};

exports.crearCliente = (req, res) => {
    const { cedula_cliente, nombre_cliente, edad_cliente} = req.body;

    // Validar que se envíen todos los campos requeridos
    if (!cedula_cliente || !nombre_cliente || !edad_cliente) {
      return res.status(400).json({ message: 'Todos los campos son requeridos: cedula_cliente, nombre_cliente, edad_cliente' });
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

