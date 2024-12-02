import 'package:dart_amqp/dart_amqp.dart';

class RabbitMQService {
  late Client _client;
  late Channel _channel;
  late Queue _queue; 

  Function(String)? onMessageReceived;

  Future<void> init() async {
    // Conexión con RabbitMQ
    Client client = Client();
    ConnectionSettings settings = ConnectionSettings(
      host: "akane.benlop27.com", // Cambia por la URL de tu RabbitMQ
      port: 30001, // Puerto al que se conecta RabbitMQ
      authProvider: PlainAuthenticator("nodo", "sie1997"), // Autenticación
    );

    // Crear un canal y una cola
    _client = Client(settings: settings);
    _channel = await _client.channel();
    _queue = await _channel.queue("hello", durable: true);  // Nombre de la cola

    // Consumir mensajes de la cola
    Consumer consumer = await _queue.consume();
    
    // Escuchar los mensajes recibidos
    consumer.listen((AmqpMessage message) {
      String messageBody = message.payloadAsString;
      print(" [x] Received: $messageBody");
      
      // Llamar a la función para actualizar la UI
      if (onMessageReceived != null) {
        onMessageReceived!(messageBody);
      }
    });
  }


Future<void> enviarMensaje( mensaje) async {

 

  try {
    _queue.publish(mensaje);
  } catch (error) {
  }
}
    Future<void> close() async {

    await _channel.close();  // Cerrar el canal
    await _client.close();   // Cerrar el cliente
    print("Conexión a RabbitMQ cerrada.");
  }
}
