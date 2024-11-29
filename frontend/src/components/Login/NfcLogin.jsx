import React, { useEffect ,useState} from "react"
import { obtenerValoresNFC } from "../Configuracion2FA/utils"
import { Button, Image } from 'antd';

export const NfcLogin = ({ setValor}) =>{
    const [valorRecibido, setValorRecibido] = useState('');
    const [leyendoValores, setLeyendoValores] =useState(false);
    useEffect(()=>{
        setValor(valorRecibido)
    }, [valorRecibido])

    const retornarValor = (valor) =>{
        setValorRecibido(valor)
        console.log(valor);
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <Image
        width={200}
        src="/nfc.png"
        alt="Descripción de la imagen"
        preview={false}
        style={{ marginBottom: '20px' }}
      />
      <Button disabled={leyendoValores} type="primary" onClick={()=>{setLeyendoValores(true);obtenerValoresNFC(retornarValor)}}>
        NFC
      </Button>
      <h3>{valorRecibido!==''?valorRecibido:leyendoValores?"Leyendo valores...":""}</h3>
    </div>
    );
}