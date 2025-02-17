.PHONY: build run test clean docker-build docker-run

build:
	mvn clean package

run:
	mvn spring-boot:run

test:
	mvn test

clean:
	mvn clean

docker-build:
	docker build -t api-rest-securisee .

docker-run:
	docker run -p 8080:8080 --env-file .env api-rest-securisee
