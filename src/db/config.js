require('dotenv').config()
const config = {
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME
    }
   };
   
module.exports = config;