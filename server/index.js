const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {getAllCountries} = require("./src/controllers/getAllCountries.js")

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  getAllCountries() //porque tengo que "traer" a todos los countries a mi db
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
