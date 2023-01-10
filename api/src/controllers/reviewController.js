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
    let espisodeId = req.params.episodeId;
    let idComment = req.params.idComment;
    delete reply.nickname
    console.log(userNickname)
    try {
        const replyAdded = await reviewServices.addReply(reply, userNickname, espisodeId, idComment);
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

exports.deleteComment = async (req, res) => {
    let episodeId = req.params.episodeId;
    let commentId = req.params.commentId;

    try {
        const commentDeleted = await reviewServices.deletePost(episodeId, commentId)
        res.status(200).send(commentDeleted);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

exports.patchComment = async (req, res) => {
    let episodeId = req.params.episodeId;
    let commentId = req.params.commentId;
    let content = req.body.content
    console.log(req.body)
    try {
        const commentEdited = await reviewServices.editPost(episodeId, commentId, content)
        res.status(200).send(commentEdited);
    } catch (err) {
        console.log(err.message)
        res.status(404).send(err.message)
    }
}