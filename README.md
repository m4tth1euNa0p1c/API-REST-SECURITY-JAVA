# API REST Sécurisée - Catalogue de Produits

## Description

Ce projet est une API REST sécurisée développée avec **Spring Boot**. Elle permet de gérer un catalogue de produits tout en assurant une sécurisation avancée via **Spring Security**.

L'API intègre également **Swagger** pour la documentation, **Docker** pour la containerisation, et suit les bonnes pratiques de développement avec une architecture modulaire et testable.

## Fonctionnalités

- Gestion des produits (CRUD : Create, Read, Update, Delete).
- Authentification et autorisation via **JWT** ou **OAuth2**.
- Documentation interactive avec **Swagger UI**.
- Gestion centralisée des erreurs.
- Tests unitaires et d'intégration avec **JUnit**.
- Prêt à être déployé en environnement Docker.
- Intégration continue et déploiement avec **GitHub Actions**.

## Installation et Exécution

### Prérequis

- **Java 17**
- **Maven**
- **Docker & Docker Compose** (optionnel pour l'exécution containerisée)
- **Git**

### Installation

1. **Cloner le dépôt** :
   ```sh
   git clone https://github.com/votre-repo/api-rest-security.git
   cd api-rest-security
   ```

2. **Construire le projet avec Maven** :
   ```sh
   mvn clean package
   ```

### Exécution

#### Exécution locale

```sh
mvn spring-boot:run
```
L'API sera accessible sur : `http://localhost:8080`

#### Exécution avec Docker

1. **Construire l'image Docker** :
   ```sh
   docker build -t api-rest-security .
   ```
2. **Démarrer le conteneur** :
   ```sh
   docker run -p 8080:8080 api-rest-security
   ```

### Accès à Swagger UI

Une fois l'application démarrée, accédez à la documentation interactive :
[http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/)

## Structure du Projet

```
API_REST_security/
├── src/
│   ├── main/
│   │   ├── java/com/example/catalog/
│   │   │   ├── ApiRestSecuriseeApplication.java
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── exception/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   └── service/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── README.md
└── ROADMAP.md
```

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :
- Forkez le dépôt
- Créez une branche (`git checkout -b feature-nouvelle-fonctionnalite`)
- Faites vos modifications et committez (`git commit -m 'Ajout de nouvelle fonctionnalité'`)
- Poussez la branche (`git push origin feature-nouvelle-fonctionnalite`)
- Créez une Pull Request
