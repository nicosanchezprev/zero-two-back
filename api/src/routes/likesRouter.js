const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const likeController = require('../controllers/likeController.js');
const likeRouter = Router();


//Modify a like
likeRouter.patch('/change/:userId/:commentId', likeController.patchLike);

module.exports = likeRouter;
