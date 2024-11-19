const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Archivo donde se generará la documentación
const endpointsFiles = ['./index.js']; // Rutas que deben ser documentadas (ajusta esta ruta según tu estructura)

const doc = {
  info: {
    title: 'API de Gestión de Subscripciones',
    description: 'API para gestionar subscripciones de agua y luz, incluyendo usuarios, roles y permisos.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
