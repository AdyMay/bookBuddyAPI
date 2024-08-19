const client = require("./client");

const creatUser = async ({ firstname, lastname, email, password }) => {
  try {
    const SQL = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) ON CONFLICT(email) DO NOTHING RETURNING id, firstname, lastname, email`;
    const {
      rows: [user],
    } = await client.query(SQL, [firstname, lastname, email, password]);
    console.log(user);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// const getUserByEmail(email)

modult.exports = { createUser };
