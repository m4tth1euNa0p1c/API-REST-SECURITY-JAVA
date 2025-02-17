# Roadmap : Développement de l'API REST Sécurisée

Ce document décrit la feuille de route (roadmap) et les étapes à suivre pour développer l'API REST sécurisée avec Spring Boot. L'objectif est de créer une application robuste pour la gestion d'un catalogue de produits, incluant l'authentification, la gestion d'erreurs, la documentation Swagger, et la containerisation pour le déploiement.

---

## 1. Introduction

L'API REST Sécurisée a pour but de fournir une solution complète et sécurisée pour la gestion d'un catalogue de produits. Le projet intègre :

- **Spring Boot** pour la base de l'application.
- **Spring Security** pour la gestion de l'authentification et de l'autorisation.
- **Swagger** pour la documentation interactive de l'API.
- **Docker** pour la containerisation et le déploiement.
- **Tests unitaires et d'intégration** pour assurer la qualité du code.

---

## 2. Objectifs du Projet

- Développer une API REST sécurisée permettant de gérer un catalogue de produits (CRUD).
- Mettre en place une authentification sécurisée (ex. JWT, Basic Auth, OAuth2).
- Documenter l'API avec Swagger afin que les développeurs puissent tester et comprendre les endpoints.
- Gérer les erreurs de manière centralisée via un gestionnaire global d'exceptions.
- Automatiser le build et les tests avec Maven et GitHub Actions pour l'intégration continue.
- Containeriser l'application pour faciliter le déploiement en production.

---

## 3. Architecture du Projet

La structure du projet suit les conventions Maven et est organisée comme suit :

```
API_REST_security/
├── pom.xml
├── Makefile
├── Dockerfile
├── docker-compose.yml
├── .env
├── README.md
├── ROADMAP.md
├── .gitignore
├── docs/
│   └── swagger-documentation.md
├── scripts/
│   └── run-tests.sh
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/catalog/
│   │   │       ├── ApiRestSecuriseeApplication.java
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   └── SwaggerConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   └── ProductController.java
│   │   │       ├── exception/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   └── ResourceNotFoundException.java
│   │   │       ├── model/
│   │   │       │   └── Product.java
│   │   │       ├── repository/
│   │   │       │   └── ProductRepository.java
│   │   │       └── service/
│   │   │           ├── ProductService.java
│   │   │           └── UserService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/
│           └── com/example/catalog/
│               └── ApiRestSecuriseeApplicationTests.java
```

---

## 4. Roadmap de Développement

### 4.1 Phase 1 : Initialisation du Projet

- Installer Java 17, Maven, Git, Docker et les outils nécessaires.
- Créer le squelette du projet avec la structure de dossiers.
- Mettre en place les fichiers de configuration (`pom.xml`, `application.properties`, `Makefile`, etc.).
- Vérifier le démarrage de l’application avec un simple message "Hello World from API REST Sécurisée!".

### 4.2 Phase 2 : Mise en Place de l'Authentification

- Choisir la méthode d'authentification : JWT, Basic Auth ou OAuth2.
- Configurer `SecurityConfig.java` pour définir les règles d’accès.
- Implémenter `AuthController.java` pour gérer la connexion et l’émission de tokens.
- Créer un service `UserService.java` et les entités/repositories pour gérer les utilisateurs.

### 4.3 Phase 3 : Gestion du Catalogue de Produits

- Créer l’entité `Product` dans le package `model`.
- Implémenter `ProductRepository.java` pour interagir avec la base de données.
- Développer `ProductService.java` pour les opérations CRUD.
- Créer `ProductController.java` pour exposer les endpoints REST (GET, POST, PUT, DELETE).

### 4.4 Phase 4 : Gestion Globale des Erreurs

- Implémenter `GlobalExceptionHandler.java` pour capturer et gérer les exceptions.
- Créer des classes d’exceptions spécifiques comme `ResourceNotFoundException.java`.

### 4.5 Phase 5 : Documentation de l'API

- Mettre en place `SwaggerConfig.java` pour générer la documentation de l’API.
- Accéder à Swagger UI via [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/).
- Mettre à jour la documentation dans `docs/` avec les spécifications des endpoints.

### 4.6 Phase 6 : Tests et Intégration Continue

- Utiliser JUnit 5 et Spring Boot Test pour tester les services et les controllers.
- Configurer un pipeline CI/CD avec GitHub Actions.

### 4.7 Phase 7 : Containerisation et Déploiement

- Configurer le `Dockerfile` et `docker-compose.yml`.
- Mettre en place des scripts d’automatisation dans `scripts/`.

---

## 5. Outils et Technologies

- **Java 17**
- **Spring Boot 2.7.5**
- **Maven**
- **Spring Security**
- **Springfox (Swagger)**
- **JUnit 5**
- **Docker & Docker Compose**
- **Git & GitHub**
- **GitHub Actions** pour CI/CD

---

## 6. Conclusion

Cette roadmap offre une vision claire des étapes de développement pour l'API REST sécurisée. Chaque phase est conçue pour être itérative et testable, permettant ainsi une montée en puissance progressive vers une application de production robuste et sécurisée.

