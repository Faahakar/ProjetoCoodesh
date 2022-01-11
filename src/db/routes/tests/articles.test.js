const request = require('supertest');
const app = require('../../app');
const db = require('../../models/');
describe('Endpoints', () => {
    test('should get an article passing an id', async () => {
      const res = await request(app)
        .get(`/articles/`+7)
      expect(200);
    
    })

    test('should get all articles with pagination', async () => {
        const res = await request(app)
          .get('/articles')
        expect(200);
        expect(res.body).toHaveProperty('articles');
       
        
      })

      test('should create an article', async () => {
        const res = await request(app)
          .post('/articles')
          .send({
            "featured": false,
           "title": "Iridium-6/GRACE-FO Mission",
           "url": "https://www.spacex.com/news/2018/05/22/iridium-6grace-fo-mission",
           "imageUrl": "https://www.spacex.com/sites/spacex/files/styles/featured_news_widget_image/public/field/image/irdmgracefoliftoff.png?itok=LUQXoVL1",
           "newsSite": "SpaceX",
           "summary": "",
           "publishedAt": "2018-05-21T22:00:00.000Z"
       })
        expect(201);
       
        
      })

      test('should update an article', async () => {
        const res = await request(app)
          .put('/articles'+5)
          .send({
                "summary": "teste"
          })
        expect(200);
       
        
      })
      test('should delete an article', async () => {
        const res = await request(app)
          .del('/articles'+6)
        expect(200);
       
        
      })

  })

