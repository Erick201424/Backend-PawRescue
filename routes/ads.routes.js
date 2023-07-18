import { adsController } from "../controllers/ads.controller.js";
import { Router } from "express";
import jwt from "jsonwebtoken";

import bodyParser from "body-parser";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
 * '/api/ads/list':
 *  get:
 *     tags:
 *     - Ads
 *     summary: Ver todos los anuncios 
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
 * /api/user/profile/{id}:
 *   get:
 *     tags:
 *       - Ads
 *     summary: Mostrar información de un anuncio por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del anuncio
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
 * /api/ads/create:
 *   post:
 *     tags:
 *       - Ads
 *     summary: Crear un anuncio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - descriptionAd
 *               - ubication
 *               - datePublication
 *               - statusAd
 *               - catUserId
 *             properties:
 *               title:
 *                 type: string
 *                 default: "titulo"
 *               descriptionAd:
 *                 type: string
 *                 default: "descripcion del incidente"
 *               ubication:
 *                 type: string
 *                 default: "ubicacion"
 *               datePublication:
 *                 type: string
 *                 format: date
 *                 default: "2023-07-16"
 *               statusAd:
 *                 type: boolean
 *                 default: true
 *               catUserId:
 *                 type: string
 *                 default: "ID_del_usuario_asociado_al_anuncio"
 *     responses:
 *       '200':
 *         description: Anuncio creado exitosamente
 *       '400':
 *         description: Solicitud incorrecta o faltan campos requeridos
 *       '404':
 *         description: Recurso no encontrado
 */


/**
 * @openapi
 * /api/ads/update:
 *   put:
 *     tags:
 *       - Ads
 *     summary: Actualizar anuncio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - descriptionAd
 *               - ubication
 *               - datePublication
 *               - statusAd
 *               - catUserId
 *             properties:
 *               id:
 *                 type: string
 *                 default: "ID_del_anuncio_a_actualizar"
 *               title:
 *                 type: string
 *                 default: "titulo"
 *               descriptionAd:
 *                 type: string
 *                 default: "descripcion del incidente"
 *               ubication:
 *                 type: string
 *                 default: "ubicacion"
 *               datePublication:
 *                 type: date
 *                 default: "2023-07-16"
 *               statusAd:
 *                 type: boolean
 *                 default: true
 *               catUserId:
 *                 type: string
 *                 default: "ID_del_usuario_propietario_del_anuncio"
 *     responses:
 *       '200':
 *         description: Anuncio actualizado exitosamente
 *       '400':
 *         description: Solicitud incorrecta o faltan campos requeridos
 *       '404':
 *         description: Recurso no encontrado
 */

router.get("/list", verifyToken, (req, res) => adsController.ads_list(req, res));
router.get("/ad/:id", verifyToken, (req, res) => adsController.ads_id(req, res));
router.post("/create", verifyToken, (req, res) => adsController.ads_create(req, res));
router.put("/update", verifyToken, (req, res) => adsController.ads_update(req, res));

 export default router;