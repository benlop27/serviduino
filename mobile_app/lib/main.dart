import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'SessionProvider.dart';
import 'HomePage.dart';
import 'LoginPage.dart';
import 'RegisterPage.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SessionProvider()..cargarSesion(),
      child: MaterialApp(
        title: 'Flutter JWT App',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => HomePage(),
          '/login': (context) => LoginPage(),
          '/register': (context) => RegisterPage(),
        },
      ),
    );
  }
}
