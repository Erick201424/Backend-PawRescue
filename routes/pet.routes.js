import { petController } from "../controllers/pet.controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets')
  },
  filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop()
      console.log(file.originalname)
      cb(null, `${file.originalname}`)
  }
  });
  
  const upload = multer({ storage });
  
  const verifyToken = (req, res, next) => {
      const token = req.header('auth-token');
      if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
      }
    
      try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.sub;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
      }
  };

/**
 * @openapi
 * '/api/pet/list':
 *  get:
 *     tags:
 *     - Pet
 *     summary: Ver información de lista de mascotas 
 *     responses:
 *      200:
 *        description: Get
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/**
 * @openapi
 * /api/pet/information/{id}:
 *   get:
 *     tags:
 *       - Pet
 *     summary: Mostrar información de un mascota por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */

/**
 * @openapi
 * '/api/pet/create':
 *  post:
 *     tags:
 *     - Pet
 *     summary: Crear una mascota
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - imgPet
 *              - name
 *              - type
 *              - race
 *              - color
 *              - gender
 *              - age
 *              - catAdId 
 *            properties:
 *              imgPet:
 *                 type: string
 *                 format: binary
 *              name:
 *                type: string
 *                default: nombre
 *              type:
 *                type: string
 *                default: tipo de mascota
 *              race:
 *                type: string
 *                default: raza
 *              color:
 *                type: string
 *                default: color
 *              gender:
 *                type: string
 *                default: macho/hembra
 *              age:
 *                type: integer
 *                default: 1
 *              catAdId:
 *                type: string
 *                default: "ID_del_anuncio"
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/**
 * @openapi
 * '/api/pet/update':
 *  put:
 *     tags:
 *     - Pet
 *     summary: Actualizar informacion de la mascota
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - imgPet
 *              - name
 *              - type
 *              - race
 *              - color
 *              - gender
 *              - age
 *              - catAdId 
 *            properties:
 *              id:
 *                type: integer
 *                default: 1
 *              imgPet:
 *                type: string
 *                format: binary
 *              name:
 *                type: string
 *                default: nombre
 *              type:
 *                type: string
 *                default: tipo de mascota
 *              race:
 *                type: string
 *                default: raza
 *              color:
 *                type: string
 *                default: color
 *              gender:
 *                type: string
 *                default: macho/hembra
 *              age:
 *                type: integer
 *                default: 1
 *              catAdId:
 *                type: string
 *                default: "ID_Anuncion"
 *     responses:
 *      200:
 *        description: Update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get("/list", verifyToken, (req, res) => petController.pet_list(req, res));
router.get("/information/:id", verifyToken, (req, res) => petController.pet_information(req, res));
router.post("/create", upload.single("imgPet"), verifyToken, (req, res) => petController.pet_create(req, res));
router.put("/update", upload.single("imgPet"), verifyToken, (req, res) => petController.pet_update(req, res));

 export default router;