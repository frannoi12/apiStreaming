import express from "express";
import UserController from "../controllers/UserController.js";


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

export default class UserRouter {

    router;
    userController;

    
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Récupère tous les utilisateurs
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: Liste des utilisateurs
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/User'
         */
        this.router.get('/', this.userController.getUsers.bind(this.userController));

        /**
         * @swagger
         * /users/{id}:
         *   get:
         *     summary: Récupère un utilisateur par ID
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de l'utilisateur
         *     responses:
         *       200:
         *         description: Utilisateur trouvé
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       404:
         *         description: Utilisateur non trouvé
         */
        this.router.get('/:id', this.userController.getUser.bind(this.userController));

        /**
         * @swagger
         * /users/create:
         *   post:
         *     summary: Crée un nouvel utilisateur
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       201:
         *         description: Utilisateur créé avec succès
         *       400:
         *         description: Données invalides
         */
        this.router.post('/create', this.userController.createUser.bind(this.userController));

        /**
         * @swagger
         * /users/update/{id}:
         *   put:
         *     summary: Met à jour un utilisateur
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de l'utilisateur
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       200:
         *         description: Utilisateur mis à jour avec succès
         *       404:
         *         description: Utilisateur non trouvé
         */
        this.router.put('/update/:id', this.userController.updateUser.bind(this.userController));

        /**
         * @swagger
         * /users/delete/{id}:
         *   delete:
         *     summary: Supprime un utilisateur
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de l'utilisateur
         *     responses:
         *       200:
         *         description: Utilisateur supprimé avec succès
         *       404:
         *         description: Utilisateur non trouvé
         */
        this.router.delete('/delete/:id', this.userController.deleteUser.bind(this.userController));
    }

    getRouter() {
        return this.router;
    }
}
