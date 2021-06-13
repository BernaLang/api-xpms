
const { API_TOKEN } = process.env;

module.exports = {
  checkAuth: checkAuth
}

function checkAuth(req, res, next){
  if (req.headers.apitoken === API_TOKEN) {
    return next();
  } else {

    const errObj = { 
      headers: req.headers,
      url: req.url,
      body: req.body,
      method: req.method
    };
    console.log('Rejected API: ', JSON.stringify(errObj));
    res.status(401).json({ message: 'Baza otario.'})
  }
}
