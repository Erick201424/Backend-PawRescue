import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

import { getProfile } from "../models/profile.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

// // Configuración de Multer
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       const extension = path.extname(file.originalname);
//       cb(null, file.fieldname + "-" + uniqueSuffix + extension);
//     },
// });

// const upload = multer({ storage: storage });

const profile_show = async function (req, res) {
    getProfile.Profile
        .findAll()
        .then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

// const profile_create = (req, res) => {
//     upload.single("imgProfile")(req, res, (err) => {
//         if (err) {
//           res.status(400).send(err.message);
//           return;
//         }

//         const imgProfile = req.file ? req.file.filename : null;

//         getProfile.Profile.create(
//         {
//             imgProfile: imgProfile,
//             name: req.body.name,
//             lastName: req.body.lastName,
//             secondSurname: req.body.secondSurname,
//             direction: req.body.direction,
//             celphone: req.body.celphone,
//             linkfb: req.body.linkfb,
//             descriptionUser: req.body.descriptionUser,
//             catUserId: req.body.catUserId
//         },
//         {
//             fields: ["imgProfile" ,"name", "lastName", "secondSurname", "celphone", "linkfb", "descriptionUser" ,"catUserId"]
//         })
//         .then(() => {
//             res.send("Perfil registrado");
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//             console.log(err);
//         });
//     });
// }

// const profile_update = (req, res) => {
//     let name = req.body.name;
//     let lastName = req.body.lastName;
//     let secondSurname = req.body.secondSurname;
//     let direction = req.body.direction;
//     let celphone = req.body.celphone;
//     let linkfb = req.body.linkfb;
//     let descriptionUser = req.body.descriptionUser;

//     upload.single("imgProgile")(req, res, (err) => {
//         if (err) {
//           res.status(400).send(err.message);
//           return;
//         }

//         const imgProfile = req.file ? req.file.filename : null;


//         let newDatas = { id, imgProfile, name, lastName, secondSurname, direction, celphone, linkfb, descriptionUser };
//         getProfile.Profile.findOne({ where: { id: id } })
//             .then((r) => {
//                 if (image && profile.image) {
//                     // Eliminar la imagen anterior si se carga una nueva
//                     const imagePath = path.join("uploads", profile.image);
//                     fs.unlink(imagePath, (err) => {
//                           if (err) {
//                         console.log("Error al eliminar la imagen anterior:", err);
//                       }
//                     });
//                 }

//                 r.update(newDatas);
//                 res.send("Perfil actualizado")
//             })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
//     });
// };

const profile_create = (req, res) => {
    getProfile.Profile.create(
        {
            name: req.body.name,
            lastName: req.body.lastName,
            secondSurname: req.body.secondSurname,
            direction: req.body.direction,
            celphone: req.body.celphone,
            linkfb: req.body.linkfb,
            descriptionUser: req.body.descriptionUser,
            catUserId: req.body.catUserId
        },
        {
            fields: ["name", "lastName", "secondSurname", "direction" ,"celphone", "linkfb", "descriptionUser" ,"catUserId"]
        }
    )
        .then(() => {
            res.send("Perfil registrado");
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
}

const profile_update = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let secondSurname = req.body.secondSurname;
    let direction = req.body.direction;
    let celphone = req.body.celphone;
    let linkfb = req.body.linkfb;
    let descriptionUser = req.body.descriptionUser
    let catUserId = req.body.catUserId;

    let newDatas = { id, name, lastName, secondSurname, direction, celphone, linkfb, descriptionUser, catUserId };
    getProfile.Profile.findOne({ where: { id: id } })

        .then((r) => {
            r.update(newDatas);
            res.send("Perfil actualizado")
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};


export const profileController = {
    profile_show,
    profile_create,
    profile_update,
  };
  