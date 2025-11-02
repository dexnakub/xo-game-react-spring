# Stage 1: build
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# ติดตั้ง Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

COPY pom.xml .
COPY src ./src

# build jar
RUN mvn clean package -DskipTests

# Stage 2: run
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app

COPY --from=build /app/target/xogame-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
