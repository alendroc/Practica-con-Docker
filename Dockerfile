FROM node:18

WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]