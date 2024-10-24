import Base from "../base.model";

class PlanModel extends Base {
  tableFields = ["id", "title", "data", "created_at", "upvote_count"];

  async getPlan(id: number) {
    try {
      return await this.query("SELECT * FROM plans WHERE id = $1", [id]);
    } catch (error) {
      console.error("Database error in getPlan:", error);
      throw new Error("Failed to retrieve plan");
    }
  }

  async createPlan(userId: number, title: string, data: string) {
    try {
      return await this.query(
        "INSERT INTO plans (created_by, title, data) VALUES ($1, $2, $3) RETURNING *",
        [userId, title, data]
      );
    } catch (error) {
      console.error("Database error in createPlan:", error);
      throw new Error("Failed to create plan");
    }
  }

  async updatePlan(id: number, title: string, data: string) {
    try {
      return await this.query(
        "UPDATE plans SET title = $1, data = $2 WHERE id = $3 RETURNING *",
        [title, data, id]
      );
    } catch (error) {
      console.error("Database error in updatePlan:", error);
      throw new Error("Failed to update plan");
    }
  }

  async deletePlan(id: number) {
    try {
      return await this.query(
        "DELETE FROM plans WHERE id = $1 RETURNING *",
        [id]
      );
    } catch (error) {
      console.error("Database error in deletePlan:", error);
      throw new Error("Failed to delete plan");
    }
  }
  async getUserPlans(userId : number){
    try {
      return this.query("SELECT * FROM plans WHERE created_by = $1", [userId]);
    } catch (error) {
      console.error("Database error in getUserPlans:", error);
      throw new Error("Failed to retrieve user plans");
    }
  }
}

export default PlanModel;
