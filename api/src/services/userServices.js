const { User } = require('../db.js');


exports.getUserInfo = async (email) => {
    console.log(email)
    try {
        const user = await User.findOne({where: {email: email}});
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
}

exports.createUser = async (user) => {
  const name = user.nickname;
  const pokemonInDatabase = await User.findAll({where: {nickname: name}});
  const pokemonExists = await pokemonInDatabase.length 
  
  try {
    if(pokemonExists) {
      throw new Error('User already exists');
    } else {
      const userCreated = await User.create(user);
      return userCreated;
    }
   
  } catch (err) {
    throw new Error(err.message);
  }
}

exports.deleteUser = async (id) => {
  let user = await User.findByPk(id);
  
  try {
    if(!user) {
      throw new Error('User could not be founded');
    } else {
      await User.destroy({where: {id: id}});
      return 'User deleted successfully!'
    }
  } catch(err) {
    throw new Error(err.message);
  }
}