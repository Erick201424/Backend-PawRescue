import { fileURLToPath } from "url";
import { getPet } from "../models/pet.model.js";
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

const pet_information = async function (req, res) {
    console.log("Controlador de perfil de mascota ejecutado"); // Agregar este console.log

    let id = req.params.id; // Obtener el ID del parámetro de la solicitud

    getPet.Pet.findOne({ where: { id: id } })
        .then((response) => {
            res.send(response);
            console.log("Entro: ", response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const pet_list = async function (req, res) {
    getPet.Pet
        .findAll()
        .then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

const pet_create = (req, res) => {
    getPet.Pet.create(
        {
            imgPet: req.file.originalname,
            name: req.body.name,
            type: req.body.type,
            race: req.body.race,
            color: req.body.color,
            gender: req.body.gender,
            age: req.body.age,
            catAdId: req.body.catAdId
        },
        {
            fields: ["name", "imgPet", "type", "race", "color", "gender", "age", "catAdId"]
        }
    )
        .then(() => {
            res.send("Mascota registrada");
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
}

const pet_update = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let race = req.body.race;
    let color = req.body.color;
    let gender = req.body.gender;
    let age = req.body.age;
    let catAdId = req.body.catAdId;

    let imgPet; // Creamos una variable para guardar la nueva imagen

    if (req.file) {
        // Si se envió un nuevo archivo, usamos el nombre original del archivo para la nueva imagen
        imgPet = req.file.originalname;
    } else {
        // Si no se envió un nuevo archivo, mantenemos la imagen existente sin cambios
        imgPet = req.body.imgPet;
    }

    let newDatas = { id, imgPet, name, type, race, color, gender, age, catAdId };
    getPet.Pet.findOne({ where: { id: id } })

        .then((r) => {
            r.update(newDatas);
            res.send("Mascota actualizado")
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};


export const petController = {
    pet_information,
    pet_list,
    pet_create,
    pet_update,
    local_img,
};