const reviewServices = require('../services/reviewServices');

exports.postComment = async (req, res) => {
    let comment = req.body;
    let userNickname = req.body.nickname;
    delete comment.nickname
    console.log(userNickname)
    try {
        const commentAdded = await reviewServices.addComment(comment, userNickname);
        res.status(200).send(commentAdded);
    } catch (err) {
        res.status(404).send(err.message)
    }
}
exports.postReply = async (req, res) => {
    let reply = req.body;
    let userNickname = req.body.nickname;
    delete reply.nickname
    console.log(userNickname)
    try {
        const replyAdded = await reviewServices.addReply(reply, userNickname);
        res.status(200).send(replyAdded);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

exports.getReviews = async (req, res) => {
    let animeId = req.params.animeId;
    try {
        const allReviews = await reviewServices.fillReviewModel(animeId);
        res.status(200).send(allReviews);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

exports.getReviewsByEpisode = async (req, res) => {
    let episodeId = req.params.episodeId;

    try {
        const episodeComments = await reviewServices.getEpisodeComments(episodeId)
        res.status(200).send(episodeComments);
    } catch (err) {
        res.status(404).send(err.message)
    }
}