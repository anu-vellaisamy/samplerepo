const router = require('express').Router();
const { register} = require('../controllers/userController')

router.post('/register', register)
// router.post('/login', login)


module.exports=router;