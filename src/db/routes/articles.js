const express = require("express");
const app = express();
const router = new express.Router();
app.use(express.json());
const db = require('../models/');
const { default: axios } = require("axios");
const utils = require('../utils/utils')(db);
const articles = require('../controllers/articles')(db);
const logger = require('../utils/logger');

router.get('/articles', async (req,res) => {
    try{
        const allArticles = await articles.getArticles(req);
        if(!allArticles){
            res.status(404).send('No articles were found.');
        }
        res.status(200).send(allArticles);

    }
    catch(e){
        console.log(e)
        res.status(500).send(e);
    }
    
})
router.get('/articles/:id', async (req,res) => {
    try{
        const article = await articles.getArticle(req.params.id);
        if(!article){
            res.status(404).send('Article not found.');
        }
        res.status(200).send(article);

    }
    catch(e){
        logger.error(e);
    }
    
})
router.post('/articles', async (req,res) => {
    try{
        const allArticles = await db.article.create(req.body);
        if(!allArticles){
            res.status(404).send('Article not found.');
        }
        res.status(201).send(allArticles);

    }
    catch(e){
        logger.error(e);
    }
    
})
router.put('/articles/:id', async (req,res) => {
    try{
        const article = await db.article.update(req.body,{
            where:{
                id: req.params.id
            }
        })
        const updatedArticle = await db.article.findOne({
            where:{
                id: req.params.id
            }
        })
        res.status(200).send(updatedArticle);

    }
    catch(e){
        logger.error(e);
    }
    
})
router.delete('/articles/:id', async (req,res) => {
    try{
        const article = await db.article.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).send('Excluído com sucesso.');

    }
    catch(e){
        logger.error(e);
    }
    
})

module.exports = router;