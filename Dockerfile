# Usa una imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que corre la API
EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]