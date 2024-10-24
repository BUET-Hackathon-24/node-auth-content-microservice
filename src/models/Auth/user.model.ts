import Base from "../base.model";

class User extends Base {
  constructor() {
    super();
  }

  async createUser(
    name: string,
    email: string,
    phone_number: string,
    password: string,
  ) {
    try {
      if(await this.checkUserExistsUsingMail(email)){
        throw new Error("User already exists");
      }
      if(await this.checkUserExistsUsingPhoneNumber(phone_number)){
        throw new Error("Phone number already exists");
      }
      const sql = `WITH check_unique AS (SELECT COUNT(*) AS count FROM users WHERE email = $2 OR phone_number = $4)
        INSERT INTO users (name, email, password, phone_number)
        SELECT $1, $2, $3, $4
        FROM check_unique
        WHERE count = 0
        RETURNING *`;
      const user = await this.query(sql, [name, email, password, phone_number]);
      return user[0];
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user in model");
    }
  }
  async createUserFromSocial(
    name: string,
    email: string,
    profile_picture: string,
  ) {
    try {
      const sql = `INSERT INTO users (name, email, profile_picture) VALUES ($1, $2, $3) RETURNING *`;
      const user = await this.query(sql, [name, email, profile_picture]);
      return user[0];
    } catch (error) {
      throw new Error("Failed to create user from social in model");
    }
  }
  async getUserByEmail(email: string) {
    try {
      const sql = "SELECT * FROM users WHERE email = $1";
      const user = await this.query(sql, [email]);
      return user[0];
    } catch (error) {
      throw new Error("Failed to get user by email in model");
    }
  }
  async getUserById(id: number) {
    try {
      const sql = "SELECT * FROM users WHERE id = $1";
      const user = await this.query(sql, [id]);
      return user[0];
    } catch (error) {
      throw new Error("Failed to get user in model");
    }
  }
  async updateUser(
    id: number,
    name: string,
    email: string,
    password: string,
    phone_number: string,
  ) {
    try {
      const sql = `
        WITH check_unique AS (
          SELECT COUNT(*) AS count 
          FROM users 
          WHERE (email = $2 OR phone_number = $3) AND id != $5
        )
        UPDATE users 
        SET name = $1, email = $2, phone_number = $3, password = $4, updated_at = CURRENT_TIMESTAMP
        FROM check_unique
        WHERE id = $5 AND check_unique.count = 0
        RETURNING *`;
      const user = await this.query(sql, [name, email, phone_number, password, id]);
      return user[0];
    } catch (error) {
      throw new Error("Failed to update user in model");
    }
  }
  async deleteUser(id: number) {
    try {
      const sql = "DELETE FROM users WHERE id = $1";
      await this.query(sql, [id]);
    } catch (error) {
      throw new Error("Failed to delete user in model");
    }
  }
  async checkUserExistsUsingMail(email: string) {
    const sql = "SELECT * FROM users WHERE email = $1";
    const user = await this.query(sql, [email]);
    return user.length > 0;
  }
  async updatePassword(id: number, password: string) {
    const sql = "UPDATE users SET password = $1 WHERE id = $2";
    await this.query(sql, [password, id]);
  }
  async updateUserBio(id: number, bio: string) {
    console.log("id, bio in model: ", id, bio);
    const sql = "UPDATE users SET bio = $1 WHERE id = $2";
    return await this.query(sql, [bio, id]);
  }
  async checkUserExistsUsingPhoneNumber(phone_number: string) {
    const sql = "SELECT * FROM users WHERE phone_number = $1";
    const user = await this.query(sql, [phone_number]);
    return user.length > 0;
  }
}

export default User;
