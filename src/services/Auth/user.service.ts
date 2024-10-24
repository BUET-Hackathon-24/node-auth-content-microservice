import User from "../../models/Auth/user.model";
import HashService from "./hash.service";
import ValidatorService from "./validator.service";
import AuthenticationService from "./authentication.service";
import OtpService from "./otp.service";
import MailerService from "./mailer.service";
import RedisService from "./redis.service";

class UserService {
  private userModel: User;
  constructor() {
    this.userModel = new User();
  }
  async createUserFromSocial (
    name: string,
    email: string,
    profile_picture: string,
  ) {
    const user = await this.getUserByEmail(email);
    if(user){
      return user;
    }
    return await this.userModel.createUserFromSocial(name,email,profile_picture);
  }
  async createUser(
    name: string,
    email: string,
    phone_number: string,
    password: string,
    profile_picture?: string,
  ) {
    try {
      if (!ValidatorService.validateEmail(email)) {
        throw new Error("Invalid email");
      }
      if (!ValidatorService.validatePhoneNumber(phone_number)) {
        throw new Error("Invalid phone number");
      }
      const hashedPassword = await HashService.hashPassword(password);
      const user = await this.userModel.createUser(
        name,
        email,
        phone_number,
        hashedPassword,
      );
      //console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getUserById(id: number) {
    console.log(id);
    try {
      return await this.userModel.getUserById(id);
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.userModel.getUserByEmail(email);
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }
  async updateUser(
    id: number,
    name: string,
    email: string,
    phone_number: string,
    password: string,
  ) {
    try {
      if (!ValidatorService.validateEmail(email)) {
        throw new Error("Invalid email");
      }
      if (!ValidatorService.validatePhoneNumber(phone_number)) {
        throw new Error("Invalid phone number");
      }
      const hashedPassword = await HashService.hashPassword(password);
      await this.userModel.updateUser(
        id,
        name,
        email,
        phone_number,
        hashedPassword,
      );
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }
  async deleteUser(id: number) {
    try {
      await this.userModel.deleteUser(id);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
  async logout(id: number) {
    try {
      await AuthenticationService.deleteAllRefreshTokens(id);
    } catch (error) {
      throw new Error("Failed to logout");
    }
  }
  async refresh(refreshToken: string) {
    try {
      const payload = await AuthenticationService.verifyRefreshToken(refreshToken);
      return await AuthenticationService.generateAccessToken(payload, refreshToken);
    } catch (error) {
      throw new Error("Failed to refresh");
    }
  }
  async sendOtp(email: string) {
    const otp = OtpService.generateOtp();
    try {
      await RedisService.set(`otp_${email}`, otp);
      const result = await MailerService.sendMail(email, otp);
      console.log(result);
      return { message: "OTP sent successfully" };
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp(email: string, otp: string) {
    const storedOtp = await RedisService.get(`otp_${email}`);
    return storedOtp === otp;
  }
  async forgotPassword(id: number, previousPassword: string, newPassword: string) {
   //console.log(id, previousPassword, newPassword);
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await HashService.comparePassword(previousPassword, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid previous password");
    }
    const hashedNewPassword = await HashService.hashPassword(newPassword);
    await this.userModel.updatePassword(id, hashedNewPassword);
    return { message: "Password updated successfully" };
  }
  async updateUserBio(id: number, bio: string) {
    return await this.userModel.updateUserBio(id, bio);
  }
}

export default UserService;
