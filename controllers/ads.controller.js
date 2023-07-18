import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { getAds } from "../models/ads.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

// Configuración de Multer
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       const extension = path.extname(file.originalname);
//       cb(null, file.fieldname + "-" + uniqueSuffix + extension);
//     },
// });

// const upload = multer({ storage: storage });

const ads_id = async function (req, res) {
    console.log("Controlador de anuncios"); // Agregar este console.log

    let id = req.params.id; // Obtener el ID del parámetro de la solicitud

    getAds.Ads.findOne({ where: { id: id } })
        .then((response) => {
            res.send(response);
            console.log("Entro: ", response);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const ads_list = async function (req, res) {
    getAds.Ads
        .findAll()
        .then((response) => {
            res.send(response);
            console.log(response);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

// const ads_create = (req, res) => {
//     upload.single("imageAd")(req, res, (err) => {
//         if (err) {
//           res.status(400).send(err.message);
//           return;
//         }

//         const imageAd = req.file ? req.file.filename : null;

//         getAds.Ads.create(
//         {
//             title: req.body.title,
//             imageAd: imageAd,
//             description: req.body.description,
//             location: req.body.location,
//             catAdsId: req.body.catAdsId
//         },
//         {
//             fields: ["title" ,"imageAd", "description", "location", "catAdsId"]
//         })
//         .then(() => {
//             res.send("Anuncio registrado");
//         })
//         .catch((err) => {
//             res.status(400).send(err);
//             console.log(err);
//         });
//     });
// }


// const ads_update = (req, res) => {
//     let title = req.body.tile;
//     let description = req.body.description;
//     let location = req.body.location;
//     let catAdsId = req.body.catAdsId;

//     upload.single("imageAd")(req, res, (err) => {
//         if (err) {
//           res.status(400).send(err.message);
//           return;
//         }

//         const imgProfile = req.file ? req.file.filename : null;


//         let newDatas = { id, title, description, location, catAdsId };
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
//                 res.send("Anuncio actualizado")
//             })
//         .catch((err) => {
//             res.status(400).send(err);
//         });
//     });
// };

const ads_create = (req, res) => {
    getAds.Ads.create(
        {
            title: req.body.title,
            descriptionAd: req.body.descriptionAd,
            ubication: req.body.ubication,
            datePublication: req.body.datePublication,
            statusAd: req.body.statusAd,
            catUserId: req.body.catUserId
        },
        {
            fields: ["title", "descriptionAd", "ubication", "datePublication", "statusAd", "catUserId"]
        })
        .then(() => {
            res.send("Anuncio registrado");
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
}

const ads_update = (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let descriptionAd = req.body.descriptionAd;
    let ubication = req.body.ubication;
    let datePublication = req.body.datePublication;
    let statusAd = req.body.statusAd;
    let catUserId = req.body.catUserId;

    let newDatas = { id, title, descriptionAd, ubication, datePublication, statusAd, catUserId };
    getAds.Ads.findOne({ where: { id: id } })

        .then((r) => {
            r.update(newDatas);
            res.send("Anuncio actualizado")
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

export const adsController = {
    ads_id,
    ads_list,
    ads_create,
    ads_update,
};