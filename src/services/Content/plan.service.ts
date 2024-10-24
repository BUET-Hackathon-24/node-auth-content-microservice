import PlanModel from "../../models/Content/plan.model";

class PlanService {
  private planModel = new PlanModel();

  async getPlan(id: number) {
    try {
      return await this.planModel.getPlan(id);
    } catch (error) {
      console.error(`Error getting plan with id ${id}:`, error);
      throw error;
    }
  }

  async createPlan(userId: number, title: string, data: string) {
    try {
      return await this.planModel.createPlan(userId, title, data);
    } catch (error) {
      console.error('Error creating plan:', error);
      throw error;
    }
  }

  async updatePlan(id: number, title: string, data: string) {
    try {
      return await this.planModel.updatePlan(id, title, data);
    } catch (error) {
      console.error(`Error updating plan with id ${id}:`, error);
      throw error;
    }
  }

  async deletePlan(id: number) {
    try {
      return await this.planModel.deletePlan(id);
    } catch (error) {
      console.error(`Error deleting plan with id ${id}:`, error);
      throw error;
    }
  }
  async getUserPlans(userId : number){
    try {
      return await this.planModel.getUserPlans(userId);
    } catch (error) {
      console.error(`Error getting user plans with id ${userId}:`, error);
      throw error;
    }
  }
}

export default PlanService;

