const route = require('express').Router();
const userController = require('../controllers/userController.js')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/getAllUser', userController.getAllUser);
route.post('/getUserById', userController.getUserById);
route.post('/updateUserById', userController.updateUser);
route.post('/deleteUser', userController.deleteuser)

module.exports = route;