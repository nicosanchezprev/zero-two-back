const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const episodeController = require('../controllers/episodeController');

const episodeRouter = Router();

episodeRouter.get('/:id', episodeController.getEpisodes);

// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = episodeRouter;

/*headers: {
    "accept-encoding": "*",
  },

  */