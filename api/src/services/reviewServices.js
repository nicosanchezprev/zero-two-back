const utils = require('../utils/utils');
const {Review, User} = require('../db.js');

exports.addComment = async (comment, nickname) => {
    console.log('comment', comment)
  try {
      const user = await User.findOne({where:{nickname: nickname}})
      console.log(user)
      if(!user) {
        throw new Error(`Please login to post a comment`)
      } else {
        const commentCreated = await Review.create(comment)
        await commentCreated.setUser(user);
        
        const commentUser = await Review.findByPk(commentCreated.id, {
          include: [
            {model: User, attributes: ['nickname']}
          ]
        })

        return commentUser
      }
      
    } catch (error) {
      console.log(error)
      throw new Error(error.message);
    }
}

exports.addReply= async (reply, nickname) => {
  console.log('reply', reply)
try {
    const user = await User.findOne({where:{nickname: nickname}})
    const commentToReply = await Review.findOne({where: {id: 44}})

    console.log(user)
    if(!user) {
      throw new Error(`Please login to post a comment`)
    } else {
      const replyToAdd = await Review.create(reply)
      await commentToReply.setReply(replyToAdd);
      
      const replyUser = await Review.findByPk(reply.id, {
        include: [
          {model: Review, as: 'Reply'}
        ]
      })

      return replyUser
    }
    
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
}

exports.fillReviewModel = async (id) => {
  
    try {
        const reviews = await utils.getAllReviews(id);
        return reviews;
      } catch (error) {
        throw new Error(error.message);
      }
}

exports.getEpisodeComments = async (episodeId) => {
      try {
      
        const comments = await Review.findAll({where: {
          id_episode: episodeId}, include: [
            {model: Review, as: 'Reply', where: {
              replyingTo: 'jud12'
            }}
          ]
        });
        return comments;
      } catch (error) {
        throw new Error(error.message);
      }
}