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
En nuestra arquitectura de NoCountry (Next.js + Spring Boot + Docker), identificamos que el uso de npm puede generar inconsistencias entre entornos (desarrollo, contenedor y CI/CD) debido a un manejo menos estricto de las dependencias. Asimismo, observamos que tiende a duplicar paquetes, lo que impacta negativamente en el rendimiento al incrementar el tiempo y peso de los builds en Docker. Adicionalmente, puede ocultar errores de dependencias, representando un riesgo en entornos colaborativos donde la estabilidad es clave. Finalmente, su limitada eficiencia para manejar estructuras tipo monorepo dificulta la organización y escalabilidad del proyecto.

Por lo tanto, se eligió pnpm como gestor de paquetes para garantizar mayor eficiencia, consistencia y control en el desarrollo del proyecto.

En la carpeta donde ha elegido almacenar la aplicación, abrir el terminal y ejecutar.
> **Para la ejecución del Backend**
```bash
cd backend  
 ./mvnw spring-boot:run
```
> **Para la ejecución del Frontend**
```bash
cd frontend
npm install
npm run dev
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
