# Fase 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app
COPY . /app 
RUN npm install

# Construir la aplicación para producción
RUN npm run build 
 
FROM nginx:alpine

# Copiar los archivos de la aplicación desde la fase de build
COPY --from=build /app/build /usr/share/nginx/html/
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
