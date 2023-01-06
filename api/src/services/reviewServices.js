const utils = require('../utils/utils');
const {Review, User} = require('../db.js');
const { where, Op } = require('sequelize');

exports.fillReviewModel = async (id) => {
  
  try {
      const reviews = await utils.getAllReviews(id);
      return reviews;
    } catch (error) {
      throw new Error(error.message);
    }
}

exports.addComment = async (comment, nickname, ParentId) => {
    console.log('comment', comment)
  try {
      const user = await User.findOne({where:{nickname: nickname}})
      console.log(user)
      if(!user) {
        throw new Error(`Please login to post a comment`)
      } else {

        const commentToAdd = await Review.create(comment)
        await commentToAdd.setUser(user);

        if (commentToAdd.replyingTo === null) {
          let commentCreated = await Review.findOne({where: {
            id: commentToAdd.id
          },
          include: [
            {model: User, attributes: [ 'id','nickname', 'plan']},
            {model: Review, as: 'Replies'},
          ]
        })
          console.log('COMMENT ADDED' , commentToAdd)
         return commentCreated;

        } else {
          let commentToReply = await Review.findOne({where: {id: ParentId}})
          
          await commentToReply.addReply(commentToAdd);

          let replyCreated = await Review.findOne({where: {
            id: commentToAdd.id
          },
          include: [
            {model: User, attributes: [ 'id','nickname', 'plan']},
            {model: Review, as: 'Replies'},
          ]
        })

        return replyCreated
        }
      
      }
      
    } catch (error) {
      console.log(error)
      throw new Error(error.message);
    }
}

exports.addReply= async (reply, nickname, episodeId,  commentId) => {
  console.log('reply', reply)
try {
    const user = await User.findOne({where:{nickname: nickname}})
    const commentToReply = await Review.findOne({where: {id: commentId}})
    console.log(episodeId, commentId)
    console.log(commentToReply)
    // console.log(user)
    if(!user) {
      throw new Error(`Please login to post a comment`)
    } else {
      if (!commentToReply) throw new Error('Invalid reply');

      const replyToAdd = await Review.create(reply);
      await replyToAdd.setUser(user);
      await commentToReply.addReply(replyToAdd);

      console.log(nickname)
      let replyCreated = await Review.findOne({where: {
        id: replyToAdd.id
        },
        include: [
        {model: User, attributes: [ 'id','nickname', 'plan']},
        {model: Review, as: 'Replies'},
        ]
        })

      return replyCreated
    }
    
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
}



exports.getEpisodeComments = async (episodeId) => {
      try {
      
        const comments = await Review.findAll({where: {
          id_episode: episodeId}, 
           include: [
            {
              model: User,
              attributes: ['nickname'],
            },
            {
            model: Review, as: 'Replies',
            required: false,
            // include: { all: true, nested: true },
            where: {
            // replyingTo: {
            //   [Op.not]: null
            // },
            id_episode: episodeId
            },
            include: 
            {
              model: User,
              attributes: ['nickname']
            },}
          ]
        });
        return comments;
      } catch (error) {
        throw new Error(error.message);
      }
}