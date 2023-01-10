
const {Like, User, Review} = require('../db.js');

exports.changeLikeStatus = async (userId, commentId) => {
    const likeToChange = await Like.findOne({where: {userId: userId, reviewId: commentId}})
    const user = await User.findByPk(userId);
    const commentToChangeLike = await Review.findByPk(commentId);
      try {
    
        if (!commentToChangeLike) return('Comment not founded');
        else {
            let like;
            if(!likeToChange) {
                like = await Like.create();
                like.created = !like.created;
                await like.save();
                await like.setUser(user);
                await like.setReview(commentToChangeLike)
                await like.save();

                return ('Like change and created')
                
            } else {
                console.log(likeToChange)
                likeToChange.created = !likeToChange.created;
                await likeToChange.save();

                return('Like changed');
            }
            
        }
      } catch (err) {
        console.log(err)
        throw new Error('Like could not be modify')
      }
}