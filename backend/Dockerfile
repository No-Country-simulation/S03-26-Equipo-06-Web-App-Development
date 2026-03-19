FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY . ./

RUN apk add --no-cache bash dos2unix && \
    dos2unix ./mvnw && \
    chmod +x ./mvnw && \
    ./mvnw dependency:go-offline -B && \
    ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine

RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
