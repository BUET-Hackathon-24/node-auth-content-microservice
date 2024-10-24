import pool from "../db";

class Base {
  protected db: any;
  constructor() {
    this.db = pool;
  }
  async query(sql: string, params: any[] = []) {
    try {
      const result = await this.db.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default Base;
