db = db.getSiblingDB('catalog');

if (!db.getCollectionNames().includes("products")) {
  db.createCollection('products');
}

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

if (!db.getCollectionNames().includes("users")) {
  db.createCollection('users');
}

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

db.users.createIndex({ "username": 1 }, { unique: true });
