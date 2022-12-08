const utils = require('../utils/utils');

exports.fillReviewModel = async (id) => {
  
    try {
        const reviews = await utils.getAllReviews(id);
        return reviews;
      } catch (error) {
        throw new Error(error.message);
      }
}