import { DataTypes } from "@sequelize/core";
import db from "../db.js";

export const User = db.define("User", {
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
      len: {
        args: [1, 25],
        msg: "حداکثر طول نام 25 کاراکتر است!",
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
      len: {
        args: [1, 25],
        msg: "حداکثر طول نام خانوادگی 25 کاراکتر است!",
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
      len: {
        args: [1, 30],
        msg: "حداکثر طول نام کاربری 30 کاراکتر است!",
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
      len: {
        args: [1, 255],
        msg: "حداکثر طول نام کاربری 255 کاراکتر است!",
      },
    },
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  remember: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verify_email: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export const Email = db.define("Email", {
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "ایمیل نامعتبر است!",
      },
    },
  },
});

User.hasOne(Email, {
  foreignKey: {
    unique: true,
    onDelete: "CASCADE",
    allowNull: false,
  },
});
