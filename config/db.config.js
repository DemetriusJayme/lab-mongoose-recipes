// db.config.js
const mongoose = require("mongoose"); //importar o mongoose

//criar uma função async chamada: connect
async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectado ao banco de dados:", dbConnection.connection.name);
  } catch (error) {
    console.error("Connection error: " + error);
  }
}

module.exports = connect;
