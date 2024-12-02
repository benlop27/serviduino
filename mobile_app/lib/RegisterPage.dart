import 'package:flutter/material.dart';
import 'ApiService.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _usuarioController = TextEditingController();
  final _contrasenaController = TextEditingController();
  final _nombreController = TextEditingController();

  Future<void> _registrar() async {
    final apiService = ApiService();

    try {
      final response = await apiService.registrar(
        _usuarioController.text,
        _contrasenaController.text,
        _nombreController.text,
      );
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registro exitoso')),
      );
      Navigator.of(context).pushReplacementNamed('/login');
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al registrar')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Registrarse')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
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
            TextField(
              controller: _nombreController,
              decoration: InputDecoration(labelText: 'Nombre'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _registrar,
              child: Text('Registrar'),
            ),
          ],
        ),
      ),
    );
  }
}
