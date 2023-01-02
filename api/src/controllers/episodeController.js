const episodeServices = require('../services/episodeService');
exports.getEpisode = async (req, res) => {
    const { idAnime, idEpisode } = req.params;
    console.log(idAnime,idEpisode)
    try {
        const episode = await episodeServices.getEpisode(idAnime, idEpisode);
        res.status(200).send(episode)
    } catch (err) {
        res.status(404).send(err.message);
    }
}
exports.getEpisodes = async (req, res) => {
    const { id } = req.params;
    try {
        const allEpisodes = await episodeServices.fillEpisodesAnime(id);
        res.status(200).send(allEpisodes);
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.getEpisodesNewest = async (req, res) => {
    const { id } = req.params;
    try {
        const newestEpisodes = await episodeServices.getNewestEpisodes(id);
        res.status(200).send(newestEpisodes);
    } catch (error) {
        res.status(404).send(error.message);
    }
}