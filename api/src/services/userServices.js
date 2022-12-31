const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken.js');
const sendEmail  =require ('../utils/sendEmail.js');
const comparePassword = require('../utils/comparePassword.js');
const dotenv = require('dotenv').config();

exports.getUserInfoWithGoogle = async (email) => {
  try {
    const user = await User.findOne({where: {email: email}})
    if (!user) {
      throw new Error('User has not been registered yet. Please Sign up')
    } else {
      if(user.email_verified && user.registered) return user
      throw new Error('Unregistered account. Complete the account veryfication')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

exports.getUserInfo = async (email, password) => {
    console.log('email', email)
    try {
        const user = await User.findOne({where: {email: email}});
        if(!user) throw new Error('User has not been registered. Please Sign up')
        else {
          
          let hashedPassword = user.password;
          console.log('hashed' , hashedPassword, password)
          let passwordIsValid = await comparePassword(password, hashedPassword);
          if (passwordIsValid) {
            if(user.email_verified && user.registered) return user
            throw new Error('Unregistered account. Complete the account veryfication')
          } else {
            throw new Error('Invalid password')
          }
        }
      } catch (err) {
        throw new Error(err.message);
      }
}

exports.verifyUser = async (token, email) => {
  console.log('email', email)
  try {
    const user = await User.findOne({where: {email: email}});
    if(!user) {
      return 'Something happened. Incorret User verification';
    }
    else {
      jwt.verify(token, process.env.TOKEN_SECRET, {algorithms: 'HS256'}, async function(err , verified) {
        if (err) throw new Error(err.message);
        else {
          user.email_verified = true;
          user.registered = true;
          console.log(verified)  
          await user.save()
          return user;
        }
      } )
      
    }
  } catch (err) {
    console.log('aa', err)
    throw new Error(err.message)
  }
}

exports.createUser = async (user) => {
  //Finding user in db

  const email = user.email;
  const password = user.password.toString();
  const userInDatabase = await User.findAll({where: {email: email}});
  const userExists = await userInDatabase.length 
  //Hashinh password to secure 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Asigning/Verifying role, permissions and plan /hardcoded
  user.password = hashedPassword;
  user.rol = user.email === 'juandavidgr10002@gmail.com' ? 'Admin': 'User';
  user.permissions = user.email === 'juandavidgr10002@gmail.com' ? 'All': 'Watch';
  user.plan = user.email === 'juandavidgr10002@gmail.com' ? '3': 'none';

  try {
    if(userExists) {
      throw new Error(`User is already registered with email ${email}`);
    } else {
      const userCreated = await User.create(user);
      let token = generateToken({email: user.email});
      console.log(token)
      const message = `${'http://localhost:3001'}/user/verify/${email}/${token}`;
      await sendEmail(email, 'Zero Two: Verify your account', message)
      return userCreated;
    }
   
  } catch (err) {
    throw new Error(err.message);
  }
}

exports.deleteUser = async (email) => {
  let user = await User.findOne({where: {email: email}});
  
  try {
    if(!user) {
      throw new Error('User could not be founded');
    } else {
      await User.destroy({where: {email: email}});
      return 'User deleted successfully!'
    }
  } catch(err) {
    throw new Error(err.message);
  }
}