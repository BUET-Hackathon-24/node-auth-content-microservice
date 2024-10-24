import AuthenticationMiddleware from '../../middlewares/authenticate';
import PhotoController from '../../controllers/Content/photo.controller';
import { Router } from "express";

const photoRoutes = Router();

const photoController = new PhotoController();
const authenticationMiddleware = new AuthenticationMiddleware();

photoRoutes.get("/:id", authenticationMiddleware.authenticateUser, photoController.getPhoto);
photoRoutes.post("/", authenticationMiddleware.authenticateUser, photoController.createPhoto);
photoRoutes.put("/:id", authenticationMiddleware.authenticateUser, photoController.updatePhoto);
photoRoutes.delete("/:id", authenticationMiddleware.authenticateUser, photoController.deletePhoto);

export default photoRoutes;
