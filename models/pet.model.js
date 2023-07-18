import { getData } from "../config/connection.config.js";
import { DataTypes, UUIDV4 } from "sequelize";

const Pet = getData.sequelizeClient.define(
  "cat_pets",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imgPet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese un nombre",
        },
      }
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ingrese una tipo de mascota",
        },
      }
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ingrese el genero de su mascota",
          },
        }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese la edad de su mascota",
        },
      },
    },
  },
  {
    tableName: "cat_pets",
    freezeTableName: true,
  }
);

export const getPet = { Pet };
