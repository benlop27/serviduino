import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'StorageService.dart';

class SessionProvider extends ChangeNotifier {
  final StorageService _storageService = StorageService();
  String? _token;

  String? get token => _token;

  Future<void> cargarSesion() async {
    _token = await _storageService.obtenerToken();
    notifyListeners();
  }

  Future<void> iniciarSesion(String token) async {
    _token = token;
    await _storageService.guardarToken(token);
    notifyListeners();
  }

  Future<void> cerrarSesion() async {
    await _storageService.eliminarToken();
    _token = null;
    notifyListeners();
  }
}
