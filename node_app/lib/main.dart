import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // Importar para manipular la pantalla completa
import 'Services/ArduinoService.dart'; // Importa el servicio Arduino
import 'Services/RabbitMQService.dart'; // Importa el servicio RabbitMQ
import 'package:usb_serial/usb_serial.dart'; // Asegúrate de importar usb_serial

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Control de Relés',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.black, // Fondo oscuro
        textTheme: TextTheme(
          bodyLarge: TextStyle(color: Colors.white), // Usa bodyLarge
        ), // Texto blanco
      ),
      home: BluetoothAndRabbitMQPage(),
    );
  }
}

class BluetoothAndRabbitMQPage extends StatefulWidget {
  @override
  _BluetoothAndRabbitMQPageState createState() =>
      _BluetoothAndRabbitMQPageState();
}

class _BluetoothAndRabbitMQPageState extends State<BluetoothAndRabbitMQPage> {
  late RabbitMQService _rabbitMQService;
  late ArduinoService _arduinoService;

  // Estados de los relés (luz y agua)
  List<bool> _relayStates = [false, false, false, false];

  // Estados de conexión
  bool _bluetoothConnected = false;
  bool _rabbitMQConnected = false;

  @override
  void initState() {
    super.initState();
    _rabbitMQService = RabbitMQService();
    _arduinoService = ArduinoService();

    // Conectar a RabbitMQ y Bluetooth
    _connectRabbitMQ();
    _connectBluetooth();

    // Configurar la aplicación en pantalla completa
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky); // Esto pone la app en pantalla completa
  }

  // Conectar al servicio RabbitMQ
  Future<void> _connectRabbitMQ() async {
    try {
      await _rabbitMQService.init();
      setState(() {
        _rabbitMQConnected = true;
      });
    } catch (e) {
      print("Error al conectar con RabbitMQ: $e");
      setState(() {
        _rabbitMQConnected = false;
      });
    }
  }

  // Conectar al HC-05 Bluetooth
  Future<void> _connectBluetooth() async {
    try {
      await _arduinoService.connectToArduino();
      setState(() {
        _bluetoothConnected = true;
      });

      // Configurar el servicio de RabbitMQ para enviar mensajes al Bluetooth
      _rabbitMQService.onMessageReceived = (String message) {
        _procesarComando(message);
      };
    } catch (e) {
      print("Error al conectar con Bluetooth: $e");
      setState(() {
        _bluetoothConnected = false;
      });
    }
  }

  @override
  void dispose() {
    // Cerrar la conexión a RabbitMQ cuando se cierre la app
    _rabbitMQService.close();
    super.dispose();
  }

  // Procesar comandos recibidos desde RabbitMQ
  void _procesarComando(String command) {
    print("Comando recibido: $command");

    // Asegúrate de que el comando esté en el formato correcto
    if ((command.startsWith("ON") || command.startsWith("OFF")) && command.length > 2) {
      try {
        // Extraemos la parte numérica de la cadena después de "ON" o "OFF"
        String relayString = command.startsWith("ON") ? command.substring(2).trim() : command.substring(3).trim();
        int relay = int.parse(relayString);

        if (relay >= 0 && relay < 4) {
          setState(() {
            if (command.startsWith("ON")) {
              _relayStates[relay] = true;
            } else if (command.startsWith("OFF")) {
              _relayStates[relay] = false;
            }
          });

          // Enviar el comando al Bluetooth
          _arduinoService.sendCommand(command);
        } else {
          print("Índice de relé fuera de rango: $relay");
        }
      } catch (e) {
        print("Error al procesar el comando: $e");
      }
    } else {
      print("Comando mal formateado: $command");
    }
  }

  // Función para manejar el cambio de estado del relé
  void _toggleRelay(int index) {
    setState(() {
      _relayStates[index] = !_relayStates[index];
    });
    String command = _relayStates[index] ? "ON$index" : "OFF$index";
    _arduinoService.sendCommand(command); // Enviar el comando al Arduino
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Serviduino: Nodo 1'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.bluetooth),
            onPressed: _connectBluetooth, // Conectar a Bluetooth
          ),
          IconButton(
            icon: Icon(Icons.cloud),
            onPressed: _connectRabbitMQ, // Conectar a RabbitMQ
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, // Dos columnas
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                childAspectRatio: 1,
              ),
              shrinkWrap: true,
              itemCount: 4,
              itemBuilder: (BuildContext context, int index) {
                String label = index < 3 ? "Luz ${index+1}" : "Agua";
                String state = _relayStates[index] ? "ON" : "OFF";
                return GestureDetector(
                  onTap: () => _toggleRelay(index), // Cambiar estado al hacer tap
                  child: Container(
                    decoration: BoxDecoration(
                      color: _relayStates[index] ? Colors.green : Colors.red,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(label, style: TextStyle(color: Colors.white, fontSize: 18)),
                          SizedBox(height: 10),
                          Text(state, style: TextStyle(color: Colors.white, fontSize: 24)),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            SizedBox(height: 20),
            // Mostrar los estados de conexión a Bluetooth y RabbitMQ
            Column(
              children: [
                _buildConnectionStatusRow(
                  label: "Conectado a Arduino",
                  isConnected: _bluetoothConnected,
                  color: _bluetoothConnected ? Colors.green : Colors.red,
                ),
                SizedBox(height: 10),
                _buildConnectionStatusRow(
                  label: "Conectado a Servidor",
                  isConnected: _rabbitMQConnected,
                  color: _rabbitMQConnected ? Colors.green : Colors.red,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // Método para construir las filas de estado de conexión
  Widget _buildConnectionStatusRow({required String label, required bool isConnected, required Color color}) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.black54,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(color: Colors.white, fontSize: 16)),
          Icon(
            Icons.check_circle,
            color: color,
            size: 24,
          ),
        ],
      ),
    );
  }
}
