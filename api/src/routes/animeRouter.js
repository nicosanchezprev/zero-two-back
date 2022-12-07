const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const animeControllers = require('../controllers/animeController');

const animeRouter = Router();

animeRouter.get('/', animeControllers.create_anime);

// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = animeRouter;