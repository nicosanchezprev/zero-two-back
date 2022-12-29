const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const userController = require('../controllers/userController');
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const userRouter = Router();
// userRouter.get('/', validateAccessToken, userController.getUser);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser)
userRouter.delete('/:id', userController.deleteUser);
// userController.get('/:id', episodeController.getEpisodes);

// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = userRouter;