const app = require('./app');

const port = process.env.PORT || 3030;

  


app.listen(port, '127.0.0.1', () => {
  console.log("Listening on port " + port);
})



