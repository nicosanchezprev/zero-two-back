const { Router } = require('express');
const userController = require('../controllers/userController');
const { validateAccessToken, verifyToken } = require("../middleware/auth0.middleware.js");

const userRouter = Router();
userRouter.get('/', userController.getUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/google', verifyToken, userController.getUserWithGoogle);
userRouter.post('/register',userController.createUser)


userRouter.delete('/:email', validateAccessToken, userController.deleteUser);
userRouter.get('/verify/:email/:token', userController.verifyUser)

module.exports = userRouter;