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
    getPostPhotos = async (req: Request, res: Response) => {
        const { id } = req.body;
        try{
        const photos = await photoService.getPostPhotos(id);
        res.status(201).json(photos);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }

    updateAiInfo = async (req: Request, res: Response) => {
        const { url } = req.body;
        const { aiInfo } = req.body;
        try{
            const photo = await photoService.updateAiInfo(url, aiInfo);
            res.status(200).json(photo);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    getPostPhotosBySearchString = async (req: Request, res: Response) => {
        const { search_string } = req.params;
        const { userId } = req.body;
        const photos = await photoService.getPostPhotosBySearchString(search_string, userId);
        res.status(200).json(photos);
    }
}

export default PhotoController;

