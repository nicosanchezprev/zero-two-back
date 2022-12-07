const episodeServices = require('../services/episodeService');

exports.getEpisodes = async (req, res) => {
    try {
        const allEpisodes = await episodeServices.fillEpisodeModel();
        res.status(200).send(allReviews);
    } catch (err) {
        res.status(404).send(err.message)
    }
}