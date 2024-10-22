FROM gradle:jdk23-alpine
COPY . .
RUN gradle build
ENTRYPOINT ["java","-jar","build/libs/backend-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]