FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
ARG PROFILE
WORKDIR /app
COPY uploads /app/uploads
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILE}", "-jar", "/app.jar"]
# java -jar *****.jar -> 일반적으로 자바 프로그램 실행하는 명령


