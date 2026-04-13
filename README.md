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
🔹 Backend:  Java 21 | Spring Boot | Spring Security | JWT (JSON Web Tokens)  
🔹 Frontend: Node.js 22 | v18.19.1 | Vite  | JavaScript  
🔹 Base de Datos: Supabase | PostgreSQL  
🔹 DevOps: Docker  

## 🚀 5.- Creación del Ambiente de ejecución del  proyecto
**Consideración especial:** 
- Para el despliegue, se asume su ejecución sobre un SO. Windows, con instalación WSL (*Ubuntu 24.04.3 LTS*), la ejecución de comandos se realizara desde *WSL terminal* y los comandos de git desde *gitbash terminal*, se recomienda colocar la aplicación en la unidad de instalación del WSL en una carpeta como *home/.* para un mejor desempeño.
- Para la arquitectura de la aplicación (Next.js + Spring Boot + Docker), al identificar que npm generaba inconsistencias entre entornos y duplicación de paquetes lo que afectaba el rendimiento y el tamaño de lamacenamiento del Docker, además de ocultar errores de dependencias y presentar limitaciones para manejar estructuras tipo monorepo, dificultando la escalabilidad; se eligió pnpm para garantizar mayor eficiencia y control en el desarrollo del proyecto. Finalmente, pnpm (Performant Node Package Manager) optimiza la gestión de dependencias mediante un almacenamiento compartido, reduciendo el uso de disco, acelerando instalaciones y mejorando la consistencia entre entornos.
- Para que el front y el backend funcione correctamente, hay que definir las variables de ambiente en el .env de cada carpeta, antes de ejecutar revisar la estrutura de los archivos en le punto 6.
  
✅ Requisito mínimo
Debe tener al menos 32 caracteres (256 bits).

Descargar el repositorio desde github
```bash
	git clone https://github.com/No-Country-simulation/S03-26-Equipo-06-Web-App-Development.git
	cd S03-26-Equipo-06-Web-App-Development
```

### 🔹 Opción 1: Ejecución Manual - Desarrollo local
#### Para ejecución desde el folder **./Frontend** de la aplicación

##### Instalación de dependencias
```bash
cd frontend
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
npm install -g pnpm
```
##### Verificar intalación de pnpm
```bash
 	node -v
	npm -v
	pnpm -v
```
##### Ejecución de aplicación
```bash 
pnpm dev
```
sudo apt install -y nodejs
npm install -g pnpm


#### **Para ejecución desde el folder ./Backend de la aplicación**
```bash
cd backend
./mvnw clean install
sudo apt install maven
chmod +x mvnw
mvn -v

 ./mvnw spring-boot:run

```
### Abrir navegdor en:
Web → http://localhost:3000
API → http://localhost:8080


### 🐳 Opción 2: Docker (opción Recomendada)

Este proyecto incluye un archivo docker-compose.yml que permite levantar todo el entorno de forma rapida, consistente y sencilla.
En la carpeta de tu equipo local, creada para almacener esta aplicacióndonde, abre el terminal y ejecutar.
Comandos útiles:
#### clonar repositorio, ubicarse en carpeta y construcción de maquina virtual
```bash
git clone https://github.com/No-Country-simulation/S03-26-Equipo-06-Web-App-Development.git
cd S03-26-Equipo-06-Web-App-Development
docker-compose up --build
```
#### Detener contenedores
```bash
docker-compose down
```
#### Verificación en ejecución
```bash
docker exec -it api-1 printenv
```
#### Abrir navegdor en:
- Web → [http://localhost:5173](http://localhost:5173)
- API → [http://localhost:8080](http://localhost:5173)

## 🔐 6.-  Variables de entorno
⚠️ 📄 Este proyecto requiere archivos .env para su correcto funcionamiento.
⚠️ 🔒 Dado que ha implemntado seguridad JWT, para que el backend funcione se debe definir una clave secreta (JWT_SECRET) de almenos 32 caracteres (256 bit), sin esta el backend no iniciará.

### 📁 Frontend (frontend/.env)
```bash
VITE_API_URL=http://localhost:8080
```

### 📁 Backend (backend/.env)
Ejemplo:
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/testdb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

JWT_SECRET=1234567890abcdef1234567890abcdef
JWT_EXPIRATION=3600000
```

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
