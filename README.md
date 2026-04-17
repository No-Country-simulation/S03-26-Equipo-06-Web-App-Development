# 🚀 S03-26-Equipo-06-Web-App-Development
Plataforma CMS para gestionar y publicar testimonios con soporte multimedia, desarrollada en un entorno colaborativo ágil.

## 🌐 1.- Demo
### 🔗 Desde el URL: [Demo](https://frontend-129781163028.us-central1.run.app/ingresar)
![Dashboard](https://drive.google.com/uc?export=view&id=119GBsP49j3L2QHCJ3bNbsxP_a4vPV9oF)

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

### 📂 Estructura del Proyecto

```text
├── 📂 backend         # API REST con Java 21 & Spring Boot
│   ├── 📂 config      # Configuraciones (Security, CORS, APIs)
│   ├── 📂 controllers # Endpoints del CMS
│   └── 📂 security    # Implementación JWT
├── 📂 frontend        # Interfaz con Next.js 15 & Tailwind CSS
│   ├── 📂 app         # App Router & Routes
│   └── 📂 components  # Atomic Design (UI, Form, Shared)
├── 🐳 docker-compose.yml
└── 🗃️ backup.sql      # Semilla de base de datos
 ```
  
## 🛠️ 4.- Stack Tecnológico 
🔹 **Runtimes & Package Managers:**  
┣ Java		→ *OpenJDK 21.0.10 (LTS)*  
┣ Node		→ *.js: v20.20.2 (LTS)*  
┗ Gestores de Paquetes		→ *pnpm v10.33.0 | npm v10.8.2*  
  
🔹 Backend (Arquitectura Robusta)  
┣ Framework		→ *Java 21 | Spring Boot 3.x*  
┣ Seguridad		→ *Spring Security | JWT (JSON Web Tokens)*  
┗ Persistencia	→ *PostgreSQL (vía Supabase)*  

🔹 **Frontend (Interfaz Moderna)**  
┣ Framework		→ *React 19 | Next.js 15 | TypeScript*  
┗ Estilos		→ *Tailwind CSS 4*  

🔹 **DevOps & Infrastructure**  
┣ Contenedores				→ *Docker v29.3.1 | Docker Compose*  
┣ CI/CD						→ *GitHub Actions (Automatización de despliegue)*    
┣ Cloud						→ *Google Cloud Platform (Cloud Run & Artifact Registry)*  
┗ Seguridad & Calidad:		→ *Gitleaks (Secret scanning) | Checkstyle | ESLint*  

🔹 **Herramientas de Gestión y Tooling**  
┣ IDEs					→ *IntelliJ IDEA (Desarrollo Backend) | VS Code (Frontend)*  
┣ DB Management:		→ *pgAdmin / Supabase Dashboard*  
┣ Colaboración:			→ *Trello (Kanban/Scrum) | Google Drive (Docs & Actas)*  
┣ Análisis de Datos:	→ *Microsoft Excel*  
┗ Marco de Trabajo:		→ *Emulación de entorno real en No Country*  
  
## 🚀 5.- Creación del Ambiente de ejecución del  proyecto
**Consideración especial:**  

✅ Para el despliegue, se asume su ejecución sobre un SO. Windows, con instalación WSL (*Ubuntu 24.04.3 LTS*), la ejecución de comandos se realizara desde *WSL terminal* y los comandos de git desde *gitbash terminal*, considerar que WSL y Windows son sistemas separados entre si.
✅ Para la arquitectura de la aplicación (Next.js + Spring Boot + Docker), se trabajo con pnp dado que el npm generaba inconsistencias entre entornos y duplicación de paquetes, afectando el rendimiento y el tamaño de almacenamiento del Docker, además de ocultar errores de dependencias y presentar limitaciones para manejar estructuras tipo monorepo, dificultando la escalabilidad; de este motivo se eligió pnpm para garantizar la eficiencia y control en el desarrollo del proyecto. Finalmente indicar que pnpm (Performant Node Package Manager) optimiza la gestión de dependencias mediante un almacenamiento compartido, reduciendo el uso de disco, acelerando instalaciones y mejorando la consistencia entre entornos.  
📁 Para que el front y el backend funcione correctamente, hay que definir las variables de ambiente en el archvio .env, antes de ejecutar revisar la estrutura de los archivos en el punto 6.   
### ⬇️ Paso 1: Descargar el repositorio desde github
```bash
	git clone https://github.com/No-Country-simulation/S03-26-Equipo-06-Web-App-Development.git
	cd S03-26-Equipo-06-Web-App-Development
```
### 🚀 Paso 2: Ejecución de la aplicación
#### 🚀🖥️ Opción 1: Ejecución Manual - Desarrollo local  
Despliegue desde una maquina local
##### Ejecutar en el folder **./frontend**  
###### Instalación de dependencias
```bash
cd frontend
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

apt install -y nodejs
nvm install 22
nvm use 22
npm install -g pnpm
```
###### Verificar intalación de pnpm
```bash
node -v
npm -v
pnpm -v
```
###### Ejecución de aplicación
```bash 
pnpm dev
```

##### Ejecutar en el folder **./backend**
###### Instalación de dependencias
```bash
cd backend
./mvnw clean install
sudo apt install maven
chmod +x mvnw
```

###### Verificar intalación de maven
```bach
mvn -v
```
###### Ejecución de aplicación
```bach
export $(grep -v '^#' .env | grep -v '^$' | xargs)
./mvnw spring-boot:run
```
#### **Abrir navegdor en:**
Web → http://localhost:3000
API → http://localhost:8080

#### 🚀🐳 Opción 2: Docker (opción Recomendada)
Despliegue desde un entorno dockerizado (se requiere haber instalado previamente en su Sistema operativo [Docker](docker https://docs.docker.com/desktop/setup/install/windows-install/)
 
##### ⚠️ Despues del paso 1, ingreso al directorio del proyecto donde se encuentre el docker-compose y proceda con la condtrucción de la imagen.
```bash
docker-compose up --build
```
##### Abrir navegdor en:
- Web → http://localhost:5173  
- API → http://localhost:8080  

##### [OPCIONAL] comandos de ser necesarios 
```bash
echo "Detener contenedores contenedores"
docker-compose stop

echo "Eliminar contenedores"
docker-compose down

echo "Verificar ejecución de contenedor"
docker exec -it api-1 printenv
```

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
#Database
#DB_URL=jdbc:postgresql://db.kepvtlceadcuhulmmtcq.supabase.co:5432/postgres
DB_URL=jdbc:postgresql://aws-1-sa-east-1.pooler.supabase.com:6543/postgres
DB_USER=postgres.kepvtlceadcuhulmmtcq
DB_PASS=S0326equipo06

#Cloudinary
CLOUDINARY_URL=cloudinary://923828372398843:_9NMgSGP9TGOQegBHH2-70L4WNs@dn7rqagrx

# Authentication Configuration (JWT)
JWT_SECRET=test_test_test_test_test_test
JWT_EXPIRATION=86400000

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
---
---
## 📸 Screenshots:
- Registro
![Registro](https://drive.google.com/uc?export=view&id=1Ngzsn1H3gWGGBXf_icCu2qWAY5BFoiKx)

- Login
![Login](https://drive.google.com/uc?export=view&id=19I3Yd1FUzTdt2575MKXt3fwY7CnqhVoC)

- Dashboard
![Dashboard](https://drive.google.com/uc?export=view&id=119GBsP49j3L2QHCJ3bNbsxP_a4vPV9oF)

- Creación de testimonio
![Crear_testimonio](https://drive.google.com/uc?export=view&id=1uD2zIWWC9jojT3OhusD7A6tchsDTahnF)

- Publicaciones
![Publicaciones](https://drive.google.com/uc?export=view&id=1d4Qh_MTvAkWaOZEQ8-mb9C1FS3U2ZKPv)

## 📊 Endpoints documentados

### 🔐 Autenticación
| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| POST | `/api/auth/registro` | 🌐 Público | Registra un nuevo usuario y devuelve JWT |
| POST | `/api/auth/login` | 🌐 Público | Autentica usuario y devuelve JWT |

### 📋 Testimonios
| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| GET | `/api/testimonios` | 🌐 Público | Lista todos los testimonios |
| GET | `/api/testimonios/{id}` | 🌐 Público | Obtiene un testimonio por ID |
| POST | `/api/testimonios` | 🔒 ADMIN, EDITOR, USUARIOREGISTRADO | Crea un nuevo testimonio |
| PUT | `/api/testimonios/editar` | 🔒 ADMIN, EDITOR | Edita un testimonio existente |
| DELETE | `/api/testimonios/eliminar/{id}` | 🔒 ADMIN | Elimina un testimonio |

### 🔑 Roles disponibles
| Rol | Permisos |
|-----|----------|
| `admin` | CRUD completo |
| `editor` | Crear y editar |
| `usuarioregistrado` | Solo crear |
| `usuariovisitante` | Solo lectura |

### 📨 Ejemplo de uso
**1. Login:**
```json
POST /api/auth/login
{ "correo": "user@example.com", "password": "password123" }

```

## Flujos de Trabajo DevOps para Frontend, Backend y Seguridad

Los pipelines automatizan el ciclo de vida del software para mejorar la colaboración y la eficiencia. Los pasos clave incluyen:

Push/PR: Se inicia el pipeline con un Push o PR.
Compilación y Escaneo: El código se compila y se escanea en busca de vulnerabilidades.
Linting: Se verifica la calidad del código mediante herramientas de linting.
Despliegue en Dev: El código se despliega en desarrollo y se realizan pruebas rápidas.
Despliegue en Producción: Si todo va bien en Dev, se despliega en producción y se validan las pruebas finales.
Seguridad: Se integran análisis estático y escaneos de seguridad a lo largo del proceso.

Este enfoque automatiza el desarrollo, las pruebas, el despliegue y la seguridad, lo que permite una entrega continua y mejora la colaboración entre equipos.

### Frontend

```mermaid
flowchart LR
    A[Push/PR Event] --> B[Build]
    A[Push/PR Event] --> C[Scan]
    B --> D[Run Lint]
    C --> D[Run Lint]

    D --> E[Deploy Dev]
    E --> F[Smoke Test Dev]

    D --> G[Deploy Prod]
    G --> H[Smoke Test Prod]

    subgraph CI [CICD]
      B
      C
      D
      E
      F
      G
      H
    end
```

### Backend

```mermaid
flowchart LR
    A[Push/PR Event] --> B[Build]
    A[Push/PR Event] --> C[Scan]
    B --> D[Run Lint]
    C --> D[Run Lint]

    D --> E[Deploy Dev]
    E --> F[Smoke Test Dev]

    D --> G[Deploy Prod]
    G --> H[Smoke Test Prod]

    subgraph CI [CICD]
      B
      C
      D
      E
      F
      G
      H
    end
```

### Seguridad

```mermaid
flowchart LR
    A[Push/PR Event] --> B[Validate Branch]
    
    B --> C[Run Scan]
    B --> D[Run SAST]

    C --> E[Scan Completed]
    D --> E

    subgraph CI [CICD]
      B
      C
      D
      E
    end
```
