import UserService from "../../services/Auth/user.service";
import AuthenticationService from "../../services/Auth/authentication.service";
import { Request, Response } from "express";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone_number, password, profile_picture } = req.body;
    if (!name || !email || !phone_number || !password) {
      res.status(400).json({
        message: "Name, email, phone number and password are required",
      });
      return;
    }
    try {
      const user = await this.userService.createUser(
        name,
        email,
        phone_number,
        password,
        profile_picture ?? ''
      );
      console.log(user);
      const refreshToken: string = await AuthenticationService.generateRefreshToken(user);
      console.log(refreshToken);
      const accessToken: string = await AuthenticationService.generateAccessToken(user, refreshToken);
      console.log(accessToken);
      res.status(201).json({
        message: "User created successfully",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      return;
    } catch (error) {
        res
          .status(500)
          .json({ message: (error as Error).message, error: (error as Error).message });
      return;
    }
  };
  getUserById = async (req: Request, res: Response): Promise<void> => {
    let id = req.params.id;
    if(!id){
      id = req.body.userId;
    }
    if (!id) {
      res.status(400).json({ message: "Id is required" });
      return;
    }
    try {
      const user = await this.userService.getUserById(parseInt(id));
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to get user", error: error.message });
      } else {
        res.status(500).json({
          message: "Failed to get user",
          error: "An unknown error occurred",
        });
      }
      return;
    }
  };
  getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    try {
      const user = await this.userService.getUserByEmail(email);
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to get user", error: error.message });
      } else {
        res.status(500).json({
          message: "Failed to get user",
          error: "An unknown error occurred",
        });
      }
      return;
    }
  };
  updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      res.status(400).json({
        message: "Name, email, phone number and password are required",
      });
      return;
    }
    try {
      await this.userService.updateUser(
        parseInt(id),
        name,
        email,
        phone_number,
        password,
      );
      res.status(200).json({ message: "User updated successfully" });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to update user", error: error.message });
      } else {
        res.status(500).json({
          message: "Failed to update user",
          error: "An unknown error occurred",
        });
      }
      return;
    }
  };
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(parseInt(id));
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to delete user", error: error.message });
      } else {
        res.status(500).json({
          message: "Failed to delete user",
          error: "An unknown error occurred",
        });
      }
      return;
    }
  };
  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    try {
      const user = await this.userService.login(email, password);
      const refreshToken: string = await AuthenticationService.generateRefreshToken(user);
      const accessToken: string = await AuthenticationService.generateAccessToken(user, refreshToken);
      res.status(200).json({
        message: "User logged in successfully",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to login", error: error });
      return;
    }
  };
  logout = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.userService.logout(parseInt(id));
      res.status(200).json({ message: "User logged out successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to logout", error: error });
      return;
    }
  };
  refresh = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required" });
      return;
    }
    try {
      const accessToken: string = await this.userService.refresh(refreshToken);
      res.status(200).json({ message: "Token refreshed successfully", access_token: accessToken });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to refresh", error: error });
      return;
    }
  };
  sendOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    try {
      await this.userService.sendOtp(email);
      res.status(200).json({ message: "OTP sent successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to send OTP", error: error });
      return;
    }
  }
  verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    try {
      const result = await this.userService.verifyOtp(email, otp);
      if (result) {
        res.status(200).json({ message: "OTP verified successfully" });
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to verify OTP", error: error });
      return;
    }
  }
  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { id, previousPassword, newPassword } = req.body;
    //console.log(id, previousPassword, newPassword);
    try {
      await this.userService.forgotPassword(parseInt(id), previousPassword, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Failed to update password", error: error });
      return;
    }
  }
  updateUserBio = async (req: Request, res: Response): Promise<void> => {
    const { userId, bio } = req.body;
    console.log(userId, bio);
    const result = await this.userService.updateUserBio(parseInt(userId), bio);
    console.log(result);
    res.status(200).json({ message: "User bio updated successfully" });
    return;
  }
}


export default UserController;
