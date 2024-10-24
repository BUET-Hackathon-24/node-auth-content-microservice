import bcrypt from "bcrypt";

class HashService {
  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  static async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default HashService;
