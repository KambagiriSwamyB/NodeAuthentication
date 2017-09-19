var express = require('express');
var emailhandler = require('../handlers/email-handler');
var videohandler = require('../handlers/video-handler');
var isAuthenticated = require('../middlewares/auth');
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

router.get('/securedpage', isAuthenticated, function (req, res) {
  console.log(req.session);
  res.status(200).send('you got access!');

})

router.post('/sendmail', isAuthenticated, (req, res) => {
  emailhandler(req, res)
})

router.get('/video', isAuthenticated, function (req, res) {
  videohandler(req, res);
})



module.exports = router;
