import VideoService from "../services/VideoService.js";
import * as statues from "../constantes/httpStatus.js";

export default class VideoController {
    videoService;

    constructor() {
        // Initialize video service here
        this.videoService = new VideoService();
    }

    // Récupérer et afficher toutes les vidéos
    async getVideos(req, res) {
        try {
            const videos = await this.videoService.get();  // Assure-toi que la méthode getAllVideos() existe dans VideoService
            res.status(statues.HTTP_200_OK).json(videos);
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving videos" });
        }
    }

    // Récupérer et afficher une seule vidéo par ID
    async getVideo(req, res) {
        console.log("Moi je suis ici");
        
        const { id } = req.params;
        try {
            const video = await this.videoService.get_video(parseInt(id));  // Assure-toi que la méthode getVideoById() existe dans VideoService
            if (video) {
                res.status(statues.HTTP_200_OK).json(video);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving video" });
        }
    }

    async createVideo(req, res) {
        console.log(req.body);
        
        const video_data = req.body;
        // { title, description, mediaPath, status, userId }
        try {
            const newVideo = await this.videoService.create(video_data);
            res.status(statues.HTTP_201_OK).json(newVideo);
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error creating video" });
        }
    }

    async updateVideo(req, res) {
        const { id } = req.params;
        const { title, description, url } = req.body;
        try {
            const updatedVideo = await this.videoService.update(parseInt(id), { title, description, url });
            if (updatedVideo) {
                res.status(statues.HTTP_200_OK).json(updatedVideo);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error updating video" });
        }
    }

    async deleteVideo(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.videoService.delete(parseInt(id));
            if (deleted) {
                res.status(statues.HTTP_204_NO_CONTENT).send();
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error deleting video" });
        }
    }
}
