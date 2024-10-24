import PhotoModel from "../../models/Content/photo.model";
import AiService from "../AI/ai.service";
class PhotoService {
  private photoModel = new PhotoModel();
  private aiService = new AiService();
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
  async updateAiInfo(url: string, aiInfo: string) {
    try {
      return await this.photoModel.updateAiInfo(url, aiInfo);
    } catch (error) {
      console.error(`Error updating ai info with url ${url}:`, error);
      throw error;
    }
  }
  async getPostPhotosBySearchString(searchString: string, userId: number) {
    try {
      console.log(searchString, userId);
      const fileUrls : { urls: string[] } = await this.aiService.fetchFileUrls({
        text: searchString,
        user_id: userId
      });
      if(fileUrls.urls.length === 0) {
        return [];
      }
      console.log(fileUrls.urls);
      const photos = await this.photoModel.getPostPhotosByFileUrls(fileUrls.urls, userId);
      return photos;
    } catch (error) {
      console.error(`Error getting post photos by search string ${searchString}:`, error);
      throw error;
    }
  }
}

export default PhotoService;

