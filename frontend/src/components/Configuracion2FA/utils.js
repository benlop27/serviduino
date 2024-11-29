export const obtenerValoresNFC = async (retorno) => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    // Escuchando datos del puerto serial
    const reader = port.readable.getReader();
    let partialMessage = '';
    const validRegex = /^([0-9A-Fa-f]{2}\s){3}[0-9A-Fa-f]{2}$/;
    while (true) {
        try {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            const textChunk = new TextDecoder().decode(value);
            partialMessage += textChunk;
            // Verificar si se ha recibido el final del mensaje y validar el formato
            if (partialMessage.includes('\n')) {
                const messages = partialMessage.split('\n');
                partialMessage = messages.pop(); // Mantener el fragmento incompleto para futuros datos
                // Validar cada mensaje y mostrar solo los válidos
                messages.forEach(msg => {
                    try {
                        const lectura = JSON.parse(msg);
                        retorno(lectura?.uid);
                    } catch (error) {
                        console.log(error)
                    }
                    console.log(`Mensaje recibido: ${msg}`);
                });
            }
        } catch (error) {
            console.error('Error al leer los datos:', error);
        }
    }
}

export const TIPOS_FACTOR_ID = {
    NFC : 'b1ada1f0-8a25-11ee-b9d1-0242ac120002',
    SMS : 'd82c8242-8a25-11ee-b9d1-0242ac120002',
    NO_ROBOT : 'dfce276c-8a25-11ee-b9d1-0242ac120002'
}

export const TIPOS_FACTOR_ID_MAPPER = {
    'b1ada1f0-8a25-11ee-b9d1-0242ac120002':"NFC",
    'd82c8242-8a25-11ee-b9d1-0242ac120002': "Telefono",
    'dfce276c-8a25-11ee-b9d1-0242ac120002': "No-ROBOT"
}