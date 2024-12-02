import pika
import serial
import time

rabbitmq_host = 'localhost'
queue_name = 'relay_control'

# Configuración de la comunicación con Arduino
arduino_port = '/dev/tty.usbserial-1320'  # Puerto serial del Arduino (ajústalo según tu sistema)
baud_rate = 9600  # Tasa de baudios

def encender_rele():
    # Enviar el comando al Arduino para encender el relé
    with serial.Serial(arduino_port, baud_rate, timeout=1) as ser:
        ser.write(b'1')  # Enviar '1' para encender el relé
        print("Relé encendido.")

def apagar_rele():
    # Enviar el comando al Arduino para apagar el relé
    with serial.Serial(arduino_port, baud_rate, timeout=1) as ser:
        ser.write(b'0')  # Enviar '0' para apagar el relé
        print("Relé apagado.")
# Función para conectar con RabbitMQ y consumir mensajes
def callback(ch, method, properties, body):
    message = body.decode()
    print(f"Mensaje recibido: {message}")
    
    if message == 'ENCENDER':
        encender_rele()
    elif message == 'APAGAR':
        apagar_rele()

# Conexión a RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
channel = connection.channel()
 

# Configura el consumidor
channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

# Inicia la escucha de mensajes
print("Esperando mensajes de RabbitMQ. Para salir presiona CTRL+C.")
channel.start_consuming()

# Función para enviar comandos al Arduino


