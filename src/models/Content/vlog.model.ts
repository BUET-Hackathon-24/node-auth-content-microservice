import Base from "../base.model";

class VlogModel extends Base {
  tableFields = ["id", "uploader_id", "name", "url", "created_at"];

  async getVlog(id: number) {
    try {
      return await this.query("SELECT * FROM \"Vlog\" WHERE id = $1", [id]);
    } catch (error) {
      console.error("Database error in getVlog:", error);
      throw new Error("Failed to retrieve vlog");
    }
  }

  async createVlog(uploaderId: number, name: string, url: string) {
    try {
      return await this.query(
        "INSERT INTO \"Vlog\" (uploader_id, name, url) VALUES ($1, $2, $3) RETURNING *",
        [uploaderId, name, url]
      );
    } catch (error) {
      console.error("Database error in createVlog:", error);
      throw new Error("Failed to create vlog");
    }
  }

  async updateVlog(id: number, name: string, url: string) {
    try {
      return await this.query(
        "UPDATE \"Vlog\" SET name = $1, url = $2 WHERE id = $3 RETURNING *",
        [name, url, id]
      );
    } catch (error) {
      console.error("Database error in updateVlog:", error);
      throw new Error("Failed to update vlog");
    }
  }

  async deleteVlog(id: number) {
    try {
      return await this.query(
        "DELETE FROM \"Vlog\" WHERE id = $1 RETURNING *",
        [id]
      );
    } catch (error) {
      console.error("Database error in deleteVlog:", error);
      throw new Error("Failed to delete vlog");
    }
  }
  async getUserVlogs(userId : number){
    try {
      return this.query("SELECT * FROM \"Vlog\" WHERE uploader_id = $1 JOIN user ON \"Vlog\".uploader_id = user.id order by \"Vlog\".created_at desc", [userId]);
    } catch (error) {
      console.error("Database error in getUserVlogs:", error);
      throw new Error("Failed to retrieve user vlogs");
    }
  }
}

export default VlogModel;
