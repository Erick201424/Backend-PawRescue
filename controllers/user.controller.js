import { fileURLToPath } from "url";
import { getUser } from "../models/user.model.js";
import { dataEnv } from "../config/env.config.js";
import { response } from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const local_img = (function (req, res) {
    let img1 = req.query.img1;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let reqP = path.join(__dirname, "../")
    console.log("data" + reqP)
    let img = reqP + `//assets//${img1}`;

    fs.access(img, fs.constants.F_OK, err => {
        console.log(`${img} ${err ? "no existe" : "existe"} `)
    });

    fs.readFile(img, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plane' });
            return res.end('404 not found')
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.write(data);
            return res.end();
        }
    })
});

const user_profile = async function (req, res) {
    console.log("Controlador de perfil de usuario ejecutado"); // Agregar este console.log

    let id = req.params.id; // Obtener el ID del parámetro de la solicitud

    getUser.User.findOne({ where: { id: id } })
        .then((response) => {
            res.send(response);
            console.log("Entro: ", response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const user_list = async function (req, res) {
    getUser.User.findAll()
        .then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const user_create = (req, res) => {

    let defaultImage;

    if (req.body.sex === 'Masculino') {
        defaultImage = "user-male.jpg";
    } else {
        defaultImage = "user-female.jpg";
    }

    getUser.User.create(
        {
            imgProfile: defaultImage,
            name: req.body.name,
            lastName: req.body.lastName,
            secondSurname: req.body.secondSurname,
            sex: req.body.sex,
            direction: req.body.direction,
            city: req.body.city,
            state: req.body.state,
            phone: req.body.phone,
            linkfb: req.body.linkfb,
            descriptionUser: req.body.descriptionUser,
            email: req.body.email,
            password: req.body.password,
        },
        {
            fields: [
                "imgProfile",
                "name",
                "lastName",
                "secondSurname",
                "sex",
                "direction",
                "city",
                "state",
                "phone",
                "linkfb",
                "descriptionUser",
                "email",
                "password",
            ],
        }
    )
        .then(() => {
            res.send("Usuario registrado: \n",);
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
};

const user_login = async (req, res) => {
    const user = await getUser.User.findOne({ where: { email: req.body.email } });

    if (user) {
        const validPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
        );
        if (validPassword) {
            const token = jwt.sign(
                {
                    id: user.id,
                },
                "secret"
            );
            user.token = token;
            res.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    user: user.id,
                },
            });
            console.log("Usuario logeado con éxito");
        } else {
            if (!validPassword)
                return res.status(400).json({ error: "Contraseña incorrecta" });
        }
    } else {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }
};

const user_update_password = (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    let password = bcryptjs.hashSync(pass);
    console.log(password);
    let newDatas = { email, password };
    console.log(newDatas);
    getUser.User.findOne({ where: { email: email } })

        .then((r) => {
            r.update(newDatas);
            res.send("Contraseña actualizada");
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const user_update_profile = (req, res) => {
    console.log("Metodo de actualizar");
    let id = req.body.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let secondSurname = req.body.secondSurname;
    let direction = req.body.direction;
    let phone = req.body.phone;
    let linkfb = req.body.linkfb;
    let descriptionUser = req.body.descriptionUser;

    let imgProfile; // Creamos una variable para guardar la nueva imagen

    if (req.file) {
        // Si se envió un nuevo archivo, usamos el nombre original del archivo para la nueva imagen
        imgProfile = req.file.originalname;
    } else {
        // Si no se envió un nuevo archivo, mantenemos la imagen existente sin cambios
        imgProfile = req.body.imgProfile;
    }

    let newDatas = {
        id,
        imgProfile,
        name,
        lastName,
        secondSurname,
        direction,
        phone,
        linkfb,
        descriptionUser,
    };
    console.log(newDatas);
    getUser.User.findOne({ where: { id: id } })
        .then((r) => {
            console.log(r);
            if (r) {
                delete newDatas.email;
                delete newDatas.password;

                r.update(newDatas)
                    .then(() => {
                        res.send("Perfil actualizado");
                    })
                    .catch((err) => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(404).send("Usuario no encontrado");
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

export const userController = {
    user_profile,
    user_list,
    user_create,
    user_update_password,
    user_update_profile,
    user_login,
    local_img,
};
