const mongoose = require('mongoose');

// URL de la base de datos de MongoDB
const dbURL = 'mongodb://localhost:27017/cloud_keep';

// Opciones de configuración para la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

// Conectar a la base de datos
mongoose.connect(dbURL, options)
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Cuando te conectas a la base de datos, puedes definir tus esquemas y modelos aquí
// También puedes importar tus esquemas y modelos desde otros archivos y utilizarlos aquí
