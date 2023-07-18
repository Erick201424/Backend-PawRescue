import { getData } from "../config/connection.config.js";
import { DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import { getAds } from "./ads.model.js";

const User = getData.sequelizeClient.define(
  "cat_users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imgProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese un nombre",
        },
      },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese su primer apellido",
            },
        },
    },
    secondSurname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Ingrese su segundo apellido",
            },
        },
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese su sexo",
        },
        isValidSex(value) {
          if (value !== "Masculino" && value !== "Femenino") {
            throw new Error("El sexo debe ser Masculino o Femenino");
          }
        },
      },
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese una direccion",
          },
        },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese su ciudad o municipio"
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese su estado"
        },
      },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ingrese un número de teléfono",
          },
          isNumeric: {
            msg: "El número de teléfono debe ser numérico",
          },
          tieneLada: function(value) {
            if (value.length !== 12) {
              throw new Error("El número de teléfono debe tener 10 dígitos más la lada del país");
            }
          },
        },
    },      
    linkfb: {
        type: DataTypes.STRING,
        allowNull: true, // Puedes establecerlo en true si el enlace es opcional
        validate: {
          isUrl: {
            msg: "Ingrese un enlace válido de Facebook",
          },
        },
    },
    descriptionUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ingrese una descripcion para el usuario",
          },
        },
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "",
      },
      validate: {
        notNull: {
          msg: "Ingrese un correo",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Ingrese una contraseña",
        },
      },
    },
    
  },
  {
    tableName: "cat_users",
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcryptjs.hashSync(user.password, 10)
              : "";
        }
      },
    },
  }
);

User.hasMany(getAds.Ads, { foreignKey: "catUserId" });
getAds.Ads.belongsTo(User);

export const getUser = { User };