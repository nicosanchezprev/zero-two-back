const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const animeControllers = require('../controllers/animeController');

const animeRouter = Router();

animeRouter.get('/', animeControllers.get_Animes);
animeRouter.get('/:id', animeControllers.require_Anime);
// animeRouter.patch(); //show: true/false -> Admin can disable anime 



module.exports = animeRouter;