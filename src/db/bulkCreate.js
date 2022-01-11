const { default: axios } = require("axios");
const db = require('./models/');
const utils = require('./utils/utils')(db);
/*(async () =>{
  
    const count =  await axios.get('https://api.spaceflightnewsapi.net/v3/articles/count');
     const articles = await utils.loopInserts('https://api.spaceflightnewsapi.net/v3',1000,count.data,'article',
    ['featured','title','url','imageUrl','newsSite','summary','publishedAt']);

  })();*/
  