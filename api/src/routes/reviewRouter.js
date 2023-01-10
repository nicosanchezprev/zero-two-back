const { Router } = require('express');
// const {  } = require('../db.js'); // import models from db
const reviewController = require('../controllers/reviewController.js');
const reviewRouter = Router();


//Get the reviews for an anime from the api
reviewRouter.get('/:animeId', reviewController.getReviews);

//Get all the comments for the episode
reviewRouter.get('/episode/:episodeId', reviewController.getReviewsByEpisode);
//Post a new comment, return the comment and the user who post it
reviewRouter.post('/episode/:episodeId/addComment', reviewController.postComment);

reviewRouter.patch('/episode/:episodeId/editComment/:commentId', reviewController.patchComment);

reviewRouter.delete('/episode/:episodeId/deleteComment/:commentId', reviewController.deleteComment)
//Post a new reply for a comment, return the reply to the comment
reviewRouter.post('/episode/:episodeId/replyTo/:idComment', reviewController.postReply)


// animeRouter.post();

// animeRouter.patch();

// animeRouter.delete();

module.exports = reviewRouter;

/*headers: {
    "accept-encoding": "*",
  },

  */