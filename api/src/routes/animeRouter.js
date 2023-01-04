const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const animeControllers = require('../controllers/animeController');

const animeRouter = Router();

animeRouter.get('/', animeControllers.get_Animes);
animeRouter.get('/newest', animeControllers.require_Newest);
animeRouter.get('/trending', animeControllers.require_Trending);
animeRouter.get('/oldest', animeControllers.require_Oldest);
animeRouter.get('/:id', animeControllers.require_Anime);
// animeRouter.patch(); //show: true/false -> Admin can disable anime 



module.exports = animeRouter;