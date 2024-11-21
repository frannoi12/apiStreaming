import express from "express";
import VideoController from "../controllers/VideoController.js";

export default class VideosRouter {

    router;
    videoController;
    
    constructor() {
        this.router = express.Router();
        this.videoController = new VideoController();
        this.initializeRoutes();
    }

    /**
     * @swagger
     * tags:
     *   name: Videos
     *   description: API pour la gestion des vidéos
     */

    initializeRoutes() {
        /**
         * @swagger
         * /videos:
         *   get:
         *     summary: Récupère toutes les vidéos
         *     tags: [Videos]
         *     responses:
         *       200:
         *         description: Liste des vidéos
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Video'
         */
        this.router.get('/', this.videoController.getVideos.bind(this.videoController));


        /**
         * @swagger
         * /videos/create:
         *   post:
         *     summary: Crée une nouvelle vidéo
         *     tags: [Videos]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Video'
         *     responses:
         *       201:
         *         description: Vidéo créée avec succès
         *       400:
         *         description: Données invalides
         */
        this.router.post('/create', this.videoController.createVideo.bind(this.videoController));


        /**
         * @swagger
         * /videos/{id}:
         *   get:
         *     summary: Récupère une vidéo par ID
         *     tags: [Videos]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de la vidéo
         *     responses:
         *       200:
         *         description: Vidéo trouvée
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Video'
         *       404:
         *         description: Vidéo non trouvée
         */
        this.router.get('/:id', this.videoController.getVideo.bind(this.videoController));

        /**
         * @swagger
         * /videos/update/{id}:
         *   put:
         *     summary: Met à jour une vidéo
         *     tags: [Videos]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de la vidéo
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Video'
         *     responses:
         *       200:
         *         description: Vidéo mise à jour avec succès
         *       404:
         *         description: Vidéo non trouvée
         */
        this.router.put('/update/:id', this.videoController.updateVideo.bind(this.videoController));

        /**
         * @swagger
         * /videos/delete/{id}:
         *   delete:
         *     summary: Supprime une vidéo
         *     tags: [Videos]
         *     parameters:
         *       - in: path
         *         name: id
         *         schema:
         *           type: integer
         *         required: true
         *         description: ID de la vidéo
         *     responses:
         *       200:
         *         description: Vidéo supprimée avec succès
         *       404:
         *         description: Vidéo non trouvée
         */
        this.router.delete('/delete/:id', this.videoController.deleteVideo.bind(this.videoController));
    }


    /**
     * Retourne le routeur des vidéos
     * @returns {express.Router}
     */
    getRouter() {
        return this.router;
    }
}



// import e from "express";
// import VideoController from "../controllers/VideoController.js"


// export default class VideosRouter{

//     router;
//     videoController;

//     constructor() {
//         this.router = e.Router();
//         this.videoController = new VideoController();
//         this.initializeRoutes();
//     }

//     initializeRoutes() {
//         this.router.get('/', this.videoController.getVideos.bind(this.videoController));
//     }

//     getRouter() {
//         return this.router;
//     }
// }