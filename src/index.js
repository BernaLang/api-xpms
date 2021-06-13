const express = require('express');
require('dotenv').config();
const cors = require('cors')

const Auth = require('./auth');
const WebPost = require('./schema').webPost;

const { PORT } = process.env;

require('./mongoose').then(function() {
  startAPI();
});

function startAPI() {
  const app = express();

  app.use(cors());

  app.use(Auth.checkAuth);

  app.get('/webPosts', (req, res) => {

    return WebPost.find({ approved: true }).sort({ created_at: -1 }).limit(150).then(function(dbResp) {

      const finalData = dbResp.map((webPost) => ({
        id: webPost.id,
        message: webPost.message,
        author: {
          picture: webPost.author.avatarURL,
          name: webPost.author.username
        },
        created_at: webPost.created_at
      }));

      return res.json({ success: true, data: finalData });
    })
  })

  app.get('/', (req, res) => {
    return res.json({ success: true })
  })
  
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
  })
}
