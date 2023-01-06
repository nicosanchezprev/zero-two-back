const { Router } = require('express');

const animeRouter = require('./animeRouter.js');
const genresRouter = require('./genresRouter.js');
const episodeRouter = require('./episodeRouter.js');
const reviewRouter = require('./reviewRouter.js');
const userRouter = require('./userRouter.js');
const adminRouter = require('./adminRouter.js');
const listRouter = require('./listRouter.js');
const router = Router();

router.use('/animes', animeRouter);
router.use('/genres', genresRouter);
router.use('/episodes', episodeRouter);
router.use('/reviews', reviewRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/list', listRouter);
  
module.exports = router;