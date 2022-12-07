const utils = require('../utils/utils');

exports.fillReviewModel = async () => {
    try {
        const reviews = await utils.getAllReviews();
        return reviews;
      } catch (error) {
        return "ESTO ES INFO" + error.message;
      }
}