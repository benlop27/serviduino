import React, { useEffect, useState } from 'react';
import { Button, Steps, theme , Typography, Image} from 'antd';
import {obtenerValoresNFC, TIPOS_FACTOR_ID} from './utils';
import { CheckCircleOutlined } from '@ant-design/icons';
import { ConectorApi } from '../../api/';
import { useAutenticacion } from '../../helpers/AutenticacionContext';
const { Title, Paragraph , Text} = Typography;
export const Nfc = () => {
    const { token } = theme.useToken();
    const {usuario}= useAutenticacion();
    const [current, setCurrent] = useState(0);
    const [llaveValida, setLlaveValida] = useState('');
    const [llaveObtenida, setLlaveObtenida] = useState();

    const recibirLlave = (llave) =>{
        console.log(llave)
        setLlaveObtenida(true);
        setLlaveValida(llave);
    }

   

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    
    const guardarFactor = async ()=>{

        let respuesta = await ConectorApi.Factores.RegistrarFactor(usuario?.ID, TIPOS_FACTOR_ID.NFC, llaveValida);
        respuesta = await respuesta.json()
        console.log(respuesta);
        setTimeout(()=>{window.location.reload();}, 6000);
        next();
        
    }
    const steps = [
        {
            title: 'Inicio',
            content:
                <div style={{paddingBottom:'50px'}}>
                    <br />
                    <Image src='/nfc.png' style={{height:'40%', width:'40%'}}>
                    </Image>
                    <h3>Configura tu tarjeta NFC</h3>
                    <Button onClick={()=>{obtenerValoresNFC(recibirLlave)}}>Has Click Aca </Button>
                   
                </div>
            ,
        },
        {
            title: 'Lectura de tarjeta',
            content: <div style={{paddingBottom:'50px'}}>
                <Typography>
                <Title level={2}>Tarjeta Leida Con Exito</Title>

                <Paragraph>
                    El valor de tu tarjeta :
                    (<Text code>{llaveValida}</Text>), fue leido exitosamente.
                </Paragraph>

                </Typography>
                <Button type='primary' onClick={guardarFactor}> Guardar</Button>
            </div>,
        },
        {
            title: 'Confirmacion', 
            content: <div style={{paddingBottom:'50px'}}>
                <CheckCircleOutlined  />
            <Typography>
            <Title level={2}>Tarjeta Guardada Con Exito</Title>

            <Paragraph>
               Tarjeta guardada con exito
            </Paragraph>

            </Typography>
        </div>,
        },
    ];
    

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        textAlign: 'center',
        minHeight:'700pxs',
        color: token.colorTextTertiary, 
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    useEffect(()=>{
        if(llaveObtenida)  next();
    }, [llaveObtenida]);
    return (
        <>
            NFC
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
           
        </>
    );
};