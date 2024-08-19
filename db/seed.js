require("dotenv").config();

const client = require("./client");
const { createUser } = require("./users");
// import createBook

const users = [
  [
    {
      firstname: "Alice",
      lastname: "Johnson",
      email: "alice@example.com",
      password: "alice123",
    },
    {
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@example.com",
      password: "bob456",
    },
    {
      firstname: "Charlie",
      lastname: "Brown",
      email: "charlie@example.com",
      password: "charlie789",
    },
  ],
];

const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXIST users`);
    //DROP TABLE and RUN
    await client.query(`DROP TABLE IF EXISTS books`);
  } catch (err) {
    console.log(err);
  }
};

// SQL / query lang.
const createTables = async () => {
  try {
    await client.query(
      `CREATE TABLE USERS (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(64),
        lastname VARCHAR(64),
        email VARCHAR(64) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        )`
    );

    // CREATE TABLE and RUN
    //Id, Title 255 not null, Author 128 not null, Description 1024, cover img 255 in Channel
    //boolean default true

    await client.query(
      `CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(127) NOT NULL,
        description VARCHAR(1023),
        coverimage VARCHAR (255) DEFAULT 'https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg',
        available BOOLEAN DEFAULT TRUE
        )`
    );
  } catch (err) {
    console.log(err);
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (err) {
    console.log(err);
  }
};

// create function insert books that loops over the books aray above and inserts into the database

const seedDatabase = async () => {
  try {
    client.connect();
    console.log("DROPPING TABLES...");
    await dropTables();
    console.log("TABLES DROPPED");
    console.log("CREATING TABLES...");
    await createTables();
    console.log("TABLES SUCCESSFULLY CREATED");
    await createUser([0]);
    console.log("INSERTING USERS...");
    await insertUsers();
    console.log("USERS ADDES SUCCESSFULLY");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};
