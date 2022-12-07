const { Router } = require('express');

const animeRouter = require('./animeRouter.js');
const genresRouter = require('./genresRouter.js');



const router = Router();
router.use('/animes', animeRouter);
router.use('/genres', genresRouter);
// Flow => routes -> controllers -> services -> utils(if its necesary) :D

module.exports = router;