const amqp = require('amqplib');
require('dotenv').config();

let connection = null;
let channel = null;

const RECONNECT_INTERVAL = 5000; // Milisegundos para reintentar conexión

async function iniciarClienteRabbitMQ() {
  const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
  const queueName = process.env.RABBITMQ_QUEUE || 'default_queue';

  const conectar = async () => {
    try {
      // Conectar a RabbitMQ
      connection = await amqp.connect(rabbitmqUrl);
      console.log('Conexión a RabbitMQ establecida.');

      // Crear canal
      channel = await connection.createChannel();
      console.log('Canal creado.');

      // Declarar cola
      await channel.assertQueue(queueName, { durable: true });
      console.log(`Cola "${queueName}" declarada correctamente como durable.`);

      // Manejo de eventos para reconectar en caso de cierre o error
      connection.on('close', () => {
        console.warn('Conexión a RabbitMQ cerrada. Reintentando...');
        reconnect();
      });
      connection.on('error', (err) => {
        console.error('Error en la conexión RabbitMQ:', err);
        reconnect();
      });
    } catch (error) {
      console.error('Error al conectar con RabbitMQ:', error);
      reconnect();
    }
  };

  const reconnect = () => {
    // Limpiar recursos si es necesario
    if (connection) connection.removeAllListeners();

    // Intentar reconexión tras un intervalo
    setTimeout(() => {
      console.log('Intentando reconectar a RabbitMQ...');
      conectar();
    }, RECONNECT_INTERVAL);
  };

  // Iniciar conexión inicial
  await conectar();
}

async function enviarMensaje(queue, mensaje) {

  if (!connection || !channel) {
    throw new Error('No hay conexión a RabbitMQ');
  }

  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(mensaje), { persistent: true });
    console.log(`Mensaje enviado a la cola ${queue}: ${mensaje}`);
  } catch (error) {
    console.error('Error al enviar el mensaje a RabbitMQ:', error);
    throw new Error('No se pudo enviar el mensaje');
  }
}

module.exports = {
  iniciarClienteRabbitMQ,
  enviarMensaje,
};
