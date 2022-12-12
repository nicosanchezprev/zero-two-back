const { Router } = require('express');

const animeRouter = require('./animeRouter.js');
const genresRouter = require('./genresRouter.js');
const episodeRouter = require('./episodeRouter.js');
const reviewRouter = require('./reviewRouter.js');

const router = Router();

router.use('/animes', animeRouter);
router.use('/genres', genresRouter);
router.use('/episodes', episodeRouter);
router.use('/reviews', reviewRouter);
// Flow => routes -> controllers -> services -> utils(if its necesary) :D
// 
// dispatch > bd > client -> id -> api
module.exports = router;