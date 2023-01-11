const adminServices = require('../services/adminServices.js');


exports.adminAction = async (req, res) => {
  const actionBan = req.body; // emailAdmin - emailUser - action
  console.log(actionBan)
  try {
      const bannedUser = await adminServices.setUserAction(actionBan);
      res.status(200).send(bannedUser);
  } catch (err) {
      console.log(err.message)
      res.status(404).send(err.message);
  }
}