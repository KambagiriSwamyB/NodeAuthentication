var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const firebase = require('firebase-admin');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res) {

  let { username, password } = req.body;
  console.log(username, password, req.body);
  req.session.user = username;
  console.log(req.session);
  var token = jwt.sign({ username: username }, 'superSecret', {
    expiresIn: '60' // expires in 24 hours
  });
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });

})

router.get('/logout', function (req, res) {
  // req.session.user = null;
  let db = firebase.database().ref();
  console.log(req.session.id);
  req.session.destroy();
  res.send('loged out successfully');

})

router.get('/securedpage', function (req, res) {
  console.log(req.session);
  if (!req.session.user) {
    res.status(401).send();
  } else {
    res.status(200).send('you got access!');
  }
})


module.exports = router;
