const cron = require('node-cron');
const db = require('../models/');
const { default: axios } = require("axios");
const articles = require('../controllers/articles')(db);
const logger = require('../utils/logger');

cron.schedule('0 9 * * *', () => {
    const count =  await axios.get('https://api.spaceflightnewsapi.net/v3/articles/count');
    const newArticles = await articles.insertNewArticles(count.data,'https://api.spaceflightnewsapi.net/v3');
    if(!newArticles){
        logger.error("CRON failed to insert new Articles into the database.");
          /*Diferencial 1 Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
            Diferencial 3 Descrever a documentação da API utilizando o conceito de Open API 3.0;
            Diferencial 4 Escrever Unit Tests para os endpoints da API;*/ 
    }
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });