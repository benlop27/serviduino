import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'http://akane.benlop27.com/serviduino-backend/api/auth';

  Future<Map<String, dynamic>> registrar(String usuario, String contrasena, String nombre) async {
    final response = await http.post(
      Uri.parse('$baseUrl/registrar'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'usuario': usuario,
        'contrasena': contrasena,
        'nombre': nombre,
        'idRol': 2,
      }),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to register');
    }
  }

  Future<Map<String, dynamic>> iniciarSesion(String usuario, String contrasena) async {
    final response = await http.post(
      Uri.parse('$baseUrl/iniciar-sesion'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'usuario': usuario,
        'contrasena': contrasena,
      }),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to login');
    }
  }
}
