const likeServices = require('../services/likeServices');

exports.patchLike = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.params.userId;
    try {
        const likeChange = await likeServices.changeLikeStatus(userId, commentId)
        res.status(200).send(likeChange);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message)
    }
}