import { User } from "../models/User.js";

export default class UserControllers {
  static GteUser = async (req, res) => {
    try {
      const existUser = await User.findByPk(req.params.id);
      if (existUser) {
        res.status(200).json({
          success: true,
          body: existUser,
          message: "this user is exist!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "this user not exist!",
        });
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error,
      });
    }
  };
}
