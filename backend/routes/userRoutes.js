const express = require('express')

const { registerUser,login,editUser,currentUser } = require('../Controller/userController')
const protect = require('../middlewares/auth')
const router = express.Router();

router.post('/login',login)

router.post('/register',registerUser)

router.get('/currentUser',protect,currentUser)

router.put('/:user',editUser)


module.exports = router;