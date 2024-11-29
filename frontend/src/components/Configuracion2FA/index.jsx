import React, { useEffect, useState } from "react"
import { Telefono } from "./Telefono";
import { Nfc } from "./Nfc";
import { TIPOS_FACTOR_ID_MAPPER } from "./utils";
import { MessageOutlined, IdcardOutlined, RobotOutlined}  from '@ant-design/icons';
import { Divider, Descriptions , Button, } from 'antd';
import { ConectorApi } from "../../api";
import { useAutenticacion } from "../../helpers/AutenticacionContext";
export const Configuracion2FA = () => {
    const { usuario } = useAutenticacion();
    const [factores, setFactores] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formularioAMostrar, setFormularioAMostrar] = useState('');
    const cargarFactores = async () => {
        let respuesta = await ConectorApi.Factores.ObtenerFactoresUsuario(usuario?.ID);
        respuesta = await respuesta.json();
        if(respuesta.length > 0) setFactores(respuesta[0])
        console.log(factores)
    }

    useEffect(() => {
        cargarFactores()
    }, []);

    const borrarFactor = async() =>{
        let respuesta = await ConectorApi.Factores.BorrarFactorUsuario(usuario?.ID);
        setTimeout(()=>{window.location.reload();}, 2000);
    }


    const items = [
        {
            key: '1',
            label: 'Tipo',
            children: TIPOS_FACTOR_ID_MAPPER[factores?.IDTipoFactor],
        },
        {
            key: '2',
            label: 'Estado',
            children: factores?.Estado,
        },
        {
            key: '3',
            label: 'Fecha Registro',
            children: factores?.FechaCreacion,
        },
        {
            key: '4',
            label: 'Valor De Registro',
            children:  factores?.Valor,
        },
    ];
    const mostrarFormularioPorNombre=()=>{
        if(mostrarFormulario){
            switch (formularioAMostrar) {
                case 'NFC':
                    return <Nfc/>
                    break;
                case 'TELEFONO':
                    return <Telefono/>
                default:
                    break;
            }
        }
    }
    const contenido = (
        (factores == null) ?
            (
                <>
                    <h3>
                        Parece que aun no posees configurado un 2FA.
                        <br />
                        Puedes agregarlo haciendo click aca:
                    </h3>
                    <Button
                        type="primary"
                        style={{backgroundColor: "green"}}
                        onClick={()=>{setMostrarFormulario(true); setFormularioAMostrar('NFC');}}
                        icon={<IdcardOutlined />}
                        >
                        Tarjeta NFC
                        </Button>
                    <Divider type="vertical"/>
                    <Button
                        type="primary"
                        style={{backgroundColor: "green"}}
                        icon={<MessageOutlined />}
                        onClick={()=>{setMostrarFormulario(true); setFormularioAMostrar('TELEFONO');}}
                        >
                        Mensaje de texto
                        </Button>
                    <Divider type="vertical"/>
                    <Button
                        type="primary" 
                        icon={ <RobotOutlined />}
                        disabled
                        onClick={()=>{setMostrarFormulario(true); setFormularioAMostrar('ROBOT');}}
                        >
                        Factor No-Robot
                    </Button>
                    <Divider type="vertical"/>
                    <Button
                        type="primary"
                        style={{backgroundColor: "green"}}
                        onClick={() =>{setMostrarFormulario(false); setFormularioAMostrar('');}}
                        hidden={!mostrarFormulario}
                        >
                        Cancelar
                    </Button>

                    <Divider/>
                    {
                        mostrarFormulario ?mostrarFormularioPorNombre() :<></>
                    }
                </>
                
            )
            
            :
            (<><Descriptions title="Factor Registrado Actualmente" items={items} /><Button onClick={borrarFactor}>Borrar 2FA</Button></>
            )

    );
    return (<>
        <h1>Autenticación de doble factor (2FA)</h1>

        <Divider />
        {contenido}

    </>);
}