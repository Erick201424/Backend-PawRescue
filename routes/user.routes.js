import { userController } from "../controllers/user.controller.js";
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
 * '/api/user/profile/list':
 *  get:
 *     tags:
 *     - User
 *     summary: Mostrar información de todos los usuarios 
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
 *       - User
 *     summary: Mostrar información de un Usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
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
 * '/api/user/create':
 *  post:
 *     tags:
 *     - User
 *     summary: Crear usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - lastname
 *              - secondSurname
 *              - sex
 *              - direction
 *              - city
 *              - state
 *              - phone
 *              - linkfb
 *              - descriptionUser
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: nombre(s)
 *              lastName:
 *                type: string
 *                default: primer_apellido
 *              secondSurname:
 *                type: string
 *                default: segundo_apellido
 *              sex:
 *                type: string
 *                default: masculino/femenino
 *              direction:
 *                type: string
 *                default: direcion
 *              city:
 *                type: string
 *                default: ciudad
 *              state:
 *                type: string
 *                default: estado
 *              phone:
 *                type: string
 *                default: 529613304787
 *              linkfb:
 *                type: string
 *                default: https://www.facebook.com/erickarturo.diazhernandez1
 *              descriptionUser:
 *                type: string
 *                default: Describe tu persona
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: contraseña
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
 * '/api/user/update/password':
 *  put:
 *     tags:
 *     - User
 *     summary: Actualizar contraseña
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: prueba141189@
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/**
 * @openapi
 * '/api/user/update/profile':
 *  put:
 *     tags:
 *     - User
 *     summary: Actualizar perfil
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - imgProfile
 *              - name
 *              - lastName
 *              - secondSurname
 *              - sex
 *              - direction
 *              - city
 *              - state
 *              - phone
 *              - linkfb
 *              - descriptionUser
 *            properties:
 *              id:
 *                type: integer
 *                default: 1
 *              imgProfile:
 *                type: string
 *                format: binary
 *              name:
 *                type: string
 *                default: nombre(s)
 *              lastName:
 *                type: string
 *                default: primer_apellido
 *              secondSurname:
 *                type: string
 *                default: segundo_apellido
 *              sex:
 *                type: string
 *                default: masculino/femenino
 *              direction:
 *                type: string
 *                default: direcion
 *              city:
 *                type: string
 *                default: ciudad
 *              state:
 *                type: string
 *                default: estado
 *              phone:
 *                type: string
 *                default: 529613304787
 *              linkfb:
 *                type: string
 *                default: https://www.facebook.com/erickarturo.diazhernandez1
 *              descriptionUser:
 *                type: string
 *                default: Describe tu persona
 *     responses:
 *      200:
 *        description: Update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: prueba141189@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get("/profile/list", verifyToken, (req, res) => userController.user_list(req, res));
router.get("/profile/:id", verifyToken, (req, res) => userController.user_profile(req, res));
router.post("/create", upload.single("imagen"), (req, res) => userController.user_create(req, res));
router.get("/view_img", (req, res) => userController.local_img(req, res));
router.put("/update/password", verifyToken, (req, res) => userController.user_update_password(req, res));
router.put("/update/profile", upload.single("imgProfile"), verifyToken, (req, res) => userController.user_update_profile(req, res));
router.post("/login", (req, res) => userController.user_login(req, res));

export default router;