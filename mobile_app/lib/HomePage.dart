import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'SessionProvider.dart';
import 'LoginPage.dart';  // Asegúrate de importar la página de login


// --- HomePage ---
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final sessionProvider = Provider.of<SessionProvider>(context);

    // Si el token no está cargado, lo cargamos
    if (sessionProvider.token == null) {
      sessionProvider.cargarSesion();
    }

    // Verificar si no hay token y redirigir al login
    

    String decodeJwt(String? token) {
      // Dividir el token en sus partes (header, payload, signature)
      List<String> parts = token!.split('.');

      // Verificar si el token tiene las tres partes
      if (parts.length != 3) {
        return 'Token JWT no válido';
      }

      // Decodificar el payload (segunda parte del token)
      String payloadBase64 = parts[1];

      // Añadir relleno (padding) en caso de que sea necesario para que sea un tamaño múltiplo de 4
      payloadBase64 = payloadBase64.padRight(payloadBase64.length + (4 - payloadBase64.length % 4) % 4, '=');

      // Decodificar de Base64
      String decodedPayload = utf8.decode(base64Url.decode(payloadBase64));

      return decodedPayload;
    }

    var userJson = sessionProvider.token != null ? decodeJwt(sessionProvider.token) : "";
    var decodedUser = sessionProvider.token != null ? jsonDecode(userJson) as Map<String, dynamic> : {};

    // Supongamos que el nombre del usuario se obtiene del JWT
    final userName = sessionProvider.token != null ? decodedUser['nombre'] : 'No Usuario';

    return Scaffold(
      appBar: AppBar(
        title: Text('Serviduino'), // Título actualizado
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.white,
                    radius: 30,
                    child: Icon(
                      Icons.person,
                      size: 40,
                      color: Colors.blue,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Hola, $userName', // Aquí se muestra el nombre del usuario
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              title: Text('Cerrar sesión'),
              onTap: () {
                sessionProvider.cerrarSesion();
                Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
              },
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            // Jumbotron - Sección de saludo
            Container(
              padding: EdgeInsets.all(20),
              margin: EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: Colors.blueAccent,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Text(
                    '¡Bienvenido a Serviduino!',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Aquí puedes gestionar tus servicios de agua y luz de manera fácil y rápida.',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white70,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),

            // Mostrar el token debajo de los cuadros (solo para fines de depuración)
            SizedBox(height: 10),
            
            // Sección de "Mis servicios activos"
            SizedBox(height: 20),
            Text(
              'Mis Servicios Activos',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 20),
            // Cuadros estilo Metro UI
            GridView.builder(
              shrinkWrap: true, // Para que no ocupe toda la pantalla
              physics: NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2, // Número de columnas
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                childAspectRatio: 1.0, // Relación de aspecto (cuadrado)
              ),
              itemCount: 2, // Número de servicios
              itemBuilder: (context, index) {
                // Aquí se pueden agregar más servicios si es necesario
                return ServiceCard(
                  serviceName: index == 0 ? 'Luz' : 'Agua',
                  serviceStatus: 'Activo', // Ejemplo de estado
                  color: index == 0 ? Colors.yellow : Colors.blue,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// --- ServiceCard ---
class ServiceCard extends StatelessWidget {
  final String serviceName;
  final String serviceStatus;
  final Color color;

  ServiceCard({
    required this.serviceName,
    required this.serviceStatus,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: color,
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: InkWell(
        onTap: () {
          // Implementar acción al hacer clic en el servicio
          print('Servicio: $serviceName');
        },
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(
                Icons.power,
                size: 50,
                color: Colors.white,
              ),
              SizedBox(height: 10),
              Text(
                serviceName,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                serviceStatus,
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
