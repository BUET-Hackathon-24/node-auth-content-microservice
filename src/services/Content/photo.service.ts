import PhotoModel from "../../models/Content/photo.model";

class PhotoService {
  private photoModel = new PhotoModel();

  async getPhoto(id: number) {
    try {
      return await this.photoModel.getPhoto(id);
    } catch (error) {
      console.error(`Error getting photo with id ${id}:`, error);
      throw error;
    }
  }

  async createPhoto(uploaderId: number, name: string, url: string) {
    try {
      return await this.photoModel.createPhoto(uploaderId, name, url);
    } catch (error) {
      console.error('Error creating photo:', error);
      throw error;
    }
  }

  async updatePhoto(id: number, name: string, url: string) {
    try {
      return await this.photoModel.updatePhoto(id, name, url);
    } catch (error) {
      console.error(`Error updating photo with id ${id}:`, error);
      throw error;
    }
  }

  async deletePhoto(id: number) {
    try {
      return await this.photoModel.deletePhoto(id);
    } catch (error) {
      console.error(`Error deleting photo with id ${id}:`, error);
      throw error;
    }
  }
  async getPostPhotos(postId : number){
    try {
      return await this.photoModel.getPostPhotos(postId);
    } catch (error) {
      console.error(`Error getting post photos with id ${postId}:`, error);
      throw error;
    }
  }
}

export default PhotoService;

