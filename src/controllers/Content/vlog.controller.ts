import { Request, Response } from 'express';
import VlogModel from '../../models/Content/vlog.model';

class VlogController {
    private vlogModel: VlogModel;

    constructor() {
        this.vlogModel = new VlogModel();
    }

    async getVlog(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const vlog = await this.vlogModel.getVlog(id);
            res.json(vlog);
        } catch (error) {
            console.error("Error in getVlog:", error);
            res.status(500).json({ error: "Failed to retrieve vlog" });
        }
    }

    async createVlog(req: Request, res: Response) {
        try {
            const { uploaderId, title, url } = req.body;
            const newVlog = await this.vlogModel.createVlog(uploaderId, title, url);
            res.status(201).json(newVlog);
        } catch (error) {
            console.error("Error in createVlog:", error);
            res.status(500).json({ error: "Failed to create vlog" });
        }
    }

    async updateVlog(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { title, url } = req.body;
            const updatedVlog = await this.vlogModel.updateVlog(id, title, url);
            res.json(updatedVlog);
        } catch (error) {
            console.error("Error in updateVlog:", error);
            res.status(500).json({ error: "Failed to update vlog" });
        }
    }

    async deleteVlog(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deletedVlog = await this.vlogModel.deleteVlog(id);
            res.json(deletedVlog);
        } catch (error) {
            console.error("Error in deleteVlog:", error);
            res.status(500).json({ error: "Failed to delete vlog" });
        }
    }
    getUserVlogs = async (req: Request, res: Response) => {
        const { id } = req.body;
        try{
        const vlogs = await this.vlogModel.getUserVlogs(id);
        res.status(201).json(vlogs);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }   
}

export default VlogController;

