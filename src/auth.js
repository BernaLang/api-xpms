
const { API_TOKEN } = process.env;

module.exports = {
  checkAuth: checkAuth
}

function checkAuth(req, res, next){
  if (req.headers.apitoken === API_TOKEN) {
    return next();
  } else {
    res.status(401).send('Baza otario.')
  }
}
