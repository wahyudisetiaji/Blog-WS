var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller')

/* GET users listing. */
router.get('/', UserController.findUser)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

module.exports = router;
