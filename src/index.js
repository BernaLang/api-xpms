const express = require('express');
require('dotenv').config();

const Auth = require('./auth');
const WebPost = require('./schema').webPost;

const { PORT } = process.env;

require('./mongoose').then(function() {
  startAPI();
});

function startAPI() {
  const app = express();

  app.use(Auth.checkAuth);

  app.get('/webPosts', (req, res) => {

    return WebPost.find({ approved: true }).then(function(dbResp) {
      return res.json({ success: true, data: dbResp });
    })
  })

  app.get('/', (req, res) => {
    return res.json({ success: true })
  })
  
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
  })
}
