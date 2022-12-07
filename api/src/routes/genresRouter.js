const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const genreControllers = require('../controllers/genresController.js');
const genresRouter = Router();

genresRouter.get('/', genreControllers.getGenres);

module.exports = genresRouter;