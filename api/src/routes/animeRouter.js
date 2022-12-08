const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const animeControllers = require('../controllers/animeController');

const animeRouter = Router();

animeRouter.get('/', animeControllers.get_Animes);

// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = animeRouter;