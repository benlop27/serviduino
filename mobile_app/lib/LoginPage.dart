import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'SessionProvider.dart';
import 'ApiService.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _usuarioController = TextEditingController();
  final _contrasenaController = TextEditingController();

  Future<void> _iniciarSesion(BuildContext context) async {
    final apiService = ApiService();
    final session = Provider.of<SessionProvider>(context, listen: false);

    try {
      final response = await apiService.iniciarSesion(
        _usuarioController.text,
        _contrasenaController.text,
      );

      final token = response['token'];
      if (token != null) {
        await session.iniciarSesion(token);
        Navigator.of(context).pushReplacementNamed('/');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al iniciar sesión')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Iniciar sesión')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _usuarioController,
              decoration: InputDecoration(labelText: 'Usuario'),
            ),
            TextField(
              controller: _contrasenaController,
              decoration: InputDecoration(labelText: 'Contraseña'),
              obscureText: true,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => _iniciarSesion(context),
              child: Text('Iniciar sesión'),
            ),
          ],
        ),
      ),
    );
  }
}
