const utils = require('../utils/utils');
const {Review, User, Like} = require('../db.js');
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
    // console.log(episodeId, commentId)
    // console.log(commentToReply)
    // console.log(user)
    if(!user) {
      throw new Error(`Please login to post a comment`)
    } else {
      if (!commentToReply) throw new Error('Invalid reply');

      const replyToAdd = await Review.create(reply);
      await replyToAdd.setUser(user);

      replyToAdd.parent_id = commentToReply.parent_id === null ? commentToReply.id : commentToReply.parent_id;
      await replyToAdd.save()
      await commentToReply.addReply(replyToAdd);
      replyToAdd.reply_id= commentToReply.parent_id === null ? commentToReply.id : commentToReply.parent_id;
      await replyToAdd.save()
      // console.log('a', replyToAdd)
      // console.log(nickname)
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
          id_episode: episodeId, 
         replyingTo: {
              [Op.is]: null
            },}, 
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
            id_episode: episodeId,
            parent_id : {[Op.not]: null}
            },
            include: 
            {
              model: User,
              attributes: ['nickname']
            },},
            {
              model: Like,
  
            },
            
          ],
          // group: ['Like.reviewId'],
          // raw:true,
          order: [['id', 'desc'], ['Replies', 'id', 'asc']]
          // nested:true
        });
        let auxComments;
        auxComments = await comments.map(comment => {
          let likesLength = comment.dataValues.likes.filter(like => like.created === true).length;
          console.log(likesLength)
          comment.dataValues.likes = likesLength;
          return comment;
        } )
        // comments.forEach(comment => comment.likes = comment.likes.length)
        return auxComments;
        
      } catch (error) {
        console.log(error)
        throw new Error(error.message);
      }
}

exports.deletePost = async(episodeId, commentId) => {
  try {
    console.log(commentId)
    let commentToDelete = await Review.findOne({where: {id: commentId, id_episode: episodeId}});
    if(!commentToDelete) {
      throw new Error(`The comment wasn't founded`);
    }
    else {
      await Review.destroy({where: {id: commentId}});
      return 'Deleted';
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message);
  }
}

exports.editPost = async(episodeId, commentId, content) => {
  try {
    console.log(commentId)
    let commentToEdit = await Review.findOne({where: {id: commentId, id_episode: episodeId}});
    if(!commentToEdit) {
      throw new Error(`The comment can't be edited`);
    }
    else {
      console.log(content)
      commentToEdit.content = content
      await commentToEdit.save();
      return 'Comment edited successfully!'
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message);
  }
}