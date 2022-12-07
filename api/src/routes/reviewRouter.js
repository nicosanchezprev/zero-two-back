const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const reviewController = require('../controllers/reviewController');

const reviewRouter = Router();

reviewRouter.get('/', reviewController.getReviews());

// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = reviewRouter;

/*headers: {
    "accept-encoding": "*",
  },

  */