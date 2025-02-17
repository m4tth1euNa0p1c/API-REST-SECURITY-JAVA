db = db.getSiblingDB('catalog');

// Créer la collection "products" vide
db.createCollection('products');

// Créer la collection "users" et insérer des documents d'exemple
db.createCollection('users');

db.users.insertMany([
  {
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
    password: "$2a$10$yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
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
    password: "$2a$10$zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    firstName: "User",
    lastName: "Two",
    roles: ["USER"],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
