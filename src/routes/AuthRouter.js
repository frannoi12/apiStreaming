import express from "express";
import AuthController from "../controllers/AuthController.js";



export default class AuthRouter {

    router;
    authController;

    
    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * /register:
         *   get:
         *     summary: Enregistre un nouvel utilisateur
         *     tags: [Auth]
         *     responses:
         *       200:
         *         description: Utilisateur enregistré
         *       400:
         *         description: Erreur de validation des données
         */
        this.router.get('/register', this.authController.register.bind(this.authController));

        /**
         * @swagger
         * /login:
         *   get:
         *     summary: Connecte un utilisateur
         *     tags: [Auth]
         *     responses:
         *       200:
         *         description: Utilisateur connecté
         *       401:
         *         description: Identifiants invalides
         */
        this.router.get('/login', this.authController.login.bind(this.authController));
    }

    getRouter() {
        return this.router;
    }
}
