const axios = require('axios');

module.exports = (db) => {
    const pagination = require('../utils/pagination')();
    /** Script para inserir artigos no banco de dados **/
    const bulkCreateByURL = async (url, start, limit, model, allowedFields) => {
        const response = await axios.get(`${url}/${model}s?_limit=${limit}&_start=${start}`)
     

        const arrayToInsert =  response.data.map(o => allowedFields.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
        }, {}));

       const inserts = await db[model].bulkCreate(
            arrayToInsert
            
       )


    }
    const loopInserts = async (url, limit, count, model, allowedFields) => {
        try {

            let pageCount = pagination.getPageCount(limit, count);

            for (var i = 0; i < pageCount; i++) {
                let offset = pagination.getOffset(i+1, limit);
                await bulkCreateByURL(url, offset, limit, model, allowedFields);

            }
        } catch (e) {
            console.log(e)
        }


    }

 



    return Object.create({
        bulkCreateByURL, loopInserts
    })

}