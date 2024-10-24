import VlogModel from "../../models/Content/vlog.model";

class VlogService {
  private vlogModel = new VlogModel();

  async getVlog(id: number) {
    try {
      return await this.vlogModel.getVlog(id);
    } catch (error) {
      console.error(`Error getting vlog with id ${id}:`, error);
      throw error;
    }
  }

  async createVlog(uploaderId: number, title: string, url: string) {
    try {
      return await this.vlogModel.createVlog(uploaderId, title, url);
    } catch (error) {
      console.error('Error creating vlog:', error);
      throw error;
    }
  }

  async updateVlog(id: number, title: string, url: string) {
    try {
      return await this.vlogModel.updateVlog(id, title, url);
    } catch (error) {
      console.error(`Error updating vlog with id ${id}:`, error);
      throw error;
    }
  }

  async deleteVlog(id: number) {
    try {
      return await this.vlogModel.deleteVlog(id);
    } catch (error) {
      console.error(`Error deleting vlog with id ${id}:`, error);
      throw error;
    }
  }
}

export default VlogService;

