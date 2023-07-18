import { getData } from "../config/connection.config.js";
import { DataTypes, UUIDV4 } from "sequelize";
import { getPet } from "./pet.model.js";

const Ads = getData.sequelizeClient.define(
  "cat_ads",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese un titulo para el anuncio",
        },
      }
    },
    descriptionAd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ingrese una descripcion con detalles de lo sucedido",
        },
      },
    },
    ubication: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ingrese la ubicacion donde perdio a su mascota",
        },
      },
    },
    datePublication: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    statusAd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  {
    tableName: "cat_ads",
    freezeTableName: true,
  }
);

Ads.hasOne(getPet.Pet, { foreignKey: "catAdId" });
getPet.Pet.belongsTo(Ads);

export const getAds = { Ads };
