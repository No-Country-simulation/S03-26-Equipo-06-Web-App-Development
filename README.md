# 🚀 S03-26-Equipo-06-Web-App-Development
Plataforma CMS para gestionar y publicar testimonios con soporte multimedia, desarrollada en un entorno colaborativo ágil.

## 🌐 1.- Demo
### 🔗 Desde el URL: [https://proxCMStestimonial.html](https://proxCMStestimonial.html)
### 📸 Screenshots:
Las imágenes del sistema cuando esté corriendo)
- Imagen1
- Imagen2

## 📌 2.- Sobre el Proyecto
Este proyecto es una aplicación web desarrollada en el contexto de una simulación profesional de No Country, cuyo objetivo es construir un CMS (Content Management System) que permita:
- Crear y gestionar testimonios  
- Publicar contenido multimedia (imágenes, videos, etc.)  
- Administrar usuarios y autenticación con JWT  
- Visualizar contenido en una interfaz moderna
- Arquitectura desacoplada frontend/backend
- Despliegue mediante Docker

## 🧱 3.- Arquitectura del Proyecto
El proyecto sigue una arquitectura desacoplada basada en microservicios:  
📦 root  
 ┣ 📂 backend      → API REST (Spring Boot)  
 ┣ 📂 frontend     → Aplicación web (Vite / Node.js)  
 ┣ 📄 docker-compose.yml  
 ┗ 📄 README.md  
  
## 🛠️ 4.- Stack Tecnológico 
🔹 Backend
 + Java 21  
 + Spring Boot  
 + Spring Security  
 + JWT (JSON Web Tokens)  

🔹 Frontend
 - Node.js 22+
 - Vite  
 - JavaScript / (posible React)  

🔹 DevOps
- Docker  
- Docker Compose  

## 🚀 5.- Ejecución del proyecto
Antes de ejecutar el proyecto, asegúrate de tener instalado Node.js 22, - Java 21 para opción manual y Docker para seguir con la opción recomendada

### 🔹 Opción 1: Ejecución Manual - Desarrollo local
Para la arquitectura de la aplicación (Next.js + Spring Boot + Docker), identificamos que el uso de npm generaba inconsistencias entre entornos y duplicación de paquetes, afectando el rendimiento y aumentando el peso de los builds en Docker. Además, puede ocultar errores de dependencias y presenta limitaciones para manejar estructuras tipo monorepo, dificultando la escalabilidad.
Por otro lado, pnpm (Performant Node Package Manager) optimiza la gestión de dependencias mediante un almacenamiento compartido, reduciendo el uso de disco, acelerando instalaciones y mejorando la consistencia entre entornos.
Por lo tanto, se eligió pnpm para garantizar mayor eficiencia y control en el desarrollo del proyecto. Finalmente, en la carpeta del proyecto, se debe abrir una terminal y ejecutar los comandos necesarios para instalar dependencias y levantar el frontend (./frontend) y posteriormente el backend (./backend) .

> **Para ejecución desde el folder ./Frontend de la aplicación**
Instalación de dependencias
```bash
cd frontend
sudo apt install -y nodejs
npm install -g pnpm
```
Verificar intalación de pnpm
```bash
 	node -v
	npm -v
	pnpm -v
```
Ejecución de aplicación
```bash 
pnpm dev
```

> **Para ejecución desde el folder ./Frontend de la aplicación**
```bash
cd backend  
 ./mvnw spring-boot:run
```



### 🐳 Opción 2: Docker (opción Recomendada)
##  Docker
Este proyecto incluye un archivo docker-compose.yml que permite levantar todo el entorno de forma rapida, consistente y sencilla.
En la carpeta de tu equipo local, creada para almacener esta aplicacióndonde, abre el terminal y ejecutar.
Comandos útiles:
### clonar repositorio, ubicarse en carpeta y construcción de maquina virtual
```bash
git clone https://github.com/No-Country-simulation/S03-26-Equipo-06-Web-App-Development.git
cd S03-26-Equipo-06-Web-App-Development
docker-compose up --build
```
### Detener contenedores
```bash
docker-compose down
```
### Verificación en ejecución
```bash
docker exec -it api-1 printenv
```
### Abrir navegdor en:
- Web → [http://localhost:5173](http://localhost:5173)
- API → [http://localhost:8080](http://localhost:5173)

## 🔐 6.-  Variables de entorno
⚠️ Este proyecto requiere archivos .env para su correcto funcionamiento.
### 📁 Backend (backend/.env)
Ejemplo:
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/testdb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

JWT_SECRET=1234567890abcdef1234567890abcdef
JWT_EXPIRATION=3600000
```
### 📁 Frontend (frontend/.env)
```bash
VITE_API_URL=http://localhost:8080
```

## 🔒 Seguridad (JWT)
El sistema utiliza autenticación basada en JWT.

⚠️ IMPORTANTE:
La clave JWT_SECRET debe tener un mínimo de 256 bits (32 caracteres).
Claves más cortas generarán errores de seguridad en la aplicación.

## 🤝 Contribución
Este es un Proyecto desarrollado en equipo bajo metodología ágil (Scrum) en el entorno de No Country.
Si deseas contribuir:
- Fork del repositorio
- Crear una nueva rama
- Realizar cambios
- Crear Pull Request

## 📌 Estado del proyecto
- 🚧 En desarrollo

## 👨‍💻 Equipo de desarrollo y roles
S03-26-Equipo 06 - No Country Simulation
- A. Ricardo    [FrontEnd]
- C. Elian      [Devops]
- C. Luis       [Architech]
- L. Cristhian  [BackEnd]
- R. Ignacio    [BackEnd]
  
## 📄 Licencia
Este proyecto es de uso educativo dentro del programa No Country.

## 📸 Agregar screenshots del sistema
* $#$$%%&&
  
## 📊 Diagrama de arquitectura
* $#$$%%&& Endpoints documentados (Swagger/Postman)
* $#$$%%&&
