const { User } = require('../db.js');

exports.setUserAction = async (actionBan) => {
  try {
    const emailAdmin = actionBan.admin;
    const emailUser = actionBan.user;
    const action = actionBan.action;
    if(emailAdmin === emailUser) throw new Error('The user to ban cannot be the same as the admin');
    
    const checkAdmin = await User.findOne({where:{email: emailAdmin, rol: "Admin", permissions: "All"}});
    const checkUser = await User.findOne({where: {email: emailUser}});
    
    if(checkAdmin && checkUser) {
      //Roles
      if (action === "admin") checkUser.rol = "Admin";
      if (action === "user") checkUser.rol = "User";
      //Permissions
      if (action === "ban") checkUser.permissions = "Banned";
      if (action === "edit") checkUser.permissions = "Edit";
      if (action === "watch") checkUser.permissions = "Watch";
      if (action === "all") checkUser.permissions = "All";
      checkUser.save();
      return checkUser;
    } else {
      throw new Error('Cannot find some admin or user');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};