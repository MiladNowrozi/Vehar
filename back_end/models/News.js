import { DataTypes } from "@sequelize/core";
import db from "../db.js";

// export

export const News = db.define(
  "News",
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "عنوان خبر، نباید خالی باشد!",
        },
        notNull: {
          msg: "عنوان خبر، نباید null باشد!",
        },
        len: {
          args: [8, 50],
          msg: "عنوان خبر، باید حداقل 8 و حداکثر 50 کاراکتر باشد!",
        },
      },
    },
    Short_Description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "توضیح کوتاه، نباید خالی باشد!",
        },
        notNull: {
          msg: "توضیح کوتاه، نباید null باشد!",
        },
        len: {
          args: [50, 100],
          msg: "توضیح کوتاه، باید حداقل 50 و حداکثر 100 کاراکتر باشد!",
        },
      },
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "متن خبر، نباید خالی باشد!",
        },
        notNull: {
          msg: "متن خبر، نباید null باشد!",
        },
        len: {
          args: [100, 10000],
          msg: "متن خبر، باید حداقل 100 و حداکثر 10000 کاراکتر باشد!",
        },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "لطفاً دسته مربوطه را انتخاب کنید!",
        },
        notNull: {
          msg: "دسته مربوطه، نباید null باشد!",
        },
      },
    },
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
  },

  {
    // paranoid: true,

    validate: {
      None() {
        if (
          this.title == "" &&
          this.Short_Description == "" &&
          this.content == "" &&
          this.category == ""
        ) {
          throw new Error("لطفاً فیلد ها را پر کنید!");
        }
      },
    },
  }
);
