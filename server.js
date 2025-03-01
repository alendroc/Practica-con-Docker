const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3005;


app.use(express.json());

// Importar y usar las rutas definidas en itemsRoutes.js
const actividadesRoutes = require('./Routes/actividadesRoutes');
const clientesRoutes = require('./Routes/clientesRoutes');

app.use('/api', actividadesRoutes);
app.use('/api', clientesRoutes);

// Middleware para manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error inesperado:', err);
  res.status(500).json({ message: 'Ocurrió un error en el servidor (Middleware)' });
});

app.listen(port, () => {
  console.log(`API corriendo en el puerto ${port}`);
});