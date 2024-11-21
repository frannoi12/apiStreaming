import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation de l'API apiStream",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID unique de l'utilisateur",
                        },
                        name: {
                            type: "string",
                            description: "Nom de l'utilisateur",
                        },
                        email: {
                            type: "string",
                            description: "Email de l'utilisateur",
                        },
                        password: {
                            type: "string",
                            description: "Mot de passe de l'utilisateur",
                        },
                        videos: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Video",
                            },
                        },
                    },
                    required: ["email", "password"], // Champs obligatoires
                },
                Video: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID unique de la vidéo",
                        },
                        title: {
                            type: "string",
                            description: "Titre de la vidéo",
                        },
                        description: {
                            type: "string",
                            description: "Description de la vidéo",
                        },
                        mediaPath: {
                            type: "string",
                            description: "Chemin du fichier média de la vidéo",
                        },
                        status: {
                            type: "boolean",
                            description: "Statut de la vidéo",
                        },
                        userId: {
                            type: "integer",
                            description: "ID de l'utilisateur associé",
                        },
                    },
                    required: ["title", "mediaPath"], // Champs obligatoires
                },
            },
        },
    },
    apis: ["./src/routes/*.js"], // Chemin vers les fichiers de routes où les annotations Swagger seront définies
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
