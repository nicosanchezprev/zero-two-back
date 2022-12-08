const reviewServices = require('../services/reviewServices');

exports.getReviews = async (req, res) => {
    let animeId = req.params.id;
    try {
        const allReviews = await reviewServices.fillReviewModel(animeId);
        res.status(200).send(allReviews);
    } catch (err) {
        res.status(404).send(err.message)
    }
}