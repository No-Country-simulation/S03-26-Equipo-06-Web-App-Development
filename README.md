# 🚀 S03-26-Equipo-06-Web-App-Development
Plataforma CMS para gestionar y publicar testimonios con soporte multimedia, desarrollada en un entorno colaborativo ágil.

## 🌐 1.- Demo
### 🔗 Desde el URL: [Demo](https://frontend-129781163028.us-central1.run.app/ingresar)
![Dashboard](https://drive.google.com/uc?export=view&id=119GBsP49j3L2QHCJ3bNbsxP_a4vPV9oF)

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
 ┣ 📂 frontend     → Aplicación web (Next.js / Node.js)  
 ┣ 📄 docker-compose.yml  
 ┗ 📄 README.md  
  
## 🛠️ 4.- Stack Tecnológico 
🔹 Backend
 + Java 21  
 + Spring Boot  
 + Spring Security  
 + JWT (JSON Web Tokens)  

🔹 Frontend
 - Node.js 22
 - Next.js 16
 - React 19
 - TypeScript
 - Tailwind CSS 4

🔹 DevOps
 - Docker
 - Docker Compose
 - GitHub Actions
 - Google Cloud Platform (GCP)
 - Google Cloud Run
 - Google Container Registry (GCR)
 - Gitleaks
 - Checkstyle
 - ESLint

## 🚀 5.- Ejecución del proyecto
Antes de ejecutar el proyecto, asegúrate de tener instalado Node.js 22, - Java 21 para opción manual y Docker para seguir con la opción recomendada

### 🔹 Opción 1: Ejecución Manual - Desarrollo local
En la carpeta donde se almacenara la aplicación en tu equipo local, abrir el terminal y ejecutar.
> **Para la ejecución del Backend**
```bash
cd backend  
 ./mvnw spring-boot:run
```
> **Para la ejecución del Frontend**
```bash
cd frontend
pnpm install
pnpm dev
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
- Web → [http://localhost:3000](http://localhost:5173)
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

CLOUDINARY_URL=cloudinary://fake_key:fake_secret@fake_cloud
```
### 📁 Frontend (frontend/.env)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
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
- A. Cristhian   [FrontEnd]
- C. Elian       [Devops]
- C. Luis        [Architech]
- L. Ricardo     [BackEnd]
- R. Ignacio     [BackEnd]
  
## 📄 Licencia
Este proyecto es de uso educativo dentro del programa No Country.

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
```http
POST /api/auth/login
Content-Type: application/json

{
  "correo": "user@example.com",
  "password": "password123"
}
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

##  Diagrama de Clases (Backend)

```mermaid
classDiagram
    direction TB

    %% ==========================================
    %% 🌐 CAPA DE CONTROLADORES
    %% ==========================================
    class UsuarioController {
        +login(request)
        +registrar(request)
    }

    class TestimonioController {
        +createTestimonio(testimonio, request)
        +getTestimonios()
        +getUnTestimonio(id)
        +editar(testimonio)
        +eliminar(id)
    }

    %% ==========================================
    %% ⚙️ CAPA DE SERVICIOS
    %% ==========================================
    class IUsuarioService {
        <<interface>>
        +login()
        +registrar()
        +loadUserByCorreo()
    }
    class UsuarioService { }

    class ITestimonioService {
        <<interface>>
        +createTestimonio()
        +getTestimonios()
        +getTestimonioById()
        +updateTestimonio()
        +deleteTestimonioById()
    }
    class TestimonioService { }

    IUsuarioService <|.. UsuarioService : Implements
    ITestimonioService <|.. TestimonioService : Implements

    UsuarioController --> IUsuarioService : Inyecta
    TestimonioController --> ITestimonioService : Inyecta

    %% ==========================================
    %% 🗄️ CAPA DE REPOSITORIOS
    %% ==========================================
    class IUsuarioRepository {
        <<interface>>
        +findByCorreo(String) Optional~Usuario~
    }
    class ITestimonioRepository {
        <<interface>>
    }

    UsuarioService --> IUsuarioRepository : Inyecta
    TestimonioService --> ITestimonioRepository : Inyecta
    TestimonioService --> IUsuarioService : Inyecta

    %% ==========================================
    %% 📦 CAPA DE MODELOS (ENTIDADES)
    %% ==========================================
    class Usuario {
        +int id_usuario
        +String correo
        +String rol
        +List~Testimonio~ lista_testimonios
    }
    class Testimonio {
        +Integer id_testimonio
        +String titulo
        +Usuario id_usuario
        +Categoria id_categoria
        +List~Tag~ tags
    }
    class Categoria {
        +int id_categoria
        +String nombre
    }
    class Tag {
        +int id_tag
        +String nombre
    }

    %% Relaciones de Base de Datos
    IUsuarioRepository --> Usuario : Gestiona
    ITestimonioRepository --> Testimonio : Gestiona
    
    Usuario "1" --> "0..*" Testimonio : Autor
    Categoria "1" --> "0..*" Testimonio : Clasifica
    Testimonio "0..*" --> "0..*" Tag : Contiene

    %% ==========================================
    %% ✉️ DATA TRANSFER OBJECTS (DTOs)
    %% ==========================================
    class AuthRequestDTO {
        +String correo
        +String password
    }
    class RegistroRequestDTO {
        +String nombre
        +String correo
        +String rol
    }
    class AuthResponseDTO {
        +String token
    }

    UsuarioController ..> AuthRequestDTO : Recibe
    UsuarioController ..> RegistroRequestDTO : Recibe
    UsuarioController ..> AuthResponseDTO : Retorna

    %% ==========================================
    %% 🛡️ SEGURIDAD Y EXTERNOS
    %% ==========================================
    class SecurityConfig { }
    class JwtAuthenticationFilter { }
    class JwtUtil { }
    class UserDetailsServiceImpl { }
    class CloudinaryAPI {
        +uploadImage(String) String
    }

    SecurityConfig --> JwtAuthenticationFilter : Configura
    JwtAuthenticationFilter --> JwtUtil : Usa
    JwtAuthenticationFilter --> UserDetailsServiceImpl : Usa
    UserDetailsServiceImpl --> IUsuarioRepository : Consulta usuario
    TestimonioService --> CloudinaryAPI : Sube imagen
```

##  Diagrama Entidad-Relación (DER)

```mermaid
erDiagram
    USUARIO {
        int id_usuario PK
        varchar nombre
        varchar correo UK "unique"
        varchar password
        varchar rol
        varchar estado
        date fecha_creacion
    }

    CATEGORIA {
        int id_categoria PK
        varchar nombre
        varchar descripcion
    }

    TESTIMONIO {
        int id_testimonio PK
        varchar titulo
        text contenido
        varchar estado
        varchar imagen_url
        varchar video_url
        timestamp fecha_creacion
        int id_categoria FK
        int id_usuario FK
    }

    TAG {
        int id_tag PK
        varchar nombre
    }

    %% Tabla intermedia generada por el @JoinTable(name = "testimonio_tag")
    testimonio_tag {
        int id_testimonio PK, FK
        int id_tag PK, FK
    }

    %% ==========================================
    %% RELACIONES (Cardinalidad)
    %% ==========================================
    
    %% Un Usuario puede tener cero o muchos Testimonios
    USUARIO ||--o{ TESTIMONIO : "escribe"

    %% Una Categoría puede tener cero o muchos Testimonios
    CATEGORIA ||--o{ TESTIMONIO : "clasifica"

    %% Relación Muchos a Muchos resolviéndose en la tabla intermedia
    TESTIMONIO ||--o{ testimonio_tag : "tiene"
    TAG ||--o{ testimonio_tag : "pertenece"
```
