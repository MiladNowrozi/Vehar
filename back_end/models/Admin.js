import { DataTypes } from "@sequelize/core";
import db from "../db";

export const Admin = db.define(
  "Admin",
  {
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "نام، نباید خالی باشد!",
        },
        notNull: {
          msg: "نام، نباید null باشد!",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "نام خانوادگی، نباید خالی باشد!",
        },
        notNull: {
          msg: "نام خانوادگی، نباید null باشد!",
        },
      },
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "نام کاربری، نباید خالی باشد!",
        },
        notNull: {
          msg: "نام کاربری، نباید null باشد!",
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "رمز عبور، نباید خالی باشد!",
        },
        notNull: {
          msg: "رمز عبور، نباید null باشد!",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "ایمیل نامعتبر است!",
        },
      },
      notEmpty: {
        msg: "ایمیل، نباید خالی باشد!",
      },
      notNull: {
        msg: "ایمیل، نباید null باشد!",
      },
    },
    img: {
      type: DataTypes.STRING(255),
    },
  },
  {
    validate: {
      None() {
        if (
          this.firstName == "" &&
          this.lastName == "" &&
          this.username == "" &&
          this.password == ""
        ) {
          throw new Error("لطفاً فیلد ها را پر کنید!");
        }
      },
    },
  }
);
