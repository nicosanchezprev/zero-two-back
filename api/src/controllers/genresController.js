const genreServices = require('../services/genresServices');

exports.getGenres = async (req, res) => {
    try {
        const allGenres = await genreServices.fillGenreModel();
        res.status(200).send(allGenres);
    } catch (err) {
        res.status(404).send(err.message)
    }
}