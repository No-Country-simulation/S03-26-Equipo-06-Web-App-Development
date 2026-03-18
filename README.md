# S03-26-Equipo-06-Web-App-Development
CMS para gestionar y publicar testimonios con soporte multimedia.

## Requirements

- [Node.js](https://nodejs.org/es) 22+
- [Java](https://adoptium.net/) 21+

## Execution

### Development

#### Backend

```sh
cd cms-api
mvnw spring-boot:run
```

#### Frontend

```sh
cd cms-web
npm install
npm run dev
```

### Docker

```sh
docker-compose up --build
```

- Web: http://localhost:5173
- API: http://localhost:8080
