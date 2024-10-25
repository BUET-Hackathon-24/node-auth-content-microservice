import Base from "../base.model";
import getWeather from "../../services/Weather/weather.api";
class PlanModel extends Base {
  tableFields = ["id", "title", "data", "created_at", "upvote_count"];

  async getPlan(id: number) {
    try {
      return await this.query("SELECT * FROM plan WHERE id = $1", [id]);
    } catch (error) {
      console.error("Database error in getPlan:", error);
      throw new Error("Failed to retrieve plan");
    }
  }

  async createPlan(userId: number, title: string, data: string, start_date: Date, end_date: Date,latitude: string, longitude: string) {
    try {
      const result = await this.query(
        "INSERT INTO plan (created_by, title, data, start_date, end_date,latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [userId, title, data, start_date, end_date,latitude, longitude]
      );
      // let weathers = [];
      // for(let i = start_date; i <= end_date; i.setDate(i.getDate() + 1)){
      // const weather = await getWeather(latitude, longitude, start_date.toISOString());
      // weathers.push(weather);
      // }
      // const weathersJson = JSON.stringify(weathers);
      // await this.query("UPDATE plan SET weathers = $1 WHERE id = $2", [weathersJson, result[0].id]);
      return result[0];
    } catch (error: any) {
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
        "DELETE FROM plan WHERE id = $1 RETURNING *",
        [id]
      );
    } catch (error) {
      console.error("Database error in deletePlan:", error);
      throw new Error("Failed to delete plan");
    }
  }
  async getUserPlans(userId : number){
    try {
      console.log(userId);
      return this.query(
        "SELECT * FROM plan JOIN users ON plan.created_by = users.id WHERE created_by = $1  order by plan.created_at desc",
        [userId]
      );
    } catch (error) {
      console.error("Database error in getUserPlans:", error);
      throw new Error("Failed to retrieve user plans");
    }
  }
}

export default PlanModel;
