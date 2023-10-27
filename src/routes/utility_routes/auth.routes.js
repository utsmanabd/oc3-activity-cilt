var express = require('express');
var router = express.Router();
const AuthController = require('../../controller/auth_controller/AuthController')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/update-token', AuthController.updateToken)

module.exports = router;