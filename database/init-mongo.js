// Sélection de la base de données "catalog"
db = db.getSiblingDB('catalog');

// Création de la collection "products" (si elle n'existe pas déjà)
if (!db.getCollectionNames().includes("products")) {
  db.createCollection('products');
}

// Insertion de produits d'exemple dans la collection "products"
db.products.insertMany([
  {
    name: "Produit 1",
    description: "Description du produit 1",
    price: 19.99
  },
  {
    name: "Produit 2",
    description: "Description du produit 2",
    price: 29.99
  },
  {
    name: "Produit 3",
    description: "Description du produit 3",
    price: 39.99
  }
]);

// Création de la collection "users" (si elle n'existe pas déjà)
if (!db.getCollectionNames().includes("users")) {
  db.createCollection('users');
}

// Insertion d'utilisateurs d'exemple dans la collection "users"
db.users.insertMany([
  {
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Mot de passe hashé d'exemple
    firstName: "Admin",
    lastName: "User",
    roles: ["ADMIN", "USER"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "user1",
    email: "user1@example.com",
    password: "$2a$10$yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", // Mot de passe hashé d'exemple
    firstName: "User",
    lastName: "One",
    roles: ["USER"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "$2a$10$zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // Mot de passe hashé d'exemple
    firstName: "User",
    lastName: "Two",
    roles: ["USER"],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Création d'un index unique sur le champ "username" pour la collection "users"
db.users.createIndex({ "username": 1 }, { unique: true });
