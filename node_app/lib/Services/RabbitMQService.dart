import 'package:dart_amqp/dart_amqp.dart';
import 'ArduinoService.dart';

class RabbitMQService {
  late Client _client;
  late Channel _channel;
  late Queue _queue; 

  Function(String)? onMessageReceived;

  Future<void> init() async {
    // Conexión con RabbitMQ
    Client client = Client();
    ConnectionSettings settings = ConnectionSettings(
   
    );

    // Crear un canal y una cola
    _client = Client(settings: settings);
    _channel = await _client.channel();
    _queue = await _channel.queue("hello");  // Nombre de la cola

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

    Future<void> close() async {

    await _channel.close();  // Cerrar el canal
    await _client.close();   // Cerrar el cliente
    print("Conexión a RabbitMQ cerrada.");
  }
}
