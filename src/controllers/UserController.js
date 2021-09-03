const User = require("../models/User");
const { sendErrorNotFound, sendOk, sendInternalServerError, sendCreated } = require("../response/response");
require("../response/response");

module.exports = {
  async saveUser(req, res){
    const { id, name, password } = req.body;
    let user;
    if( id === 0 ){
      try {
        user = await User.create({ name, password });   
      } catch (error) {
        sendInternalServerError(res);  
      }
      sendCreated(res.json(user));
    } else{
      user = await User.findByPk(id);
      if(user){
        await User.update({ name, password }, { where: { id } });
        sendCreated(res, {status: 201, message: "Sucessfully updated!"});
      } else{
        sendErrorNotFound(res);
      }
    }
  },

  async getAUser(req, res){
    const { user_id } = req.params;
    let user;
    try {
      user = await User.findByPk(user_id);      
    } catch (error) {
      sendInternalServerError(res);
    }
    (!user)? sendErrorNotFound(res): sendOk(res, user);
  },

  async getAllUsers(req, res){
    let users;
    try {
      users = await User.findAll(); 
    } catch (error) {
      sendInternalServerError(res);
    }
    (users.length == 0)? sendErrorNotFound(res): sendOk(res, users);
  }
}