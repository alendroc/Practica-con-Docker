const db = require('../database/db');

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