const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const userController = require('../controllers/userController');
const { validateAccessToken, verifyToken } = require("../middleware/auth0.middleware.js");

const userRouter = Router();

userRouter.post('/google', verifyToken, userController.getUserWithGoogle);
userRouter.post('/', userController.getUser);
userRouter.post('/',userController.createUser)
userRouter.delete('/:email', validateAccessToken, userController.deleteUser);
userRouter.get('/verify/:email/:token', userController.verifyUser)

module.exports = userRouter;