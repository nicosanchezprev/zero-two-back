const reviewServices = require('../services/reviewServices');

exports.getReviews = async (req, res) => {
    try {
        const allReviews = await reviewServices.fillReviewModel();
        res.status(200).send(allReviews);
    } catch (err) {
        res.status(404).send(err.message)
    }
}