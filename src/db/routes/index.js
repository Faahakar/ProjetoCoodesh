const express = require("express");
const app = express();
const router = new express.Router();
app.use(express.json());

router.get('/', async (req,res) =>{
    res.status(200).send('Back-end Challenge 2021 🏅 - Space Flight News');
})

module.exports = router;