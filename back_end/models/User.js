import { DataTypes } from "@sequelize/core";
import db from "../db";

export const User = db.define("User", {
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  img: {
    type: DataTypes.STRING(255),
  },
});
