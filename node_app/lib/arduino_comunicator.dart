import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'dart:typed_data';
import 'dart:async';

class ArduinoService {
  late BluetoothDevice _device;
  late BluetoothConnection _connection;

  // Conectar al dispositivo HC-05
  Future<void> connectToArduino() async {
    // Verificar el estado de Bluetooth
    BluetoothState bluetoothState = await FlutterBluetoothSerial.instance.state;
    if (bluetoothState == BluetoothState.STATE_OFF) {
      // Solicitar al usuario activar Bluetooth si está apagado
      await FlutterBluetoothSerial.instance.requestEnable();
    }

    // Escanear dispositivos Bluetooth emparejados
    List<BluetoothDevice> devices = await FlutterBluetoothSerial.instance.getBondedDevices();
    _device = devices.firstWhere((device) => device.name == "YOO"); // Buscar HC-05 por nombre

    // Conectar al dispositivo
    await BluetoothConnection.toAddress(_device.address).then((connection) {
      _connection = connection;
      print("Conectado al HC-05");
    }).catchError((error) {
      print("Error de conexión: $error");
    });
  }

  // Enviar comando al Arduino a través de Bluetooth
  Future<void> sendCommand(String command) async {
    if (_connection.isConnected) {
      // Enviar el comando como bytes
      _connection.output.add(Uint8List.fromList(command.codeUnits));
      await _connection.output.allSent;
      print("Comando enviado: $command");
    } else {
      print("No hay conexión Bluetooth.");
    }
  }

  // Leer datos del dispositivo Bluetooth (Arduino)
  Future<String> readData() async {
    String receivedData = '';

    // Escuchar los datos entrantes en el flujo de entrada
    _connection.input!.listen((data) {
      // Convertir los bytes a String y agregar a los datos recibidos
      receivedData += String.fromCharCodes(data);
      print('Datos recibidos: $receivedData');
    });

    // Esperar unos segundos para leer los datos
    await Future.delayed(Duration(seconds: 2));

    return receivedData;
  }

  // Desconectar del dispositivo Bluetooth
  Future<void> disconnect() async {
    if (_connection.isConnected) {
      await _connection.close();
      print("Desconectado del HC-05");
    }
  }
}
