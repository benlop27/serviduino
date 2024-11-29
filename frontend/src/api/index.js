import { API_CONFIG } from "../config";
const token = localStorage.getItem("token");
const configuracionFetch = {
    headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },
}
export const ConectorApi = {
    Usuarios:{
        ObtenerUsuarios : async() =>{ 
          return fetch(API_CONFIG.basePath+API_CONFIG.usuariosEndpoint,  { method:"GET", ...configuracionFetch});
        },
        RegistrarUsuario : async(usuario, nombre, password) => {
            return fetch(API_CONFIG.basePath+API_CONFIG.usuariosEndpoint,  { method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuario,
                    nombre,
                    password
                })
            }
            );
          
        }
       /*  ObtenerEmpleadoPorId : async(EmpleadoId) =>{ 
            return fetch(API_CONFIG.basePath+API_CONFIG.empleadosEndpoint+ "/" +EmpleadoId, {...configuracionFetch, method:"GET"});
        },
        BorrarEmpleadoPorId : async(EmpleadoId) =>{
             
            return fetch(API_CONFIG.basePath+API_CONFIG.empleadosEndpoint+ "/" +EmpleadoId, {...configuracionFetch, method:"DELETE"});
        },
        CrearEmpleado : async(Payload) =>{ 
            return fetch(API_CONFIG.basePath+API_CONFIG.empleadosEndpoint,  {...configuracionFetch, method:"POST", body: JSON.stringify(Payload) });
        },
        EditarEmpleado : async(Payload) =>{ 
            return fetch(API_CONFIG.basePath+API_CONFIG.empleadosEndpoint,  {...configuracionFetch, method:"PUT", body: JSON.stringify(Payload) });
        }, */
    },
    Factores:{
        ObtenerFactoresUsuario: async(usuarioId) =>{
            return fetch(API_CONFIG.basePath+API_CONFIG.factoresEndpoint+"/"+usuarioId+"/todos",  { method:"GET", ...configuracionFetch});
        },
        RegistrarFactor: async(usuarioId, tipoFactorId, valor) =>{
            return fetch(API_CONFIG.basePath+API_CONFIG.factoresEndpoint+'/usuario/'+usuarioId, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuarioId,
                    tipoFactorId,
                    valor
                })
            });
        },
        BorrarFactorUsuario : async(usuarioId) =>{
             
            return fetch(API_CONFIG.basePath+API_CONFIG.factoresEndpoint+ "/" +usuarioId, {...configuracionFetch, method:"DELETE"});
        },
        emitirSMS: async(usuarioId) =>{
            return fetch(API_CONFIG.basePath+API_CONFIG.factoresEndpoint+'/emitirSMS', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuarioId,
                })
            });
        },
        validarFactorSMS: async(usuarioId, codigo) =>{
            return fetch(API_CONFIG.basePath+API_CONFIG.factoresEndpoint+'/validarFactorSMS', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuarioId,
                    codigo,
                })
            });
        }
    },
    Login: {
        AutenticarUsuario: async(usuario, password) =>{
            return fetch(API_CONFIG.basePath+API_CONFIG.autenticacionEndpoint, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuario,
                    contrasena: password
                })
            });
          },
        validarFactor: async(usuarioId, factorId, valor) => {
            return fetch(API_CONFIG.basePath+API_CONFIG.autenticacionEndpoint+'/validarFactor', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    usuarioId,
                    factorId,
                    valor
                })
            });
        }
    }, 

};