const UsersModel = require("../models/user.model");

class UserRepository {
  CreateUser = async (payload) => {
    const user = await UsersModel.create(payload);
    return user;
  };

  GetUserByEmail = async (email) => {
    const user = await UsersModel.findOne({ email });
    return user;
  };

  GetUserById = async (id) => {
    const user = await UsersModel.findById(id).select("-password");
    return user;
  };
  UpdateUserById = async (id, payload) => {
    const user = await UsersModel.updateOne(
      { _id: id },
      {
        ...payload,
      },
      { new: true }
    );
    return user;
  };

  DeleteUserById = async (id) => {
    const user = await UsersModel.deleteOne({ _id: id });
    return user;
  };
}

const userRepo = new UserRepository();

module.exports = userRepo;
