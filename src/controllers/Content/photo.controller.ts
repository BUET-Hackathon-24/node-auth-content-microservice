import { Request, Response } from "express";
import PhotoService from "../../services/Content/photo.service";

const photoService = new PhotoService();

class PhotoController {
    getPhoto = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const photo = await photoService.getPhoto(Number(id));
            res.status(200).json(photo);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    createPhoto = async (req: Request, res: Response) => {
        const { uploaderId, name, url } = req.body;
        try {
            const photo = await photoService.createPhoto(uploaderId, name, url);
            res.status(201).json(photo);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    updatePhoto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, url } = req.body;
        try {
            const photo = await photoService.updatePhoto(Number(id), name, url);
            res.status(200).json(photo);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    deletePhoto = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const photo = await photoService.deletePhoto(Number(id));
            res.status(200).json(photo);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default PhotoController;

