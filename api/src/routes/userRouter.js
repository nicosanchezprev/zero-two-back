const { Router } = require('express');
const userController = require('../controllers/userController');
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const userRouter = Router();

userRouter.get('/:email', validateAccessToken, userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;