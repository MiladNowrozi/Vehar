import { DataTypes } from "@sequelize/core";
import db from "../db.js";
export const Token = db.define("Token", {
  Token: {
    type: DataTypes.STRING(255),
    timestamps: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
