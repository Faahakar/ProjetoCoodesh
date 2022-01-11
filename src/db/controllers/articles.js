const axios = require('axios');
const fs = require('fs');
const path = require('path');
module.exports = (db) => {
  const pagination = require('../utils/pagination')();

  const getArticles = async (req) => {
    let { start, limit, order_by, order_direction } = req.params;
    let order = [];
    const plimit = parseInt(limit, 10) || 10;
    const page = parseInt(start, 10) || 1;

    if (order_by && order_direction) {
      order.push([order_by, order_direction]);
    }
    let options = {
      offset: pagination.getOffset(page, plimit),
      limit: plimit,
    };
    if (start == null || typeof start === 'undefined') {
      start = 1;
    }
    if (order && order.length) {
      options.order = order;
    }
    else {
      options.order = ['id', 'ASC'];
    }
    const where = {};

    const articles = await db.article.findAll({
      attributes: ['id', 'featured', 'title', 'url', 'imageUrl', 'newsSite', 'summary', 'publishedAt'],
      where,
      include: [{
        model: db.launch,
        attributes: ['id', 'provider'],
        through:{
          attributes:[]
        }
      }, {
        model: db.event,
        attributes: ['id', 'provider'],
        through:{
          attributes:[]
        }
      }],
      limit: options.limit,
      offset: options.offset,
      order: [options.order],
      raw: true,
      nest: true
    })

    const count = await db.article.count({
      attributes: ['id'],
      where,
      include: [{
        model: db.launch,
        attributes: ['id']
      }, {
        model: db.event,
        attributes: ['id']
      }],
      raw: true,
      nest: true
    })
    return {
      previousPage: pagination.getPreviousPage(page),
      currentPage: page,
      nextPage: pagination.getNextPage(page, plimit, count),
      total: count,
      limit: plimit,
      articles
    }

  }
  const getArticle = async (id) => {
    const article = await db.article.findOne({
      attributes: ['id', 'featured', 'title', 'url', 'imageUrl', 'newsSite', 'summary', 'publishedAt'],
      where: {
        id
      },
      include: [{
        model: db.launch,
        attributes: ['id', 'provider'],
        through:{
          attributes:[]
        }
      }, {
        model: db.event,
        attributes: ['id', 'provider'],
        through:{
          attributes:[]
        }
      }],
      raw: true,
      nest: true
    })
    return article;

  }
  const insertNewArticles = async(count,url) =>{
    const lastPublishedArticle = await axios.get(`${url}/articles?_limit=${1}&_start=${count - 1}&_sort=publishedAt`)
    const dateOfLastArticle = lastPublishedArticle.data[0].publishedAt;
    
      const data = await fs.promises.readFile(path.resolve(__dirname,"../../date.json"))
       
      obj = JSON.parse(data);
      if(!Object.keys(obj).length){
        obj.date = dateOfLastArticle;
          fs.writeFile(path.resolve(__dirname,"../../date.json"),JSON.stringify(obj),function(err,data){
              if(err) throw err;
          });
      }
      let lastSavedDate = obj.date;
      var date = new Date();
      const newArticlesToInsert = await axios.get(`${url}/articles?publishedAt_lte=${date.getTime()}&publishedAt_gt=${Date.parse(lastSavedDate)}`)
      if(newArticlesToInsert.length > 0){
       

        const map = newArticlesToInsert.map(elem =>({
          title: elem.title,
          url: elem.url,
          imageUrl: elem.imageUrl,
          newsSite: elem.newsSite,
          summary: elem.summary,
          publishedAt: elem.publishedAt,
          updatedAt: elem.updatedAt,
          featured: false,
        }))
        const insert = await db.article.bulkCreate(map);
        if(insert){
          obj.date = newArticlesToInsert[0];
          fs.writeFile(path.resolve(__dirname,"../../date.json"),JSON.stringify(obj),function(err,data){
            if(err) throw err;
        });
        }


      }
      return newArticlesToInsert;
  }
  return Object.create({
    getArticles, getArticle,insertNewArticles
  })


}